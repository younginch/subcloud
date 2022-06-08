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
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const overlayRef = React.useRef();
  return (
    <Flex direction="column">
      <Flex alignItems="center">
        <IconBox as="box" h={"30px"} w={"30px"} bg={iconTeal} me="6px">
          {icon}
        </IconBox>
        <Text fontSize="sm" color="gray.400" fontWeight="semibold">
          {title}
        </Text>
      </Flex>
      <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
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
