"use client";

import { HeartRate } from "@/components/heartRate";
import { useEffect, useState } from "react";
import { getTheHeartRate } from "@/lib/actions/register";
import { HeartRateMeasurement } from "@/types/heartRate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sortAndRemoveDuplicates } from "@/lib/heartRate";

const HEART_RATE_REFRESH_INTERVAL = 2000;
const DISPLAY_LAST_MILLISECONDS = 30000;

export default function Dashboard() {
  const [, setMeasurements] = useState<HeartRateMeasurement[]>([]);
  const [minimumTimestamp, setMinimumTimestamp] = useState(
    Date.now() - DISPLAY_LAST_MILLISECONDS,
  );
  const [displayedMeasurements, setDisplayedMeasurements] = useState<
    HeartRateMeasurement[]
  >([]);
  const [error, setError] = useState("");
  const { replace } = useRouter();

  const fetchNextHeartRateMeasurements = async (userName: string) => {
    try {
      const heartRate = await getTheHeartRate(userName);
      setMeasurements((prevMeasurements) => {
        return sortAndRemoveDuplicates([
          ...prevMeasurements,
          ...heartRate.measurements,
        ]);
      });
      setError("");
    } catch (error: unknown) {
      setError(`Failed to get heart rate data: ${error}`);
    }
  };

  useEffect(() => {
    const name = localStorage.getItem("username");

    if (!name) {
      replace("/");
      return;
    }

    fetchNextHeartRateMeasurements(name);

    const interval = setInterval(() => {
      fetchNextHeartRateMeasurements(name);
    }, HEART_RATE_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMeasurements((prevMeasurements) => {
        if (prevMeasurements.length === 0) return prevMeasurements;

        const next = prevMeasurements[0];
        const rest = prevMeasurements.slice(1);

        setDisplayedMeasurements((prevDisplayed) => {
          if (
            prevDisplayed.length > 0 &&
            prevDisplayed[prevDisplayed.length - 1].timestamp === next.timestamp
          ) {
            return prevDisplayed;
          }

          return sortAndRemoveDuplicates([...prevDisplayed, next]);
        });

        return rest;
      });

      setMinimumTimestamp(Date.now() - DISPLAY_LAST_MILLISECONDS);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={"pt-20 px-5 flex flex-col text-center"}>
      <p> Here is your heart rate</p>
      <HeartRate
        measurements={displayedMeasurements}
        minimumTimestamp={minimumTimestamp}
      />
      <p className={"text-red-700"}>{error}</p>
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
