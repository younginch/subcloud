import axios from "axios";
import { Box, Button, Center } from "@chakra-ui/react";
import {
  PageOptions,
  RankQueryData,
  ResRankingUser,
} from "../../../utils/types";
import UserRankTableRow from "../../../components/ranking/userRankTableRow";
import useSWRInfinite from "swr/infinite";
import GeneralTable from "../../../components/ranking/generalTable";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";

export default function UserRankingPage() {
  const captions = [
    "#",
    "Name",
    "Total Views",
    "Total Subs",
    "Fulfilled",
    "Rating",
  ];
  const sortBy = "view"; //sub, fulfilledRequests
  const pageSize = 5;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingUser>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    const { keyword } = values;
    //Todo: search keyword
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/ranking/user/${sortBy}?start=${pageSize * index}&end=${
        pageSize * (index + 1)
      }`,
    fetcher
  );

  const users = data
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
          onSubmit={onSubmit}
          btnComponent={loadMoreBtn}
        >
          {users.map((user, index) => {
            return (
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
            );
          })}
        </GeneralTable>
      </Box>
    </>
  );
}

UserRankingPage.options = {
  auth: false,
  hideTitle: true,
  width: "100%",
} as PageOptions;
