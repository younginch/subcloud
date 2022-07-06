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
import { PageOptions } from "../utils/types";
import {
  ProSidebar,
  Menu,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { SubcloudIcon } from "./icons/customIcons";
import { MdAttachMoney } from "react-icons/md";
import { useState } from "react";
import { RiAdminFill, RiSlideshow3Fill } from "react-icons/ri";
import { FaDatabase, FaUserCog } from "react-icons/fa";
import MyMenuItem from "./user/my/myMenuItem";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isPc] = useMediaQuery("(min-width: 850px)");
  const dashBoardItems = [
    {
      icon: <FaDatabase color="inherit" />,
      href: "/admin",
      text: "메인",
    },
    { icon: <FaUserCog />, href: "/admin/user", text: "사용자" },
    { icon: <MdAttachMoney />, href: "/admin/settle", text: "수익정산" },
    { icon: <RiSlideshow3Fill />, href: "/admin/example", text: "예시영상" },
    {
      icon: <RiSlideshow3Fill />,
      href: "/admin/withdraw",
      text: "포인트 송금",
    },
    { icon: <RiSlideshow3Fill />, href: "/admin/notice", text: "공지하기" },
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
          <Stack pt="25px" alignItems="center">
            <RiAdminFill size={30} />
          </Stack>
          <Center p="10px" pb="20px">
            <Text
              fontSize="18px"
              fontWeight="bold"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              관리자 대시보드
            </Text>
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
          <Box h={`calc(90vh - ${145 + dashBoardItems.length * 50}px)`} />
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

AdminLayout.options = { role: Role.Admin, hideTitle: true } as PageOptions;
