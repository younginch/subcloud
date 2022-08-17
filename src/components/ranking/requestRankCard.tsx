import { Stack, Text, Badge, HStack, Spacer, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import ISO6391 from "iso-639-1";
import duration from "dayjs/plugin/duration";
import { GoCloudUpload } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/router";
import VideoCard from "../videoCard";
import PointGauge from "../pointGauge";

dayjs.extend(duration);

type Props = {
  duration: number;
  videoName: string;
  serviceId: string;
  videoId: string;
  videoUrl: string;
  imageUrl: string;
  requestCount: number;
  requestPoint: number;
  requestGoal: number;
  channelName: string;
  channelImageUrl: string;
  channelUrl: string;
  lang: string;
};

export default function RequestRankCard({
  duration,
  videoName,
  serviceId,
  videoId,
  videoUrl,
  imageUrl,
  requestCount,
  requestPoint,
  requestGoal,
  channelName,
  channelImageUrl,
  channelUrl,
  lang,
}: Props) {
  const router = useRouter();
  const hoverComponent = (
    <Stack position="absolute" left="10px" top="5px">
      <Button
        leftIcon={<FiSend />}
        colorScheme="blue"
        onClick={() =>
          router.push(
            `/video/${serviceId}/${videoId}/request/create?lang=${lang}`
          )
        }
      >
        요청하기
      </Button>
      <Button
        leftIcon={<GoCloudUpload />}
        colorScheme="purple"
        onClick={() =>
          router.push(`/video/${serviceId}/${videoId}/sub/create?lang=${lang}`)
        }
      >
        업로드하기
      </Button>
    </Stack>
  );
  return (
    <VideoCard
      duration={duration}
      videoName={videoName}
      videoUrl={videoUrl}
      imageUrl={imageUrl}
      channelName={channelName}
      channelImageUrl={channelImageUrl}
      channelUrl={channelUrl}
      hoverComponent={hoverComponent}
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
