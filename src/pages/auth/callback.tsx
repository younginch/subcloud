import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";
import { GetServerSidePropsContext } from "next";

export default function Callback({ cookies }: any) {
  const { query } = useRouter();

  useEffect(() => {
    if (query["open"]) {
      const csrf = cookies["next-auth.csrf-token"];
      const callback = cookies["next-auth.callback-url"];
      const session = cookies["next-auth.session-token"];
      console.log(`${query.open}?csrf=${csrf}&callback=${callback}&session=${session}`);
      window.location.assign(
        `${query.open}?csrf=${csrf}&callback=${callback}&session=${session}`
      );
      window.close();
    }
  }, [cookies, query]);

  return <Layout>외부 프로그램 여는 중</Layout>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      cookies: context.req.cookies,
    },
  };
}
