import { WarningTwoIcon } from "@chakra-ui/icons";
import { Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Result from "../../components/result";
import { PageOptions } from "../../utils/types";

export default function Error() {
  const router = useRouter();
  const textColor = useColorModeValue("gray.500", "gray.400");
  return (
    <Result>
      <WarningTwoIcon w="100px" h="100px" color="red.400" />
      <Text fontSize="25px">에러가 발생했습니다</Text>
      {router.query["error"] && (
        <Text fontSize="20px" color={textColor}>
          에러 메세지 : {router.query["error"]}
        </Text>
      )}
    </Result>
  );
}

Error.options = {
  auth: true,
  hideTitle: true,
} as PageOptions;
