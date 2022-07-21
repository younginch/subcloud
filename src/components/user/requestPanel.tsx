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
} from "@chakra-ui/react";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { MoreIcon } from "../../utils/icons";
import { ResRequestSearch } from "../../utils/types";
import AvatarWithName from "../badges/avatarWithName";
import { YoutubeIcon } from "../icons/customIcons";

export default function RequestPanel({
  initialRequests,
}: {
  initialRequests: ResRequestSearch;
}) {
  const { t } = useTranslation("privateProfile");
  const router = useRouter();
  const toast = useToast();
  const [requests, setRequests] = useState<ResRequestSearch>(initialRequests);

  function getRequests() {
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
    <TableContainer>
      <Table variant="simple" size="sm">
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
              <Td
                onClick={() => {
                  router.push(`/video/${request.serviceId}/${request.videoId}`);
                }}
              >
                <HStack>
                  <YoutubeIcon size="36px" />
                  <Text maxW={480} noOfLines={1}>
                    {request.video?.youtubeVideo?.title ?? "Invalid video"}
                  </Text>
                </HStack>
              </Td>
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
                  onClick={() => {
                    axios
                      .delete(`/api/user/request`, {
                        params: { id: request.id },
                      })
                      .then(() => {
                        toast({
                          title: "성공",
                          description: "자막 요청을 취소했습니다.",
                          status: "success",
                        });
                        getRequests();
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
