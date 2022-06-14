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
import { ResVideo } from "../../utils/types";

type Props = {
  video: ResVideo | undefined;
};

export default function VideoInfo({ video }: Props) {
  const [isLargerThan1280] = useMediaQuery("(min-width: 900px)");

  return (
    <Flex
      direction={isLargerThan1280 ? "row" : "column"}
      overflow="hidden"
      alignItems="center"
    >
      <Image
        maxW="28em"
        src={`https://img.youtube.com/vi/${video?.videoId}/maxresdefault.jpg`}
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
