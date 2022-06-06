import "./_App.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Center, ChakraProvider, CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import axios from "axios";
import { Role, User } from "@prisma/client";
import Layout from "../components/layout";
import { PageOptions } from "../utils/types";

type NextPageWithAuth = NextPage & {
  options: PageOptions;
};

type AppPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
  const { options } = Component;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // if (!options) {
  //   throw Error("Please implement options in all pages");
  // }

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        {isClient ? (
          <Layout options={options}>
            {options.auth ? (
              <Auth role={options.auth}>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        ) : (
          <Center paddingTop="25vh">
            <CircularProgress size="13vh" isIndeterminate />
          </Center>
        )}
      </ChakraProvider>
    </SessionProvider>
  );
}

type AuthProps = {
  children: JSX.Element;
  role?: Role;
};

function Auth({ children, role }: AuthProps): JSX.Element {
  const router = useRouter();
  const { data, status } = useSession();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (status === "loading" || !router.isReady) return; // Do nothing while loading
    if (status === "unauthenticated") {
      router.push(`/auth/signin?callbackUrl=${router.asPath}`); // If not authenticated, force log in
      return;
    } else {
      if (!user) {
        return;
      }
      if (role === Role.Admin && user.role !== Role.Admin) {
        router.push("/api/auth/signout"); // If not admin, force log in
        return;
      }
      if (role === Role.Reviewer && user.role !== Role.Reviewer) {
        router.push("/api/auth/signout"); // If not reviewer, force log in
        return;
      }
    }
  }, [role, router, status, user]);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
    axios.get(`/api/user`, { params: { id: data?.user.id } }).then((res) => {
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
