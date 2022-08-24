import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Stack,
  useMediaQuery,
  Text,
  Divider,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Joyride, { Step } from "react-joyride";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { IoIosAddCircle } from "react-icons/io";
import {
  PageOptions,
  RankQueryData,
  ResRankingVideo,
} from "../../../utils/types";
import LoadMoreBtn from "../../../components/ranking/loadMoreBtn";
import GeneralRanking from "../../../components/ranking/generalRanking";
import RequestRankCard from "../../../components/ranking/requestRankCard";
import { PointGoal, GoalExpr } from "../../../utils/etc";
import RankingController from "../../../components/ranking/rankingController";
import UrlInput from "../../../components/create/urlInput";
import { YoutubeIcon } from "../../../components/icons/customIcons";

export default function VideoRankingPage() {
  const { t } = useTranslation("rankings");
  const [lang, setLang] = useState<string>();
  const [sortOption, setSortOption] = useState({
    name: t("gauge_high"),
    sortBy: { by: "gauge", order: true },
  });
  const [{ run, steps }, setJoyride] = useState<{
    run: boolean;
    steps: Step[];
  }>({
    run: false,
    steps: [
      {
        content: <h2>{t("help_h1")}</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: "center",
        target: "body",
      },
      {
        target: ".videoSearch",
        content: <h2>{t("help_h2")}</h2>,
      },
      {
        target: ".rankGrid :nth-child(1) .pointGauge",
        content: <h2>{t("help_h3")}</h2>,
      },
      {
        target: ".helpButton",
        content: <h2>{t("help_h4")}</h2>,
      },
    ],
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sortOptionArray = [
    { name: t("gauge_high"), sortBy: { by: "gauge", order: true } },
    { name: t("requests_high"), sortBy: { by: "request", order: true } },
    { name: t("points_most"), sortBy: { by: "point", order: true } },
  ];
  const pageSize = 15;
  const fetcher = async (url: string) => {
    const res = await axios.get<ResRankingVideo>(url);
    return res.data;
  };
  const goalExpr = GoalExpr();
  const router = useRouter();

  function onSubmit(values: RankQueryData) {
    const { keyword } = values;
    router.push(`/search?query=${keyword}&type=video`);
  }

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `/api/public/ranking/video/${sortOption.sortBy.by}?start=${
        pageSize * index
      }&end=${pageSize * (index + 1)}&lang=${lang ?? "All Lang"}&order=${
        sortOption.sortBy.order === true ? "desc" : "asc"
      }${goalExpr ? `&goalExpr=${JSON.stringify(goalExpr)}` : ""}`,
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

  const [col2, col3, col4, col5, col6] = useMediaQuery([
    "(min-width: 710px)",
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
            <HStack spacing={5}>
              <Text
                fontWeight="bold"
                fontSize={{ base: "18px", sm: "25px", md: "35px" }}
              >
                {t("pop_req_sub")}
              </Text>
              <Stack
                minW={{ base: "30px", sm: "40px" }}
                minH={{ base: "30px", sm: "40px" }}
                w={{ base: "30px", sm: "40px" }}
                h={{ base: "30px", sm: "40px" }}
              >
                <YoutubeIcon size="100%" />
              </Stack>
            </HStack>
            <Text fontSize={{ base: "12px", sm: "15px", md: "18px" }}>
              {t("pop_req_sub_ex")}
            </Text>
          </Stack>
          <Spacer />
          <Stack direction={{ base: "column", sm: "row" }}>
            <Button
              colorScheme="purple"
              leftIcon={<IoIosAddCircle />}
              borderRadius={{ base: "8px", sm: "12px" }}
              h={{ base: "25px", sm: "35px" }}
              fontSize={{ base: "12px", sm: "18px" }}
              onClick={onOpen}
            >
              NEW
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{t("urlInput_request")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <UrlInput />
                </ModalBody>
              </ModalContent>
            </Modal>
            <Button
              variant="ghost"
              onClick={() => {
                setJoyride({ run: true, steps });
              }}
              className="helpButton"
            >
              <QuestionOutlineIcon />
            </Button>
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
      <Joyride
        steps={steps}
        run={run}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        continuous
        scrollOffset={500}
      />
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
            className="rankGrid"
          >
            {videos.map((video) => (
              <GridItem key={video.videoId + video.langs}>
                <RequestRankCard
                  duration={
                    video.youtubeVideo ? video.youtubeVideo.duration : 0
                  }
                  videoName={
                    video.youtubeVideo ? video.youtubeVideo.title : "no title"
                  }
                  videoUrl={video.url}
                  serviceId={video.serviceId}
                  videoId={video.videoId}
                  imageUrl={`http://img.youtube.com/vi/${video.videoId}/0.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ`}
                  requestCount={video._count.requests}
                  requestPoint={video._count.points}
                  requestGoal={
                    PointGoal(
                      video.youtubeVideo
                        ? video.youtubeVideo.duration
                        : undefined,
                      goalExpr
                    ) ?? 1000000
                  }
                  channelName={video.youtubeVideo?.channel.title ?? "no name"}
                  channelImageUrl={
                    video.youtubeVideo?.channel.thumbnailUrl ?? ""
                  }
                  channelUrl={video.youtubeVideo?.channel.channelUrl ?? ""}
                  lang={video.langs}
                />
              </GridItem>
            ))}
          </Grid>
        </GeneralRanking>
      </Box>
    </Box>
  );
}

VideoRankingPage.options = {
  auth: false,
  hideTitle: true,
} as PageOptions;
