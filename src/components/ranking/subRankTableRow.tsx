import {
  HStack,
  Text,
  useColorModeValue,
  Tr,
  Td,
  Box,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsEye } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

type Props = {
  rank: number;
  userId: string;
  videoName: string;
  videoUrl: string;
  platform: string;
  viewCount: number;
  userName: string;
  userImageUrl: string;
};

export default function SubRankTableRow({
  rank,
  videoUrl,
  videoName,
  platform,
  viewCount,
  userId,
  userName,
  userImageUrl,
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
          sm: "calc(90vw-200px)",
          md: "calc(80vw - 450px)",
          lg: "calc(90vw - 580px)",
        }}
      >
        <HStack w="inherit">
          <Link href={videoUrl}>
            <Box minW={30} minH={30}>
              <FaYoutube size={30} fill="red" />
            </Box>
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
      <Td
        justifyContent="center"
        w={{ base: "24px", md: "100px", lg: "150px" }}
      >
        <Text fontSize={mainTextSize}>En, Ko, Fr</Text>
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
      <Td minW={{ md: "140px", lg: "160px" }} pl={paddingLeftBp}>
        <HStack>
          <Link href={`/user/${userId}`}>
            <Avatar size="sm" name={userName} src={userImageUrl} />
          </Link>
          <Link href={`/user/${userId}`}>
            <Text fontSize={subTextSize}>{userName}</Text>
          </Link>
        </HStack>
      </Td>
      <Td w={{ base: "70px", md: "90px", lg: "110px" }} pl={paddingLeftBp}>
        <Text fontSize={mainTextSize}>2022/4/13</Text>
      </Td>
    </Tr>
  );
}
