import {
  Stack,
  Text,
  Badge,
  HStack,
  Spacer,
  Progress,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import VideoCard from "../videoCard";

dayjs.extend(duration);

type Props = {
  duration: number;
  videoName: string;
  videoUrl: string;
  requestCount: number;
  requestPoint: number;
  requestGoal: number;
  channelName: string;
  channelImageUrl: string;
  lang: string;
  uploadDate?: Date;
};

export default function RequestRankCard({
  duration,
  videoUrl,
  videoName,
  requestCount,
  requestPoint,
  requestGoal,
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
      <Stack pl="10px" pr="10px">
        <HStack>
          <Text fontWeight="bold">언어</Text>
          <Badge colorScheme="purple" w="fit-content">
            {lang}
          </Badge>
          <Spacer />
          <Text fontWeight="bold">요청 수</Text>
          <Text fontWeight="bold">{requestCount}</Text>
          <Spacer />
        </HStack>
        <HStack>
          <Tooltip label={`자막 게이지: ${requestPoint}/${requestGoal}`}>
            <Box w="80%">
              <Progress hasStripe value={(requestPoint / requestGoal) * 100} />
            </Box>
          </Tooltip>
          <Spacer />
          <Text fontWeight="bold">
            {Math.round((requestPoint / requestGoal) * 100)}%
          </Text>
        </HStack>
      </Stack>
    </VideoCard>
  );
}
