import { Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

export default function CoupangText() {
  const { t } = useTranslation("advertisement");
  return <Text>{t("coupang_text")}</Text>;
}

export function CoupangDynamic() {
  return (
    <iframe
      src="https://ads-partners.coupang.com/widgets.html?id=600403&template=carousel&trackingCode=AF0477015&subId=&width=680&height=140"
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      referrerPolicy="unsafe-url"
      title="coupang dynamic"
    />
  );
}
