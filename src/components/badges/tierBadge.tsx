import { Badge } from "@chakra-ui/react";
import { UserTier } from "../../utils/enums";

type Props = {
  tier?: UserTier;
};

export default function TierBadge({ tier }: Props) {
  let color = "gray";
  let isBadge;
  switch (tier) {
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
    default:
      isBadge = false;
  }

  if (isBadge) {
    return (
      <Badge
        variant="subtle"
        colorScheme={color}
        fontSize={{ base: "sm", lg: "lg" }}
        textTransform="none"
      >
        {tier}
      </Badge>
    );
  }
}
