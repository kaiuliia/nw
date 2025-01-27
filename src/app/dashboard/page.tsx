"use client";

import { HeartRate } from "@/components/HeartRate";
import { useEffect, useState } from "react";
import { getTheHeartRate } from "@/app/fetchData";
import { HeartRateMeasurement } from "@/types/heartRate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DarkmodeToggle from "@/components/DarkmodeToggle";

const HEART_RATE_REFRESH_INTERVAL = 1000;

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
    <div className={"pt-20 px-5 flex flex-col text-center"}>
      <h3>Hello, {name}!</h3>
      <p> Here is your heart rate</p>
      <HeartRate measurements={measurements} />
      <p className={"text-red-700"}>{error}</p>
      {/*</div>*/}
      <Link
        className={
          "dark:text-gray-200 absolute bottom-10 left-[50%] transform -translate-x-1/2"
        }
        onClick={() => localStorage.removeItem("username")}
        href={"/"}
      >
        Logout
      </Link>
    </div>
  );
}
