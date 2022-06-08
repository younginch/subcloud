import {
  useColorModeValue,
  Text,
  Flex,
  Icon,
  Stack,
  Box,
} from "@chakra-ui/react";
import GradientProgress from "@delowar/react-circle-progressbar";
import { AiFillHeart } from "react-icons/ai";
import IconBox from "../../icons/iconBox";
import Card from "../card/card";
import CardHeader from "../card/cardHeader";

type Props = {
  gridArea: string;
};

export default function SatisfactionRate({ gridArea }: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  return (
    <Card gridArea={{ md: gridArea, "2xl": "auto" }}>
      <CardHeader mb="24px">
        <Flex direction="column">
          <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
            Satisfaction Rate
          </Text>
          <Text color={subTextColor} fontSize="sm">
            From all users
          </Text>
        </Flex>
      </CardHeader>
      <Flex
        direction="column"
        justify="center"
        align="center"
        position="relative"
      >
        <Box zIndex="-1" bg="">
          <GradientProgress
            percent={80}
            viewport
            size={200}
            isGradient
            gradient={{
              angle: 90,
              startColor: "rgba(117, 81, 255, 0)",
              stopColor: "#582CFF",
            }}
            emptyColor="#22234B"
          >
            <IconBox
              bg="brand.200"
              borderRadius="50%"
              w="48px"
              h="48px"
              transform={{
                sm: "translateY(-60%)",
                md: "translateY(-30%)",
              }}
            >
              <Icon as={AiFillHeart} color="red.400" w="30px" h="30px" />
            </IconBox>
          </GradientProgress>
        </Box>
        <Stack
          direction="row"
          spacing={{ sm: "42px", md: "68px" }}
          justify="center"
          maxW={{ sm: "270px", md: "300px", lg: "100%" }}
          mx={{ sm: "auto", md: "0px" }}
          p="18px 22px"
          bg="linear-gradient(126.97deg, rgb(6, 11, 40) 28.26%, rgba(10, 14, 35) 91.2%)"
          borderRadius="20px"
          position="absolute"
          bottom="0%"
        >
          <Text fontSize="xs" color="gray.400">
            0%
          </Text>
          <Flex direction="column" align="center" minW="80px">
            <Text color="#fff" fontSize="28px" fontWeight="bold">
              4.3
            </Text>
            <Text fontSize="xs" color="gray.400">
              top 7%
            </Text>
          </Flex>
          <Text fontSize="xs" color="gray.400">
            100%
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}
