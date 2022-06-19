import { Badge } from "@chakra-ui/react";
import { SubStatus } from "@prisma/client";

type Props = {
  status?: SubStatus;
};

export default function ReviewStatusBadge({ status }: Props) {
  let color = "red";
  let isBadge = true;
  switch (status) {
    case SubStatus.Approved:
      color = "green";
      break;
    case SubStatus.InReview:
      color = "blue";
      break;
    case SubStatus.Pending:
      color = "gray";
      break;
    case SubStatus.Private:
      color = "orange";
      break;
    case SubStatus.Rejected:
      color = "red";
      break;
    case SubStatus.Reported:
      color = "red";
      break;
    default:
      isBadge = false;
  }
  return (
    <>
      {isBadge && (
        <Badge
          variant="subtle"
          colorScheme={color}
          fontSize="sm"
          textTransform="none"
        >
          {status}
        </Badge>
      )}
    </>
  );
}
