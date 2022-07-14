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
import useTranslation from "next-translate/useTranslation";
import useSWR from "swr";
import AvatarWithName from "../../../components/badges/avatarWithName";
import { YoutubeIcon } from "../../../components/icons/customIcons";
import { PageOptions, ResHistory } from "../../../utils/types";

export default function UserMyHistory() {
  const { t } = useTranslation("privateProfile");
  const session = useSession();
  const { data } = useSWR<ResHistory>(
    `/api/user/history?userId=${session.data?.user.id}`
  );

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t("vid")}</Th>
            <Th>{t("channel")}</Th>
            <Th>{t("language")}</Th>
            <Th>{t("history_view")}</Th>
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
                        "Invalid video"}
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
