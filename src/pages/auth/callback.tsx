import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";
import { getCookie } from "cookies-next";

export default function Callback() {
  const { query } = useRouter();

  useEffect(() => {
    if (query["open"]) {
      const csrf = getCookie("__Host-next-auth.csrf-token");
      const callback = getCookie("__Secure-next-auth.callback-url");
      const session = getCookie("__Secure-next-auth.session-token");
      window.location.assign(
        `${query.open}?csrf=${csrf}&callback=${callback}&session=${session}`
      );
      window.close();
    }
  }, [query]);

  return <Layout>외부 프로그램 여는 중</Layout>;
}
