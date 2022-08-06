import { WrapItem, Stack, Wrap, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ISO6391 from "iso-639-1";
import { FiBox } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
import { ResSubSearch } from "../../utils/types";
import Pagination from "../pagination";
import UploadCard from "../uploadCard";

function MyUploadPanel({ subs }: { subs: ResSubSearch | undefined }) {
  return (
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
  );
}

export default function MyUpload() {
  const { t } = useTranslation("create");
  const session = useSession();
  const { data: subs } = useSWR<ResSubSearch>(
    `/api/public/search/sub?userId=${session.data?.user.id}`
  );

  return (
    <Stack p={{ base: 5, lg: 10 }} spacing={10}>
      <Text fontWeight="bold" fontSize={{ base: "25px", md: "30px" }}>
        {t("my_up")}
      </Text>

      {subs?.length ? (
        <MyUploadPanel subs={subs} />
      ) : (
        <Stack alignItems="center" spacing={5} h="100%" pt="3%" pb="2%">
          <FiBox size={150} />
          <Text fontSize="25px">{t("no_up")}</Text>
        </Stack>
      )}
      <Pagination pageNum={5} currentPage={1} />
    </Stack>
  );
}
