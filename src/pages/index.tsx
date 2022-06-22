import { CheckCircleIcon } from "@chakra-ui/icons";
import { AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import {
  Box,
  Button,
  calc,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import TitleImage from "../../public/title.png";
import InViewProvider from "../components/inviewProvider";
import ExtensionButton from "../components/extensionButton";
import { SimpleSlider } from "../components/simpleSlider";
import { PageOptions } from "../utils/types";
import { GoChevronRight } from "react-icons/go";
import { DottedBox } from "../components/icons/customIcons";

export default function Home() {
  return (
    <>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 20 }}
        justifyContent="center"
        p={10}
        pt="100px"
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
            Watch Subtitles free <br />
            <Text color="teal">in SubCloud</Text>
          </Text>
          <Text
            fontSize="1.8rem"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="400"
            color="gray.500"
          >
            SubCloud aims to overcome language barriers on the web through
            subtitles.
          </Text>
          <HStack
            spacing={{ base: 0, sm: 2 }}
            mb={{ base: "3rem !important", sm: 0 }}
            flexWrap="wrap"
            pt={{ base: 0, md: 10 }}
          >
            <Button
              w={{ base: "100%", sm: "auto" }}
              h={10}
              color="white"
              rounded="md"
              mb={{ base: 2, sm: 0 }}
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{
                bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                opacity: 0.9,
              }}
              fontSize="xl"
            >
              <Text>Searching Videos</Text>
            </Button>
            <Box
              w={{ base: "100%", sm: "auto" }}
              h={10}
              as={Flex}
              alignItems="center"
              justifyContent="center"
              p={3}
              color="white"
              rounded="md"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              boxShadow="md"
              fontSize="xl"
            >
              <Text>Request Subtitles</Text>
            </Box>
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
      <Box maxW="6xl" margin="auto" p={10}>
        <InViewProvider initialScale={0.95}>
          <Stack
            marginY="100px"
            direction={{ base: "column", lg: "row" }}
            spacing={10}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Heading color="blue.400" size="md">
                무료 자막 요청
              </Heading>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                maxW="500px"
              >
                자막이 필요한 영상이 생기면 언제든지 요청하세요.
              </Text>
              <Text fontSize="2xl">
                자막이 생기면 바로 알림으로 알려드릴게요.
              </Text>
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
                  요청 전송 완료
                </Heading>
                <Text color="blue.400" marginTop={7}>
                  52명이 같은 영상에 요청했어요.
                </Text>
              </Center>
            </Box>
          </Stack>
        </InViewProvider>
        <InViewProvider initialScale={0.95}>
          <Stack
            marginY="128px"
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
                  현재까지 18730명이
                </Heading>
                <Heading marginTop={1} size="md">
                  영인치님의 자막을 사용했어요
                </Heading>
                <Text color="blue.400" marginTop={7}>
                  자막 제작자 상위 28%
                </Text>
              </Center>
            </Box>
            <Stack>
              <Heading color="blue.400" size="md">
                자유로운 자막 제작
              </Heading>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                maxW="500px"
              >
                자막을 만들어 돈도 벌고, 경력도 쌓아보세요.
              </Text>
              <Text fontSize="2xl">
                유저들의 감사를 알림으로 받아볼 수 있어요
              </Text>
            </Stack>
          </Stack>
        </InViewProvider>
        <InViewProvider initialScale={0.95}>
          <Stack
            mb="60px"
            direction={{ base: "column-reverse", lg: "row" }}
            alignItems="center"
          >
            <Stack>
              <Heading color="blue.400" size="md">
                간편한 자막 시청
              </Heading>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                maxW="500px"
              >
                웹사이트 이동 없이 보던 영상에서 그대로.
              </Text>
              <Text fontSize="2xl">클릭 몇 번이면 자막을 불러올 수 있어요</Text>
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
      <Stack alignItems="center" p={10}>
        <Text
          fontSize={{ base: "3xl", md: "6xl" }}
          fontWeight="bold"
          maxW="500px"
        >
          Free downloads
        </Text>
        <Text fontSize={{ base: "xl", md: "3xl" }}>
          Available on web stores
        </Text>
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
      <Stack
        bg={useColorModeValue("gray.100", "gray.700")}
        pb={10}
        alignItems="center"
        mt="50px"
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 5, md: "10vw", lg: "300px", xl: "400px" }}
          alignItems={{ base: "flex-start", md: "center" }}
          p={{ base: 10, sm: 20 }}
        >
          <Box>
            <Text fontSize="4xl" lineHeight={1.2} fontWeight="bold">
              Ready to get started?
            </Text>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              bgClip="text"
            >
              Get in touch or create an account.
            </Text>
          </Box>
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={{ base: 0, sm: 3 }}
            w={{ base: "100%", sm: "auto" }}
          >
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
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

Home.options = { auth: false, hideTitle: true } as PageOptions;
