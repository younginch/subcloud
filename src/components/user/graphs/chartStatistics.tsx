import { Flex, Progress, Text, useColorModeValue } from "@chakra-ui/react";
import IconBox from "../../../components/icons/iconBox";
import React from "react";

type Props = {
  title: string;
  amount: string;
  icon: JSX.Element;
  percentage: number;
};

export default function ChartStatistics({
  title,
  amount,
  icon,
  percentage,
}: Props) {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex direction="column">
      <Flex alignItems="center">
        <IconBox
          as="box"
          h={{ base: "25px", md: "30px" }}
          w={{ base: "25px", md: "30px" }}
          bg={iconTeal}
          me="6px"
        >
          {icon}
        </IconBox>
        <Text
          fontSize={{ base: "5px", xl: "13px" }}
          color="gray.400"
          fontWeight="semibold"
          sx={{ whiteSpace: "nowrap" }}
          overflow="hidden"
        >
          {title}
        </Text>
      </Flex>
      <Text
        fontSize={{ base: "sm", xl: "lg" }}
        color={textColor}
        fontWeight="bold"
        mb="6px"
        my="6px"
      >
        {amount}
      </Text>
      <Progress
        colorScheme="teal"
        borderRadius="12px"
        h="5px"
        value={percentage}
      />
    </Flex>
  );
}
