import {
  HStack,
  Text,
  useColorModeValue,
  Tr,
  Td,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiCoin } from "react-icons/bi";
import { MdSubtitles } from "react-icons/md";
import router from "next/router";
import { YoutubeIcon } from "../icons/customIcons";

type Props = {
  platform: string;
  videoId: string;
  videoName: string;
  channelName: string;
  channelImageUrl?: string;
  channelUrl: string;
  totalRequests: number;
  totalSubtitles: number;
  totalPoints: number;
};

export default function SearchTableRow({
  platform,
  videoId,
  videoName,
  channelName,
  channelImageUrl,
  channelUrl,
  totalRequests,
  totalSubtitles,
  totalPoints,
}: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const mainTextSize = { base: "12px", md: "15px" };
  const subTextSize = { base: "14px", md: "17px" };

  return (
    <Tr fontSize={mainTextSize} color={textColor}>
      <Td
        pl="0px"
        maxW={{
          base: "200px",
          sm: "calc(90vw-100px)",
          md: "calc(80vw - 450px)",
          lg: "calc(85vw - 500px)",
        }}
      >
        <HStack
          w="inherit"
          onClick={() => {
            router.push(`/video/${platform}/${videoId}`);
          }}
        >
          <YoutubeIcon size={30} cursor="pointer" />
          <Text
            fontWeight="bold"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            cursor="pointer"
          >
            {videoName}
          </Text>
        </HStack>
      </Td>
      <Td w={{ md: "160px", lg: "200px" }}>
        <HStack>
          <Link href={channelUrl}>
            <Avatar size="sm" name={channelName} src={channelImageUrl} />
          </Link>
          <Link href={channelUrl}>
            <Text>{channelName}</Text>
          </Link>
        </HStack>
      </Td>
      <Td minW={{ base: "120px", md: "140px" }}>
        <Text w="min" m="auto">
          {totalRequests}
        </Text>
      </Td>
      <Td
        minW={{ base: "90px", md: "110px" }}
        fontWeight="bold"
        fontSize={mainTextSize}
      >
        <HStack w="min" m="auto">
          <MdSubtitles color={textColor} />
          <Text>{totalSubtitles}</Text>
        </HStack>
      </Td>
      <Td
        minW={{ base: "110px", md: "120px" }}
        fontSize={subTextSize}
        fontWeight="bold"
      >
        <HStack w="min" m="auto">
          <BiCoin color={textColor} />
          <Text>{totalPoints}</Text>
        </HStack>
      </Td>
    </Tr>
  );
}
