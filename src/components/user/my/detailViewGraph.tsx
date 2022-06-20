import {
  Box,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import LineChart from "../graphs/lineChart";

export default function DetailViewGraph() {
  const viewRange = 10;

  const [value, setValue] = useState("day");
  const session = useSession();
  const currentDate = dayjs();
  const { data, error } = useSWR(
    `/api/stats/view?userId=${
      session.data?.user.id
    }&cnt=${viewRange}&date=${currentDate.format("YYYY-MM-DD")}&type=${value}`
  );

  return (
    <Box p={4}>
      <HStack>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="day">일별</Radio>
            <Radio value="week">주별</Radio>
            <Radio value="month">월별</Radio>
          </Stack>
        </RadioGroup>
        <Spacer />
        <Text fontSize="md" fontWeight="medium" color="gray.500" mt={3}>
          최근 {viewRange}일 동안의 조회수 :{" "}
          {data
            ? data.reduce((prev: number, curr: number) => prev + curr, 0)
            : 0}
        </Text>
      </HStack>
      <Box pl={1} pr={1} h="250px">
        <LineChart range={viewRange} type={value} />
      </Box>
    </Box>
  );
}
