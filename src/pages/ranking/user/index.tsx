import axios from "axios";
import {
  Box,
  Divider,
  HStack,
  Stack,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { BsTrophy } from "react-icons/bs";
import {
  PageOptions,
  RankQueryData,
  ResRankingUser,
} from "../../../utils/types";
import UserRankTableRow from "../../../components/ranking/userRankTableRow";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";
import GeneralRanking from "../../../components/ranking/generalRanking";
import RankingController from "../../../components/ranking/rankingController";

export default function UserRankingPage() {
  const { t } = useTranslation("rankings");
  const router = useRouter();

  const captions = [
    { caption: "#" },
    { caption: t("name") },
    { caption: t("total_views") },
    { caption: t("total_subs") },
    { caption: t("subtitle_language") },
    { caption: t("rating") },
  ];

  const [lang, setLang] = useState<string>();
  const [sortOption, setSortOption] = useState({
    name: t("total_views_high"),
    sortBy: { by: "view", order: true },
  });
  const pageSize = 15;
  const sortOptionArray = [
    { name: t("total_views_high"), sortBy: { by: "view", order: true } },
    { name: t("rating_high"), sortBy: { by: "rating", order: true } },
    { name: t("total_subs_high"), sortBy: { by: "sub", order: true } },
  ];

  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingUser>(url);
    return res.data;
  };

  function onSubmit(values: RankQueryData) {
    const { keyword } = values;
    router.push(`/search?query=${keyword}`);
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/public/ranking/user/${sortOption.sortBy.by}?start=${
        pageSize * index
      }&end=${pageSize * (index + 1)}&lang=${lang ?? "All Lang"}&order=${
        sortOption.sortBy.order === true ? "desc" : "asc"
      }`,
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
              <Text fontWeight="bold" fontSize={{ base: "25px", sm: "30px" }}>
                자막 제작자 랭킹
              </Text>
              <Stack
                minW={{ base: "22px", sm: "26px" }}
                minH={{ base: "22px", sm: "26px" }}
                w={{ base: "22px", sm: "26px" }}
                h={{ base: "22px", sm: "26px" }}
              >
                <BsTrophy size="full" color="#ccca22" />
              </Stack>
            </HStack>
            <Text fontSize={{ base: "12px", sm: "15px" }}>
              전 세계 유저들이 올린 자막을 확인하세요
            </Text>
          </Stack>
        </HStack>
        <Divider mb="10px !important" />
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
          <Table variant="simple" mt={5} minW="800px">
            <Thead>
              <Tr my=".8rem" ps="0px">
                {captions.map((data) => (
                  <Th
                    color="gray.400"
                    key={data.caption}
                    fontWeight="bold"
                    fontSize={{ base: "12px", md: "15px" }}
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
                  makedLanguaged={user._count.langs}
                  totalRating={Math.round(user._count.ratings * 10) / 10}
                />
              ))}
            </Tbody>
          </Table>
        </GeneralRanking>
      </Box>
    </Box>
  );
}

UserRankingPage.options = {
  auth: false,
  hideTitle: true,
} as PageOptions;
