import { Heading, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { PageOptions } from "../../utils/types";

export default function Dmca() {
  const { t } = useTranslation("dmca");
  return (
    <>
      <Heading size="lg">{t("content")}</Heading>
      <Text>{t("content_p1")}</Text>
      <Text>{t("content_p2")}</Text>
      <Text>{t("content_p3")}</Text>
      <Text>{t("content_p4")}</Text>
      <Text>{t("content_p5")}</Text>
      <Text>{t("content_p6")}</Text>
      <Text>{t("content_p7")}</Text>
      <Text>{t("content_p8")}</Text>
      <Text>{t("content_p9")}</Text>
      <Text>{t("content_p10")}</Text>
      <Heading size="lg">{t("copyright")}</Heading>
      <Text>{t("copyright_p1")}</Text>
      <Text>{t("copyright_p2")}</Text>
      {t("copyright_p3")}
      <Text>{t("copyright_p4")}</Text>
      <Text>{t("copyright_p5")}</Text>
      <Text>{t("copyright_p6")}</Text>
      <Text>{t("copyright_p7")}</Text>
      <Text>{t("copyright_p8")}</Text>
      <Text>{t("copyright_p9")}</Text>
      <Text>{t("copyright_p10")}</Text>
      <Text>{t("copyright_p11")}</Text>
      <Text>{t("copyright_p12")}</Text>
      <Text>{t("copyright_p13")}</Text>
    </>
  );
}

Dmca.options = { auth: false } as PageOptions;
