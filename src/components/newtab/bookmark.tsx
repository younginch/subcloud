import { Button, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement } from "react";

type Props = {
  icon?: ReactElement;
  href: string;
  title: string;
};

export default function Bookmark({ icon, href, title }: Props) {
  return (
    <NextLink href={href}>
      <Button
        leftIcon={icon}
        size="md"
        h={5}
        pl={-0.5}
        bg="transparent"
        color="white"
      >
        <Text>{title}</Text>
      </Button>
    </NextLink>
  );
}
