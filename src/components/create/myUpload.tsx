import { WrapItem, Stack, Wrap, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ISO6391 from "iso-639-1";
import { ResSubSearch } from "../../utils/types";
import Pagination from "../pagination";
import UploadCard from "../uploadCard";

export default function MyUpload() {
  const session = useSession();
  const { data: subs } = useSWR<ResSubSearch>(
    `/api/public/search/sub?userId=${session.data?.user.id}`
  );

  return (
    <Stack p={{ base: 5, lg: 10 }} spacing={10}>
      <Text fontWeight="bold" fontSize={{ base: "25px", md: "30px" }}>
        내가 SubCloud에 업로드한 영상
      </Text>
      <Wrap
        spacing={5}
        justify={{ base: "space-evenly", md: "normal" }}
        w="fit-content"
      >
        {subs?.map((sub) => (
          <WrapItem key={sub.id}>
            <UploadCard
              title={sub.video.youtubeVideo?.title ?? ""}
              time={sub.video.youtubeVideo?.duration ?? 0}
              link={sub.video.url ?? ""}
              thumbnail={`https://i.ytimg.com/vi/${sub.video.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ`}
              lang={ISO6391.getNativeName(sub.lang)}
              status={sub.status}
              viewCount={sub.views}
            />
          </WrapItem>
        ))}
      </Wrap>
      <Pagination pageNum={5} currentPage={1} />
    </Stack>
  );
}
