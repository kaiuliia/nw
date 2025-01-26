"use client";

import { HeartRate } from "@/components/HeartRate";
import { useEffect, useState } from "react";
import { getTheHeartRate } from "@/app/fetchData";
import { HeartRateMeasurement } from "@/types/heartRate";
import { useRouter } from "next/navigation";

const HEART_RATE_REFRESH_INTERVAL = 3000;

export default function Dashboard() {
  const [measurements, setMeasurements] = useState<HeartRateMeasurement[]>([]);
  const [error, setError] = useState("");
  const { replace } = useRouter();
  const name = localStorage.getItem("username");

  const timestampCompare = (
    measurementOne: HeartRateMeasurement,
    measurementTwo: HeartRateMeasurement,
  ): 0 | 1 | -1 => {
    if (measurementOne.timestamp === measurementTwo.timestamp) {
      return 0;
    }

    if (measurementOne.timestamp > measurementTwo.timestamp) {
      return 1;
    }

    return -1;
  };

  const removeDuplicates = (
    measurements: HeartRateMeasurement[],
  ): HeartRateMeasurement[] => {
    const map = new Map(measurements.map((m) => [m.timestamp, m.heartRate]));

    return Array.from(
      map.entries().map(
        ([timestamp, heartRate]): HeartRateMeasurement => ({
          timestamp,
          heartRate,
        }),
      ),
    ).sort(timestampCompare);
  };

  const fetchNextHeartRateMeasurements = async (userName: string) => {
    try {
      const heartRate = await getTheHeartRate(userName);
      measurements.push(...heartRate.measurements);
      setMeasurements(removeDuplicates(measurements));
      setError("");
    } catch (error: unknown) {
      setError(`Failed to get heart rate data: ${error}`);
    }
  };

  const periodicallyFetchHeartRate = (userName: string) => {
    fetchNextHeartRateMeasurements(userName);

    setInterval(() => {
      fetchNextHeartRateMeasurements(userName);
    }, HEART_RATE_REFRESH_INTERVAL);
  };

  useEffect(() => {
    if (!name) {
      replace("/");
      return;
    }

    periodicallyFetchHeartRate(name);
  }, []);

  return (
    <div>
      <p>Hello, {name}!</p>
      <HeartRate measurements={measurements} />
      <p>{error}</p>
    </div>
  );
}
