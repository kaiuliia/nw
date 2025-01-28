"use server";

import { HeartRateMeasurement } from "@/types/heartRate";

interface HeartRateResponse {
  measurements: HeartRateMeasurement[];
}

export const getTheHeartRate = async (
  userName: string,
): Promise<HeartRateResponse> => {
  const response = await fetch(
    `${process.env.API_URL}/measurements?username=${userName}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
