import {
  Flex,
  Text,
  Stack,
  HStack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

export default function RecentReviews() {
  const textColor = useColorModeValue("gray.700", "gray.400");
  const reviewData = [
    {
      avatarSrc:
        "https://s.gravatar.com/avatar/4f9135f54df98fe894a9f9979d600a87?s=80",
      review: `What a wonderful little cottage! More spacious and adorable than the What a wonderful little cottage! More spacious and adorable than the
                    pictures show. We never met our hosts and...`,
      stars: 3,
      userName: "Ahmad",
      dateTime: "2 months ago",
    },
    {
      avatarSrc: "",
      review: `What a wonderful little cottage! More spacious and adorable than the
                    pictures show. We never met our hosts, but we felt welcomed and...`,
      stars: 4,
      userName: "Ali",
      dateTime: "1 months ago",
    },
    {
      avatarSrc: "",
      review: `What a wonderful little cottage! More spacious and adorable than the
                    pictures show. We never met our hosts, but we felt welcomed and...`,
      stars: 2,
      userName: "Zac",
      dateTime: "4 months ago",
    },
  ];

  return (
    <Stack
      direction="column"
      spacing={5}
      my={4}
      maxH="280px"
      overflowY="scroll"
    >
      {reviewData.map((review, index) => {
        return (
          <Stack key={index} direction="column" maxW="2xl">
            <HStack spacing={3}>
              <Avatar size="sm" name={review.userName} src={review.avatarSrc} />
              <HStack>
                <Text fontWeight="bold" fontSize="md">
                  {review.userName}
                </Text>
                <Text fontWeight="light" fontSize="xs">
                  {review.dateTime}
                </Text>
              </HStack>
            </HStack>
            <Flex my={3} alignItems="center" justify="start">
              {Array.from(Array(review.stars).keys()).map((id) => {
                return <AiFillStar key={id} fill="#EACA4E" />;
              })}
              {Array.from(Array(5 - review.stars).keys()).map((id) => {
                return <AiFillStar key={id} fill="#e2e8f0" />;
              })}
            </Flex>
            <Text
              color={textColor}
              fontSize="0.87rem"
              textAlign="left"
              lineHeight="1.375"
              fontWeight="300"
            >
              {review.review}
            </Text>
          </Stack>
        );
      })}
    </Stack>
  );
}
