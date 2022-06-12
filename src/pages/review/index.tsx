import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { PageOptions, ResSubSearch } from "../../utils/types";

export default function Review() {
  const [subs, setSubs] = useState<ResSubSearch>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get<ResSubSearch>("/api/sub/search").then((res) => {
      setSubs(res.data);
    });
  });

  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subs.map((sub) => {
              return (
                <Tr key={sub.id}>
                  <Td
                    onClick={() => {
                      router.push(`/video/${sub.serviceId}/${sub.videoId}`);
                    }}
                  >
                    <HStack>
                      <FaYoutube size={36} />
                      <Text maxW={480} noOfLines={1}>
                        {sub.video?.youtubeVideo?.title ?? "비디오 정보없음"}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <HStack>
                      <Avatar
                        name={
                          sub.video?.youtubeVideo?.channel.title ??
                          "채널 정보없음"
                        }
                        src={
                          sub.video?.youtubeVideo?.channel.thumbnailUrl ??
                          undefined
                        }
                        size="sm"
                      />
                      <Text maxW={120} noOfLines={1}>
                        {sub.video?.youtubeVideo?.channel.title ??
                          "채널 정보없음"}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        router.push(`/review/${sub.id}`);
                      }}
                    >
                      검토하기
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

Review.options = { role: Role.Reviewer } as PageOptions;
