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
import { FaYoutube } from "react-icons/fa";
import { MoreIcon } from "../../utils/icons";
import { RequestWithUserCountAndYoutube } from "../../utils/types";

export default function RequestPanel(props: {
  requests: RequestWithUserCountAndYoutube[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [requests, setRequests] = useState<RequestWithUserCountAndYoutube[]>(
    props.requests
  );

  function getRequests() {
    axios
      .get("/api/request/search", { params: { userId: router.query.userId } })
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
            <Th>작업</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => {
            console.log(request);
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
                    <FaYoutube size={36} />
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
                <Td>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => {
                      axios
                        .delete(`/api/request/${request.id}`)
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
                      <MenuItem onClick={() => {}}>요청 ID 복사</MenuItem>
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
