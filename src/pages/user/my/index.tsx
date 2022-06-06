import { Role } from "@prisma/client";
import { PageOptions } from "../../../utils/types";

export default function UserMyIndex() {}

UserMyIndex.options = { auth: Role.User } as PageOptions;
