import axios from "axios";
import { Box } from "@chakra-ui/react";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  PageOptions,
  RankQueryData,
  ResRankingUser,
} from "../../../utils/types";
import UserRankTableRow from "../../../components/ranking/userRankTableRow";
import GeneralTable from "../../../components/ranking/generalTable";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";

export default function UserRankingPage() {
  const { t } = useTranslation("rankings");

  const captions = [
    { caption: "#" },
    { caption: t("name") },
    { caption: t("total views"), sortBy: "view" },
    { caption: t("total subs"), sortBy: "sub" },
    { caption: t("fulfilled"), sortBy: "fulfilledRequests" },
    { caption: t("rating") },
  ];
  const [sortBy, setSortBy] = useState({ by: "view", order: true });
  const pageSize = 5;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingUser>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { keyword } = values;
    // Todo: search keyword
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/public/ranking/user/${sortBy.by}?start=${pageSize * index}&end=${
        pageSize * (index + 1)
      }&order=${sortBy.order === true ? "desc" : "asc"}`,
    fetcher
  );

  const users = data
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
      pt={10}
      pl={{ base: "10px", lg: "30px", xl: "70px" }}
      pr={{ base: "10px", lg: "30px", xl: "70px" }}
      overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      <GeneralTable
        captions={captions}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onSubmit={onSubmit}
        btnComponent={loadMoreBtn}
      >
        {users.map((user, index) => (
          <UserRankTableRow
            rank={index + 1}
            key={user.id}
            userId={user.id}
            userName={user.name ? user.name : "Annonymous"}
            userImageUrl={user.image ? user.image : ""}
            totalViewCount={user._count.views}
            totalSubCount={user._count.subs}
            totalFulfilledRequest={user._count.fulfilledRequests}
            totalRating={user._count.ratings}
          />
        ))}
      </GeneralTable>
    </Box>
  );
}

UserRankingPage.options = {
  auth: false,
  hideTitle: true,
  width: "100%",
} as PageOptions;
