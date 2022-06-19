import { Badge } from "@chakra-ui/react";
import { UserTier } from "../../utils/tier";

type Props = {
  tier?: UserTier;
};

export default function TierBadge({ tier }: Props) {
  let color = "gray";
  let isBadge = false;
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
          {tier}
        </Badge>
      )}
    </>
  );
}
