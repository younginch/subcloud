import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { RefObject } from "react";
import { BiVideoPlus } from "react-icons/bi";

type Props = {
  urlRef: RefObject<HTMLInputElement>;
};

export default function NoVideo({ urlRef }: Props) {
  const { t } = useTranslation("editor");
  return (
    <Stack
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("gray.100", "#222222")}
      onClick={() => urlRef.current?.focus()}
    >
      <BiVideoPlus size="30%" />
      <Text fontSize="20px" fontWeight="bold">
        {t("url_insert")}
      </Text>
    </Stack>
  );
}
