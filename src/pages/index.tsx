import React, { Component, MouseEventHandler, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
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
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import ChromeIcon from "../../public/browsers/chrome.png";
import FirefoxIcon from "../../public/browsers/firefox.svg";
import SafariIcon from "../../public/browsers/safari.png";
import TitleImage from "../../public/title.png";
import InViewProvider from "../components/inviewProvider";
import CarouselPage from "../components/carouselPage";

export function SimpleSlider() {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    "https://bit.ly/2Z4KKcF",
    "https://bit.ly/2Z4KKcF",
    "https://bit.ly/2Z4KKcF",
    "https://bit.ly/2Z4KKcF",
    "https://bit.ly/2Z4KKcF",
  ];

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    afterChange: (current: number) => {
      setImageIndex(current);
    },
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((img, idx) => (
          <Box key={idx}>
            <CarouselPage active={idx == imageIndex} />
          </Box>
        ))}
      </Slider>
    </div>
  );
}

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
      <Text marginStart="12px" color="gray.200">
        {"SubCloud for " + name}
      </Text>
    </Button>
  );
}

export default function Home() {
  return (
    <>
      <Stack bg="black" h="80vh" className="mainComponent">
        <Box className="titleOverlay">
          <Stack>
            <Center>
              <Heading color="white" mt={70}>
                전 세계 유저들이 제작한 자막을 시청하세요
              </Heading>
            </Center>
            <Center>
              <Text fontSize="2xl" color="gray.300" mt={3}>
                다양한 디바이스에서 무제한으로 사용할 수 있습니다.
              </Text>
            </Center>
            <Flex direction="column" alignItems="center">
              <Text fontSize="2xl" mt={10} mb="30px" color="gray.200">
                지금 바로 다운로드하세요
              </Text>
              <HStack marginBottom="192px">
                <Stack>
                  <ExtensionButton browser="chrome" />
                  <Text align="center" color="gray.200">
                    1000 + Users
                  </Text>
                </Stack>
                <Stack>
                  <ExtensionButton browser="safari" isDisabled />
                  <Text align="center" color="gray">
                    Comming soon
                  </Text>
                </Stack>
                <Stack>
                  <ExtensionButton browser="firefox" isDisabled />
                  <Text align="center" color="gray">
                    Comming soon
                  </Text>
                </Stack>
              </HStack>
            </Flex>
          </Stack>
        </Box>
        <SimpleSlider />
      </Stack>
      <HStack h="100vh" alignItems="top">
        <Stack marginTop="28vh" width="570px">
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
      <InViewProvider initialScale={0.95}>
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
            <Text fontSize="2xl">
              자막이 생기면 바로 알림으로 알려드릴게요.
            </Text>
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
              <Heading marginTop={1} size="lg">
                영인치님의 자막을 사용했어요
              </Heading>
              <Text color="blue.400" marginTop={7}>
                자막 제작자 상위 28%
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
            <Text fontSize="2xl">
              유저들의 감사를 알림으로 받아볼 수 있어요
            </Text>
          </Stack>
        </Flex>
      </InViewProvider>
      <InViewProvider initialScale={0.95}>
        <HStack>
          <Stack>
            <Heading color="blue.400" size="md">
              간편한 자막 시청
            </Heading>
            <Text h={9} fontSize="4xl" fontWeight="bold">
              웹사이트 이동 없이
            </Text>
            <Text fontSize="4xl" fontWeight="bold">
              보던 영상에서 그대로.
            </Text>
            <Text fontSize="2xl">클릭 몇 번이면 자막을 불러올 수 있어요</Text>
          </Stack>
          <Spacer />
          <div>
            <object
              type="image/svg+xml"
              data="tutorial_popup_sub.svg"
              width="500px"
            >
              svg-animation
            </object>
          </div>
        </HStack>
      </InViewProvider>
    </>
  );
}

Home.hideTitle = true;
