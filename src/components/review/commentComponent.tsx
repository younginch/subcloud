import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  useColorModeValue,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Review } from "@prisma/client";
import ReviewBadge from "../badges/reviewBadge";

type Props = {
  review: Review;
  onClick: () => void;
};

export default function CommentComponent({ review, onClick }: Props) {
  return (
    <Box
      p={2}
      borderBottomWidth="2px"
      bg={useColorModeValue("white", "#1F2733")}
    >
      <HStack>
        <ReviewBadge type={review.type} />
        <Badge variant="outline" colorScheme="gray">
          {review.startTime}-{review.endTime}
        </Badge>
        <Spacer />
        <CloseIcon w={3} onClick={onClick} />
      </HStack>
      <Text ml="2px" fontWeight="bold" mt="5px">
        {review.content}
      </Text>
      <Text ml="2px">리뷰어 : {review.reviewerId}</Text>
    </Box>
  );
}
