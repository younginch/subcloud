import { HStack, Link } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";

type Props = {
  route: string;
};

function FooterLink({ route }: Props) {
  const { t } = useTranslation("routes");

  return (
    <NextLink href={route} passHref>
      <Link>{t(route)}</Link>
    </NextLink>
  );
}

export default function Footer() {
  return (
    <HStack spacing={12} paddingY={3} paddingStart={12}>
      <FooterLink route="/info/company" />
      <FooterLink route="/info/terms" />
      <FooterLink route="/info/privacy" />
    </HStack>
  );
}
