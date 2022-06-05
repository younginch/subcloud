import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useToast,
  Box,
  createIcon,
  Center,
  HStack,
} from "@chakra-ui/react";
import { Order } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";

export default function BuySuccess() {
  const router = useRouter();
  const session = useSession();
  const toast = useToast();

  const [order, setOrder] = useState<Order>();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    axios
      .get("/api/order", { params: { id: router.query.id } })
      .then((res) => {
        setOrder(res.data);
      })
      .catch(() => {
        toast({
          title: "주문 정보를 불러오는데 실패했습니다.",
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
              결제가 완료되었습니다
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
            <Text>결제 금액 : {order?.amount}원</Text>
            <HStack>
              <Text>결제 id :{order?.id}</Text>
              <CopyToClipboard
                text={order?.id ? order.id : "error"}
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

  /*
  return (
    <>
      <Text>결제 성공</Text>
      <Text>결제 ID: {order?.id}</Text>
      <Text>결제 금액: {order?.amount}</Text>
      <Text>결제 상태: {order?.status}</Text>
      <Button
        onClick={() => {
          router.push(`/user/${session?.data?.user.id}`);
        }}
      >
        프로필 페이지로 이동
      </Button>
    </>
  );
  */
}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

BuySuccess.hideTitle = true;
