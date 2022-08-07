import { WrapItem, Stack, Wrap, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ISO6391 from "iso-639-1";
import { ResRequestSearch } from "../../utils/types";
import Pagination from "../pagination";
import RequestCard from "../requestCard";

export default function MyRequest() {
  const session = useSession();
  const { data: requests } = useSWR<ResRequestSearch>(
    `/api/public/search/request?userId=${session.data?.user.id}`
  );

  return (
    <Stack p={{ base: 5, lg: 10 }} spacing={10}>
      <Text fontWeight="bold" fontSize={{ base: "25px", md: "30px" }}>
        내가 SubCloud에 요청한 영상
      </Text>
      <Wrap
        spacing={5}
        justify={{ base: "space-evenly", md: "normal" }}
        w="fit-content"
      >
        {requests?.map(
          (request) =>
            request.video && (
              <WrapItem key={request.id}>
                <RequestCard
                  title={request.video.youtubeVideo?.title ?? ""}
                  time={request.video.youtubeVideo?.duration ?? 0}
                  link={request.video.url ?? ""}
                  thumbnail={`https://i.ytimg.com/vi/${request.video.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ`}
                  requestLang={ISO6391.getNativeName(request.lang)}
                  requestStatus={request.status}
                  serviceId={request.video.serviceId}
                  videoId={request.video.videoId}
                />
              </WrapItem>
            )
        )}
      </Wrap>
      <Pagination pageNum={5} currentPage={1} />
    </Stack>
  );
}
