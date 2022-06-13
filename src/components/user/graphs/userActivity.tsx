import {
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CardBody from "../card/cardBody";
import React, { ReactElement } from "react";
import ChartStatistics from "./chartStatistics";
import PurityCard from "../card/purityCard";
import CardHeader from "../card/cardHeader";
// Custom icons
import { CartIcon, RocketIcon, StatsIcon, WalletIcon } from "../icons";

type Props = {
  title: string;
  percentage: number;
  chart: ReactElement<any, any>;
  subs: number;
  views: number;
};

export default function UserActivity({
  title,
  percentage,
  chart,
  subs,
  views,
}: Props) {
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <PurityCard p="20px">
      <CardHeader mb="10px">
        <Stack>
          <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
            자막 제작 통계
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.400">
            <Text
              as="span"
              color={percentage > 0 ? "green.400" : "red.400"}
              fontWeight="bold"
            >
              {percentage > 0 ? `+${percentage}%` : `-${percentage}%`}
            </Text>{" "}
            than last week
          </Text>
        </Stack>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w="100%">
          {chart}
          <Flex direction="column" mt="24px" mb="10px" alignSelf="flex-start">
            <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
              {title}
            </Text>
          </Flex>
          <SimpleGrid gap={{ sm: "12px" }} columns={4}>
            <ChartStatistics
              title={"자막 수"}
              amount={subs.toString()}
              percentage={20}
              icon={<WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"총 조회수"}
              amount={views.toString()}
              percentage={80}
              icon={<RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"시청시간"}
              amount={"2,400$"}
              percentage={30}
              icon={<CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"구독자 수"}
              amount={"320"}
              percentage={40}
              icon={<StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </Flex>
      </CardBody>
    </PurityCard>
  );
}
