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
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageOptions } from "../../../utils/types";

type SubscriptionProcessProps = {
  customerKey: string;
  authKey: string;
};

export default function SubscriptionProcess({
  customerKey,
  authKey,
}: SubscriptionProcessProps) {
  const router = useRouter();
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "gray.300");
  useEffect(() => {
    axios
      .patch("/api/subscription", { authKey }, { params: { customerKey } })
      .then((res) => {
        router.push(`/buy/subscription/success?id=${res.data.id}`);
      })
      .catch((err) => {
        toast({
          title: "구독 정보를 불러오는데 실패했습니다.",
          status: "error",
          isClosable: true,
          description: err.message,
        });
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
            구독 등록 진행 중
          </Text>
        </Heading>
      </Stack>
    </Container>
  );
}

SubscriptionProcess.options = { auth: true, hideTitle: true } as PageOptions;

export const getServerSideProps: GetServerSideProps<
  SubscriptionProcessProps
> = async (context) => {
  const customerKey = context.query.customerKey as string;
  const authKey = context.query.authKey as string;
  return { props: { customerKey, authKey } };
};
