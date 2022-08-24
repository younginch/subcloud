import { Heading, Stack, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

type Props = {
  type: "request" | "sub";
};

export default function CreateHeader({ type }: Props) {
  const { t } = useTranslation("create");
  return (
    <Stack marginBottom="24px" alignItems="center" p={2}>
      <Heading
        marginTop="18px"
        fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
        textAlign="center"
      >
        {type === "request" ? t("center_h1") : t("center_h1_up")}
      </Heading>
      <Text
        fontSize={{ base: "16px", md: "20px", lg: "25px" }}
        wordBreak="keep-all"
      >
        {type === "request" ? t("center_h1_below") : t("center_h1_up_below")}
      </Text>
    </Stack>
  );
}
