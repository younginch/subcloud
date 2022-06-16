import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  List,
  ListItem,
  useDisclosure,
  useMediaQuery,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import Link from "next/link";
import { PageOptions } from "../utils/types";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaHeart } from "react-icons/fa";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPc] = useMediaQuery("(min-width: 700px)");
  const navHeight = "60px";

  return (
    <HStack>
      <ProSidebar collapsed={false}>
        <SidebarHeader>
          <Text>Header</Text>
        </SidebarHeader>
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
          <SubMenu title="Components" icon={<FaHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
        <SidebarFooter>
          <Text>Footer</Text>
        </SidebarFooter>
      </ProSidebar>
      ;{children}
    </HStack>
  );
}

UserLayout.options = { role: Role.User, hideTitle: true } as PageOptions;
