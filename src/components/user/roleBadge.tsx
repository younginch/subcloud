import { Badge } from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { UserTier } from "../../utils/tier";

type Props = {
  role?: Role;
};

export default function RoleBadge({ role }: Props) {
  let color = "gray";
  let isBadge = false;
  switch (role) {
    case Role.Admin:
      color = "gray";
      isBadge = true;
      break;
    case Role.Reviewer:
      color = "teal";
      isBadge = true;
      break;
  }
  return (
    <>
      {isBadge && (
        <Badge
          variant="subtle"
          colorScheme={color}
          fontSize={{ base: "sm", lg: "lg" }}
          textTransform="none"
        >
          {role}
        </Badge>
      )}
    </>
  );
}
