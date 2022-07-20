import { Box, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import ISO6391 from "iso-639-1";
import router from "next/router";
import UserRatingComponent from "./graphs/userRatingComponent";
import FulfilledGraph from "./graphs/fulfilledGraph";
import CardHeader from "./card/cardHeader";
import Card from "./card/card";
import SalesOverview from "./graphs/salesOverview";
import LineChart from "./graphs/lineChart";
import GeneralTable from "../ranking/generalTable";
import { ResSubSearch, ResUserSearch } from "../../utils/types";
import ProfileSubtitleRow from "./profileSubtitleRow";
import UserActivity from "./graphs/userActivity";
import CalendarChart from "./graphs/calanderChart";
import useTranslation from "next-translate/useTranslation";

type Props = {
  user: ResUserSearch;
  subs: ResSubSearch;
};
export default function SubtitleDashboard({ user, subs }: Props) {
  const { t } = useTranslation("publicProfile");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const bgColor = useColorModeValue("white", "#1F2733");
  const captions = [
    { caption: "#" },
    { caption: t("subtitleDashboard_title") },
    { caption: t("subtitleDashboard_channel") },
    { caption: t("subtitleDashboard_language") },
    { caption: t("subtitleDashboard_views") },
    { caption: t("subtitleDashboard_uploaded") },
  ];
  const langsMap = new Map();
  for (let i = 0; i < subs.length; i += 1) {
    const { lang } = subs[i];
    const num = langsMap.get(lang);
    if (num) langsMap.set(lang, num + 1);
    else langsMap.set(lang, 1);
  }
  const sortLangsMap = new Map([...langsMap].sort((a, b) => b[1] - a[1]));
  const langs = [...sortLangsMap.keys()];

  return (
    <>
      <Box
        pl={{ base: "15px", md: "40px", xl: "60px" }}
        pr={{ base: "15px", md: "40px", xl: "60px" }}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            xl: "0.8fr 1fr 0.7fr",
          }}
          my="26px"
          gap="18px"
        >
          <UserRatingComponent
            gridArea="2 / 1 / 3 / 2"
            rating={user._count.ratings}
            percentage={user._percentage.rating}
          />
          <FulfilledGraph
            fulfilledRequest={user._count.fulfilledRequests}
            percentage={user._percentage.fulfilledRequest}
          />
          <Card gridArea={{ md: "2 / 3 / 3 / 4", "2xl": "auto" }}>
            <CardHeader mb="24px">
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="4px"
                >
                  {t("subtitleDashboard_lang")}
                </Text>
                <Text color={subTextColor} fontSize="sm">
                  Top 3 Language
                </Text>
              </Flex>
            </CardHeader>
            <Flex
              direction="column"
              align="center"
              position="relative"
              h="100%"
              color={textColor}
              fontWeight="bold"
            >
              <Text fontSize="60px" mt={5}>
                {langs[0] && ISO6391.getNativeName(langs[0])}
              </Text>
              <Text fontSize="30px">
                {langs[1] && ISO6391.getNativeName(langs[1])}
              </Text>
              <Text fontSize="15px">
                {langs[2] && ISO6391.getNativeName(langs[2])}
              </Text>
            </Flex>
          </Card>
        </Grid>
        <Grid
          templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
          templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
          gap="24px"
          mb={{ lg: "26px" }}
        >
          <UserActivity
            title={t("subtitleDashboard_highlight")}
            chart={<CalendarChart range={200} type={"day"} userId={user.id} />}
            subs={user._count.subs}
            views={user._count.views}
          />
          <SalesOverview
            title={t("subtitleDashboard_activity_overview")}
            percentage={5}
            chart={
              <LineChart
                range={10}
                type={"day"}
                subId={undefined}
                userId={user.id}
              />
            }
          />
        </Grid>
        <Box mt={10} pb="20px" bg={bgColor} borderRadius="20px">
          <Text p="22px" fontSize="lg" color={textColor} fontWeight="bold">
            {t("subtitleDashboard_popular_sub")}
          </Text>
          <Box overflow={{ base: "scroll", lg: "hidden" }}>
            <GeneralTable captions={captions}>
              {subs.map((sub, index) => {
                return (
                  <ProfileSubtitleRow
                    rank={index + 1}
                    key={sub.id}
                    userId={
                      router.query.userId
                        ? router.query.userId[0]
                        : "Annonymous"
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
                    uploadDate={sub.createdAt.toString()}
                  />
                );
              })}
            </GeneralTable>
          </Box>
        </Box>
      </Box>
    </>
  );
}
