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
import Features from "../components/features";

export default function Home() {
  const { t } = useTranslation("landing");
  return (
    <Box
      backgroundImage={useColorModeValue(
        "https://user-images.githubusercontent.com/17401630/177977272-7e7b91c9-c172-4bd0-a759-1318d8ebdd4e.PNG",
        undefined
      )}
      backgroundSize="cover"
    >
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
            fontSize={{ base: "5xl", lg: "7xl" }}
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
              bgGradient="linear(to-l, #0ea5e9,#25c3cb)"
              _hover={{
                bgGradient: "linear(to-l, #25a3cb,#0fcdb9)",
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
                bgGradient="linear(to-l, #008686,#3386a0)"
                _hover={{
                  bgGradient: "linear(to-l, #0098aa,#33a0c3)",
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
              bg={useColorModeValue(
                "rgba( 255, 255, 255, 0.4 )",
                "rgba( 85, 85, 85, 0.2 )"
              )}
              className="landing-glassmorphism"
              borderRadius="24px"
              border={useColorModeValue(
                "2px solid rgba( 255, 255, 255, 0.5 )",
                "2px solid rgba( 105, 105, 105, 0.5 )"
              )}
              boxShadow="2xl"
              w="420px"
              h="280px"
              maxW="80vw"
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
              bg={useColorModeValue(
                "rgba( 255, 255, 255, 0.4 )",
                "rgba( 85, 85, 85, 0.2 )"
              )}
              className="landing-glassmorphism"
              borderRadius="24px"
              border={useColorModeValue(
                "2px solid rgba( 255, 255, 255, 0.5 )",
                "2px solid rgba( 105, 105, 105, 0.5 )"
              )}
              boxShadow="2xl"
              w="420px"
              h="300px"
              maxW="80vw"
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
            mb="80px"
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
            <Box
              maxW="80vw"
              w="500px"
              bg={useColorModeValue("rgba( 255, 255, 255, 0.2 )", "gray.900")}
              boxShadow={useColorModeValue(
                "0 0 24px 0 rgba( 31, 38, 135, 0.37 )",
                "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
              )}
              className="landing-glassmorphism"
              borderRadius="15px"
              border={useColorModeValue(
                "2px solid rgba( 255, 255, 255, 0.5 )",
                "2px solid rgba( 105, 105, 105, 0.5 )"
              )}
              overflow="hidden"
            >
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
      <Features />
      <InViewProvider initialScale={0.95}>
        <Stack alignItems="center" p={10} mt="100px">
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
            <Stack justifyContent="flex-start" h="80px">
              <ExtensionButton browser="chrome" />
            </Stack>
            <Stack justifyContent="flex-start" h="80px">
              <ExtensionButton browser="safari" isDisabled />
              <Text align="center" color="gray.400">
                Comming soon
              </Text>
            </Stack>
            <Stack justifyContent="flex-start" h="80px">
              <ExtensionButton browser="firefox" isDisabled />
              <Text align="center" color="gray.400">
                Comming soon
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </InViewProvider>
      <Center pb="100px">
        <Stack
          bg={useColorModeValue("rgba( 255, 255, 255, 0.25 )", "gray.900")}
          boxShadow={useColorModeValue(
            "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            "0 8px 52px 0 rgba( 31, 38, 135, 0.47 )"
          )}
          className="landing-glassmorphism"
          borderRadius="15px"
          border={useColorModeValue(
            "2px solid rgba( 255, 255, 255, 0.5 )",
            "2px solid rgba( 105, 105, 105, 0.5 )"
          )}
          alignItems="center"
          mt={{ base: "50px", lg: "150px" }}
          w={{ base: "90%", lg: "80%" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing={{ base: 2, lg: 5 }}
            alignItems={{ base: "flex-start", lg: "center" }}
            p={{ base: "40px 50px 40px 50px", lg: 20 }}
            w="100%"
          >
            <Box>
              <Text
                fontSize={{ base: "3xl", sm: "4xl" }}
                lineHeight={1.2}
                fontWeight="bold"
              >
                {t("get_start")}
              </Text>
              <Text
                fontSize={{ base: "xl", sm: "2xl" }}
                fontWeight="bold"
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                bgClip="text"
              >
                {t("get_touch_account")}
              </Text>
            </Box>
            <Spacer />
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
      </Center>
    </Box>
  );
}

Home.options = { auth: false, hideTitle: true } as PageOptions;
