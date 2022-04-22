import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";
import { GetServerSidePropsContext } from "next";

export default function Callback({ cookies }: any) {
  const { query } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 5000);
  }, []);

  return <Layout>외부 프로그램 여는 중 - 5초 후에 창이 닫힙니다.</Layout>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      cookies: context.req.cookies,
    },
  };
}
