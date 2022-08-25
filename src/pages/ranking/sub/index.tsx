import axios from "axios";
import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  useMediaQuery,
  Text,
  HStack,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { MdSubtitles } from "react-icons/md";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import {
  PageOptions,
  RankQueryData,
  ResRankingSub,
} from "../../../utils/types";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";
import VideoRankCard from "../../../components/ranking/videoRankCard";
import GeneralRanking from "../../../components/ranking/generalRanking";
import RankingController from "../../../components/ranking/rankingController";

export default function SubRankingPage() {
  const { t } = useTranslation("rankings");
  const router = useRouter();

  const [lang, setLang] = useState<string>();
  const [sortOption, setSortOption] = useState({
    name: t("view_many"),
    sortBy: { by: "view", order: true },
  });
  const sortOptionArray = [
    { name: t("view_many"), sortBy: { by: "view", order: true } },
    { name: t("upload_recent"), sortBy: { by: "date", order: true } },
    { name: t("upload_old"), sortBy: { by: "date", order: false } },
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
    const res = await axios.get<ResRankingSub>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    const { keyword } = values;
    router.push(`/search?query=${keyword}&type=video`);
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/public/ranking/sub/${sortOption.sortBy.by}?start=${
        pageSize * index
      }&end=${pageSize * (index + 1)}&lang=${lang ?? "All Lang"}&order=${
        sortOption.sortBy.order === true ? "desc" : "asc"
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

  return (
    <Box
      overflowX={{ sm: "scroll", md: "hidden" }}
      bg={useColorModeValue("gray.50", undefined)}
      minH="calc(100vh - 54px)"
    >
      <Stack
        bg={useColorModeValue("white", "gray.900")}
        pt={30}
        pb={5}
        pl={{ base: "10px", lg: "30px", xl: "70px" }}
        pr={{ base: "10px", lg: "30px", xl: "70px" }}
        boxShadow="md"
        borderBottomWidth="2px"
      >
        <HStack>
          <Stack>
            <HStack>
              <Text
                fontWeight="bold"
                fontSize={{ base: "18px", sm: "25px", md: "35px" }}
              >
                {t("pop_sub")}
              </Text>
              <Stack
                minW={{ base: "30px", sm: "40px" }}
                minH={{ base: "30px", sm: "40px" }}
                w={{ base: "30px", sm: "40px" }}
                h={{ base: "30px", sm: "40px" }}
              >
                <MdSubtitles size="full" />
              </Stack>
            </HStack>
            <Text fontSize={{ base: "12px", sm: "15px", md: "18px" }}>
              {t("pop_sub_ex")}
            </Text>
          </Stack>
        </HStack>
        <Divider m="10px 0px 10px 0px !important" />
        <RankingController
          lang={lang}
          setLang={setLang}
          sortOptionArray={sortOptionArray}
          sortOption={sortOption}
          setSortOption={setSortOption}
          onSubmit={onSubmit}
        />
      </Stack>
      <Box
        pt={10}
        pl={{ base: "10px", lg: "30px", xl: "70px" }}
        pr={{ base: "10px", lg: "30px", xl: "70px" }}
      >
        <GeneralRanking btnComponent={loadMoreBtn}>
          <Grid
            templateColumns={`repeat(${colCount}, 1fr)`}
            gap={5}
            justifyItems="center"
          >
            {subs.map((sub) => (
              <GridItem key={sub.id}>
                <VideoRankCard
                  key={sub.id}
                  duration={sub.video.youtubeVideo?.duration ?? 0}
                  videoName={
                    sub.video.youtubeVideo
                      ? sub.video.youtubeVideo.title
                      : "no title"
                  }
                  videoUrl={sub.video.url}
                  imageUrl={`http://img.youtube.com/vi/${sub.video.videoId}/0.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ`}
                  viewCount={sub.views}
                  channelName={
                    sub.video.youtubeVideo?.channel.title ?? "no name"
                  }
                  channelImageUrl={
                    sub.video.youtubeVideo?.channel.thumbnailUrl ?? ""
                  }
                  channelUrl={sub.video.youtubeVideo?.channel.channelUrl ?? ""}
                  lang={sub.lang}
                  uploadDate={sub.createdAt}
                />
              </GridItem>
            ))}
          </Grid>
        </GeneralRanking>
      </Box>
    </Box>
  );
}

SubRankingPage.options = {
  auth: false,
  hideTitle: true,
} as PageOptions;
