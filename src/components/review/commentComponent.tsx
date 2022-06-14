import { CloseIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { Review } from "@prisma/client";

type Props = {
  review: Review;
  onClick: () => void;
};

export default function CommentComponent({ review, onClick }: Props) {
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
    <Box p={2} borderBottomWidth="2px">
      <HStack>
        <Badge borderRadius="5px" px="2" colorScheme={badgeColor(review.type)}>
          {review.type}
        </Badge>
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
