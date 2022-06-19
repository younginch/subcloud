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
import { useState } from "react";
import LineChart from "../graphs/lineChart";

export default function DetailViewGraph() {
  const viewRange = 10;
  const viewArray = Array.apply(null, Array(viewRange)).map(function () {
    return faker.datatype.number({ min: 0, max: 1000 });
  });

  const [value, setValue] = useState("1");

  return (
    <Box p={4}>
      <HStack>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="1">일별</Radio>
            <Radio value="2">주별</Radio>
            <Radio value="3">월별</Radio>
          </Stack>
        </RadioGroup>
        <Spacer />
        <Text fontSize="md" fontWeight="medium" color="gray.500" mt={3}>
          최근 {viewRange}일 동안의 조회수 :{" "}
          {viewArray.reduce(function add(sum: number, value: number) {
            return sum + value;
          }, 0)}
        </Text>
      </HStack>
      <Box pl={1} pr={1} h="250px">
        <LineChart lineRange={viewRange} viewArray={viewArray} />
      </Box>
    </Box>
  );
}
