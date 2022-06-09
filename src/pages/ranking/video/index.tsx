import {
  Box,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  FormControl,
  Input,
  Spacer,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import {
  PageOptions,
  RankQueryData,
  ResRankingVideo,
} from "../../../utils/types";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineSearch } from "react-icons/ai";
import VideoTableRow from "../../../components/ranking/videoRankTableRow";
import { useForm } from "react-hook-form";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import GeneralTable from "../../../components/ranking/generalTable";

export default function RankingPage() {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Title", "Language", "Requests", "Points"];
  const selectList = ["All Lang", "en", "ko", "jp", "cn"];
  const [lang, setLang] = useState("All Lang");
  const sortBy = "request"; //point
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
      `/api/ranking/video/${sortBy}?start=${pageSize * index}&end=${
        pageSize * (index + 1)
      }&lang=${lang}`,
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
    <Center>
      <Button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        load more
      </Button>
    </Center>
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
          onSubmit={onSubmit}
          btnComponent={loadMoreBtn}
        >
          {videos.map((video) => {
            return (
              <VideoTableRow
                key={video.videoId}
                name={
                  video.youtubeVideo ? video.youtubeVideo.title : "no title"
                }
                platform={video.serviceId}
                requests={video._count.requests}
                points={video._count.points}
                url={video.url}
              />
            );
          })}
        </GeneralTable>
      </Box>
    </>
  );
}

RankingPage.options = {
  auth: false,
  width: "100%",
  hideTitle: true,
} as PageOptions;
