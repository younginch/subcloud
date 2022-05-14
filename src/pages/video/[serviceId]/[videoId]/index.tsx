import {
  Avatar,
  Heading,
  HStack,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Sub } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import {
  ResRequestSearch,
  ResSubSearch,
  ResVideo,
} from "../../../../utils/types";

function RequestList({ requests }: { requests: ResRequestSearch }) {
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
                <Td isNumeric>{request._count.users}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function SubList({ subs }: { subs: Sub[] }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>언어</Th>
            <Th>재생 수</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subs.map((sub) => {
            return (
              <Tr key={sub.id}>
                <Td>{sub.lang}</Td>
                <Td isNumeric>{sub.views}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

type VideoProps = {
  video: ResVideo;
  requests: ResRequestSearch;
  subs: ResSubSearch;
};

export default function Video({ video, requests, subs }: VideoProps) {
  const router = useRouter();

  return (
    <>
      <HStack>
        <Image
          w="360px"
          marginEnd="24px"
          src={`https://img.youtube.com/vi/${router.query.videoId}/maxresdefault.jpg`}
          alt="Video thumbnail"
        />
        {video?.youtubeVideo ? (
          <Stack>
            <Heading size="lg">{video?.youtubeVideo.title}</Heading>
            <Text>
              {`조회수 ${video?.youtubeVideo.viewCount}회 | ${video?.youtubeVideo.publishedAt}`}
            </Text>
            <div style={{ height: "12px" }} />
            <HStack>
              <Avatar
                marginEnd="12px"
                src={video?.youtubeVideo.channel.thumbnailUrl}
              />
              <Stack>
                <Heading size="md">{video?.youtubeVideo.channel.title}</Heading>
                <Text>
                  구독자 {video?.youtubeVideo.channel.subscriberCount}명
                </Text>
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
          <RequestList requests={requests} />
        </Stack>
        <Stack w="24px" />
        <Stack flex={2} verticalAlign="stretch">
          <Heading size="lg">자막 목록</Heading>
          <SubList subs={subs} />
        </Stack>
      </HStack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<VideoProps> = async (
  context
) => {
  const { serviceId, videoId } = context.query;
  const videoRes = await axios.get<ResVideo>(
    `${process.env.NEXTAUTH_URL}/api/video`,
    {
      params: { serviceId, videoId },
    }
  );
  const requestsRes = await axios.get<ResRequestSearch>(
    `${process.env.NEXTAUTH_URL}/api/request/search?serviceId=${serviceId}&videoId=${videoId}`
  );
  const subsRes = await axios.get<ResSubSearch>(
    `${process.env.NEXTAUTH_URL}/api/sub/search?serviceId=${serviceId}&videoId=${videoId}`
  );
  return {
    props: {
      video: videoRes.data,
      requests: requestsRes.data,
      subs: subsRes.data,
    },
  };
};
