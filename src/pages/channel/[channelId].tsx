import { Box, Grid, GridItem, Text, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import GeneralRanking from "../../components/ranking/generalRanking";
import LoadMoreBtn from "../../components/ranking/loadMoreBtn";
import RequestRankCard from "../../components/ranking/requestRankCard";
import { GoalExpr, PointGoal } from "../../utils/etc";
import { PageOptions, RankQueryData, ResRankingVideo } from "../../utils/types";

export default function ChannelDetail() {
  const router = useRouter();
  const { channelId, title } = router.query;
  const [lang, setLang] = useState<string>();
  const [sortOption, setSortOption] = useState({
    name: "자막 게이지 (높은 순)",
    sortBy: { by: "gauge", order: true },
  });
  const sortOptionArray = [
    { name: "요청수 (높은 순)", sortBy: { by: "request", order: true } },
    { name: "요청수 (낮은 순)", sortBy: { by: "request", order: false } },
    { name: "요청 포인트 (높은 순)", sortBy: { by: "point", order: true } },
    { name: "요청 포인트 (낮은 순)", sortBy: { by: "point", order: false } },
    { name: "자막 게이지 (높은 순)", sortBy: { by: "gauge", order: true } },
    { name: "자막 게이지 (낮은 순)", sortBy: { by: "gauge", order: false } },
  ];
  const pageSize = 15;
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

  const [col2, col3, col4, col5, col6] = useMediaQuery([
    "(min-width: 750px)",
    "(min-width: 1030px)",
    "(min-width: 1400px)",
    "(min-width: 1700px)",
    "(min-width: 2000px)",
  ]);

  return (
    <Box
      pt={10}
      pl={{ base: "10px", lg: "30px", xl: "70px" }}
      pr={{ base: "10px", lg: "30px", xl: "70px" }}
      overflowX={{ sm: "scroll", md: "hidden" }}
    >
      <Text fontWeight="bold" fontSize="30px">
        {title} 의 채널 랭킹
      </Text>
      <GeneralRanking
        lang={lang}
        setLang={setLang}
        sortOptionArray={sortOptionArray}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onSubmit={onSubmit}
        btnComponent={loadMoreBtn}
      >
        <Grid
          templateColumns={`repeat(${
            1 +
            Number(col2) +
            Number(col3) +
            Number(col4) +
            Number(col5) +
            Number(col6)
          }, 1fr)`}
          gap={5}
          justifyItems="center"
        >
          {videos.map((video) => (
            <GridItem key={video.videoId}>
              <RequestRankCard
                duration={video.youtubeVideo ? video.youtubeVideo.duration : 0}
                videoName={
                  video.youtubeVideo ? video.youtubeVideo.title : "no title"
                }
                videoUrl={video.url}
                serviceId={video.serviceId}
                videoId={video.videoId}
                imageUrl={`https://i.ytimg.com/vi/${video.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC-jCivJl2_ZKjT2GONS3-JWiYk1w`}
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
              />
            </GridItem>
          ))}
        </Grid>
      </GeneralRanking>
    </Box>
  );
}

ChannelDetail.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
