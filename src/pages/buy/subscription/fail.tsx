import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Center,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { PageOptions } from "../../../utils/types";
export default function SubscriptionFail() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Center>
            <WarningTwoIcon w={20} h={20} color="red.500" />
          </Center>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <Text as={"span"} color={"gray.900"}>
              구독 등록 실패
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            구독 결제 수단 등록 과정에서 오류가 발생했습니다.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <HStack spacing={5}>
              <Link href="/user/my" passHref>
                <Button
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  프로필로 가기
                </Button>
              </Link>
              <Link href="/buy" passHref>
                <Button
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  다시 시도하기
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

SubscriptionFail.options = { auth: true, hideTitle: true } as PageOptions;
