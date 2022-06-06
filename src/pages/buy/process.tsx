import {
  Center,
  CircularProgress,
  Container,
  Stack,
  useToast,
  Box,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function BuyProcess() {
  const router = useRouter();
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "gray.300");
  useEffect(() => {
    if (
      !router.query.orderId &&
      !router.query.paymentKey &&
      !router.query.amount
    ) {
      return;
    }
    axios
      .patch(
        "/api/order",
        { paymentKey: router.query.paymentKey, amount: router.query.amount },
        { params: { id: router.query.orderId } }
      )
      .then((res) => {
        router.push(`/buy/success?id=${res.data.id}`);
      })
      .catch((err) => {
        toast({
          title: "주문 정보를 불러오는데 실패했습니다.",
          status: "error",
          isClosable: true,
          description: err.message,
        });
      });
  }, [router, toast]);

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
            <CircularProgress size="13vh" isIndeterminate />
          </Center>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <Text as={"span"} color={textColor}>
              결제 진행 중
            </Text>
          </Heading>
        </Stack>
      </Container>
    </>
  );
}

BuyProcess.hideTitle = true;
