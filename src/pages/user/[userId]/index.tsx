import { Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { PageOptions, ResSubSearch, ResUserSearch } from "../../../utils/types";
import { FiBox } from "react-icons/fi";
import SubtitleDashboard from "../../../components/user/subtitleDashboard";
import PublicProfileLayout from "../../../components/user/publicProfileLayout";
import { PublicProfileTab } from "../../../utils/tabs";
import dayjs from "dayjs";
import useSWR from "swr";

type UserReadProps = {
  user: ResUserSearch;
  subs: ResSubSearch;
};

export default function UserIndex({ user, subs }: UserReadProps) {
  const subRange = 200;
  const lineRange = 10;
  const currentDate = dayjs().format("YYYY-MM-DD");
  const { data: subArray, error: subError } = useSWR(
    `/api/stats/sub?userId=${user.id}&cnt=${subRange}&date=${currentDate}`
  );
  const { data: viewArray, error: viewError } = useSWR(
    `/api/stats/view?userId=${user.id}&cnt=${lineRange}&date=${currentDate}`
  );

  return (
    <PublicProfileLayout currentTab={PublicProfileTab.Overview}>
      {subs.length > 0 && subArray && viewArray ? (
        <SubtitleDashboard
          user={user}
          subs={subs}
          subArray={subArray}
          subRange={subRange}
          viewArray={viewArray}
          lineRange={lineRange}
        />
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
  const userRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/user/search?userId=${userId}`
  );
  const subRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/sub/search?userId=${userId}&status=Approved`
  );
  return {
    props: {
      user: userRes.data,
      subs: subRes.data,
    },
  };
};

UserIndex.options = {
  auth: false,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
