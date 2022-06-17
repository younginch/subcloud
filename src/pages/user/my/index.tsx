import {
  Avatar,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Role, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { PageOptions } from "../../../utils/types";
import Link from "next/link";

export default function UserMyIndex() {
  const session = useSession();
  const { data } = useSWR<User>(`/api/user?id=${session.data?.user.id}`);

  return (
    <Stack>
      <Heading>환영합니다.</Heading>
      <HStack marginBottom="18px">
        <Avatar
          size="2xl"
          name={data?.name ?? undefined}
          src={data?.image ?? undefined}
        />
        <Stack>
          <Text>{data?.name}</Text>
          <Text>{data?.email}</Text>
          <Text>{data?.role}</Text>
          <Text>{data?.point} 포인트</Text>
        </Stack>
      </HStack>
      <Link href={`/user/${session.data?.user.id}`} passHref>
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
    </Stack>
  );
}

UserMyIndex.options = { role: Role.User, hideTitle: true } as PageOptions;
