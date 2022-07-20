import { Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { FiBox } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
import { PageOptions, ResSubSearch, ResUserSearch } from "../../../utils/types";
import SubtitleDashboard from "../../../components/user/subtitleDashboard";
import PublicProfileLayout from "../../../components/user/publicProfileLayout";
import { PublicProfileTab } from "../../../utils/tabs";

type UserReadProps = {
  user: ResUserSearch;
  subs: ResSubSearch;
};

export default function UserIndex({ user, subs }: UserReadProps) {
  const { t } = useTranslation("publicProfile");
  return (
    <PublicProfileLayout currentTab={PublicProfileTab.Overview}>
      {subs.length > 0 ? (
        <SubtitleDashboard user={user} subs={subs} />
      ) : (
        <Stack alignItems="center" spacing={5} h="55vh">
          <FiBox size={100} />
          <Text fontSize="20px">{t("dashboard_middle")}</Text>
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
    `${process.env.NEXTAUTH_URL}/api/public/search/user?userId=${userId}`
  );
  const subRes = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/public/search/sub?userId=${userId}&status=Approved`
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
