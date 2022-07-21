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
  rank: number;
  userId: string;
  userName: string;
  userImageUrl: string;
  totalViewCount: number;
  totalSubCount: number;
  totalFulfilledRequest: number;
  totalRating: number;
};

export default function UserRankTableRow({
  rank,
  userId,
  userName,
  userImageUrl,
  totalViewCount,
  totalSubCount,
  totalFulfilledRequest,
  totalRating,
}: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const paddingLeftBp = { base: "7px", md: "15px", lg: "24px" };
  const mainTextSize = { base: "15px", md: "18px" };
  const subTextSize = { base: "12px", md: "15px" };
  return (
    <Tr color={textColor}>
      <Td w="min" fontSize={mainTextSize}>
        <Text>{rank}</Text>
      </Td>
      <Td w="30%" minW="200px" pl="0px">
        <HStack>
          <Link href={`/user/${userId}`}>
            <Avatar
              size="sm"
              name={userName}
              src={userImageUrl}
              cursor="pointer"
            />
          </Link>
          <Link href={`/user/${userId}`}>
            <Text fontWeight="bold" fontSize={subTextSize} cursor="pointer">
              {userName}
            </Text>
          </Link>
        </HStack>
      </Td>
      <Td justifyContent="center" w="15%" fontSize={mainTextSize}>
        <HStack>
          <BsEye color={textColor} />
          <Text>{totalViewCount}</Text>
        </HStack>
      </Td>
      <Td w="15%" pl={paddingLeftBp} fontWeight="bold" fontSize={mainTextSize}>
        <HStack>
          <MdSubtitles color={textColor} />
          <Text>{totalSubCount}</Text>
        </HStack>
      </Td>
      <Td w="15%" pl={paddingLeftBp} fontSize={mainTextSize}>
        <HStack>
          <AiOutlineUser color={textColor} />
          <Text>{totalFulfilledRequest}</Text>
        </HStack>
      </Td>

      <Td w="15%" pl={paddingLeftBp} fontSize={mainTextSize}>
        <HStack>
          <Box color="yellow.400">
            <AiFillStar color="inherit" />
          </Box>
          <Text>{totalRating}</Text>
        </HStack>
      </Td>
    </Tr>
  );
}
