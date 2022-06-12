import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  useColorModeValue,
  Text,
  Heading,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import { ResRequestSearch, ResSubSearch } from "../../utils/types";

type Props = {
  profileImageUrl?: string;
  userName?: string | null;
  userEmail?: string | null;
  children?: React.ReactNode;
  userId?: string | null;
};

export default function ProfileModal({
  profileImageUrl,
  userName,
  userEmail,
  children,
  userId,
}: Props) {
  const subFetcher = async (url: string) => {
    const res = await axios.get<ResSubSearch>(url, {
      params: { userId },
    });
    return res.data;
  };
  const requestFetcher = async (url: string) => {
    const res = await axios.get<ResRequestSearch>(url, {
      params: { userId },
    });
    return res.data;
  };
  const { data: subData, error: subError } = useSWR(
    "/api/sub/search",
    subFetcher
  );
  const { data: requestData, error: requestError } = useSWR(
    "/api/request/search",
    requestFetcher
  );

  return (
    <Center>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"80px"}
          w={"full"}
          src={
            "https://demos.creative-tim.com/purity-ui-dashboard/static/media/ProfileBackground.4dc796b0.png"
          }
          objectFit={"cover"}
          alt="Profile image"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={profileImageUrl}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {userName}
            </Heading>
            <Text color={"gray.500"}>{userEmail}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{requestData?.length}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                요청 수
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{subData?.length}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                자막 수
              </Text>
            </Stack>
          </Stack>
          <Link href={`/user/${userId}`} passHref>
            <Button
              w={"full"}
              mt={4}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              내 퍼블릭 프로필
            </Button>
          </Link>
          <Link href={`/user/my`} passHref>
            <Button
              w={"full"}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              mt={4}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              내 기록 및 설정
            </Button>
          </Link>
          {children}
        </Box>
      </Box>
    </Center>
  );
}
