import {
  Avatar,
  Box,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import GeneralRanking from "../../components/ranking/generalRanking";
import LoadMoreBtn from "../../components/ranking/loadMoreBtn";
import RankingController from "../../components/ranking/rankingController";
import RequestRankCard from "../../components/ranking/requestRankCard";
import { GoalExpr, PointGoal } from "../../utils/etc";
import { PageOptions, RankQueryData, ResRankingVideo } from "../../utils/types";

export default function ChannelDetail() {
  const { t } = useTranslation("channel");
  const router = useRouter();
  const { channelId } = router.query;
  const [lang, setLang] = useState<string>();
  const [sortOption, setSortOption] = useState({
    name: t("gauge_high"),
    sortBy: { by: "gauge", order: true },
  });
  const sortOptionArray = [
    { name: t("gauge_high"), sortBy: { by: "gauge", order: true } },
    { name: t("gauge_low"), sortBy: { by: "gauge", order: false } },
    { name: t("request_num_high"), sortBy: { by: "request", order: true } },
    { name: t("request_num_low"), sortBy: { by: "request", order: false } },
    { name: t("request_point_high"), sortBy: { by: "point", order: true } },
    { name: t("request_point_low"), sortBy: { by: "point", order: false } },
  ];

  const [col2, col3, col4, col5, col6] = useMediaQuery([
    "(min-width: 750px)",
    "(min-width: 1030px)",
    "(min-width: 1400px)",
    "(min-width: 1700px)",
    "(min-width: 2000px)",
  ]);
  const colCount =
    1 +
    Number(col2) +
    Number(col3) +
    Number(col4) +
    Number(col5) +
    Number(col6);
  const pageSize = colCount <= 2 ? colCount * 6 : colCount * 3;

  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingVideo>(url);
    return res.data;
  };
  const goalExpr = GoalExpr();

  function onSubmit(values: RankQueryData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { keyword } = values;
    // Todo: search keyword
  }

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `/api/public/ranking/video/${sortOption.sortBy.by}?start=${
        pageSize * index
      }&end=${pageSize * (index + 1)}&lang=${lang ?? "All Lang"}&order=${
        sortOption.sortBy.order === true ? "desc" : "asc"
      }${goalExpr ? `&goalExpr=${JSON.stringify(goalExpr)}` : ""}
      ${channelId ? `&channelId=${channelId}` : ""}`,
    fetcher
  );

  const { data: channel } = useSWR(
    `/api/public/search/channel?channelId=${channelId}`
  );

  const videos = data
    ? data.reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      )
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);

  const loadMoreBtn = (
    <LoadMoreBtn
      hidden={isLoadingMore || isReachingEnd}
      onClick={() => setSize(size + 1)}
    />
  );

  return (
    <Box overflowX={{ sm: "scroll", md: "hidden" }}>
      <Box
        w="100%"
        h="220px"
        backgroundImage={`url(${channel?.bannerUrl}=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj)`}
        backgroundSize="cover"
        position="relative"
      >
        <HStack
          backgroundColor={useColorModeValue("white", "gray.800")}
          position="absolute"
          mt="-45px"
          left="0px"
          bottom="0px"
          pt="10px"
          pl={{ base: "20px", md: "70px" }}
          pr="20px"
          borderTopRightRadius="10px"
        >
          <Link href={channel?.channelUrl || "https://subcloud.app"}>
            <Avatar
              name={channel?.title}
              src={channel?.thumbnailUrl}
              size="sm"
              cursor="pointer"
            />
          </Link>
          <Link href={channel?.channelUrl || "https://subcloud.app"}>
            <Text
              fontWeight="bold"
              fontSize={{ base: "15px", md: "30px" }}
              cursor="pointer"
            >
              {t("title_channel_other")} {channel?.title}
            </Text>
          </Link>
          <Text fontSize={{ base: "12px", md: "25px" }}>
            {t("title_channel_ko")}
          </Text>
        </HStack>
      </Box>
      <Stack
        pl={{ base: "20px", md: "70px" }}
        pr={{ base: "20px", md: "70px" }}
        pt="10px"
        spacing="20px"
      >
        <Text fontSize={{ base: "12px", sm: "16px", md: "18px" }}>
          {t("title_channel_message")}
        </Text>
        <RankingController
          lang={lang}
          setLang={setLang}
          sortOptionArray={sortOptionArray}
          sortOption={sortOption}
          setSortOption={setSortOption}
          onSubmit={onSubmit}
        />
      </Stack>
      <Stack
        pt="40px"
        pl={{ base: "10px", lg: "30px", xl: "70px" }}
        pr={{ base: "10px", lg: "30px", xl: "70px" }}
      >
        <GeneralRanking btnComponent={loadMoreBtn}>
          <SimpleGrid
            templateColumns={`repeat(${colCount}, 1fr)`}
            gap={5}
            justifyItems="center"
          >
            {videos.map((video) => (
              <RequestRankCard
                key={video.videoId + video.langs}
                duration={video.youtubeVideo ? video.youtubeVideo.duration : 0}
                videoName={
                  video.youtubeVideo ? video.youtubeVideo.title : "no title"
                }
                videoUrl={video.url}
                serviceId={video.serviceId}
                videoId={video.videoId}
                imageUrl={`http://img.youtube.com/vi/${video.videoId}/0.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ`}
                requestCount={video._count.requests}
                requestPoint={video._count.points}
                requestGoal={
                  PointGoal(
                    video.youtubeVideo
                      ? video.youtubeVideo.duration
                      : undefined,
                    goalExpr
                  ) ?? 1000000
                }
                channelName={video.youtubeVideo?.channel.title ?? "no name"}
                channelImageUrl={video.youtubeVideo?.channel.thumbnailUrl ?? ""}
                channelUrl={video.youtubeVideo?.channel.channelUrl ?? ""}
                lang={video.langs}
                hideChannel
              />
            ))}
          </SimpleGrid>
        </GeneralRanking>
      </Stack>
    </Box>
  );
}

ChannelDetail.options = {
  auth: false,
  hideTitle: true,
} as PageOptions;
