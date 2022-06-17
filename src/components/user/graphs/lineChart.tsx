import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function LineChart() {
  const lineChartData = [
    {
      name: "Rating",
      data: [330, 340, 320, 360, 370, 390, 410, 400, 420, 300],
    },
    {
      name: "Views",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 200],
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
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
