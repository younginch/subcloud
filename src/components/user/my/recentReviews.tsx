import {
  Flex,
  Text,
  Stack,
  HStack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { AiFillStar } from "react-icons/ai";
import useSWR from "swr";
import { ResRatingSearch } from "../../../utils/types";

export default function RecentReviews() {
  const session = useSession();
  const textColor = useColorModeValue("gray.700", "gray.400");
  const count = 5;
  const { data: reviewData, error } = useSWR<ResRatingSearch>(
    `/api/rating/search?userId=${session.data?.user.id}&cnt=${count}`
  );

  return (
    <Stack
      direction="column"
      spacing={5}
      my={4}
      maxH="280px"
      overflowY="scroll"
    >
      {reviewData?.map((review, index) => {
        return (
          <Stack key={index} direction="column" maxW="2xl">
            <HStack spacing={3}>
              <Avatar
                size="sm"
                name={review.user.name ?? review.user.id}
                src={review.user.image ?? ""}
              />
              <HStack>
                <Text fontWeight="bold" fontSize="md">
                  {review.user.name}
                </Text>
                <Text fontWeight="light" fontSize="xs">
                  {dayjs(review.updatedAt).format("YYYY-MM-DD")}
                </Text>
              </HStack>
            </HStack>
            <Flex my={3} alignItems="center" justify="start">
              {Array.from(Array(review.score).keys()).map((id) => {
                return <AiFillStar key={id} fill="#EACA4E" />;
              })}
              {Array.from(Array(5 - review.score).keys()).map((id) => {
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
              {review.comment ?? ""}
            </Text>
          </Stack>
        );
      }) ?? ""}
    </Stack>
  );
}
