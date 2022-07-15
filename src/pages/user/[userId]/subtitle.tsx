import PublicProfileLayout from "../../../components/user/publicProfileLayout";
import { PublicProfileTab } from "../../../utils/tabs";
import { PageOptions, ResSubSearch } from "../../../utils/types";
import { Box, Stack, Text } from "@chakra-ui/react";
import { FiBox } from "react-icons/fi";
import { GetServerSideProps } from "next";
import axios from "axios";
import GeneralTable from "../../../components/ranking/generalTable";
import ProfileSubtitleRow from "../../../components/user/profileSubtitleRow";
import router from "next/router";
import useTranslation from "next-translate/useTranslation";

type UserReadProps = {
  subs: ResSubSearch;
};

export default function UserSubtitle({ subs }: UserReadProps) {
  const { t } = useTranslation("publicProfile");
  const captions = [
    { caption: "#" },
    { caption: t("subtitleDashboard_title") },
    { caption: t("userId_madeby") },
    { caption: t("subtitleDashboard_language") },
    { caption: t("subtitleDashboard_views") },
    { caption: t("subtitleDashboard_uploaded") },
  ];
  return (
    <PublicProfileLayout currentTab={PublicProfileTab.Subtitle}>
      {subs?.length > 0 ? (
        <Box
          pl={{ base: "25px", md: "40px", xl: "60px" }}
          pr={{ base: "25px", md: "40px", xl: "60px" }}
          overflowX={{ base: "scroll", xl: "hidden" }}
        >
          <GeneralTable captions={captions}>
            {subs.map((sub, index) => {
              return (
                <ProfileSubtitleRow
                  rank={index + 1}
                  key={sub.id}
                  userId={
                    router.query.userId ? router.query.userId[0] : "Annonymous"
                  }
                  platform={sub.serviceId}
                  videoName={
                    sub.video.youtubeVideo
                      ? sub.video.youtubeVideo.title
                      : "(Unknown)"
                  }
                  videoUrl={sub.video.url}
                  channelName={
                    sub.video.youtubeVideo
                      ? sub.video.youtubeVideo.channel.title
                      : "(Unknown)"
                  }
                  channelUrl={
                    sub.video.youtubeVideo
                      ? sub.video.youtubeVideo.channel.channelUrl
                      : "(Unknown)"
                  }
                  channelImageUrl={
                    sub.video.youtubeVideo
                      ? sub.video.youtubeVideo.channel.thumbnailUrl
                      : "(Unknown)"
                  }
                  lang={sub.lang}
                  viewCount={sub.views}
                  uploadDate={sub.updatedAt.toString()}
                />
              );
            })}
          </GeneralTable>
        </Box>
      ) : (
        <Stack alignItems="center" spacing={5} h="55vh">
          <FiBox size={100} />
          <Text fontSize="20px">유저가 업로드한 자막이 없습니다</Text>
        </Stack>
      )}
    </PublicProfileLayout>
  );
}

export const getServerSideProps: GetServerSideProps<UserReadProps> = async (
  context
) => {
  const { userId } = context.query;
  const subsRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/public/search/sub?userId=${userId}&status=Approved`
  );
  return {
    props: {
      subs: subsRes.data,
    },
  };
};

UserSubtitle.options = {
  auth: false,
  hideTitle: true,
} as PageOptions;
