import { Box, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import router from "next/router";
import UserRatingComponent from "./graphs/userRatingComponent";
import FulfilledGraph from "./graphs/fulfilledGraph";
import CardHeader from "./card/cardHeader";
import Card from "./card/card";
import SalesOverview from "./graphs/salesOverview";
import LineChart from "./graphs/lineChart";
import BarChart from "./graphs/barChart";
import GeneralTable from "../ranking/generalTable";
import { ResSubSearch } from "../../utils/types";
import ProfileSubtitleRow from "./profileSubtitleRow";
import UserActivity from "./graphs/userActivity";

type Props = {
  subs: ResSubSearch;
};

export default function SubtitleDashboard({ subs }: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("white", "#1F2733");
  const captions = ["#", "Title", "Channel", "Language", "Views", "Uploaded"];

  return (
    <>
      <Box
        pl={{ base: "25px", md: "40px", xl: "60px" }}
        pr={{ base: "25px", md: "40px", xl: "60px" }}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            xl: "0.8fr 1fr 0.7fr",
          }}
          my="26px"
          gap="18px"
        >
          <UserRatingComponent gridArea="2 / 1 / 3 / 2" />
          <FulfilledGraph />
          <Card gridArea={{ md: "2 / 3 / 3 / 4", "2xl": "auto" }}>
            <CardHeader mb="24px">
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="4px"
                >
                  자막 언어
                </Text>
              </Flex>
            </CardHeader>
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              h="100%"
            >
              <Text fontSize="60px" fontWeight="bold" color={textColor}>
                Korean
              </Text>
              <Text fontSize="30px" fontWeight="bold" color={textColor}>
                English
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
            title="하이라이트"
            percentage={23}
            chart={<BarChart />}
          />
          <SalesOverview
            title="Activity Overview"
            percentage={5}
            chart={<LineChart />}
          />
        </Grid>
        <Box
          mt={10}
          overflowX={{ sm: "scroll", xl: "hidden" }}
          bg={bgColor}
          borderRadius="20px"
        >
          <Text p="22px" fontSize="lg" color={textColor} fontWeight="bold">
            인기 자막
          </Text>
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
      </Box>
    </>
  );
}
function _getTabIndex(): number | undefined {
  throw new Error("Function not implemented.");
}
