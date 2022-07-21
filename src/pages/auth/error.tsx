import { WarningTwoIcon } from "@chakra-ui/icons";
import { Text, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Result from "../../components/result";
import { PageOptions } from "../../utils/types";

export default function Error() {
  const router = useRouter();
  const textColor = useColorModeValue("gray.500", "gray.400");
  const { t } = useTranslation("auth");

  return (
    <Result>
      <WarningTwoIcon w="100px" h="100px" color="red.400" />
      <Text fontSize="25px">{t("error_title")}</Text>
      {router.query.error !== "undefined" && (
        <Text fontSize="20px" color={textColor}>
          {t("error_message")}
          {router.query.error}
        </Text>
      )}
    </Result>
  );
}

Error.options = {
  auth: true,
  hideTitle: true,
} as PageOptions;
