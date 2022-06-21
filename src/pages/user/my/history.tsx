import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Role, SubHistory } from "@prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import AvatarWithName from "../../../components/badges/avatarWithName";
import { YoutubeIcon } from "../../../components/icons/customIcons";
import { PageOptions, ResHistory } from "../../../utils/types";

export default function UserMyHistory() {
  const session = useSession();
  const { data } = useSWR<ResHistory>(
    `/api/history?userId=${session.data?.user.id}`
  );

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>비디오</Th>
            <Th>채널</Th>
            <Th>시청 언어</Th>
            <Th>viewAt</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((subHistory) => {
            return (
              <Tr key={subHistory.id}>
                <Td>
                  <HStack>
                    <YoutubeIcon size="36px" />
                    <Text maxW={480} noOfLines={1}>
                      {subHistory.sub.video?.youtubeVideo?.title ??
                        "비디오 정보없음"}
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <AvatarWithName
                    imageUrl={
                      subHistory.sub.video?.youtubeVideo?.channel.thumbnailUrl
                    }
                    name={subHistory.sub.video?.youtubeVideo?.channel.title}
                  />
                </Td>
                <Td>{subHistory.sub.lang}</Td>
                <Td>{dayjs(subHistory.viewAt).format("YYYY-MM-DD")}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

UserMyHistory.options = { role: Role.User, hideTitle: true } as PageOptions;
