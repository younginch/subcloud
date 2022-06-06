import { Role } from "@prisma/client";
import { PageOptions } from "../../../utils/types";

export default function UserMyOrder() {
  return;
}

UserMyOrder.options = { auth: Role.User } as PageOptions;
