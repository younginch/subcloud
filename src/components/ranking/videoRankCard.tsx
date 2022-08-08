import { Stack, Text, Badge, HStack, Spacer } from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import VideoCard from "../videoCard";

dayjs.extend(duration);

type Props = {
  duration: number;
  videoName: string;
  videoUrl: string;
  viewCount: number;
  channelName: string;
  channelImageUrl: string;
  lang: string;
  uploadDate?: Date;
};

export default function VideoRankCard({
  duration,
  videoUrl,
  videoName,
  viewCount,
  channelName,
  channelImageUrl,
  lang,
  uploadDate,
}: Props) {
  return (
    <VideoCard
      duration={duration}
      videoName={videoName}
      videoUrl={videoUrl}
      channelName={channelName}
      channelImageUrl={channelImageUrl}
      uploadDate={uploadDate}
    >
      <Stack pl="10px">
        <HStack>
          <Stack>
            <Text fontWeight="bold">언어</Text>
            <Badge colorScheme="purple" w="fit-content">
              {lang}
            </Badge>
          </Stack>
          <Spacer />
          <Stack spacing={0}>
            <Text fontWeight="bold">조회수</Text>
            <Text fontWeight="bold">{viewCount}</Text>
          </Stack>
          <Spacer />
        </HStack>
      </Stack>
    </VideoCard>
  );
}
