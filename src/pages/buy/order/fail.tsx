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
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { PageOptions } from "../../../utils/types";
export default function OrderFail() {
  const { t } = useTranslation("buyPageFail");
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
              {t("order_fail_error")}
            </Text>
          </Heading>
          <Text color={"gray.500"}>{t("order_fail_error_process")}</Text>
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
                  {t("order_fail_retry")}
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

OrderFail.options = { auth: true, hideTitle: true } as PageOptions;
