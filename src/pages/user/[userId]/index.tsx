import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Spacer,
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
import { IoDocumentsSharp, IoEllipsisHorizontal } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";
import Card from "../../../components/card/card";
import CardBody from "../../../components/card/cardBody";
import { BsArrowRight } from "react-icons/bs";
import IconBox from "../../../components/icons/iconBox";
import CardHeader from "../../../components/card/cardHeader";
import * as GradientProgress from "@delowar/react-circle-progressbar";
import { BiHappy } from "react-icons/bi";
import { text } from "stream/consumers";

const TAB_LIST = ["request", "sub"];

type UserReadProps = {
  requests: ResRequestSearch;
  subs: ResSubSearch;
};

export default function UserRead({ requests, subs }: UserReadProps) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

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
          backgroundHeader="../../../../public/assets/ProfileBackground.png"
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
          ml={{ base: "5px", md: "10px", xl: "15px" }}
          mr={{ base: "5px", md: "10px", xl: "15px" }}
        >
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              "2xl": "2fr 1.2fr 1.5fr",
            }}
            my="26px"
            gap="18px"
          >
            {/* Satisfaction Rate */}
            <Card gridArea={{ md: "2 / 1 / 3 / 2", "2xl": "auto" }}>
              <CardHeader mb="24px">
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="bold"
                    mb="4px"
                  >
                    Satisfaction Rate
                  </Text>
                  <Text color={subTextColor} fontSize="sm">
                    From all projects
                  </Text>
                </Flex>
              </CardHeader>
              <Flex
                direction="column"
                justify="center"
                align="center"
                position="relative"
              >
                <Box zIndex="-1" bg="">
                  <GradientProgress
                    percent={80}
                    viewport
                    size={200}
                    isGradient
                    gradient={{
                      angle: 90,
                      startColor: "rgba(117, 81, 255, 0)",
                      stopColor: "#582CFF",
                    }}
                    emptyColor="#22234B"
                  >
                    <IconBox
                      bg="brand.200"
                      borderRadius="50%"
                      w="48px"
                      h="48px"
                      transform={{
                        sm: "translateY(-60%)",
                        md: "translateY(-30%)",
                      }}
                    >
                      <Icon as={BiHappy} color={textColor} w="30px" h="30px" />
                    </IconBox>
                  </GradientProgress>
                </Box>
                <Stack
                  direction="row"
                  spacing={{ sm: "42px", md: "68px" }}
                  justify="center"
                  maxW={{ sm: "270px", md: "300px", lg: "100%" }}
                  mx={{ sm: "auto", md: "0px" }}
                  p="18px 22px"
                  bg={useColorModeValue(
                    "linear-gradient(127.09deg, rgba(79, 209, 197, 1) 25.41%, rgba(139, 225, 217, 1) 59.65%)",
                    "linear-gradient(126.97deg, rgb(6, 11, 40) 28.26%, rgba(10, 14, 35) 91.2%)"
                  )}
                  borderRadius="20px"
                  position="absolute"
                  bottom="0%"
                >
                  <Text fontSize="xs" color="gray.400">
                    0%
                  </Text>
                  <Flex direction="column" align="center" minW="80px">
                    <Text color="#fff" fontSize="28px" fontWeight="bold">
                      95%
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      Based on likes
                    </Text>
                  </Flex>
                  <Text fontSize="xs" color="gray.400">
                    100%
                  </Text>
                </Stack>
              </Flex>
            </Card>
            {/* Referral Tracking */}
            <Card
              gridArea={{ md: "2 / 2 / 3 / 3", "2xl": "auto" }}
              color={textColor}
            >
              <Flex direction="column">
                <Flex justify="space-between" align="center" mb="40px">
                  <Text color="inherit" fontSize="lg" fontWeight="bold">
                    Referral Tracking
                  </Text>
                  <Button
                    borderRadius="12px"
                    w="38px"
                    h="38px"
                    bg="transparent"
                  >
                    <Icon as={IoEllipsisHorizontal} color="#7551FF" />
                  </Button>
                </Flex>
                <Flex direction={{ sm: "column", md: "row" }}>
                  <Flex
                    direction="column"
                    me={{ md: "6px", lg: "52px" }}
                    mb={{ sm: "16px", md: "0px" }}
                  >
                    <Flex
                      direction="column"
                      p="22px"
                      pe={{ sm: "22e", md: "8px", lg: "22px" }}
                      minW={{ sm: "220px", md: "140px", lg: "220px" }}
                      bg="linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)"
                      borderRadius="20px"
                      mb="20px"
                    >
                      <Text color="gray.400" fontSize="sm" mb="4px">
                        Invited
                      </Text>
                      <Text color="#fff" fontSize="lg" fontWeight="bold">
                        145 people
                      </Text>
                    </Flex>
                    <Flex
                      direction="column"
                      p="22px"
                      pe={{ sm: "22px", md: "8px", lg: "22px" }}
                      minW={{ sm: "170px", md: "140px", lg: "170px" }}
                      bg="linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)"
                      borderRadius="20px"
                    >
                      <Text color="gray.400" fontSize="sm" mb="4px">
                        Bonus
                      </Text>
                      <Text color="#fff" fontSize="lg" fontWeight="bold">
                        1,465
                      </Text>
                    </Flex>
                  </Flex>
                  <Box mx={{ sm: "auto", md: "0px" }}>
                    <GradientProgress
                      percent={70}
                      viewport
                      size={
                        window.innerWidth >= 1024
                          ? 200
                          : window.innerWidth >= 768
                          ? 170
                          : 200
                      }
                      isGradient
                      gradient={{
                        angle: 90,
                        startColor: "rgba(5, 205, 153, 0)",
                        stopColor: "#05CD99",
                      }}
                      emptyColor="transparent"
                    >
                      <Flex direction="column" justify="center" align="center">
                        <Text color="gray.400" fontSize="sm" mb="4px">
                          Safety
                        </Text>
                        <Text
                          color="inherit"
                          fontSize={{ md: "36px", lg: "50px" }}
                          fontWeight="bold"
                          mb="4px"
                        >
                          9.3
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                          Total Score
                        </Text>
                      </Flex>
                    </GradientProgress>
                  </Box>
                </Flex>
              </Flex>
            </Card>
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

UserRead.options = { auth: false, hideTitle: true } as PageOptions;
