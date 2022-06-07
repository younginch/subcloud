import {
  HStack,
  Text,
  useColorModeValue,
  Tr,
  Td,
  Avatar,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { MdSubtitles } from "react-icons/md";

type Props = {
  userId: string;
  userName: string;
  userImageUrl: string;
  totalViewCount: number;
  totalSubCount: number;
  totalFulfilledRequest: number;
};

export default function UserRankTableRow({
  userId,
  userName,
  userImageUrl,
  totalViewCount,
  totalSubCount,
  totalFulfilledRequest,
}: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const paddingLeftBp = { base: "7px", md: "15px", lg: "24px" };
  const fontBreakPoints = { base: "15px", md: "20px" };
  return (
    <Tr fontSize={fontBreakPoints} color={textColor}>
      <Td w="30%" minW="200px" fontSize={{ base: "18px", md: "22px" }} pl="0px">
        <HStack>
          <Link href={`/user/${userId}`}>
            <Avatar size="sm" name={userName} src={userImageUrl} />
          </Link>
          <Link href={`/user/${userId}`}>
            <Text fontSize={{ base: "18px", md: "22px" }} fontWeight="bold">
              {userName}
            </Text>
          </Link>
        </HStack>
      </Td>
      <Td
        justifyContent="center"
        w="15%"
        fontSize={{ base: "18px", md: "22px" }}
      >
        <HStack>
          <BsEye color={textColor} />
          <Text>{totalViewCount}</Text>
        </HStack>
      </Td>
      <Td
        w="15%"
        pl={paddingLeftBp}
        fontWeight="bold"
        fontSize={{ base: "18px", md: "22px" }}
      >
        <HStack>
          <MdSubtitles color={textColor} />
          <Text>{totalSubCount}</Text>
        </HStack>
      </Td>
      <Td w="15%" pl={paddingLeftBp} fontSize={{ base: "16px", md: "20px" }}>
        <HStack>
          <AiOutlineUser color={textColor} />
          <Text>{totalFulfilledRequest}</Text>
        </HStack>
      </Td>

      <Td w="15%" pl={paddingLeftBp} fontSize={{ base: "16px", md: "20px" }}>
        <HStack>
          <Box color="yellow.400">
            <AiFillStar color="inherit" />
          </Box>
          <Text>4.3</Text>
        </HStack>
      </Td>
    </Tr>
  );
}
