import { Stack, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FaCube } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";
import useSWR from "swr";
import { PublicProfileTab } from "../../utils/tabs";
import Header from "./header";

type Props = {
  currentTab: PublicProfileTab;
  children: React.ReactNode;
};

export default function PublicProfileLayout({ currentTab, children }: Props) {
  const { t } = useTranslation("publicProfile");
  const router = useRouter();
  const { data: user } = useSWR(`/api/user?id=${router.query.userId}`);
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  return (
    <Stack mb={12}>
      <Header
        backgroundHeader="https://demos.creative-tim.com/purity-ui-dashboard/static/media/ProfileBackground.4dc796b0.png"
        backgroundProfile={bgProfile}
        avatarImage={user?.image ?? undefined}
        name={user?.name ?? undefined}
        email={user?.email ?? undefined}
        currentTab={currentTab}
        tabs={[
          {
            name: t("dashboard_header_overview"),
            router: "overview",
            icon: <FaCube width="100%" height="100%" />,
          },
          {
            name: t("dashboard_header_subtitle"),
            router: "subtitle",
            icon: <MdSubtitles width="100%" height="100%" />,
          },
          {
            name: t("dashboard_header_request"),
            router: "request",
            icon: <IoDocumentsSharp width="100%" height="100%" />,
          },
        ]}
      />
      {children}
    </Stack>
  );
}
