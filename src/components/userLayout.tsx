import {
  Button,
  HStack,
  ListItem,
  useMediaQuery,
  Box,
  Center,
  Stack,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import Link from "next/link";
import router from "next/router";
import { PageOptions } from "../utils/types";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { SubcloudIcon } from "./icons/customIcons";
import { MdSpaceDashboard, MdSubtitles } from "react-icons/md";
import { useState } from "react";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { AiOutlineHistory, AiTwotoneSetting } from "react-icons/ai";
import { RiFeedbackFill } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";

type UserMenuProps = {
  href: string;
  title: string;
};

function UserMenu({ href, title }: UserMenuProps) {
  return (
    <ListItem>
      <Link href={href} passHref>
        <Button
          variant="ghost"
          w="100%"
          flexDirection="column"
          alignItems="start"
        >
          {title}
        </Button>
      </Link>
    </ListItem>
  );
}

type UserLayoutProps = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isPc] = useMediaQuery("(min-width: 700px)");
  const navHeight = "60px";

  return (
    <HStack h="100%">
      <ProSidebar
        collapsed={collapsed}
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
          <MenuItem
            icon={<MdSpaceDashboard />}
            onClick={() => router.push("/user/my")}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<IoIosSend />}
            onClick={() => router.push("/user/my/request")}
          >
            My requests
          </MenuItem>
          <MenuItem
            icon={<AiOutlineHistory />}
            onClick={() => router.push("/user/my/history")}
          >
            History
          </MenuItem>
          <MenuItem
            icon={<MdSubtitles />}
            onClick={() => router.push("/user/my/sub")}
          >
            My Subtitles
          </MenuItem>
          <MenuItem
            icon={<BiPurchaseTagAlt />}
            onClick={() => router.push("/user/my/order")}
          >
            Orders
          </MenuItem>
          <MenuItem
            icon={<BiPurchaseTagAlt />}
            onClick={() => router.push("/user/my/withdraw")}
          >
            Withdraw
          </MenuItem>
          <Box h="calc(90vh - 435px)" />
          <MenuItem
            icon={<AiTwotoneSetting />}
            onClick={() => router.push("/user/my/settings")}
          >
            Settings
          </MenuItem>
          <MenuItem
            icon={<RiFeedbackFill />}
            onClick={() => router.push("/user/my/feedback")}
          >
            Send Feedback
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
