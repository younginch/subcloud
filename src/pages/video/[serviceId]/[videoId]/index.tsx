import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Heading,
  HStack,
  Image,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Request } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VideoWithInfo } from "../../../../utils/types";

function RequestList() {
  const router = useRouter();
  const serviceId = router.query.serviceId as string;
  const videoId = router.query.videoId as string;
  const [requests, setRequests] = useState<Request[]>([]);
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`/api/request?serviceId=${serviceId}&videoId=${videoId}`)
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
        });
      });
  }, [serviceId, toast, videoId]);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>언어</Th>
            <Th>요청 수</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => {
            return (
              <Tr key={request.id}>
                <Td>{request.lang}</Td>
                <Td isNumeric>계획중</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function Video() {
  const router = useRouter();
  const [video, setVideo] = useState<VideoWithInfo>();

  const { serviceId, videoId } = router.query;
  useEffect(() => {
    axios
      .get(`/api/video/${serviceId}/${videoId}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => {});
  }, [serviceId, videoId]);

  return (
    <>
      <HStack>
        <Image
          w="360px"
          marginEnd="24px"
          src={`https://img.youtube.com/vi/${router.query.videoId}/maxresdefault.jpg`}
          alt="Video thumbnail"
        />
        {video?.info ? (
          <Stack>
            <Skeleton>
              <Heading size="lg">{video?.info.title}</Heading>
            </Skeleton>
            <Text>
              조회수 {video?.info.viewCount}회 | {video?.info.publishedAt}
            </Text>
            <div style={{ height: "12px" }} />
            <HStack>
              <Avatar
                marginEnd="12px"
                src="https://yt3.ggpht.com/6xOBiHC0rSAa74kQ8MLBDW_sYN0KRCebJGlGODREsjypB9zOEx63TXR1oSslLLe9ptDIAcjV6Q=s176-c-k-c0x00ffffff-no-rj"
              />
              <Stack>
                <Heading size="md">KBS Kpop</Heading>
                <Text>구독자 686만명</Text>
              </Stack>
            </HStack>
          </Stack>
        ) : (
          <Text>정보 없음</Text>
        )}
      </HStack>
      <HStack marginTop="32px">
        <Stack flex={1} verticalAlign="stretch">
          <Heading size="lg">요청 목록</Heading>
        </Stack>
        <Stack w="24px" />
        <Stack flex={2} verticalAlign="stretch">
          <Heading size="lg">자막 목록</Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>언어</Th>
                  <Th>제작자</Th>
                  <Th>평점</Th>
                  <Th>조회수</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>English (English)</Td>
                  <Td>Platypus</Td>
                  <Td>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < 5 ? "teal.500" : "gray.300"}
                        />
                      ))}
                  </Td>
                  <Td isNumeric>2356</Td>
                </Tr>
                <Tr>
                  <Td>English (English)</Td>
                  <Td>Godthinkun</Td>
                  <Td>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < 3 ? "teal.500" : "gray.300"}
                        />
                      ))}
                  </Td>
                  <Td isNumeric>74</Td>
                </Tr>
                <Tr>
                  <Td>Japanese (日本語)</Td>
                  <Td>Insense</Td>
                  <Td>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < 5 ? "teal.500" : "gray.300"}
                        />
                      ))}
                  </Td>
                  <Td isNumeric>789</Td>
                </Tr>
                <Tr>
                  <Td>Korean (한국어)</Td>
                  <Td>Platypus</Td>
                  <Td>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < 4 ? "teal.500" : "gray.300"}
                        />
                      ))}
                  </Td>
                  <Td isNumeric>193</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </HStack>
    </>
  );
}
