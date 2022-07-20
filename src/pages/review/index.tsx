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
  Button,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AvatarWithName from "../../components/badges/avatarWithName";
import ReviewStatusBadge from "../../components/badges/reviewStatusBadge";
import { YoutubeIcon } from "../../components/icons/customIcons";
import { PageOptions, ResSubSearch } from "../../utils/types";

export default function Review() {
  const [subs, setSubs] = useState<ResSubSearch>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get<ResSubSearch>("/api/public/search/sub").then((res) => {
      setSubs(res.data);
    });
  });

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Channel</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subs.map((sub) => (
            <Tr key={sub.id}>
              <Td
                onClick={() => {
                  router.push(`/video/${sub.serviceId}/${sub.videoId}`);
                }}
              >
                <HStack>
                  <YoutubeIcon size="32px" />
                  <Text maxW={480} noOfLines={1}>
                    {sub.video?.youtubeVideo?.title ?? "비디오 정보없음"}
                  </Text>
                </HStack>
              </Td>
              <Td>
                <AvatarWithName
                  imageUrl={sub.video?.youtubeVideo?.channel.thumbnailUrl}
                  name={sub.video?.youtubeVideo?.channel.title}
                />
              </Td>
              <Td>{sub.updatedAt.toString()}</Td>
              <Td>
                <ReviewStatusBadge status={sub.status} />
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
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

Review.options = { role: Role.Reviewer } as PageOptions;
