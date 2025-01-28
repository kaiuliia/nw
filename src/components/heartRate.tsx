"use client";

import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  type ChartOptions,
  TimeSeriesScale,
  type ChartData,
  Filler,
} from "chart.js";
import { HeartRateMeasurement } from "@/types/heartRate";
import { useTheme } from "next-themes";

Chart.register(
  CategoryScale,
  TimeSeriesScale,
  LinearScale,
  LineElement,
  Filler,
  PointElement,
  Title,
  Tooltip,
);

export function HeartRate({
  measurements,
  minimumTimestamp,
}: {
  measurements: HeartRateMeasurement[];
  minimumTimestamp: number;
}) {
  const { theme } = useTheme();
  const chartData: ChartData<"line"> = {
    labels: measurements.map((m) => m.timestamp),
    datasets: [
      {
        borderWidth: 1,
        data: measurements.map((el) => ({ x: el.timestamp, y: el.heartRate })),
        borderColor: "#B71C1C",
        backgroundColor: "#B71C1C22",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    animation: {
      duration: 300,
      easing: "linear",
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "time",
        grid: {
          display: false,
        },
        display: false,
        min: minimumTimestamp,
        max: Date.now(),
      },
      y: {
        title: {
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
          display: true,
          text: "Heart Rate (bpm)",
        },
        min: 20,
        max: 220,
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        cubicInterpolationMode: "monotone",
      },
    },
  };

  return (
    <div className="h-[20rem] m-5">
      <Line data={chartData} options={options} />
    </div>
  );
}
