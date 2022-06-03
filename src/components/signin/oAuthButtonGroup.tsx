import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaFacebook } from "react-icons/fa";
import {
  GitHubIcon,
  GoogleIcon,
  KakaoIcon,
  TwitterIcon,
} from "./providerIcons";

const providers = [
  { name: "Google", icon: <GoogleIcon boxSize="5" /> },
  { name: "Facebook", icon: <FaFacebook /> },
  { name: "Kakao", icon: <KakaoIcon boxSize="5" /> },
  { name: "GitHub", icon: <GitHubIcon boxSize="5" /> },
];

export default function OAuthButtonGroup() {
  const router = useRouter();

  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({ name, icon }) => (
        <Button
          key={name}
          width="full"
          onClick={() => {
            signIn(name.toLowerCase(), {
              callbackUrl: router.query["callbackUrl"] as string,
            });
          }}
        >
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  );
}
