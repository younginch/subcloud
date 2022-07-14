import { HStack, useMediaQuery, Box, Center, Stack } from "@chakra-ui/react";
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
import { BsCashStack } from "react-icons/bs";
import useTranslation from "next-translate/useTranslation";

type UserLayoutProps = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  const { t } = useTranslation("privateProfile");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isPc] = useMediaQuery("(min-width: 850px)");
  const dashBoardItems = [
    {
      icon: <MdSpaceDashboard color="inherit" />,
      href: "/user/my",
      text: t("dashboard"),
    },
    { icon: <IoIosSend />, href: "/user/my/request", text: t("my_request") },
    {
      icon: <AiOutlineHistory />,
      href: "/user/my/history",
      text: t("history"),
    },
    { icon: <MdSubtitles />, href: "/user/my/sub", text: t("my_sub") },
    { icon: <BiPurchaseTagAlt />, href: "/user/my/order", text: t("orders") },
    {
      icon: <BsCashStack />,
      href: "/user/my/withdraw",
      text: t("withdraws"),
    },
  ];

  return (
    <HStack h="100%" overflowX="auto" alignItems="flex-start">
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
          <Box h={`calc(90vh - ${94 + dashBoardItems.length * 50}px)`} />
        </Menu>
        <SidebarFooter>
          <Stack alignItems="center" p="5px">
            <SubcloudIcon size="40px" fill="#adadad" />
          </Stack>
        </SidebarFooter>
      </ProSidebar>
      <Box maxH="93vh" m="0px !important" w="100%" overflowY="hidden">
        {children}
      </Box>
    </HStack>
  );
}

UserLayout.options = { role: Role.User, hideTitle: true } as PageOptions;
