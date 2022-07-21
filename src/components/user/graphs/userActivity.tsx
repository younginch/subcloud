import {
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { IoWallet } from "react-icons/io5";
import { AiFillEye } from "react-icons/ai";
import useTranslation from "next-translate/useTranslation";
import CardBody from "../card/cardBody";
import ChartStatistics from "./chartStatistics";
import PurityCard from "../card/purityCard";
import CardHeader from "../card/cardHeader";

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
          <SimpleGrid gap={{ sm: "12px" }} columns={2}>
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
          </SimpleGrid>
        </Flex>
      </CardBody>
    </PurityCard>
  );
}
