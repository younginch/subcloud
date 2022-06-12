import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useToast,
  Box,
  Center,
  HStack,
} from "@chakra-ui/react";
import { Subscription } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";
import { PageOptions } from "../../../utils/types";

type CardType = {
  company: string;
  number: string;
  cardType: string;
  ownerType: string;
};

export default function SubscriptionSuccess() {
  const router = useRouter();
  const toast = useToast();

  const [subscription, setSubscription] = useState<Subscription>();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    axios
      .get("/api/subscription", { params: { id: router.query.id } })
      .then((res) => {
        setSubscription(res.data);
      })
      .catch(() => {
        toast({
          title: "구독 정보를 불러오는데 실패했습니다.",
          status: "error",
          isClosable: true,
        });
      });
  }, [router.query.id, toast]);

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
            <CheckCircleIcon w={20} h={20} color="green.400" />
          </Center>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <Text as={"span"} color={"green.400"}>
              구독 등록이 완료되었습니다
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            포인트를 사용하여 자막을 요청할 수 있습니다. 원하는 자막을 빠르게
            얻어보세요.
            <br />
            요청이 취소되면 포인트를 그대로 돌려받습니다.
            <br />
            프리미엄 서비스를 구독하면 정기적으로 ____ 포인트를 얻을 수
            있습니다.
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
              <Link href="/video/create?next=request" passHref>
                <Button
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  자막 요청하기
                </Button>
              </Link>
            </HStack>
            <Text>카드 정보 : {(subscription?.card as CardType)?.company}</Text>
            <Text>{(subscription?.card as CardType)?.number}</Text>
            <Text>{(subscription?.card as CardType)?.cardType}</Text>
            <Text>{(subscription?.card as CardType)?.ownerType}</Text>
            <Text>{subscription?.type}</Text>
            <HStack>
              <Text>구독 id :{subscription?.id}</Text>
              <CopyToClipboard
                text={subscription?.id ? subscription.id : "error"}
                onCopy={() => setIsCopied(true)}
              >
                <Text as="u" color="blue">
                  {isCopied ? "복사됨" : "복사하기"}
                </Text>
              </CopyToClipboard>
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

SubscriptionSuccess.options = { auth: true, hideTitle: true } as PageOptions;
