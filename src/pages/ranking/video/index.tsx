import { Box } from "@chakra-ui/react";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  PageOptions,
  RankQueryData,
  ResRankingVideo,
} from "../../../utils/types";
import VideoTableRow from "../../../components/ranking/videoRankTableRow";
import GeneralTable from "../../../components/ranking/generalTable";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";

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
  const [lang, setLang] = useState<string>();
  const [sortBy, setSortBy] = useState({ by: "request", order: true });
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

  return (
    <Box
      pt={10}
      pl={{ base: "10px", lg: "30px", xl: "70px" }}
      pr={{ base: "10px", lg: "30px", xl: "70px" }}
      overflowX={{ sm: "scroll", md: "hidden" }}
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
        {videos.map((video, index) => (
          <VideoTableRow
            key={video.videoId}
            rank={index + 1}
            name={video.youtubeVideo ? video.youtubeVideo.title : "no title"}
            duration={video.youtubeVideo ? video.youtubeVideo.duration : 0}
            requests={video._count.requests}
            points={video._count.points}
            url={video.url}
            langs={video.langs}
          />
        ))}
      </GeneralTable>
    </Box>
  );
}

VideoRankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
