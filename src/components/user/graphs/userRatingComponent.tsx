import {
  useColorModeValue,
  Text,
  Flex,
  Icon,
  Stack,
  Box,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AiFillHeart } from "react-icons/ai";
import { FiBox } from "react-icons/fi";
import IconBox from "../../icons/iconBox";
import Card from "../card/card";
import CardHeader from "../card/cardHeader";

type Props = {
  gridArea: string;
  rating: number;
  percentage: number;
};

type InnerProps = {
  rating: number;
  percentage: number;
};

function UserRatingInner({ rating, percentage }: InnerProps) {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      position="relative"
    >
      <Box zIndex="-1" bg="" h={200} w={200}>
        <CircularProgressbarWithChildren value={percentage}>
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
        </CircularProgressbarWithChildren>
      </Box>
      <Stack
        direction="row"
        spacing={{ sm: "42px", md: "68px" }}
        justify="center"
        maxW={{ sm: "270px", md: "300px", lg: "100%" }}
        mx={{ sm: "auto", md: "0px" }}
        p="18px 22px"
        bg={useColorModeValue(
          "blue.50",
          "linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)"
        )}
        borderRadius="20px"
        position="absolute"
        bottom="0%"
      >
        <Text fontSize="xs" color={useColorModeValue("gray.700", "gray.400")}>
          0%
        </Text>
        <Flex direction="column" align="center" minW="80px">
          <Text
            color={useColorModeValue("gray.900", "gray.100")}
            fontSize="28px"
            fontWeight="bold"
          >
            {Math.round(rating * 10) / 10}
          </Text>
          <Text fontSize="xs" color={useColorModeValue("gray.800", "gray.400")}>
            top {Math.round(percentage * 10) / 10}%
          </Text>
        </Flex>
        <Text fontSize="xs" color={useColorModeValue("gray.700", "gray.400")}>
          100%
        </Text>
      </Stack>
    </Flex>
  );
}

export default function UserRatingComponent({
  gridArea,
  rating,
  percentage,
}: Props) {
  const { t } = useTranslation("publicProfile");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  return (
    <Card gridArea={{ md: gridArea, "2xl": "auto" }}>
      <CardHeader mb="24px">
        <Flex direction="column">
          <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
            {t("userRatingComponent_rate")}
          </Text>
          <Text color={subTextColor} fontSize="sm">
            {t("userRatingComponent_user")}
          </Text>
        </Flex>
      </CardHeader>
      {rating === 0 ? (
        <Stack alignItems="center" spacing={5} pt={5} pb={10}>
          <FiBox size={90} />
          <Text fontSize="lg">{t("userRatingComponent_unrated")}</Text>
        </Stack>
      ) : (
        <UserRatingInner rating={rating} percentage={percentage} />
      )}
    </Card>
  );
}
