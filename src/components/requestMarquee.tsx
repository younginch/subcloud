import {
  Box,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import router from "next/router";
import Marquee from "react-fast-marquee";
import { GoalExpr, PointGoal } from "../utils/etc";
import { ResRankingVideo } from "../utils/types";
import RequestCard from "./requestCard";

type Props = {
  videos: ResRankingVideo | undefined;
};

export default function RequestMarquee({ videos }: Props) {
  const { t } = useTranslation("create");
  const goalExpr = GoalExpr();

  return (
    <Stack
      spacing={10}
      p="50px 12px 80px 12px"
      bg={useColorModeValue("blue.50", "gray.900")}
      mt="50px !important"
      w="100%"
    >
      <HStack pl="30px" alignItems="flex-end">
        <Text
          fontWeight="bold"
          fontSize={{ base: "20px", sm: "25px", md: "30px" }}
        >
          {t("top10")}🔥
        </Text>
        <NextLink href="/ranking/video" passHref>
          <Link
            fontSize={{ base: "15px", sm: "20px", md: "lg" }}
            ml="15px !important"
            color="gray.400"
          >
            {t("more")}
          </Link>
        </NextLink>
      </HStack>
      <Marquee gradient={false} pauseOnHover>
        {videos?.map((video) => (
          <Box mr="30px" key={video.videoId}>
            <RequestCard
              title={video.youtubeVideo?.title ?? ""}
              time={video.youtubeVideo?.duration ?? 0}
              thumbnail={`https://i.ytimg.com/vi/${video.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ`}
              link={video.url}
              requestLang={video.langs}
              requestCount={video._count.requests}
              buttonType={router.query.next}
              serviceId={video.serviceId}
              videoId={video.videoId}
              requestPoint={video._count.points}
              requestGoal={
                PointGoal(
                  video.youtubeVideo ? video.youtubeVideo.duration : undefined,
                  goalExpr
                ) ?? 1000000
              }
            />
          </Box>
        ))}
      </Marquee>
    </Stack>
  );
}
