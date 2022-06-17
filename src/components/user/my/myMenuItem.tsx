import { Box, Text } from "@chakra-ui/react";
import router from "next/router";
import { MenuItem } from "react-pro-sidebar";

type MyMenuItemProps = {
  active: boolean;
  icon: React.ReactNode;
  href: string;
  text: string;
};

export default function MyMenuItem({
  active,
  icon,
  href,
  text,
}: MyMenuItemProps) {
  return (
    <Box color={active ? "white" : ""}>
      <MenuItem icon={icon} onClick={() => router.push(href)}>
        <Text fontWeight={active ? "bold" : "normal"}>{text}</Text>
      </MenuItem>
    </Box>
  );
}
