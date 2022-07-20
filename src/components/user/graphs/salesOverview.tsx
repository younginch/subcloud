import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import React, { ReactElement } from "react";
import Card from "../card/card";
import CardHeader from "../card/cardHeader";

type Props = {
  title: string;
  percentage: number;
  chart: ReactElement<any, any>;
};

export default function SalesOverview({ title, percentage, chart }: Props) {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
      <CardHeader mb="20px" pl="22px">
        <Flex direction="column" alignSelf="flex-start">
          <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
            {title}
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.400">
            <Text
              as="span"
              color={percentage > 0 ? "green.400" : "red.400"}
              fontWeight="bold"
            >
              {`${percentage}%`} more
            </Text>{" "}
            in 2021
          </Text>
        </Flex>
      </CardHeader>
      <Box w="100%" h={{ sm: "300px" }} ps="8px">
        {chart}
      </Box>
    </Card>
  );
}
