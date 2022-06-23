import axios from "axios";
import {
  PageOptions,
  RankQueryData,
  ResRankingSub,
} from "../../../utils/types";
import { Box } from "@chakra-ui/react";
import SubRankTableRow from "../../../components/ranking/subRankTableRow";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import GeneralTable from "../../../components/ranking/generalTable";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";
import useTranslation from "next-translate/useTranslation";

export default function SubRankingPage() {
  const { t } = useTranslation("rankings");

  const captions = [
    { caption: "#" },
    { caption: t("title") },
    { caption: t("language") },
    { caption: t("views"), sortBy: "view" },
    { caption: t("madeby") },
    { caption: t("uploaded") },
  ];
  const [lang, setLang] = useState("All Lang");
  const [sortBy, setSortBy] = useState({ by: "view", order: true });
  const pageSize = 5;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingSub>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    const { keyword } = values;
    //Todo: search keyword
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/ranking/sub/${sortBy.by}?start=${pageSize * index}&end=${
        pageSize * (index + 1)
      }&lang=${lang}&order=${sortBy.order === true ? "desc" : "asc"}`,
    fetcher
  );

  const subs = data
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
        pl={{ base: "10px", lg: "30px", xl: "70px" }}
        pr={{ base: "10px", lg: "30px", xl: "70px" }}
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <GeneralTable
          captions={captions}
          btnComponent={loadMoreBtn}
          lang={lang}
          setLang={setLang}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onSubmit={onSubmit}
        >
          {subs.map((sub, index) => {
            return (
              <SubRankTableRow
                rank={index + 1}
                key={sub.id}
                userId={sub.user.id}
                videoName={
                  sub.video.youtubeVideo
                    ? sub.video.youtubeVideo.title
                    : "no title"
                }
                videoUrl={sub.video.url}
                platform={sub.serviceId}
                viewCount={sub.views}
                userName={sub.user.name ? sub.user.name : "Annonymous"}
                userImageUrl={sub.user.image ? sub.user.image : ""}
                lang={sub.lang}
                uploadDate={sub.createdAt}
              />
            );
          })}
        </GeneralTable>
      </Box>
    </>
  );
}

SubRankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
