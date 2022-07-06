import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Props = {
  range: number;
  type: string;
  subId?: string;
  userId?: string;
};

export default function LineChart({ range, type, subId, userId }: Props) {
  const currentDate = dayjs();
  const subQuery = subId ? `&subId=${subId}` : "";
  const { data: viewArray, error: viewError } = useSWR(
    `/api/user/stats/view?userId=${userId}&cnt=${range}&date=${currentDate.format(
      "YYYY-MM-DD"
    )}&type=${type}${subQuery}`
  );
  const dateArray = Array.from({ length: range }, (_, i) =>
    currentDate.subtract(i, "day").format("MM/DD")
  ).reverse();
  const lineChartData = [
    {
      name: "Views",
      data: viewArray,
    },
  ];
  const lineChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "string",
      categories: dateArray,
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "12px",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["rgba(79, 209, 197, .2)", "#2D3748"],
    },
    colors: ["#4FD1C5", "#2D3748"],
  };
  return (
    <ReactApexChart
      options={lineChartOptions as any}
      series={lineChartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
}
