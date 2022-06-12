import { Stack, useColorModeValue } from "@chakra-ui/react";
import { Session } from "next-auth";
import { FaCube } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";
import Header from "./header";

type Props = {
  data: Session | null;
  children: React.ReactNode;
};

export default function PublicProfileLayout({ data, children }: Props) {
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  return (
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
      {children}
    </Stack>
  );
}
