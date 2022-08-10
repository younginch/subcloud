import { Stack, Text, Badge, HStack, Spacer } from "@chakra-ui/react";
import dayjs from "dayjs";
import ISO6391 from "iso-639-1";
import duration from "dayjs/plugin/duration";
import VideoCard from "../videoCard";

dayjs.extend(duration);

type Props = {
  duration: number;
  videoName: string;
  videoUrl: string;
  imageUrl: string;
  viewCount: number;
  channelName: string;
  channelImageUrl: string;
  channelUrl: string;
  lang: string;
  uploadDate?: Date;
};

export default function VideoRankCard({
  duration,
  videoName,
  videoUrl,
  imageUrl,
  viewCount,
  channelName,
  channelImageUrl,
  channelUrl,
  lang,
  uploadDate,
}: Props) {
  return (
    <VideoCard
      duration={duration}
      videoName={videoName}
      videoUrl={videoUrl}
      imageUrl={imageUrl}
      channelName={channelName}
      channelImageUrl={channelImageUrl}
      channelUrl={channelUrl}
      uploadDate={uploadDate}
    >
      <Stack pl="10px">
        <HStack>
          <Stack>
            <Text fontWeight="bold">언어</Text>
            <Badge colorScheme="purple" w="fit-content">
              {ISO6391.getNativeName(lang)}
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
