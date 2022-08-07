import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  useColorModeValue,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ReviewContent } from "@prisma/client";
import ReviewBadge from "../badges/reviewBadge";

type Props = {
  content: ReviewContent;
  onClick: () => void;
};

export default function CommentComponent({ content, onClick }: Props) {
  return (
    <Box
      p={2}
      borderBottomWidth="2px"
      bg={useColorModeValue("white", "#1F2733")}
    >
      <HStack>
        <ReviewBadge type={content.type} />
        <Badge variant="outline" colorScheme="gray">
          {content.startTime}-{content.endTime}
        </Badge>
        <Spacer />
        <CloseIcon w={3} onClick={onClick} />
      </HStack>
      <Text ml="2px" fontWeight="bold" mt="5px">
        {content.content}
      </Text>
      <Text ml="2px">리뷰어 : {content.reviewerId}</Text>
    </Box>
  );
}
