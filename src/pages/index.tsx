import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import ChromeIcon from "../../public/browsers/chrome.png";
import FirefoxIcon from "../../public/browsers/firefox.svg";
import SafariIcon from "../../public/browsers/safari.png";
import TitleImage from "../../public/title.png";

type Props = {
  browser: string;
  isDisabled?: boolean;
};

export function ExtensionButton({ browser, isDisabled = false }: Props) {
  let icon = ChromeIcon;
  let name = "Chrome";
  switch (browser) {
    case "chrome":
      icon = ChromeIcon;
      name = "Chrome";
      break;
    case "firefox":
      icon = FirefoxIcon;
      name = "Firefox";
      break;
    case "safari":
      icon = SafariIcon;
      name = "Safari";
      break;
  }

  return (
    <Button
      variant="outline"
      h="48px"
      borderRadius="24px"
      isDisabled={isDisabled}
    >
      <Image src={icon} alt="icon" width="24px" height="24px" />
      <Text marginStart="12px">{"SubCloud for " + name}</Text>
    </Button>
  );
}

export default function Home() {
  return (
    <>
      <HStack h="100vh" alignItems="top">
        <Stack marginTop="28vh" width="560px">
          <Heading fontSize="31px" h="76px">
            우리 모두를 위한 단 하나의 자막 플랫폼.
          </Heading>
          <Text fontSize="20px">SubCloud는 유튜브의 모든 영상에</Text>
          <Text fontSize="20px">양질의 자막을 제공하는것을 목표로 합니다.</Text>
          <Box paddingTop="3vh">
            <Link href="/auth/signin?callbackUrl=/" passHref>
              <Button h="54px" borderRadius="12px">
                무료로 SubCloud 이용하기
              </Button>
            </Link>
          </Box>
        </Stack>
        <Box paddingTop="24vh">
          <Image src={TitleImage} alt="title" width="580px" height="372px" />
        </Box>
      </HStack>
      <Flex marginY="48px">
        <Stack>
          <Heading color="blue.400" size="md">
            무료 자막 요청
          </Heading>
          <Text h={9} fontSize="4xl" fontWeight="bold">
            자막이 필요한 영상이 생기면
          </Text>
          <Text fontSize="4xl" fontWeight="bold">
            언제든지 요청하세요.
          </Text>
          <Text fontSize="2xl">자막이 생기면 바로 알림으로 알려드릴게요.</Text>
        </Stack>
        <Spacer />
        <Box
          boxShadow="2xl"
          w="420px"
          h="300px"
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
      </Flex>
      <Flex marginY="128px">
        <Box
          boxShadow="2xl"
          w="420px"
          h="300px"
          borderRadius="24px"
          padding="24px"
        >
          <Center flexDir="column">
            <CheckCircleIcon w={14} h={14} color="blue.400" marginTop={8} />
            <Heading marginTop={6} size="lg">
              자막 제작 완료
            </Heading>
            <Text color="blue.400" marginTop={7}>
              52명이 이 영상에 자막을 요청했어요.
            </Text>
          </Center>
        </Box>
        <Spacer />
        <Stack>
          <Heading color="blue.400" size="md">
            자유로운 자막 제작
          </Heading>
          <Text h={9} fontSize="4xl" fontWeight="bold">
            자막을 만들어 돈도 벌고,
          </Text>
          <Text fontSize="4xl" fontWeight="bold">
            경력도 쌓아보세요.
          </Text>
          <Text fontSize="2xl">자막이 생기면 바로 알림으로 알려드릴게요.</Text>
        </Stack>
      </Flex>
      <Heading>확장 프로그램</Heading>
      <Text marginY="24px">지금 바로 다운로드하세요.</Text>
      <HStack marginBottom="192px">
        <Stack>
          <ExtensionButton browser="chrome" />
          <Text paddingStart="18px">1000 + Users</Text>
        </Stack>
        <Stack>
          <ExtensionButton browser="safari" isDisabled />
          <Text paddingStart="18px" color="gray">
            Comming soon
          </Text>
        </Stack>
        <Stack>
          <ExtensionButton browser="firefox" isDisabled />
          <Text paddingStart="18px" color="gray">
            Comming soon
          </Text>
        </Stack>
      </HStack>
    </>
  );
}

Home.hideTitle = true;
