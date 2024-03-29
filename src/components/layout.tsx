import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { PageOptions } from "../utils/types";
import Footer from "./footer/footer";
import NavBar from "./header/navBar";

type Props = {
  options: PageOptions;
  children: React.ReactNode;
};

export default function Layout({ options, children }: Props) {
  const { t } = useTranslation("routes");
  const router = useRouter();
  const color = useColorModeValue(options.bgColorLight, options.bgColorDark);

  return (
    <>
      <Head>
        <title>{t(router.pathname)} - SubCloud</title>
        <meta name="description" content="SubCloud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box w="100%" h="100%" minH="calc(100vh - 84px)" m="0" p="0">
        {!options.hideNavBar && <NavBar />}
        <Box
          maxW={options.width}
          padding={options.width ? "12px" : 0}
          marginX={options.width ? "auto" : 0}
          overflow="hidden"
        >
          <Box bgColor={color} m={0} p={0}>
            {!options.hideTitle && (
              <Heading marginY="18px">{t(router.pathname)}</Heading>
            )}
            {children}
          </Box>
        </Box>
      </Box>
      {!options.hideFooter && <Footer />}
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-2139523136699662"
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HW4MKMPX9Y"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-HW4MKMPX9Y');
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
