import { HStack, Text, useColorModeValue, Tr, Td, Box } from "@chakra-ui/react";
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
