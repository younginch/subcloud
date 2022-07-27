import {
  Button,
  Text,
  HStack,
  VisuallyHidden,
  useColorModeValue,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FaFacebook } from "react-icons/fa";
import { GitHubIcon, GoogleIcon, KakaoIcon } from "./providerIcons";

export default function OAuthButtonGroup() {
  const router = useRouter();
  const { t } = useTranslation("auth");

  const providers = [
    {
      name: "Google",
      icon: <GoogleIcon boxSize="5" />,
      color: "black",
      bgColor: "#f0f0f0",
    },
    {
      name: "Facebook",
      icon: <FaFacebook color="white" />,
      color: "white",
      bgColor: "#3a77e8",
    },
    {
      name: "Kakao",
      icon: <KakaoIcon boxSize="5" />,
      color: "black",
      bgColor: "#ffe812",
    },
    {
      name: "GitHub",
      icon: <GitHubIcon boxSize="5" color="white" />,
      color: "white",
      bgColor: useColorModeValue("#1a202c", "#444444"),
    },
  ];
  return (
    <>
      {providers.map(({ name, icon, color, bgColor }) => (
        <Button
          key={name}
          width="full"
          onClick={() => {
            signIn(name.toLowerCase(), {
              callbackUrl: router.query.callbackUrl as string,
            });
          }}
          bg={bgColor}
        >
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          <HStack>
            {icon}
            <Text color={color}>
              {t("oauth_button_start")}
              {name}
              {t("oauth_button_end")}
            </Text>
          </HStack>
        </Button>
      ))}
    </>
  );
}
