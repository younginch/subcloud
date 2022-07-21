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
import { BsEye } from "react-icons/bs";
import dayjs from "dayjs";
import { YoutubeIcon } from "../icons/customIcons";

type Props = {
  rank: number;
  videoName: string;
  videoUrl: string;
  channelName: string;
  channelUrl: string;
  channelImageUrl: string;
  lang: string;
  viewCount: number;
  uploadDate: string;
};

export default function ProfileSubtitleRow({
  rank,
  videoName,
  videoUrl,
  channelName,
  channelUrl,
  channelImageUrl,
  lang,
  viewCount,
  uploadDate,
}: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const paddingLeftBp = { base: "7px", md: "15px", lg: "24px" };
  const mainTextSize = { base: "12px", md: "15px" };
  const subTextSize = { base: "10px", md: "13px" };
  return (
    <Tr color={textColor}>
      <Td w="min" fontSize={mainTextSize}>
        <Text>{rank}</Text>
      </Td>
      <Td
        pl="0px"
        maxW={{
          base: "200px",
          sm: "calc(90%-150px)",
          md: "calc(80% - 200px)",
          lg: "calc(90% - 300px)",
        }}
      >
        <HStack w="inherit">
          <Link href={videoUrl}>
            <YoutubeIcon size={30} />
          </Link>
          <Link href={videoUrl}>
            <Text
              fontSize={mainTextSize}
              fontWeight="bold"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {videoName}
            </Text>
          </Link>
        </HStack>
      </Td>
      <Td w={{ md: "160px", lg: "200px" }} pl={paddingLeftBp}>
        <HStack>
          <Link href={channelUrl}>
            <Avatar size="sm" name={channelName} src={channelImageUrl} />
          </Link>
          <Link href={channelUrl}>
            <Text fontSize={subTextSize}>{channelName}</Text>
          </Link>
        </HStack>
      </Td>
      <Td
        justifyContent="center"
        w={{ base: "24px", md: "100px", lg: "150px" }}
      >
        <Text fontSize={mainTextSize}>{lang}</Text>
      </Td>
      <Td
        w={{ base: "90px", md: "110px", lg: "140px" }}
        pl={paddingLeftBp}
        fontWeight="bold"
        fontSize={mainTextSize}
      >
        <HStack>
          <BsEye color={textColor} />
          <Text>{viewCount}</Text>
        </HStack>
      </Td>
      <Td w={{ base: "70px", md: "90px", lg: "110px" }} pl={paddingLeftBp}>
        <Text fontSize={mainTextSize}>
          {dayjs(uploadDate).format("YYYY-MM-DD")}
        </Text>
      </Td>
    </Tr>
  );
}
