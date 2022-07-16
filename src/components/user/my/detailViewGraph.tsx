import {
  Box,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import useSWR from "swr";
import LineChart from "../graphs/lineChart";

export default function DetailViewGraph({ subId }: { subId?: string }) {
  const { t } = useTranslation("privateProfile");
  const viewRange = 10;

  const [value, setValue] = useState("day");
  const session = useSession();
  const currentDate = dayjs();
  const subQuery = subId ? `&subId=${subId}` : "";
  const { data, error } = useSWR(
    `/api/user/stats/view?userId=${
      session.data?.user.id
    }&cnt=${viewRange}&date=${currentDate.format(
      "YYYY-MM-DD"
    )}&type=${value}${subQuery}`
  );

  return (
    <Box p={4}>
      <HStack>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="day">{t("day")}</Radio>
            <Radio value="week">{t("week")}</Radio>
            <Radio value="month">{t("month")}</Radio>
          </Stack>
        </RadioGroup>
        <Spacer />
        <Text fontSize="md" fontWeight="medium" color="gray.500" mt={3}>
          {t("dash_recent_views")} {viewRange}
          {t(`dash_recent_views_${value}`)} :{" "}
          {data
            ? data.reduce((prev: number, curr: number) => prev + curr, 0)
            : 0}
        </Text>
      </HStack>
      <Box pl={1} pr={1} h="250px">
        <LineChart
          range={viewRange}
          type={value}
          subId={subId}
          userId={session.data?.user.id}
        />
      </Box>
    </Box>
  );
}
