import { Badge } from "@chakra-ui/react";
import { Role } from "@prisma/client";

type Props = {
  role?: Role;
};

export default function RoleBadge({ role }: Props) {
  let color = "gray";
  let isBadge;
  switch (role) {
    case Role.Admin:
      color = "gray";
      isBadge = true;
      break;
    case Role.Reviewer:
      color = "teal";
      isBadge = true;
      break;
    default:
      isBadge = false;
      break;
  }

  if (!isBadge) {
    return null;
  }
  return (
    <Badge
      variant="subtle"
      colorScheme={color}
      fontSize={{ base: "sm", lg: "lg" }}
      textTransform="none"
    >
      {role}
    </Badge>
  );
}
