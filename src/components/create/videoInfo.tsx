import {
  Box,
  Heading,
  Text,
  Image,
  Avatar,
  HStack,
  Stack,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ResVideo } from "../../utils/types";
import VideoForm from "./videoForm";

type Props = {
  serviceId: string;
  videoId: string;
};

export default function VideoInfo({ serviceId, videoId }: Props) {
  const [isLargerThan1280] = useMediaQuery("(min-width: 900px)");
  const [video, setVideo] = useState<ResVideo>();
  useEffect(() => {
    axios
      .get<ResVideo>(`/api/video`, { params: { serviceId, videoId } })
      .then(({ data }) => {
        setVideo(data);
      });
  }, [serviceId, videoId]);

  return (
    <Flex
      direction={isLargerThan1280 ? "row" : "column"}
      overflow="hidden"
      alignItems="center"
    >
      <Image
        maxW="28em"
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt="Video thumbnail"
      />
      {video?.youtubeVideo ? (
        <Box padding="12px">
          <Heading size="md">{video?.youtubeVideo.title}</Heading>
          <Text marginY="10px">
            {`조회수 ${video?.youtubeVideo.viewCount}회 | ${video?.youtubeVideo.publishedAt}`}
          </Text>
          <HStack>
            <Avatar
              marginEnd="12px"
              src={video?.youtubeVideo.channel.thumbnailUrl}
            />
            <Stack>
              <Heading size="sm">{video?.youtubeVideo.channel.title}</Heading>
              <Text>
                구독자 {video?.youtubeVideo.channel.subscriberCount}명
              </Text>
            </Stack>
          </HStack>
        </Box>
      ) : (
        <Text>정보 없음</Text>
      )}
    </Flex>
  );
}
