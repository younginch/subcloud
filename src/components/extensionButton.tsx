import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import ChromeIcon from "../../public/browsers/chrome.png";
import FirefoxIcon from "../../public/browsers/firefox.svg";
import SafariIcon from "../../public/browsers/safari.png";
import Image from "next/image";
import NextLink from "next/link";

type Props = {
  browser: string;
  isDisabled?: boolean;
};

export default function ExtensionButton({
  browser,
  isDisabled = false,
}: Props) {
  let icon = ChromeIcon;
  let name = "Chrome";
  let url = "#";
  switch (browser) {
    case "chrome":
      icon = ChromeIcon;
      name = "Chrome";
      url =
        "https://chrome.google.com/webstore/detail/subcloud/jekpacppociidhmfenohpnajdmjdddel";
      break;
    case "firefox":
      icon = FirefoxIcon;
      name = "Firefox";
      break;
    case "safari":
      icon = SafariIcon;
      name = "Safari";
      break;
  }

  return (
    <NextLink href={url}>
      <Button
        minW="250px"
        h="48px"
        borderRadius="24px"
        isDisabled={isDisabled}
        zIndex={5}
        colorScheme="blue"
        variant={useColorModeValue("solid", "outline")}
      >
        <Box w="24px" h="24px">
          <Image src={icon} alt="icon" />
        </Box>
        <Text marginStart="12px" color="gray.200">
          {"SubCloud for " + name}
        </Text>
      </Button>
    </NextLink>
  );
}
