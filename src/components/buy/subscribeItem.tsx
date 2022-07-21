import {
  Box,
  useColorModeValue,
  Text,
  VStack,
  HStack,
  useToast,
  Button,
  List,
} from "@chakra-ui/react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  price: string;
  title: string;
  header?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius="xl"
    >
      {children}
    </Box>
  );
}

export default function SubscribeItem({
  price,
  header,
  title,
  disabled,
  children,
}: Props) {
  const [toss, setToss] = useState<any>();
  const { data } = useSession();
  const toast = useToast();
  const headerBgColor = useColorModeValue("red.300", "red.700");
  const headerTextColor = useColorModeValue("gray.900", "gray.300");

  useEffect(() => {
    loadTossPayments("test_ck_5GePWvyJnrK4bNAaAZe8gLzN97Eo").then(
      (tossPayments) => {
        setToss(tossPayments);
      }
    );
  }, []);

  function requestSubscription() {
    axios
      .post("/api/subscription")
      .then((res) => {
        toss
          .requestBillingAuth("카드", {
            customerKey: res.data.customerKey,
            successUrl: `${window.location.origin}/buy/subscription/process`,
            failUrl: `${window.location.origin}/buy/subscription/fail`,
            customerName: data?.user.name,
            customerEmail: data?.user.email,
          })
          .then(() => {})
          .catch(() => {
            toast({
              title: "오류가 발생했습니다.",
              status: "error",
            });
          });
      })
      .catch((err) => {
        toast({
          title: "구독 등록 에러",
          description: err.message,
          status: "error",
          isClosable: true,
        });
      });
  }

  return (
    <PriceWrapper>
      <Box position="relative">
        {header && (
          <Box
            position="absolute"
            top="-16px"
            left="50%"
            style={{ transform: "translate(-50%)" }}
          >
            <Text
              textTransform="uppercase"
              bg={headerBgColor}
              px={3}
              py={1}
              color={headerTextColor}
              fontSize="sm"
              fontWeight="600"
              rounded="xl"
            >
              {header}
            </Text>
          </Box>
        )}
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            {title}
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              $
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              {price}
            </Text>
            <Text fontSize="3xl" color="gray.500">
              /month
            </Text>
          </HStack>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius="xl"
        >
          <List spacing={3} textAlign="start" px={12}>
            {children}
          </List>
          <Box w="80%" pt={7}>
            <Button
              w="full"
              colorScheme="red"
              variant="outline"
              onClick={requestSubscription}
              isDisabled={disabled}
            >
              Start trial
            </Button>
          </Box>
        </VStack>
      </Box>
    </PriceWrapper>
  );
}
