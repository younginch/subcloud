import { Stack, Text, Badge, HStack, Spacer, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import ISO6391 from "iso-639-1";
import duration from "dayjs/plugin/duration";
import { GoCloudUpload } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
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
  hideChannel?: boolean;
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
  hideChannel,
  channelUrl,
  lang,
}: Props) {
  const { t } = useTranslation("rankings");
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
        {t("req")}
      </Button>
      <Button
        leftIcon={<GoCloudUpload />}
        colorScheme="purple"
        onClick={() =>
          router.push(`/video/${serviceId}/${videoId}/sub/create?lang=${lang}`)
        }
      >
        {t("up")}
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
      hideChannel={hideChannel}
      hoverComponent={hoverComponent}
    >
      <Stack pl="10px" pr="10px">
        <HStack>
          <Text fontWeight="bold">{t("language")}</Text>
          <Badge colorScheme="purple" w="fit-content">
            {ISO6391.getNativeName(lang)}
          </Badge>
          <Spacer />
          <Text fontWeight="bold">{t("requests")}</Text>
          <Text fontWeight="bold">{requestCount}</Text>
          <Spacer />
        </HStack>
        <PointGauge point={requestPoint} goal={requestGoal} />
      </Stack>
    </VideoCard>
  );
}
