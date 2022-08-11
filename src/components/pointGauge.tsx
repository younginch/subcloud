import { HStack, Tooltip, Box, Progress, Spacer, Text } from "@chakra-ui/react";

type Props = {
  point: number;
  goal: number;
};

export default function PointGauge({ point, goal }: Props) {
  return (
    <HStack>
      <Tooltip label={`자막 게이지: ${point}/${goal}`}>
        <Box w="80%">
          <Progress hasStripe value={(point / goal) * 100} />
        </Box>
      </Tooltip>
      <Spacer />
      <Text fontWeight="bold">{Math.round((point / goal) * 100)}%</Text>
    </HStack>
  );
}
