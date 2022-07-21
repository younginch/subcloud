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
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageOptions } from "../../../utils/types";

type OrderProcessProps = {
  orderId: string;
  paymentKey: string;
  amount: string;
};

export default function OrderProcess({
  orderId,
  paymentKey,
  amount,
}: OrderProcessProps) {
  const { t } = useTranslation("buyPageProcess");
  const router = useRouter();
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "gray.300");
  useEffect(() => {
    axios
      .patch(
        "/api/user/order",
        { paymentKey, amount },
        { params: { id: orderId } }
      )
      .then((res) => {
        router.push(`/buy/order/success?id=${res.data.id}`);
      })
      .catch((err) => {
        toast({
          title: t("order_process_error"),
          status: "error",
          isClosable: true,
          description: err.message,
        });
        router.push(`/buy/order/fail`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxW="3xl">
      <Stack
        as={Box}
        textAlign="center"
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Center>
          <CircularProgress size="13vh" isIndeterminate />
        </Center>
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight="110%"
        >
          <Text as="span" color={textColor}>
            {t("order_process_paying")}
          </Text>
        </Heading>
      </Stack>
    </Container>
  );
}

OrderProcess.options = { auth: true, hideTitle: true } as PageOptions;

export const getServerSideProps: GetServerSideProps<OrderProcessProps> = async (
  context
) => {
  const orderId = context.query.orderId as string;
  const paymentKey = context.query.paymentKey as string;
  const amount = context.query.amount as string;
  return { props: { orderId, paymentKey, amount } };
};
