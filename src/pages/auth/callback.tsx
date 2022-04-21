import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";

export default function Callback() {
  const { query } = useRouter();

  useEffect(() => {
    if (query["open"]) {
      window.location.assign(query.open as string);
      window.close();
    }
  });

  return <Layout>외부 프로그램 여는 중</Layout>;
}
