import axios from "axios";
import { Box, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  PageOptions,
  RankQueryData,
  ResRankingUser,
} from "../../../utils/types";
import UserRankTableRow from "../../../components/ranking/userRankTableRow";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";
import GeneralRanking from "../../../components/ranking/generalRanking";

export default function UserRankingPage() {
  const { t } = useTranslation("rankings");

  const captions = [
    { caption: "#" },
    { caption: t("name") },
    { caption: t("total views"), sortBy: "view" },
    { caption: t("total subs"), sortBy: "sub" },
    { caption: t("subtitle_language") },
    { caption: t("rating") },
  ];

  const [lang, setLang] = useState<string>();
  const [sortBy, setSortBy] = useState({ by: "view", order: true });
  const pageSize = 15;
  const sortOptions = [
    "총 조회수 (높은 순)",
    "총 조회수 (낮은 순)",
    "유저 평점 (높은 순)",
    "유저 평점 (낮은 순)",
    "총 자막 수 (많은 순)",
    "총 자막 수 (적은 순)",
  ];

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
      overflowX={{ base: "scroll", md: "hidden" }}
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
        <Table variant="simple" mt={5} minW="800px">
          <Thead>
            <Tr my=".8rem" ps="0px">
              {captions.map((data) => (
                <Th
                  color="gray.400"
                  key={data.caption}
                  fontWeight="bold"
                  fontSize={{ base: "12px", md: "15px" }}
                  onClick={() =>
                    data.sortBy && setSortBy
                      ? data.sortBy === sortBy?.by
                        ? setSortBy({ by: data.sortBy, order: !sortBy?.order })
                        : setSortBy({ by: data.sortBy, order: true })
                      : undefined
                  }
                >
                  {data.caption}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <UserRankTableRow
                rank={index + 1}
                key={user.id}
                userId={user.id}
                userName={user.name ? user.name : "Annonymous"}
                userImageUrl={user.image ? user.image : ""}
                totalViewCount={user._count.views}
                totalSubCount={user._count.subs}
                makedLanguaged={["한국어", "영어", "중국어", "프랑스어"]}
                totalRating={Math.round(user._count.ratings * 10) / 10}
              />
            ))}
          </Tbody>
        </Table>
      </GeneralRanking>
    </Box>
  );
}

UserRankingPage.options = {
  auth: false,
  hideTitle: true,
  width: "100%",
} as PageOptions;
