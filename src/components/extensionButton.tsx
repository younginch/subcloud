import { Box, Button, Text } from "@chakra-ui/react";
import ChromeIcon from "../../public/browsers/chrome.png";
import FirefoxIcon from "../../public/browsers/firefox.svg";
import SafariIcon from "../../public/browsers/safari.png";
import Image from "next/image";

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
  switch (browser) {
    case "chrome":
      icon = ChromeIcon;
      name = "Chrome";
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
    <Button
      variant="outline"
      h="48px"
      borderRadius="24px"
      isDisabled={isDisabled}
      bg="rgb(50,50,50, .5)"
      zIndex={5}
    >
      <Box w="24px" h="24px">
        <Image src={icon} alt="icon" />
      </Box>
      <Text marginStart="12px" color="gray.200">
        {"SubCloud for " + name}
      </Text>
    </Button>
  );
}
