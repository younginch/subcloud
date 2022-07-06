import { CheckCircleIcon } from "@chakra-ui/icons";
import { AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import TitleImage from "../../public/title.png";
import InViewProvider from "../components/inviewProvider";
import ExtensionButton from "../components/extensionButton";
import { PageOptions } from "../utils/types";
import { DottedBox } from "../components/icons/customIcons";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function Home() {
  const { t } = useTranslation("menu");
  return (
    <>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 20 }}
        justifyContent="center"
        p={10}
        pt={{ base: "100px", md: "150px" }}
        alignItems="center"
      >
        <Stack
          direction="column"
          spacing={10}
          justifyContent="center"
          maxW="600px"
          alignItems="flex-start"
        >
          <Text
            fontSize={{ base: "5xl", lg: "6xl" }}
            lineHeight={1}
            fontWeight="bold"
            textAlign="left"
          >
            {t("watch_sub_free")} <br />
            <Text color="teal">{t("in_sub")}</Text>
          </Text>
          <Text
            fontSize="1.8rem"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="400"
            color="gray.500"
          >
            {t("subcloud_aim")}
          </Text>
          <HStack
            spacing={{ base: 0, sm: 10 }}
            mb={{ base: "3rem !important", sm: 0 }}
            flexWrap="wrap"
            pt={{ base: 0, md: 10 }}
            color="white"
          >
            <Button
              w={{ base: "100%", sm: "auto" }}
              h={10}
              rounded="md"
              mb={{ base: 2, sm: 0 }}
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{
                bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                opacity: 0.9,
              }}
              fontSize="xl"
            >
              <Text>{t("search_vid")}</Text>
            </Button>
            <NextLink href={"/video/create?next=request"}>
              <Button
                w={{ base: "100%", sm: "auto" }}
                h={10}
                p={3}
                rounded="md"
                bgGradient="linear(to-l, #8E54E9, #4776E6)"
                _hover={{
                  bgGradient: "linear(to-l, #4776E6, #8E54E9 )",
                }}
                fontSize="xl"
              >
                <Text>{t("request_sub")}</Text>
              </Button>
            </NextLink>
            <Spacer />
          </HStack>
        </Stack>
        <Box
          ml={{ base: 0, md: 5 }}
          pos="relative"
          h="full"
          maxH="100vh"
          overflow="hidden"
        >
          <DottedBox />
          <Image
            width="580px"
            height="372px"
            alt="mainImage"
            src={TitleImage}
          />
        </Box>
      </Stack>
      <Box maxW="1340px" margin="auto" p={10}>
        <InViewProvider initialScale={0.95}>
          <Stack
            mt="150px"
            direction={{ base: "column", lg: "row" }}
            spacing={10}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Heading color="blue.400" size="md">
                {t("free_request")}
              </Heading>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                maxW="500px"
              >
                {t("free_request_ex_front")}
              </Text>
              <Text fontSize="2xl">{t("free_request_ex_back")}</Text>
            </Stack>
            <Box
              boxShadow="2xl"
              w="420px"
              h="300px"
              maxW="80vw"
              borderRadius="24px"
              padding="24px"
            >
              <Center flexDir="column">
                <CheckCircleIcon w={14} h={14} color="blue.400" marginTop={8} />
                <Heading marginTop={6} size="lg">
                  {t("Request_sent_complete")}
                </Heading>
                <Text color="blue.400" marginTop={7}>
                  {t("N_people")}
                </Text>
              </Center>
            </Box>
          </Stack>
        </InViewProvider>
        <InViewProvider initialScale={0.95}>
          <Stack
            marginY="200px"
            direction={{ base: "column-reverse", lg: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={10}
          >
            <Box
              boxShadow="2xl"
              w="420px"
              h="300px"
              maxW="80vw"
              borderRadius="24px"
              padding="24px"
            >
              <Center flexDir="column">
                <Box w={14} h={14} mt={8} color="red.400">
                  <IconContext.Provider
                    value={{ color: "inherit", className: "global-class-name" }}
                  >
                    <div>
                      <AiFillHeart size="100%" />
                    </div>
                  </IconContext.Provider>
                </Box>
                <Heading marginTop={6} size="lg">
                  {t("use_sub_front")}
                </Heading>
                <Heading marginTop={1} size="md">
                  {t("use_sub_back")}
                </Heading>
                <Text color="blue.400" marginTop={7}>
                  {t("top_maker")}
                </Text>
              </Center>
            </Box>
            <Stack>
              <Heading color="blue.400" size="md">
                {t("unconstrained_sub_production")}
              </Heading>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                maxW="500px"
              >
                {t("unconstrained_sub_production_ex_front")}
              </Text>
              <Text fontSize={{ base: "xl", md: "2xl" }}>
                {t("unconstrained_sub_production_ex_back")}
              </Text>
            </Stack>
          </Stack>
        </InViewProvider>
        <InViewProvider initialScale={0.95}>
          <Stack
            mb="100px"
            direction={{ base: "column-reverse", lg: "row" }}
            alignItems="center"
          >
            <Stack>
              <Heading color="blue.400" size="md">
                {t("simple_view")}
              </Heading>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                maxW="500px"
              >
                {t("without_moving_front")}
              </Text>
              <Text fontSize={{ base: "xl", md: "2xl" }}>
                {t("without_moving_back")}
              </Text>
            </Stack>
            <Spacer />
            <Box maxW="80vw" w="500px">
              <object
                type="image/svg+xml"
                data="tutorial_popup_sub.svg"
                width="100%"
              >
                svg-animation
              </object>
            </Box>
          </Stack>
        </InViewProvider>
      </Box>
      <InViewProvider initialScale={0.95}>
        <Stack alignItems="center" p={10}>
          <Text
            fontSize={{ base: "3xl", md: "6xl" }}
            fontWeight="bold"
            maxW="500px"
          >
            {t("free_download")}
          </Text>
          <Text fontSize={{ base: "xl", md: "3xl" }}>{t("available_on")}</Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            spacing={{ base: 1, md: 10 }}
            alignItems="center"
            pt={10}
          >
            <Stack>
              <ExtensionButton browser="chrome" />
              <Text align="center">1000 + Users</Text>
            </Stack>
            <Stack>
              <ExtensionButton browser="safari" isDisabled />
              <Text align="center" color="gray.400">
                Comming soon
              </Text>
            </Stack>
            <Stack>
              <ExtensionButton browser="firefox" isDisabled />
              <Text align="center" color="gray.400">
                Comming soon
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </InViewProvider>
      <Stack
        bg={useColorModeValue("gray.50", "gray.900")}
        pb={10}
        alignItems="center"
        mt={{ base: "50px", md: "150px" }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 5, md: "10vw", lg: "300px", xl: "400px" }}
          alignItems={{ base: "flex-start", md: "center" }}
          p={{ base: 10, sm: 20 }}
        >
          <Box>
            <Text fontSize="4xl" lineHeight={1.2} fontWeight="bold">
              {t("get_start")}
            </Text>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              bgClip="text"
            >
              {t("get_touch_account")}
            </Text>
          </Box>
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={{ base: 0, sm: 3 }}
            w={{ base: "100%", sm: "auto" }}
          >
            <NextLink href={"/auth/signin"}>
              <Button
                color="white"
                variant="solid"
                size="lg"
                rounded="md"
                mb={{ base: 2, sm: 0 }}
                lineHeight={1}
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                _hover={{ bgGradient: "linear(to-l, #0ea5e9,#2563eb)" }}
              >
                {t("account_create")}
              </Button>
            </NextLink>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

Home.options = { auth: false, hideTitle: true } as PageOptions;
