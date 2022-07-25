import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import React, { ReactElement } from "react";
import Card from "../card/card";
import CardHeader from "../card/cardHeader";

type Props = {
  title: string;
  chart: ReactElement<any, any>;
};

export default function ViewsOverview({ title, chart }: Props) {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
      <CardHeader mb="20px" pl="22px">
        <Flex direction="column" alignSelf="flex-start">
          <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <Box w="100%" h={{ sm: "300px" }} ps="8px">
        {chart}
      </Box>
    </Card>
  );
}
