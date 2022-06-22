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
      minW="250px"
      h="48px"
      borderRadius="24px"
      variant="solid"
      isDisabled={isDisabled}
      bgGradient={
        isDisabled
          ? "linear(to-l, rgba(121, 40, 202, .5), rgba(255, 0, 128, .5))"
          : "linear(to-l, rgba(121, 40, 202, 1), rgba(255, 0, 128, 1))"
      }
      _hover={
        isDisabled
          ? {
              bgGradient: "linear(to-l, #8e50cc, #fb52a7)",
              opacity: 0.2,
            }
          : {
              bgGradient: "linear(to-l, #6119a8, #e00b76)",
              opacity: 0.9,
            }
      }
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
