import { Box, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import {
  PageOptions,
  RankQueryData,
  ResRankingVideo,
} from "../../../utils/types";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";
import GeneralRanking from "../../../components/ranking/generalRanking";
import RequestRankCard from "../../../components/ranking/requestRankCard";

export default function VideoRankingPage() {
  const [lang, setLang] = useState<string>();
  const [sortBy, setSortBy] = useState({ by: "request", order: true });
  const sortOptions = [
    "조회수 (높은 순)",
    "조회수 (낮은 순)",
    "요청 포인트 (높은 순)",
    "요청 포인트 (낮은 순)",
    "자막 게이지 (높은 순)",
    "자막 게이지 (낮은 순",
  ];
  const pageSize = 15;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingVideo>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { keyword } = values;
    // Todo: search keyword
  }

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `/api/public/ranking/video/${sortBy.by}?start=${pageSize * index}&end=${
        pageSize * (index + 1)
      }&lang=${lang ?? "All Lang"}&order=${
        sortBy.order === true ? "desc" : "asc"
      }`,
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
      <GeneralRanking
        lang={lang}
        setLang={setLang}
        sortOptions={sortOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
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
                requestCount={video._count.requests}
                requestPoint={video._count.points}
                requestGoal={1500}
                channelName="냥뇽녕냥"
                channelImageUrl="https://yt3.ggpht.com/NipIIXfDrjD14WaJJbd4KIKbTpQ2F0hZkBHPpxbuedlK3L4eH4LeqhPSFKKRDwePt_2SzuGf6Ds=s176-c-k-c0x00ffffff-no-rj-mo"
                lang={video.langs}
              />
            </GridItem>
          ))}
        </Grid>
      </GeneralRanking>
    </Box>
  );
}

VideoRankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
