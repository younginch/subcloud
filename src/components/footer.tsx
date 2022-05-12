import {
  Wrap,
  WrapItem,
  Text,
  Stack,
  Heading,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";

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

export default function Footer() {
  const { colorMode } = useColorMode();

  return (
    <Wrap
      borderTopColor={
        colorMode === "light"
          ? "rgba(200, 200, 200, 0.7)"
          : "rgba(255, 255, 255, 0.2)"
      }
      borderWidth="1px"
      padding={6}
      spacing={24}
    >
      <WrapItem>
        <Stack>
          <Heading size="sm">다운로드</Heading>
          <NextLink href="#" passHref>
            <Text fontSize="xs">SubCloud for Chrome</Text>
          </NextLink>
          <NextLink href="#" passHref>
            <Text fontSize="xs">SubCloud for Safari</Text>
          </NextLink>
          <NextLink href="#" passHref>
            <Text fontSize="xs">SubCloud for Firefox</Text>
          </NextLink>
        </Stack>
      </WrapItem>
      <WrapItem>
        <Stack>
          <Heading size="sm">법률 및 정보</Heading>
          <FooterLink route="/info/company" />
          <FooterLink route="/info/terms" />
          <FooterLink route="/info/privacy" />
          <FooterLink route="/info/dmca" />
        </Stack>
      </WrapItem>
      <WrapItem>
        <Stack>
          <Heading size="sm">사업자 정보</Heading>
          <Text fontSize="xs">상호명: 주식회사 영인치랩 (young inch lab)</Text>
          <Text fontSize="xs">사업자등록번호: 468-81-02692</Text>
          <Text fontSize="xs">대표자명: 신명진, 이민규</Text>
          <Text fontSize="xs">
            사업장 주소: 12108 경기도 남양주시 별내4로 63, 3408동 703호(별내동,
            신일유토빌)
          </Text>
          <Text fontSize="xs">유선전화: 010-3422-2418</Text>
        </Stack>
      </WrapItem>
    </Wrap>
  );
}
