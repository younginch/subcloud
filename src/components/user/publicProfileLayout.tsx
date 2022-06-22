import { Stack, useColorModeValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FaCube } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";
import { PublicProfileTab } from "../../utils/tabs";
import { ResUserSearch } from "../../utils/types";
import Header from "./header";

type Props = {
  currentTab: PublicProfileTab;
  user: ResUserSearch;
  children: React.ReactNode;
};

export default function PublicProfileLayout({
  currentTab,
  children,
  user,
}: Props) {
  const { data } = useSession();
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  return (
    <Stack>
      <Header
        backgroundHeader="https://demos.creative-tim.com/purity-ui-dashboard/static/media/ProfileBackground.4dc796b0.png"
        backgroundProfile={bgProfile}
        avatarImage={user.image ?? undefined}
        name={user.name ?? undefined}
        email={user.email ?? undefined}
        currentTab={currentTab}
        tabs={[
          {
            name: "OVERVIEW",
            router: "overview",
            icon: <FaCube width="100%" height="100%" />,
          },
          {
            name: "Subtitle",
            router: "subtitle",
            icon: <MdSubtitles width="100%" height="100%" />,
          },
          {
            name: "Request",
            router: "request",
            icon: <IoDocumentsSharp width="100%" height="100%" />,
          },
        ]}
      />
      {children}
    </Stack>
  );
}
