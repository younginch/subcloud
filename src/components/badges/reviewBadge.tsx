import { Badge } from "@chakra-ui/react";
import { ReviewType } from "@prisma/client";

type Props = {
  type: ReviewType;
};

export default function ReviewBadge({ type }: Props) {
  const badgeColor = (type: string) => {
    switch (type) {
      case "Mistranslation":
        return "teal";
      case "IncorrectTiming":
        return "blue";
      case "NoSubtitle":
        return "red";
      case "IncorrectTitle":
        return "orange";
      case "IncorrectLanguage":
        return "cyan";
      case "GuidelineViolation":
        return "purple";
      default:
        return "gray";
    }
  };

  return (
    <Badge borderRadius="5px" px="2" colorScheme={badgeColor(type)}>
      {type}
    </Badge>
  );
}
