import {
  Box,
  Heading,
  Input,
  Text,
  Image,
  Avatar,
  HStack,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { VideoWithInfo } from "../utils/types";

type Props = {
  serviceId: string;
  videoId: string;
};

export default function VideoInfo({ serviceId, videoId }: Props) {
  const [video, setVideo] = useState<VideoWithInfo>();
  useEffect(() => {
    axios.get(`/api/video/${serviceId}/${videoId}`).then(({ data }) => {
      setVideo(data);
    });
  }, [serviceId, videoId]);

  return (
    <Stack>
      <Input />
      <Box>
        <Image
          w="360px"
          marginEnd="24px"
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="Video thumbnail"
        />
        {video?.info ? (
          <>
            <Heading size="lg">{video?.info.title}</Heading>
            <Text>
              조회수 {video?.info.viewCount}회 | {video?.info.publishedAt}
            </Text>
            <div style={{ height: "12px" }} />
            <HStack>
              <Avatar marginEnd="12px" src={video?.info.channel.thumbnailUrl} />
              <Stack>
                <Heading size="md">{video?.info.channel.title}</Heading>
                <Text>구독자 {video?.info.channel.subscriberCount}명</Text>
              </Stack>
            </HStack>
          </>
        ) : (
          <Text>정보 없음</Text>
        )}
      </Box>
    </Stack>
  );
}
