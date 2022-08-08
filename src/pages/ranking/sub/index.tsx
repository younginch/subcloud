import axios from "axios";
import { Box, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import {
  PageOptions,
  RankQueryData,
  ResRankingSub,
} from "../../../utils/types";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";
import VideoRankCard from "../../../components/ranking/videoRankCard";
import GeneralRanking from "../../../components/ranking/generalRanking";

export default function SubRankingPage() {
  const [isPc] = useMediaQuery("(min-width: 950px)");

  const [lang, setLang] = useState<string>();
  const [sortBy, setSortBy] = useState({ by: "view", order: true });
  const sortOptions = [
    "조회수 (높은 순)",
    "조회수 (낮은 순)",
    "업로드 날짜 (최신 순)",
    "업로드 날짜 (오래된 순",
  ];

  const pageSize = isPc ? 20 : 8;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingSub>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { keyword } = values;
    // Todo: search keyword
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/public/ranking/sub/${sortBy.by}?start=${pageSize * index}&end=${
        pageSize * (index + 1)
      }&lang=${lang ?? "All Lang"}&order=${
        sortBy.order === true ? "desc" : "asc"
      }`,
    fetcher
  );

  const subs = data
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isRefreshing = isValidating && data && data.length === size;

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
          {subs.map((sub) => (
            <GridItem key={sub.id}>
              <VideoRankCard
                key={sub.id}
                duration={350}
                videoName={
                  sub.video.youtubeVideo
                    ? sub.video.youtubeVideo.title
                    : "no title"
                }
                videoUrl={sub.video.url}
                viewCount={sub.views}
                channelName="냥뇽녕냥"
                channelImageUrl="https://yt3.ggpht.com/NipIIXfDrjD14WaJJbd4KIKbTpQ2F0hZkBHPpxbuedlK3L4eH4LeqhPSFKKRDwePt_2SzuGf6Ds=s176-c-k-c0x00ffffff-no-rj-mo"
                lang={sub.lang}
                uploadDate={sub.createdAt}
              />
            </GridItem>
          ))}
        </Grid>
      </GeneralRanking>
    </Box>
  );
}

SubRankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
