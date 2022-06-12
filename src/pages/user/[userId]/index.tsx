import {
  Avatar,
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
import { ImFileEmpty } from "react-icons/im";
import SubtitleDashboard from "../../../components/user/subtitleDashboard";
import PublicProfileLayout from "../../../components/user/publicProfileLayout";

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

  function onChangeTabIndex(index: number) {
    router.push(`/user/${router.query.userId}?tab=${TAB_LIST[index]}`);
  }

  function _getTabIndex() {
    if (router.query.tab === "request") {
      return 0;
    } else if (router.query.tab === "sub") {
      return 1;
    } else {
      return 0;
    }
  }

  return (
    <PublicProfileLayout data={data}>
      {subs.length > 0 ? (
        <SubtitleDashboard subs={subs} />
      ) : (
        <Stack alignItems="center" spacing={5} h="55vh">
          <ImFileEmpty size={80} />
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
