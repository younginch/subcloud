import { Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import {
  PageOptions,
  ResRequestSearch,
  ResSubSearch,
} from "../../../utils/types";
import { FiBox } from "react-icons/fi";
import SubtitleDashboard from "../../../components/user/subtitleDashboard";
import PublicProfileLayout from "../../../components/user/publicProfileLayout";
import { PublicProfileTab } from "../../../utils/tabs";

type UserReadProps = {
  requests: ResRequestSearch;
  subs: ResSubSearch;
};

export default function UserIndex({ requests, subs }: UserReadProps) {
  return (
    <PublicProfileLayout currentTab={PublicProfileTab.Overview}>
      {subs.length > 0 ? (
        <SubtitleDashboard subs={subs} />
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

UserIndex.options = {
  auth: false,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
