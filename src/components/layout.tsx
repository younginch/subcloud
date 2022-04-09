import { HStack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Script from "next/script";
import NavBar from "./navBar";

type Props = {
  hideNavBar?: boolean;
  children: React.ReactNode;
};

export default function Layout({ hideNavBar, children }: Props) {
  return (
    <>
      <Head>
        <title>Young Inch Lab</title>
        <meta name="description" content="Young Inch Lab" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        {!hideNavBar && <NavBar />}
        {children}
      </div>

      <div>
        <HStack>
          <Text>이용약관</Text>
          <Text>개인정보처리방침</Text>
          <Text>소개</Text>
        </HStack>
      </div>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZVP1Q9XQJB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZVP1Q9XQJB');
        `}
      </Script>
      <Script id="channeltalk" strategy="lazyOnload">
        {`
  (function() {
    var w = window;
    if (w.ChannelIO) {
      return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
    }
    var ch = function() {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function(args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      s.charset = 'UTF-8';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
      l();
    } else if (window.attachEvent) {
      window.attachEvent('onload', l);
    } else {
      window.addEventListener('DOMContentLoaded', l, false);
      window.addEventListener('load', l, false);
    }
  })();
  ChannelIO('boot', {
    "pluginKey": "e1b2fec0-29d8-4e3c-ba74-9a7cbace2ac8"
  });`}
      </Script>
    </>
  );
}
