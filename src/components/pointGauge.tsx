import { HStack, Tooltip, Box, Progress, Spacer, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

type Props = {
  point: number;
  delta?: number;
  goal: number;
};

export default function PointGauge({ point, delta, goal }: Props) {
  const { t } = useTranslation("badges");
  let color = "blue";
  if (point >= goal / 2) color = "purple";
  if (point >= goal) color = "red";

  if (!delta || point >= goal) {
    return (
      <HStack className="pointGauge">
        <Tooltip label={`${t("gauge")}: ${point}/${goal}`}>
          <Box w="80%">
            <Progress
              hasStripe
              value={(point / goal) * 100}
              colorScheme={color}
            />
          </Box>
        </Tooltip>
        <Spacer />
        <Text fontWeight="bold">{Math.round((point / goal) * 100)}%</Text>
      </HStack>
    );
  }
  return (
    <HStack className="pointGauge">
      <Tooltip
        label={`${t("gauge")}: ${point + delta}/${goal} (+${Math.round(
          (delta / goal) * 100
        )}%)`}
      >
        <HStack w="80%" spacing={0}>
          <Progress
            hasStripe
            value={100}
            colorScheme={color}
            w={`${(point / goal) * 100}%`}
          />
          <Progress
            hasStripe
            value={(delta / (goal - point)) * 100}
            colorScheme="pink"
            w={`${100 - (point / goal) * 100}%`}
          />
        </HStack>
      </Tooltip>
      <Spacer />
      <Text fontWeight="bold">
        {Math.round(((point + delta) / goal) * 100)}%
      </Text>
    </HStack>
  );
}
