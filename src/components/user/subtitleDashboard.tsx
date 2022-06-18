import { Box, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
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

type Props = {
  user: ResUserSearch;
  subs: ResSubSearch;
  subArray: Array<number>;
  subRange: number;
  viewArray: Array<number>;
  lineRange: number;
};
export default function SubtitleDashboard({
  user,
  subs,
  subArray,
  subRange,
  viewArray,
  lineRange,
}: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const bgColor = useColorModeValue("white", "#1F2733");
  const captions = ["#", "Title", "Channel", "Language", "Views", "Uploaded"];

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
                  자막 언어
                </Text>
                <Text color={subTextColor} fontSize="sm">
                  Top 3 language
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
                Korean
              </Text>
              <Text fontSize="30px">English</Text>
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
            chart={<CalendarChart subRange={subRange} subArray={subArray} />}
            subs={user._count.subs}
            views={user._count.views}
          />
          <SalesOverview
            title="Activity Overview"
            percentage={5}
            chart={<LineChart lineRange={lineRange} viewArray={viewArray} />}
          />
        </Grid>
        <Box mt={10} bg={bgColor} borderRadius="20px">
          <Text p="22px" fontSize="lg" color={textColor} fontWeight="bold">
            인기 자막
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
