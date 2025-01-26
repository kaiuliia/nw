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
  Legend,
  type ChartOptions,
  TimeSeriesScale,
  type ChartData,
} from "chart.js";
import { ArcElement } from "chart.js";
import { HeartRateMeasurement } from "@/types/heartRate";

Chart.register(
  CategoryScale,
  TimeSeriesScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const DISPLAY_LAST_MILLISECONDS = 60_000; //5 minutes

interface HeartRateProps {
  measurements: HeartRateMeasurement[];
}

export function HeartRate({ measurements }: HeartRateProps) {
  const chartData: ChartData = {
    labels: measurements.map((m) => m.timestamp),
    datasets: [
      {
        label: "Heart Rate (bpm)",
        data: measurements.map((m) => m.heartRate),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        pointStyle: false,
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Heart Rate Over Time",
      },
    },
    scales: {
      x: {
        type: "timeseries",
        title: {
          display: true,
          text: "Time",
        },
        time: {
          unit: "minute", // Ticks will only be placed at minute intervals
          tooltipFormat: "HH:mm:ss", // Tooltip shows hours and minutes
          displayFormats: {
            minute: "HH:mm", // Ticks format
          },
        },
        ticks: {
          autoSkip: true,
          source: "labels", // Ensures all data points are displayed
          stepSize: 1, // Ensure ticks are displayed at every minute
          maxTicksLimit: 5,
        },
        min: Date.now() - DISPLAY_LAST_MILLISECONDS,
        max: Date.now(),
      },
      y: {
        title: {
          display: true,
          text: "Heart Rate (bpm)",
        },
        min: 30,
      },
    },
  };

  return (
    <div className="h-[20rem] m-5">
      <Line data={chartData} options={options} />
    </div>
  );
}
