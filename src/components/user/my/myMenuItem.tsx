import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
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
  href, // internal link
  text,
}: MyMenuItemProps) {
  return (
    <Box color={active ? "white" : ""}>
      <Link href={href}>
        <MenuItem icon={icon}>
          <Text fontWeight={active ? "bold" : "normal"}>{text}</Text>
        </MenuItem>
      </Link>
    </Box>
  );
}
