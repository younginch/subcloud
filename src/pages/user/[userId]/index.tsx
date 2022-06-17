import { Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { PageOptions, ResSubSearch, ResUserSearch } from "../../../utils/types";
import { FiBox } from "react-icons/fi";
import SubtitleDashboard from "../../../components/user/subtitleDashboard";
import PublicProfileLayout from "../../../components/user/publicProfileLayout";
import { PublicProfileTab } from "../../../utils/tabs";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

type UserReadProps = {
  user: ResUserSearch;
  subs: ResSubSearch;
};

export default function UserIndex({ user, subs }: UserReadProps) {
  const [subArray, setSubArray] = useState([]);
  const [viewArray, setViewArray] = useState([]);
  const subCount = 200;
  const lineCount = 10;

  useEffect(() => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    console.log(dayjs());
    axios
      .get(
        `/api/stats/sub?userId=${user.id}&cnt=${subCount}&date=${currentDate}`
      )
      .then((res) => {
        setSubArray(res.data);
      });
    axios
      .get(
        `/api/stats/view?userId=${user.id}&cnt=${lineCount}&date=${currentDate}`
      )
      .then((res) => {
        setViewArray(res.data);
      });
  }, [user.id]);

  return (
    <PublicProfileLayout currentTab={PublicProfileTab.Overview}>
      {subs.length > 0 ? (
        <SubtitleDashboard
          user={user}
          subs={subs}
          subArray={subArray}
          subCount={subCount}
          viewArray={viewArray}
          lineCount={lineCount}
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
