import {
  Avatar,
  Box,
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

const TAB_LIST = ["request", "sub"];

type UserReadProps = {
  requests: ResRequestSearch;
  subs: ResSubSearch;
};

export default function UserRead({ requests, subs }: UserReadProps) {
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
          bg="gray.200"
        >
          <Stack>
            <Text>여기에 유저 프로필 대시보드 내용</Text>
            <Text>/overview : 대시보드 전체 요약</Text>
            <Text>/sub : 유저가 제작한 자막들</Text>
            <Text>/request : 자막 제작 의뢰</Text>
          </Stack>
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
