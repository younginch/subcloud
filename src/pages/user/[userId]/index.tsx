import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import RequestPanel from "../../../components/user/requestPanel";
import SubPanel from "../../../components/user/subPanel";
import {
  PageOptions,
  ResRequestSearch,
  ResSubSearch,
} from "../../../utils/types";
import Header from "../../../components/user/header";
import { FaCube } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";
import Card from "../../../components/user/card/card";
import CardHeader from "../../../components/user/card/cardHeader";
import ActiveUsers from "../../../components/user/graphs/activeUsers";
import SalesOverview from "../../../components/user/graphs/salesOverview";
import BarChart from "../../../components/user/graphs/barChart";
import LineChart from "../../../components/user/graphs/lineChart";
import SatisfactionRate from "../../../components/user/graphs/satisfactionRate";
import FulfilledGraph from "../../../components/user/graphs/fulfilledGraph";

const TAB_LIST = ["request", "sub"];

type UserReadProps = {
  requests: ResRequestSearch;
  subs: ResSubSearch;
};

export default function UserRead({ requests, subs }: UserReadProps) {
  const textColor = useColorModeValue("gray.700", "gray.300");

  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const router = useRouter();
  const { data } = useSession();

  function _getTabIndex() {
    if (router.query.tab === "request") {
      return 0;
    } else if (router.query.tab === "sub") {
      return 1;
    } else {
      return 0;
    }
  }

  function onChangeTabIndex(index: number) {
    router.push(`/user/${router.query.userId}?tab=${TAB_LIST[index]}`);
  }

  return (
    <>
      <Stack>
        <Header
          backgroundHeader="https://demos.creative-tim.com/purity-ui-dashboard/static/media/ProfileBackground.4dc796b0.png"
          backgroundProfile={bgProfile}
          avatarImage={data?.user.image ?? undefined}
          name={data?.user.name ?? undefined}
          email={data?.user.email ?? undefined}
          tabs={[
            {
              name: "OVERVIEW",
              router: "overview",
              icon: <FaCube width="100%" height="100%" />,
            },
            {
              name: "Subtitles",
              router: "subtitles",
              icon: <MdSubtitles width="100%" height="100%" />,
            },
            {
              name: "Request",
              router: "request",
              icon: <IoDocumentsSharp width="100%" height="100%" />,
            },
          ]}
        />
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
            <SatisfactionRate gridArea="2 / 1 / 3 / 2" />
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
                    Favorite language
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
                <Center>
                  <Text fontSize="60px" fontWeight="bold" color={textColor}>
                    Korean
                  </Text>
                </Center>
              </Flex>
            </Card>
          </Grid>
          <Grid
            templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
            templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
            gap="24px"
            mb={{ lg: "26px" }}
          >
            <ActiveUsers
              title="Active Users"
              percentage={23}
              chart={<BarChart />}
            />
            <SalesOverview
              title="Activity Overview"
              percentage={5}
              chart={<LineChart />}
            />
          </Grid>
        </Box>
      </Stack>
      <HStack marginBottom="18px">
        <Avatar
          size="2xl"
          name={data?.user.name ?? undefined}
          src={data?.user.image ?? undefined}
        />
        <Stack>
          <Text>{data?.user.name}</Text>
          <Text>{data?.user.email}</Text>
          <Text>{data?.user.role}</Text>
          <Text>{data?.user.point} 포인트</Text>
        </Stack>
      </HStack>
      <Tabs isLazy index={_getTabIndex()} onChange={onChangeTabIndex}>
        <TabList>
          <Tab>자막 요청</Tab>
          <Tab>영상 자막</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RequestPanel requests={requests} />
          </TabPanel>
          <TabPanel>
            <SubPanel subs={subs} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<UserReadProps> = async (
  context
) => {
  const { userId } = context.query;
  const requestsRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/request/search?userId=${userId}`
  );
  const subsRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/sub/search?userId=${userId}`
  );
  return {
    props: {
      requests: requestsRes.data,
      subs: subsRes.data,
    },
  };
};

UserRead.options = {
  auth: false,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
