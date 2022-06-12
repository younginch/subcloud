import { Badge } from "@chakra-ui/react";
import { UserTier } from "../../utils/tier";

type Props = {
  grade?: UserTier;
};

export default function GradeBadge({ grade }: Props) {
  let color = "gray";
  let isBadge = false;
  switch (grade) {
    case UserTier.Grandmaster:
      color = "red";
      isBadge = true;
      break;
    case UserTier.Master:
      color = "yellow";
      isBadge = true;
      break;
    case UserTier.Expert:
      color = "purple";
      isBadge = true;
      break;
    case UserTier.Specialist:
      color = "blue";
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
          {grade}
        </Badge>
      )}
    </>
  );
}
