import {
  HStack,
  useMediaQuery,
  Box,
  Center,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import router from "next/router";
import { PageOptions } from "../../../utils/types";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { SubcloudIcon } from "../../icons/customIcons";
import { MdSpaceDashboard, MdSubtitles } from "react-icons/md";
import { useState } from "react";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { AiOutlineHistory, AiTwotoneSetting } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import MyMenuItem from "./myMenuItem";

type UserLayoutProps = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isPc] = useMediaQuery("(min-width: 850px)");
  const dashBoardItems = [
    {
      icon: <MdSpaceDashboard color="inherit" />,
      href: "/user/my",
      text: "Dashboard",
    },
    { icon: <IoIosSend />, href: "/user/my/request", text: "My requests" },
    { icon: <AiOutlineHistory />, href: "/user/my/history", text: "History" },
    { icon: <MdSubtitles />, href: "/user/my/sub", text: "My Subtitles" },
    { icon: <BiPurchaseTagAlt />, href: "/user/my/order", text: "Orders" },
    {
      icon: <BiPurchaseTagAlt />,
      href: "/user/my/withdraw",
      text: "Withdraws",
    },
  ];

  return (
    <HStack h="100%" overflowX="auto">
      <ProSidebar
        collapsed={collapsed && !isPc}
        onMouseEnter={() => {
          setCollapsed(false);
        }}
        onMouseLeave={() => setCollapsed(true)}
      >
        <SidebarHeader>
          <Center>
            <Box p="10px">
              <MdSpaceDashboard size={30} />
            </Box>
          </Center>
        </SidebarHeader>
        <Menu iconShape="circle">
          {dashBoardItems.map((element) => {
            return (
              <MyMenuItem
                key={element.text}
                active={element.href === router.pathname}
                icon={element.icon}
                href={element.href}
                text={element.text}
              />
            );
          })}
          <Box h={`calc(90vh - ${135 + dashBoardItems.length * 50}px)`} />
          <MenuItem
            icon={<AiTwotoneSetting />}
            onClick={() => router.push("/user/my/settings")}
          >
            Settings
          </MenuItem>
        </Menu>
        <SidebarFooter>
          <Stack alignItems="center" p="5px">
            <SubcloudIcon size="40px" fill="#adadad" />
          </Stack>
        </SidebarFooter>
      </ProSidebar>
      <Box h="90vh">{children}</Box>
    </HStack>
  );
}

UserLayout.options = { role: Role.User, hideTitle: true } as PageOptions;
