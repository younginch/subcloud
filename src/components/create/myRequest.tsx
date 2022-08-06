import { WrapItem, Stack, Wrap, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ISO6391 from "iso-639-1";
import { FiBox } from "react-icons/fi";
import { ResRequestSearch } from "../../utils/types";
import Pagination from "../pagination";
import RequestCard from "../requestCard";

function MyRequestPanel({
  requests,
}: {
  requests: ResRequestSearch | undefined;
}) {
  return (
    <Wrap
      spacing={5}
      justify={{ base: "space-evenly", md: "normal" }}
      w="fit-content"
    >
      {requests?.map((request) => (
        <WrapItem key={request.id}>
          <RequestCard
            title={request.video?.youtubeVideo?.title ?? ""}
            time={request.video?.youtubeVideo?.duration ?? 0}
            link={request.video?.url ?? ""}
            thumbnail={`https://i.ytimg.com/vi/${request.video?.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ`}
            requestLang={ISO6391.getNativeName(request.lang)}
            requestStatus={request.status}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
}

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
      {requests?.length ? (
        <MyRequestPanel requests={requests} />
      ) : (
        <Stack alignItems="center" spacing={5} h="100%" pt="3%" pb="2%">
          <FiBox size={150} />
          <Text fontSize="25px">
            요청이 없습니다. 자막이 필요한 영상에 요청해 보세요.
          </Text>
        </Stack>
      )}
      <Pagination pageNum={5} currentPage={1} />
    </Stack>
  );
}
