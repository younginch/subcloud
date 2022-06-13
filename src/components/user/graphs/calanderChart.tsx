import { Box } from "@chakra-ui/react";
import { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";

type CalendarElement = {
  date: Date;
  count: number;
};

type Props = {
  count: number;
};

export default function CalendarChart({ count }: Props) {
  const [onHover, setOnHover] = useState<boolean>(false);
  const today = new Date();
  const randomValues = getRange(count).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: Math.floor(Math.random() * 4) + 1,
    };
  });

  const mouseLeave = () => {
    setOnHover(false);
  };

  return (
    <Box onMouseLeave={mouseLeave} onMouseEnter={() => setOnHover(true)}>
      <CalendarHeatmap
        startDate={shiftDate(today, -count)}
        endDate={today}
        values={randomValues}
        classForValue={(value: CalendarElement) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value: CalendarElement) => {
          return {
            "data-tip": `${value.date.toISOString().slice(0, 10)}: upload ${
              value.count
            } subtitles`,
          };
        }}
        showWeekdayLabels={true}
      />
      <Box hidden={!onHover}>
        <ReactTooltip />
      </Box>
    </Box>
  );
}

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}
