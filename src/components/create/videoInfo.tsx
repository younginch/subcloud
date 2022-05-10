import {
  Box,
  Heading,
  Input,
  Text,
  Image,
  Avatar,
  HStack,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { VideoWithInfo } from "../../utils/types";
import VideoForm from "./videoForm";

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
      <VideoForm value={video?.url} />
      <Box maxW="28em" borderWidth={1} borderRadius="6px" overflow="hidden">
        <Image
          maxW="28em"
          marginEnd="24px"
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="Video thumbnail"
        />
        {video?.info ? (
          <Box padding="12px">
            <Heading size="md">{video?.info.title}</Heading>
            <Text marginY="12px">
              조회수 {video?.info.viewCount}회 | {video?.info.publishedAt}
            </Text>
            <HStack>
              <Avatar marginEnd="12px" src={video?.info.channel.thumbnailUrl} />
              <Stack>
                <Heading size="sm">{video?.info.channel.title}</Heading>
                <Text>구독자 {video?.info.channel.subscriberCount}명</Text>
              </Stack>
            </HStack>
          </Box>
        ) : (
          <Text>정보 없음</Text>
        )}
      </Box>
    </Stack>
  );
}
