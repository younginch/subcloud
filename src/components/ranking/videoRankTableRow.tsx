import { HStack, Text, useColorModeValue, Tr, Td } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { BiCoin } from "react-icons/bi";

type Props = {
  key: string;
  name: string;
  requests: number;
  points: number;
  platform: string;
  url: string;
};

export default function VideoTableRow({
  name,
  platform,
  requests,
  points,
  url,
}: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const paddingLeftBp = { base: "7px", md: "15px", lg: "24px" };
  const fontBreakPoints = { base: "15px", md: "20px" };
  return (
    <Tr fontSize={fontBreakPoints} color={textColor}>
      <Td pl="0px">
        <HStack>
          <Link href={url}>
            <FaYoutube size={30} fill="red" />
          </Link>
          <Link href={url}>
            <Text
              fontWeight="bold"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
              maxW={{ base: "200px", md: "300px", lg: "60vw" }}
            >
              {name}
            </Text>
          </Link>
        </HStack>
      </Td>
      <Td
        justifyContent="center"
        minW={{ base: "24px", md: "150px", lg: "200px" }}
        fontSize={{ base: "18px", md: "22px" }}
      >
        <Text>En, Ko, Fr</Text>
      </Td>
      <Td
        w={{ base: "90px", md: "110px", lg: "140px" }}
        pl={paddingLeftBp}
        fontWeight="bold"
        fontSize={{ base: "18px", md: "22px" }}
      >
        <HStack>
          <AiOutlineUser color={textColor} />
          <Text>{requests}</Text>
        </HStack>
      </Td>
      <Td
        w={{ base: "70px", md: "90px", lg: "120px" }}
        fontSize={{ base: "18px", md: "22px" }}
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
