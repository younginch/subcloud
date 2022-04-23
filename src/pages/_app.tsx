import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Center, ChakraProvider, CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import axios from "axios";
import { Role, User } from "@prisma/client";
import Layout from "../components/layout";

type NextPageWithAuth = NextPage & {
  auth?: Role;
  hideHeader?: boolean;
  hideTitle?: boolean;
};

type AppPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
  const { auth, hideHeader, hideTitle } = Component;

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Layout hideNavBar={hideHeader} hideTitle={hideTitle}>
          {Component.auth ? (
            <Auth role={auth}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

function Auth({ children, role }: any) {
  const router = useRouter();
  const { data, status } = useSession();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    console.log({ router, status });
    if (status === "loading" || !router.isReady) return; // Do nothing while loading
    if (status === "unauthenticated") {
      router.push(`/auth/signin?callbackUrl=${router.asPath}`); // If not authenticated, force log in
      return;
    } else {
      if (!user) {
        return;
      }
      if (role === Role.ADMIN && user.role !== Role.ADMIN) {
        router.push("/api/auth/signout"); // If not admin, force log in
        return;
      }
      if (role === Role.REVIEWER && user.role !== Role.REVIEWER) {
        router.push("/api/auth/signout"); // If not reviewer, force log in
        return;
      }
    }
  }, [role, router, status, user]);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
    axios.get(`/api/user/${data?.user.id}`).then((res) => {
      setUser(res.data);
    });
  }, [data?.user.id, status]);

  if (status === "authenticated") {
    return children;
  }

  return (
    <Center>
      <CircularProgress />
    </Center>
  );
}
