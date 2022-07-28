import "./_App.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import {
  Center,
  ChakraProvider,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Role } from "@prisma/client";
import { SWRConfig } from "swr";
import Layout from "../components/layout";
import { PageOptions } from "../utils/types";
import AdminLayout from "../components/adminLayout";
import UserLayout from "../components/user/my/userLayout";
import isRightRole from "../utils/role";

type AuthProps = {
  children: JSX.Element;
  auth?: boolean;
  role?: Role;
};

function Auth({ children, auth, role }: AuthProps): JSX.Element {
  const router = useRouter();
  const toast = useToast();
  const { data, status } = useSession();

  useEffect(() => {
    if (!auth && !role) {
      return;
    }
    if (status === "loading" || !router.isReady) {
      // eslint-disable-next-line no-useless-return
      return; // Do nothing while loading
      // eslint-disable-next-line no-else-return
    } else if (status === "unauthenticated") {
      router.push(`/auth/signin?callbackUrl=${router.asPath}`); // If not authenticated, force log in
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      // eslint-disable-next-line no-lonely-if
      if (!data?.user) {
        // eslint-disable-next-line no-useless-return
        return;
        // eslint-disable-next-line no-else-return
      } else if (auth || !role) {
        // eslint-disable-next-line no-useless-return
        return;
      } else if (!isRightRole(data.user.role, role)) {
        router.push("/api/auth/signout");
        toast({
          title: "You are not authorized to access this page",
          description: `Required role: ${role}, your role: ${data.user.role}`,
          status: "error",
        });
      }
    }
  }, [auth, data?.user, role, router, status, toast]);

  if (status === "authenticated") {
    return children;
  }

  return (
    <Center>
      <CircularProgress />
    </Center>
  );
}

type NextPageWithAuth = NextPage & {
  options: PageOptions;
};

type AppPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function getCustomLayout(
  pathname: string
): FunctionComponent<{ children: ReactElement }> {
  if (pathname.startsWith("/admin")) {
    return AdminLayout;
  }
  if (pathname.startsWith("/user/my")) {
    return UserLayout;
  }
  return (props: { children: ReactElement }): ReactElement<any, any> | null =>
    props.children;
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
  const router = useRouter();

  const { options } = Component;
  const CustomLayout = getCustomLayout(router.pathname);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!options) {
    throw Error(`Please implement options in page ${Component.name}`);
  } else if (options.auth === undefined && options.role === undefined) {
    throw Error(
      `Please implement either auth or role in page ${Component.name}`
    );
  }

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <SessionProvider session={session}>
        <ChakraProvider portalZIndex={2000}>
          {isClient ? (
            <Layout options={options}>
              <CustomLayout>
                {options.auth || options.role !== undefined ? (
                  <Auth auth={options.auth} role={options.role}>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )}
              </CustomLayout>
            </Layout>
          ) : (
            <Center paddingTop="25vh">
              <CircularProgress size="13vh" isIndeterminate />
            </Center>
          )}
        </ChakraProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
