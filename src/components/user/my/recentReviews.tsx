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
import { FiBox } from "react-icons/fi";
import useSWR from "swr";
import { ResRatingSearch } from "../../../utils/types";

export default function RecentReviews() {
  const session = useSession();
  const textColor = useColorModeValue("gray.700", "gray.400");
  const count = 5;
  const { data: reviewData, error } = useSWR<ResRatingSearch>(
    `/api/public/search/rating?userId=${session.data?.user.id}&cnt=${count}`
  );

  if (!reviewData || reviewData.length == 0) {
    return (
      <Stack alignItems="center" spacing={5} pt={5} pb={10}>
        <FiBox size={50} />
        <Text fontSize="20px">최근 리뷰가 없습니다</Text>
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      spacing={5}
      my={4}
      maxH="280px"
      h="fit-content"
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
              <Text fontWeight="bold" fontSize="md">
                {review.user.name}
              </Text>
              <Flex my={3} alignItems="center" justify="start">
                {Array.from(Array(review.score).keys()).map((id) => {
                  return <AiFillStar key={id} fill="#EACA4E" />;
                })}
                {Array.from(Array(5 - review.score).keys()).map((id) => {
                  return <AiFillStar key={id} fill="#e2e8f0" />;
                })}
              </Flex>
              <Text fontWeight="light" fontSize="xs">
                {dayjs(review.updatedAt).format("YYYY-MM-DD")}
              </Text>
            </HStack>
            {review.comment && (
              <Text
                color={textColor}
                fontSize="15px"
                textAlign="left"
                lineHeight="1.375"
                fontWeight="300"
                pl="45px"
              >
                {review.comment}
              </Text>
            )}
          </Stack>
        );
      }) ?? ""}
    </Stack>
  );
}
