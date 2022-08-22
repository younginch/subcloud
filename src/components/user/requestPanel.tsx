import { DeleteIcon } from "@chakra-ui/icons";
import {
  useToast,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Text,
  createIcon,
} from "@chakra-ui/react";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ResRequestSearch } from "../../utils/types";
import AvatarWithName from "../badges/avatarWithName";
import { YoutubeIcon } from "../icons/customIcons";

const MoreIcon = createIcon({
  displayName: "MoreIcon",
  viewBox: "0 0 48 48",
  path: (
    <path
      fill="currentColor"
      d="M24 40Q23 40 22.3 39.3Q21.6 38.6 21.6 37.6Q21.6 36.6 22.3 35.9Q23 35.2 24 35.2Q25 35.2 25.7 35.9Q26.4 36.6 26.4 37.6Q26.4 38.6 25.7 39.3Q25 40 24 40ZM24 26.4Q23 26.4 22.3 25.7Q21.6 25 21.6 24Q21.6 23 22.3 22.3Q23 21.6 24 21.6Q25 21.6 25.7 22.3Q26.4 23 26.4 24Q26.4 25 25.7 25.7Q25 26.4 24 26.4ZM24 12.8Q23 12.8 22.3 12.1Q21.6 11.4 21.6 10.4Q21.6 9.4 22.3 8.7Q23 8 24 8Q25 8 25.7 8.7Q26.4 9.4 26.4 10.4Q26.4 11.4 25.7 12.1Q25 12.8 24 12.8Z"
    />
  ),
});

export default function RequestPanel({
  initialRequests,
}: {
  initialRequests: ResRequestSearch;
}) {
  const { t } = useTranslation("privateProfile");
  const router = useRouter();
  const toast = useToast();
  const [requests, setRequests] = useState<ResRequestSearch>(initialRequests);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function getRequests() {
    axios
      .get<ResRequestSearch>("/api/public/search/request", {
        params: { userId: router.query.userId },
      })
      .then((res) => {
        setRequests(res.data);
      })
      .catch(() => {
        toast({
          title: "오류",
          description: "자막 요청 목록을 불러오는데 실패했습니다.",
          status: "error",
        });
      });
  }

  return (
    <TableContainer p={5}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t("vid")}</Th>
            <Th>{t("channel")}</Th>
            <Th>{t("language")}</Th>
            <Th>{t("point")}</Th>
            <Th>{t("task")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => (
            <Tr key={request.id}>
              <Link href={`/video/${request.serviceId}/${request.videoId}`}>
                <Td>
                  <HStack>
                    <YoutubeIcon size="36px" />
                    <Text maxW={480} noOfLines={1}>
                      {request.video?.youtubeVideo?.title ?? "Invalid video"}
                    </Text>
                  </HStack>
                </Td>
              </Link>
              <Td>
                <AvatarWithName
                  imageUrl={request.video?.youtubeVideo?.channel.thumbnailUrl}
                  name={request.video?.youtubeVideo?.channel.title}
                />
              </Td>
              <Td>{request.lang}</Td>
              <Td>{request.point}</Td>
              <Td>
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={async () => {
                    await axios
                      .delete(`/api/user/request`, {
                        params: { id: request.id },
                      })
                      .then(() => {
                        toast({
                          title: "성공",
                          description: "자막 요청을 취소했습니다.",
                          status: "success",
                        });
                        window.location.reload();
                      })
                      .catch(() => {
                        toast({
                          title: "오류",
                          description: "자막 요청을 취소하는데 실패했습니다.",
                          status: "error",
                        });
                      });
                  }}
                >
                  {t("delete")}
                </Button>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<MoreIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem>
                      <CopyToClipboard text={request.id}>
                        <Button>요청 ID 복사</Button>
                      </CopyToClipboard>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
