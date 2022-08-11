import { Stack, Text, Badge, HStack, Spacer } from "@chakra-ui/react";
import dayjs from "dayjs";
import ISO6391 from "iso-639-1";
import duration from "dayjs/plugin/duration";
import VideoCard from "../videoCard";
import PointGauge from "../pointGauge";

dayjs.extend(duration);

type Props = {
  duration: number;
  videoName: string;
  videoUrl: string;
  imageUrl: string;
  requestCount: number;
  requestPoint: number;
  requestGoal: number;
  channelName: string;
  channelImageUrl: string;
  channelUrl: string;
  lang: string;
  uploadDate?: Date;
};

export default function RequestRankCard({
  duration,
  videoName,
  videoUrl,
  imageUrl,
  requestCount,
  requestPoint,
  requestGoal,
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
      <Stack pl="10px" pr="10px">
        <HStack>
          <Text fontWeight="bold">언어</Text>
          <Badge colorScheme="purple" w="fit-content">
            {ISO6391.getNativeName(lang)}
          </Badge>
          <Spacer />
          <Text fontWeight="bold">요청 수</Text>
          <Text fontWeight="bold">{requestCount}</Text>
          <Spacer />
        </HStack>
        <PointGauge point={requestPoint} goal={requestGoal} />
      </Stack>
    </VideoCard>
  );
}
