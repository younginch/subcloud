import { Badge } from "@chakra-ui/react";

type Props = {
  grade?: string;
};

export default function GradeBadge({ grade }: Props) {
  let color = "gray";
  let isBadge = false;
  switch (grade) {
    case "Grandmaster":
      color = "red";
      isBadge = true;
      break;
    case "Master":
      color = "yellow";
      isBadge = true;
      break;
    case "Expert":
      color = "purple";
      isBadge = true;
      break;
    case "Specialist":
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
