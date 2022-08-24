import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  useMediaQuery,
  HStack,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { useRouter } from "next/router";
import {
  PageOptions,
  RankQueryData,
  ResRankingChannel,
} from "../../utils/types";
import LoadMoreBtn from "../../components/ranking/loadMoreBtn";
import GeneralRanking from "../../components/ranking/generalRanking";
import ChannelCard from "../../components/channelCard";
import RankingController from "../../components/ranking/rankingController";

export default function ChannelRankingPage() {
  const { t } = useTranslation("channel");
  const router = useRouter();
  const [sortOption, setSortOption] = useState({
    name: t("funding_num_high"),
    sortBy: { by: "request", order: true },
  });
  const sortOptionArray = [
    {
      name: t("funding_num_high"),
      sortBy: { by: "request", order: true },
    },
    { name: t("sub_num_highest"), sortBy: { by: "sub", order: true } },
    {
      name: t("subscriber_num_highest"),
      sortBy: { by: "subscriber", order: true },
    },
  ];
  const pageSize = 12;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingChannel>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    const { keyword } = values;
    router.push(`/search?query=${keyword}&type=channel`);
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
                {t("pop_channel_list")}
              </Text>
              <Stack
                minW={{ base: "30px", sm: "40px" }}
                minH={{ base: "30px", sm: "40px" }}
                w={{ base: "30px", sm: "40px" }}
                h={{ base: "30px", sm: "40px" }}
              >
                <TiSocialYoutubeCircular size="100%" color="#ff6666" />
              </Stack>
            </HStack>
            <Text fontSize={{ base: "12px", sm: "15px", md: "18px" }}>
              {t("pop_channel_list_ex")}
            </Text>
          </Stack>
        </HStack>
        <Divider m="10px 0px 10px 0px !important" />
        <RankingController
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
    </Box>
  );
}

ChannelRankingPage.options = {
  auth: false,
  hideTitle: true,
} as PageOptions;
