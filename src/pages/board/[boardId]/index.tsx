import {
  Button,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PageOptions } from "../../../utils/types";

export default function BoardIndex() {
  return (
    <Stack alignItems="center">
      <Stack
        w="700px"
        maxW="100%"
        spacing="40px"
        alignItems="center"
        pb="100px"
      >
        <Stack p="40px 10px 20px 10px">
          <Text
            color={useColorModeValue("gray.600", "gray.300")}
            fontSize="14px"
          >
            이벤트 | 진행중인 이벤트
          </Text>
          <Heading fontSize={{ base: "2xl", sm: "3xl" }} mt="15px !important">
            SubCloud가 처음인 모두에게 반값 쿠폰팩💸
          </Heading>
          <Text
            color={useColorModeValue("gray.600", "gray.300")}
            fontSize="16px"
          >
            2022.7.20 ~ 8.15
          </Text>
        </Stack>
        <Divider borderWidth="2px" />
        <Image
          src="https://jamake-asset-prod.s3.amazonaws.com/thumbnailcontents_welcomecoupon-min1.png"
          alt="content"
          borderRadius="30px"
        />
        <Button w="200px" colorScheme="blue">
          이벤트 참여하기!
        </Button>
      </Stack>
    </Stack>
  );
}

BoardIndex.options = {
  auth: false,
  hideTitle: true,
} as PageOptions;
