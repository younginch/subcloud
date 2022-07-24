import { Text, Stack, HStack, Badge } from "@chakra-ui/react";
import { Review, ReviewType, SubStatus } from "@prisma/client";
import ReviewStatusBadge from "../badges/reviewStatusBadge";

type ReviewElementType = {
  status: SubStatus;
  contents: Review[];
};

type ReviewRowType = {
  review: ReviewElementType;
};

function ReviewRow({ review }: ReviewRowType) {
  return (
    <Stack>
      <HStack>
        <ReviewStatusBadge status={review.status} />
        <Text>2022/10/21</Text>
      </HStack>
      {review.contents.map((content: Review) => (
        <HStack key={content.id} pl={10}>
          <Badge>
            {content.startTime}-{content.endTime}
          </Badge>
          <Text>{content.content}</Text>
        </HStack>
      ))}
    </Stack>
  );
}

export default function BreifReviews() {
  const reviews: ReviewElementType[] = [
    {
      status: SubStatus.Rejected,
      contents: [
        {
          id: "1",
          reviewerId: "red",
          subId: "12",
          type: ReviewType.IncorrectTiming,
          content: "hi",
          startTime: 123,
          endTime: 345,
          resolved: false,
        },
        {
          id: "1",
          reviewerId: "red",
          subId: "12",
          type: ReviewType.IncorrectTiming,
          content: "hi",
          startTime: 123,
          endTime: 345,
          resolved: false,
        },
      ],
    },
    {
      status: SubStatus.Rejected,
      contents: [
        {
          id: "1",
          reviewerId: "red",
          subId: "12",
          type: ReviewType.IncorrectTiming,
          content: "hi",
          startTime: 123,
          endTime: 345,
          resolved: false,
        },
        {
          id: "1",
          reviewerId: "red",
          subId: "12",
          type: ReviewType.IncorrectTiming,
          content: "hi",
          startTime: 123,
          endTime: 345,
          resolved: false,
        },
      ],
    },
    {
      status: SubStatus.Approved,
      contents: [],
    },
  ];
  return (
    <Stack>
      {reviews.map((review, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ReviewRow review={review} key={index} />
      ))}
    </Stack>
  );
}
