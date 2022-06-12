import { Role } from "@prisma/client";

function changeRoleToNumber(role: Role): number {
  switch (role) {
    case Role.Admin:
      return 3;
    case Role.Reviewer:
      return 2;
    case Role.User:
      return 1;
    case Role.Restricted:
      return 0;
  }
}

export default function isRightRole(requested: Role, required: Role): boolean {
  return changeRoleToNumber(requested) >= changeRoleToNumber(required);
}
