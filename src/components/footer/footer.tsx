import {
  Wrap,
  WrapItem,
  Text,
  Stack,
  Heading,
  Link,
  useColorMode,
  HStack,
  Flex,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import SelectTheme from "./selectTheme";
import SelectTranslation from "./selectTranslation";
import SubCloudLogo from "../../../public/logo.png";

type Props = {
  route: string;
};

function FooterLink({ route }: Props) {
  const { t } = useTranslation("routes");

  return (
    <NextLink href={route} passHref>
      <Link fontSize="xs">{t(route)}</Link>
    </NextLink>
  );
}

function SiteMap() {
  const { t } = useTranslation("menu");
  return (
    <Wrap padding={6} spacing={20}>
      <WrapItem>
        <Stack spacing={{ base: "5", md: "7" }} align="start">
          <HStack spacing={5}>
            <Image src={SubCloudLogo} alt="point" width={40} height={40} />
            <Text color="muted" fontSize="3xl">
              SubCloud
            </Text>
          </HStack>
          <Text color="muted">{t("punchline")}</Text>
        </Stack>
      </WrapItem>
      <WrapItem>
        <Stack>
          <Heading size="sm">{t("download")}</Heading>
          <NextLink
            href="https://chrome.google.com/webstore/detail/subcloud/jekpacppociidhmfenohpnajdmjdddel"
            passHref
          >
            <Text fontSize="xs">SubCloud for Chrome</Text>
          </NextLink>
          <NextLink href="#" passHref>
            <Text fontSize="xs" color="gray.500">
              SubCloud for Safari
            </Text>
          </NextLink>
          <NextLink href="#" passHref>
            <Text fontSize="xs" color="gray.500">
              SubCloud for Firefox
            </Text>
          </NextLink>
        </Stack>
      </WrapItem>
      <WrapItem>
        <Stack>
          <Heading size="sm">{t("legal")}</Heading>
          <FooterLink route="/info/terms" />
          <FooterLink route="/info/privacy" />
          <FooterLink route="/info/dmca" />
        </Stack>
      </WrapItem>
      <WrapItem>
        <Stack>
          <Heading size="sm">{t("business")}</Heading>
          <Text fontSize="xs">{t("business_name")}</Text>
          <Text fontSize="xs">{t("company_registration_number")}</Text>
          <Text fontSize="xs">{t("representative")}</Text>
          <Text fontSize="xs">
            {t("business_address")} <br></br>
            {t("Byeollae-dong")}
          </Text>
          <Text fontSize="xs">{t("tel")}</Text>
        </Stack>
      </WrapItem>
    </Wrap>
  );
}

export default function Footer() {
  const { colorMode } = useColorMode();
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  if (isLargerThan1280) {
    return (
      <Flex
        borderTopColor={
          colorMode === "light"
            ? "rgba(200, 200, 200, 0.7)"
            : "rgba(255, 255, 255, 0.2)"
        }
        borderTopWidth="1px"
        margin={0}
      >
        <SiteMap />
        <Spacer />
        <HStack margin={6} align="flex-start" paddingEnd="84px">
          <SelectTranslation isLarge={true} />
          <SelectTheme isLarge={true} />
        </HStack>
      </Flex>
    );
  }

  return (
    <Stack
      borderTopColor={
        colorMode === "light"
          ? "rgba(200, 200, 200, 0.7)"
          : "rgba(255, 255, 255, 0.2)"
      }
      borderTopWidth="1px"
      margin={0}
      bgColor={colorMode === "light" ? "#f7fafc" : "inherit"}
    >
      <HStack margin={6} align="flex-start">
        <SelectTranslation isLarge={true} />
        <SelectTheme isLarge={true} />
      </HStack>
      <SiteMap />
    </Stack>
  );
}
