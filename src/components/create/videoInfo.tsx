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
import useTranslation from "next-translate/useTranslation";
import { ResVideo } from "../../utils/types";

type Props = {
  video?: ResVideo;
};

export default function VideoInfo({ video }: Props) {
  const { t } = useTranslation("videoRequest");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Flex
      direction={isLargerThan900 ? "row" : "column"}
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
          <Heading
            size="md"
            overflow="hidden"
            maxW="75%"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {video?.youtubeVideo.title}
          </Heading>
          <Text marginY="10px">
            {`${t("view_ko")} ${video?.youtubeVideo.viewCount}${t(
              "view_en"
            )} | ${video?.youtubeVideo.publishedAt}`}
          </Text>
          <HStack>
            <Avatar
              marginEnd="12px"
              src={video?.youtubeVideo.channel.thumbnailUrl}
            />
            <Stack>
              <Heading size="sm">{video?.youtubeVideo.channel.title}</Heading>
              <Text>
                {t("subscriber_ko")}{" "}
                {video?.youtubeVideo.channel.subscriberCount}
                {t("subscriber_en")}
              </Text>
            </Stack>
          </HStack>
        </Box>
      ) : (
        <Text>{t("no_info")}</Text>
      )}
    </Flex>
  );
}
