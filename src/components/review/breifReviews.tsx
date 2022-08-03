import { Text, Stack, HStack, Badge } from "@chakra-ui/react";
import { Review, ReviewContent } from "@prisma/client";
import dayjs from "dayjs";
import useSWR from "swr";
import ReviewStatusBadge from "../badges/reviewStatusBadge";

type ReviewWithContent = Review & { reviewContents?: ReviewContent[] };

type ReviewRowType = {
  review: ReviewWithContent;
};

type Props = {
  subId: string;
};

function ReviewRow({ review }: ReviewRowType) {
  return (
    <Stack>
      <HStack>
        <ReviewStatusBadge status={review.status} />
        <Text>{dayjs(review.createdAt).format("YYYY-MM-DD HH:mm:ss")}</Text>
      </HStack>
      {review.status !== "InReview" &&
        review.reviewContents?.map((content: ReviewContent) => (
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

export default function BreifReviews({ subId }: Props) {
  const { data: reviews } = useSWR<ReviewWithContent[]>(
    `/api/review?subId=${subId}`
  );
  return (
    <Stack>
      {reviews
        ? reviews.map((review, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ReviewRow review={review} key={index} />
          ))
        : null}
    </Stack>
  );
}
