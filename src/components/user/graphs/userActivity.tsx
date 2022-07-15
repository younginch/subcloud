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
import { IoTime, IoWallet } from "react-icons/io5";
import { AiFillEye } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import useTranslation from "next-translate/useTranslation";

type Props = {
  title: string;
  chart: ReactElement<any, any>;
  subs: number;
  views: number;
};

export default function UserActivity({ title, chart, subs, views }: Props) {
  const { t } = useTranslation("publicProfile");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <PurityCard p="20px">
      <CardHeader mb="10px">
        <Stack>
          <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
            {t("userActivity_stat")}
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
              title={t("userActivity_sub")}
              amount={subs.toString()}
              percentage={20}
              icon={<IoWallet size={15} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={t("userActivity_view")}
              amount={views.toString()}
              percentage={80}
              icon={<AiFillEye size={15} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={t("userActivity_length")}
              amount={"2,400$"}
              percentage={30}
              icon={<IoTime size={15} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={t("userActivity_subscriber")}
              amount={"320"}
              percentage={40}
              icon={<FaUser size={15} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </Flex>
      </CardBody>
    </PurityCard>
  );
}
