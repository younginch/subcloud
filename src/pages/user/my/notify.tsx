import { Box, Text } from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { PageOptions } from "../../../utils/types";

export default function UserMyNotify() {
  return (
    <Box p={5}>
      <Text>여기에 알림센터</Text>
    </Box>
  );
}

UserMyNotify.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
