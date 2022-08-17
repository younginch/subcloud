import { Box, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import {
  PageOptions,
  RankQueryData,
  ResRankingChannel,
} from "../../utils/types";
import LoadMoreBtn from "../../components/ranking/loadMoreBtn";
import GeneralRanking from "../../components/ranking/generalRanking";
import ChannelCard from "../../components/channelCard";

export default function ChannelRankingPage() {
  const [sortOption, setSortOption] = useState({
    name: "진행중인 펀딩 수 (많은 순)",
    sortBy: { by: "request", order: true },
  });
  const sortOptionArray = [
    { name: "자막 수 (많은 순)", sortBy: { by: "sub", order: true } },
    { name: "자막 수 (적은 순)", sortBy: { by: "sub", order: false } },
    { name: "구독자 수 (많은 순)", sortBy: { by: "subscriber", order: true } },
    { name: "구독자 수 (적은 순)", sortBy: { by: "subscriber", order: false } },
    {
      name: "진행중인 펀딩 수 (많은 순)",
      sortBy: { by: "request", order: true },
    },
    {
      name: "진행중인 펀딩 수 (적은 순)",
      sortBy: { by: "request", order: false },
    },
  ];
  const pageSize = 15;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingChannel>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { keyword } = values;
    // Todo: search keyword
  }

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `/api/public/ranking/channel/${sortOption.sortBy.by}?start=${
        pageSize * index
      }&end=${pageSize * (index + 1)}&lang=${"All Lang"}&order=${
        sortOption.sortBy.order === true ? "desc" : "asc"
      }`,
    fetcher
  );

  // TODO: remove below comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const channels = data
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
  console.log(channels);

  return (
    <Box
      pt={10}
      pl={{ base: "10px", lg: "30px", xl: "70px" }}
      pr={{ base: "10px", lg: "30px", xl: "70px" }}
      overflowX={{ sm: "scroll", md: "hidden" }}
    >
      <GeneralRanking
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
          {channels.map((channel) => (
            <GridItem key={channel.id}>
              <ChannelCard
                channelId={channel.id}
                title={channel.title}
                thumbnailUrl={channel.thumbnailUrl}
                subscriberCount={channel.subscriberCount}
                channelUrl={channel.channelUrl}
                bannerUrl={channel.bannerUrl ?? ""}
                subCount={channel._count.subs}
                requestCount={channel._count.requests}
              />
            </GridItem>
          ))}
        </Grid>
      </GeneralRanking>
    </Box>
  );
}

ChannelRankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
