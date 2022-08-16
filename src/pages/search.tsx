import { Text, useToast, Box, Center } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GeneralTable from "../components/ranking/generalTable";
import SearchTableRow from "../components/ranking/searchTableRow";
import { PageOptions, ResVideoSearch } from "../utils/types";

export default function Search() {
  const router = useRouter();
  const toast = useToast();

  const [videos, setVideos] = useState<ResVideoSearch>([]);
  useEffect(() => {
    if (!router.query.query || !toast) {
      return;
    }
    axios
      .get<ResVideoSearch>("/api/public/algolia/video", {
        params: { query: router.query.query },
      })
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          isClosable: true,
        });
      });
  }, [router.query.query, toast]);

  const captions = [
    { caption: "영상 제목" },
    { caption: "채널" },
    { caption: "요청 횟수" },
    { caption: "자막 수" },
    { caption: "총 포인트" },
  ];
  const titleComponent = (
    <Center>
      <Text fontSize="22px" fontWeight="bold" mb={5}>
        &quot;{router.query.query}&quot; 검색 결과
      </Text>
    </Center>
  );
  return (
    <Box
      pt={10}
      pl={{ base: "10px", lg: "30px", xl: "70px" }}
      pr={{ base: "10px", lg: "30px", xl: "70px" }}
      overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      <GeneralTable captions={captions} title={titleComponent}>
        {videos?.map((video) => (
          <SearchTableRow
            key={video.videoId}
            videoId={video.videoId}
            platform={video.serviceId}
            videoName={
              video.youtubeVideo ? video.youtubeVideo.title : "no title"
            }
            channelName={video?.youtubeVideo?.channel.title ?? "채널 정보없음"}
            channelImageUrl={
              video?.youtubeVideo?.channel.thumbnailUrl ?? "채널 정보없음"
            }
            channelUrl={
              video?.youtubeVideo?.channel.channelUrl ?? "채널 정보없음"
            }
            totalRequests={video._count?.requests ?? 0}
            totalSubtitles={video._count?.subs ?? 0}
            totalPoints={video._count?.points ?? 0}
          />
        ))}
      </GeneralTable>
    </Box>
  );
}

Search.options = { auth: false, hideTitle: true } as PageOptions;
