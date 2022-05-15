import {
  Avatar,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { ResVideoSearch } from "../utils/types";

export default function Search() {
  const router = useRouter();
  const [videos, setVideos] = useState<ResVideoSearch>([]);
  useEffect(() => {
    axios
      .get<ResVideoSearch>("/api/video/search", {
        params: { query: router.query.q },
      })
      .then((res) => {
        console.log(res.data);
        setVideos(res.data);
      });
  }, [router.query.q]);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>영상 제목</Th>
              <Th>채널 이름</Th>
              <Th isNumeric>요청 언어 수</Th>
              <Th isNumeric>자막 수</Th>
            </Tr>
          </Thead>
          <Tbody>
            {videos.map((video) => {
              return (
                <Tr key={video.url}>
                  <Td
                    onClick={() => {
                      router.push(`/video/${video.serviceId}/${video.videoId}`);
                    }}
                  >
                    <HStack>
                      <FaYoutube size={36} />
                      <Text maxW={480} noOfLines={1}>
                        {video?.youtubeVideo?.title ?? "비디오 정보없음"}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <HStack>
                      <Avatar
                        name={
                          video?.youtubeVideo?.channel.title ?? "채널 정보없음"
                        }
                        src={
                          video?.youtubeVideo?.channel.thumbnailUrl ?? undefined
                        }
                        size="sm"
                      />
                      <Text maxW={120} noOfLines={1}>
                        {video?.youtubeVideo?.channel.title ?? "채널 정보없음"}
                      </Text>
                    </HStack>
                  </Td>
                  <Td isNumeric>{video._count.reqeusts}</Td>
                  <Td isNumeric>{video._count.subs}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
