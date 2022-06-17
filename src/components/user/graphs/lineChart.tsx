import dayjs from "dayjs";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Props = {
  lineCount: number;
  viewArray: Array<number>;
};

export default function LineChart({ viewArray, lineCount }: Props) {
  const date = dayjs(new Date());
  const dateArray = Array.from({ length: lineCount }, (_, i) =>
    date.subtract(i, "day").format("MM/DD")
  ).reverse();
  const ratingArray = [3, 4, 5, 3, 4, 2, 1, 1, 2, 5];
  const lineChartData = [
    {
      name: "Rating",
      data: ratingArray,
    },
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
