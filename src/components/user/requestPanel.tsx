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
  Avatar,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { MoreIcon } from "../../utils/icons";
import { ResRequestSearch } from "../../utils/types";
import { YoutubeIcon } from "../icons/customIcons";

export default function RequestPanel(props: { requests: ResRequestSearch }) {
  const router = useRouter();
  const toast = useToast();
  const [requests, setRequests] = useState<ResRequestSearch>(props.requests);

  function getRequests() {
    axios
      .get<ResRequestSearch>("/api/request/search", {
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
            <Th>비디오</Th>
            <Th>채널</Th>
            <Th>요청 언어</Th>
            <Th>포인트</Th>
            <Th>작업</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => {
            return (
              <Tr key={request.id}>
                <Td
                  onClick={() => {
                    router.push(
                      `/video/${request.serviceId}/${request.videoId}`
                    );
                  }}
                >
                  <HStack>
                    <YoutubeIcon size="36px" />
                    <Text maxW={480} noOfLines={1}>
                      {request.video?.youtubeVideo?.title ?? "비디오 정보없음"}
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <HStack>
                    <Avatar
                      name={
                        request.video?.youtubeVideo?.channel.title ??
                        "채널 정보없음"
                      }
                      src={
                        request.video?.youtubeVideo?.channel.thumbnailUrl ??
                        undefined
                      }
                      size="sm"
                    />
                    <Text maxW={120} noOfLines={1}>
                      {request.video?.youtubeVideo?.channel.title ??
                        "채널 정보없음"}
                    </Text>
                  </HStack>
                </Td>
                <Td>{request.lang}</Td>
                <Td>{request.point}</Td>
                <Td>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => {
                      axios
                        .delete(`/api/request`, { params: { id: request.id } })
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
                    취소
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
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
