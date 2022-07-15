import { Box, Button, Center } from "@chakra-ui/react";
import axios from "axios";
import {
  PageOptions,
  RankQueryData,
  ResRankingVideo,
} from "../../../utils/types";
import VideoTableRow from "../../../components/ranking/videoRankTableRow";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import GeneralTable from "../../../components/ranking/generalTable";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";
import useTranslation from "next-translate/useTranslation";

export default function VideoRankingPage() {
  const { t } = useTranslation("rankings");
  const captions = [
    { caption: "#" },
    { caption: t("title") },
    { caption: t("duration") },
    { caption: t("language") },
    { caption: t("requests"), sortBy: "request" },
    { caption: t("points"), sortBy: "point" },
  ];
  const [lang, setLang] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState({ by: "request", order: true });
  const pageSize = 5;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingVideo>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    const { keyword } = values;
    //Todo: search keyword
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/public/ranking/video/${sortBy.by}?start=${pageSize * index}&end=${
        pageSize * (index + 1)
      }&lang=${lang ?? "All Lang"}&order=${
        sortBy.order === true ? "desc" : "asc"
      }`,
    fetcher
  );

  const videos = data
    ? data.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      }, [])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isRefreshing = isValidating && data && data.length === size;

  const loadMoreBtn = (
    <LoadMoreBtn
      hidden={isLoadingMore || isReachingEnd}
      onClick={() => setSize(size + 1)}
    />
  );

  return (
    <>
      <Box
        pt={10}
        pl={{ base: "10px", lg: "30px", xl: "70px" }}
        pr={{ base: "10px", lg: "30px", xl: "70px" }}
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <GeneralTable
          captions={captions}
          lang={lang}
          setLang={setLang}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onSubmit={onSubmit}
          btnComponent={loadMoreBtn}
        >
          {videos.map((video, index) => {
            return (
              <VideoTableRow
                key={video.videoId}
                rank={index + 1}
                name={
                  video.youtubeVideo ? video.youtubeVideo.title : "no title"
                }
                duration={video.youtubeVideo ? video.youtubeVideo.duration : 0}
                platform={video.serviceId}
                requests={video._count.requests}
                points={video._count.points}
                url={video.url}
                langs={video.langs}
              />
            );
          })}
        </GeneralTable>
      </Box>
    </>
  );
}

VideoRankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
