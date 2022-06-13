import { HStack, Text, useColorModeValue, Tr, Td, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { BiCoin } from "react-icons/bi";

type Props = {
  rank: number;
  key: string;
  name: string;
  duration: number;
  requests: number;
  points: number;
  platform: string;
  url: string;
  langs: string;
};

export default function VideoTableRow({
  rank,
  name,
  duration,
  platform,
  requests,
  points,
  url,
  langs,
}: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const paddingLeftBp = { base: "7px", md: "15px", lg: "24px" };
  const fontBreakPoints = { base: "15px", md: "20px" };
  const mainTextSize = { base: "12px", md: "15px" };
  const subTextSize = { base: "14px", md: "17px" };

  const timeFormat = (time: number) => {
    let second = time % 60;
    if (time < 60) return `${second}s`;
    time = Math.floor((time - second) / 60);
    const minute = time % 60;
    if (time < 60) return `${minute}:${second < 10 ? "0" + second : second}`;
    const hour = Math.floor((time - minute) / 60);
    return `${hour}:${minute < 10 ? "0" + minute : minute}:${
      second < 10 ? "0" + second : second
    }`;
  };

  return (
    <Tr fontSize={mainTextSize} color={textColor}>
      <Td w="fit-content" fontSize={subTextSize}>
        <Text>{rank}</Text>
      </Td>
      <Td
        pl="0px"
        maxW={{
          base: "200px",
          sm: "calc(90vw-100px)",
          md: "calc(80vw - 350px)",
          lg: "calc(90vw - 470px)",
        }}
      >
        <HStack w="inherit">
          <Link href={url}>
            <Box minW={30} minH={30}>
              <FaYoutube size={30} fill="red" />
            </Box>
          </Link>
          <Link href={url}>
            <Text
              fontWeight="bold"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {name}
            </Text>
          </Link>
        </HStack>
      </Td>
      <Td
        justifyContent="center"
        w={{ base: "24px", md: "100px", lg: "150px" }}
        fontSize={subTextSize}
      >
        <Text>{timeFormat(duration)}</Text>
      </Td>
      <Td
        justifyContent="center"
        w={{ base: "24px", md: "100px", lg: "150px" }}
        fontSize={subTextSize}
      >
        <Text>{langs}</Text>
      </Td>
      <Td
        w={{ base: "90px", md: "110px", lg: "140px" }}
        pl={paddingLeftBp}
        fontWeight="bold"
        fontSize={subTextSize}
      >
        <HStack>
          <AiOutlineUser color={textColor} />
          <Text>{requests}</Text>
        </HStack>
      </Td>
      <Td
        w={{ base: "70px", md: "90px", lg: "120px" }}
        fontSize={subTextSize}
        pl={paddingLeftBp}
        fontWeight="bold"
      >
        <HStack>
          <BiCoin color={textColor} />
          <Text>{points}</Text>
        </HStack>
      </Td>
    </Tr>
  );
}
