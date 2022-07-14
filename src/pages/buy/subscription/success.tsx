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
import useTranslation from "next-translate/useTranslation";

type CardType = {
  company: string;
  number: string;
  cardType: string;
  ownerType: string;
};

export default function SubscriptionSuccess() {
  const { t } = useTranslation("buyPage");
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
          title: t("subscription_sucess_error"),
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
              {t("subscribe_sucess")}
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            {t("sucess_p1")}
            <br />
            {t("sucess_p2")}
            <br />
            {t("sucess_p3")}
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
                  {t("profile_button")}
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
                  {t("request_button")}
                </Button>
              </Link>
            </HStack>
            <Text>
              {t("subscription_sucess_card_info")} :{" "}
              {(subscription?.card as CardType)?.company}
            </Text>
            <Text>{(subscription?.card as CardType)?.number}</Text>
            <Text>{(subscription?.card as CardType)?.cardType}</Text>
            <Text>{(subscription?.card as CardType)?.ownerType}</Text>
            <Text>{subscription?.type}</Text>
            <HStack>
              <Text>
                {t("subscription_sucess_subcribe_id")} :{subscription?.id}
              </Text>
              <CopyToClipboard
                text={subscription?.id ? subscription.id : "error"}
                onCopy={() => setIsCopied(true)}
              >
                <Text as="u" color="blue" cursor="pointer">
                  {isCopied ? t("copied") : t("copy")}
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
