import {
  Stack,
  Text,
  Badge,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import ISO6391 from "iso-639-1";
import duration from "dayjs/plugin/duration";
import useTranslation from "next-translate/useTranslation";
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
  const { t } = useTranslation("rankings");
  const uploadDateHover = uploadDate && (
    <Text
      bg="black"
      color="white"
      w="fit-content"
      p="1px 4px 1px 3px"
      borderRadius="5px"
      position="absolute"
      left="6px"
      top="128px"
    >
      {t("subUploaded")}: {dayjs(uploadDate).format("YYYY-MM-DD")}
    </Text>
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
      hoverComponent={uploadDateHover}
    >
      <Stack pl="10px">
        <HStack>
          <Badge colorScheme="purple" w="fit-content">
            {ISO6391.getNativeName(lang)}
          </Badge>
          <Spacer />
          <Text
            fontWeight="bold"
            color={useColorModeValue("gray.500", "gray.400")}
          >
            {t("views")}
          </Text>
          <Text fontWeight="bold">{viewCount}</Text>
          <Spacer />
        </HStack>
      </Stack>
    </VideoCard>
  );
}
