import { Avatar, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Role, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { PageOptions } from "../../../utils/types";

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
    </Stack>
  );
}

UserMyIndex.options = { role: Role.User, hideTitle: true } as PageOptions;
