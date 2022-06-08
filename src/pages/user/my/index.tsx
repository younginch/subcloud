import { Heading } from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { PageOptions } from "../../../utils/types";

export default function UserMyIndex() {
  return <Heading>환영합니다.</Heading>;
}

UserMyIndex.options = { auth: Role.User } as PageOptions;
