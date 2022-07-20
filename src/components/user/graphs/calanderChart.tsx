import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import useSWR from "swr";

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

type CalendarElement = {
  date: Date;
  count: number;
};

type Props = {
  range: number;
  type: string;
  userId?: string;
};

export default function CalendarChart({ range, type, userId }: Props) {
  const [onHover, setOnHover] = useState<boolean>(false);
  const today = new Date();
  const currentDate = dayjs();
  const { data } = useSWR(
    `/api/user/stats/sub?userId=${userId}&cnt=${range}&date=${currentDate.format(
      "YYYY-MM-DD"
    )}&type=${type}`
  );
  const values = getRange(range).map((index) => ({
    date: shiftDate(today, -index),
    count: data && data.length > index ? data[index] : 0,
  }));

  const mouseLeave = () => {
    setOnHover(false);
  };
  const mouseEnter = () => {
    setOnHover(true);
  };

  return (
    <Box onMouseLeave={mouseLeave} onMouseEnter={mouseEnter}>
      <CalendarHeatmap
        startDate={shiftDate(today, -range)}
        endDate={today}
        values={values}
        classForValue={(value: CalendarElement) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value: CalendarElement) => ({
          "data-tip": `${value.date.toISOString().slice(0, 10)}: upload ${
            value.count
          } subtitles`,
        })}
        showWeekdayLabels
      />
      <Box hidden={!onHover}>
        <ReactTooltip />
      </Box>
    </Box>
  );
}
