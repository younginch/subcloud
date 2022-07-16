import {
  useColorModeValue,
  Text,
  Flex,
  Icon,
  Box,
  Button,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Card from "../card/card";

type Props = {
  fulfilledRequest: number;
  percentage: number;
};

export default function FulfilledGraph({
  fulfilledRequest,
  percentage,
}: Props) {
  const { t } = useTranslation("publicProfile");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const size =
    window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200;
  return (
    <Card gridArea={{ md: "2 / 2 / 3 / 3", "2xl": "auto" }} color={textColor}>
      <Flex direction="column">
        <Flex justify="space-between" align="center" mb="40px">
          <Text color="inherit" fontSize="lg" fontWeight="bold">
            {t("fufilledGraph_contribution")}
          </Text>
          <Button borderRadius="12px" w="38px" h="38px" bg="transparent">
            <Icon as={IoEllipsisHorizontal} color="#7551FF" />
          </Button>
        </Flex>
        <Flex direction={{ sm: "column", md: "row" }}>
          <Flex
            direction="column"
            me={{ md: "6px", lg: "52px" }}
            mb={{ sm: "16px", md: "0px" }}
          >
            <Flex
              direction="column"
              p="22px"
              pe={{ sm: "22e", md: "8px", lg: "22px" }}
              minW={{ sm: "220px", md: "140px", lg: "220px" }}
              bg={useColorModeValue(
                "blue.50",
                "linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)"
              )}
              borderRadius="20px"
              mb="20px"
            >
              <Text
                color={useColorModeValue("gray.700", "gray.400")}
                fontSize="sm"
                mb="4px"
              >
                {t("fufilledGraph_request")}
              </Text>
              <Text
                color={useColorModeValue("black", "white")}
                fontSize="lg"
                fontWeight="bold"
              >
                {fulfilledRequest} 명
              </Text>
            </Flex>
            <Flex
              direction="column"
              p="22px"
              pe={{ sm: "22px", md: "8px", lg: "22px" }}
              minW={{ sm: "170px", md: "140px", lg: "170px" }}
              bg={useColorModeValue(
                "blue.50",
                "linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)"
              )}
              borderRadius="20px"
            >
              <Text
                color={useColorModeValue("gray.700", "gray.400")}
                fontSize="sm"
                mb="4px"
              >
                {t("fufilledGraph_errReport")}
              </Text>
              <Text
                color={useColorModeValue("black", "white")}
                fontSize="lg"
                fontWeight="bold"
              >
                0 회
              </Text>
            </Flex>
          </Flex>
          <Box mx={{ sm: "auto", md: "0px" }} w={size} h={size}>
            <CircularProgressbarWithChildren value={percentage}>
              <Flex direction="column" justify="center" align="center">
                <Text color="gray.400" fontSize="sm" mb="4px">
                  {t("fufilledGraph_top")}
                </Text>
                <Text
                  color="inherit"
                  fontSize={{ md: "36px", lg: "50px" }}
                  fontWeight="bold"
                  mb="4px"
                >
                  {Math.round(percentage * 10) / 10}%
                </Text>
                <Text color="gray.400" fontSize="sm">
                  {t("fufilledGraph_contribution")}
                </Text>
              </Flex>
            </CircularProgressbarWithChildren>
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
}
