import { HeartRateMeasurement } from "@/types/heartRate";

const REGISTER_URL =
  "https://nowatch-fullstack-test-assignment.vercel.app/api/signin";
const HEART_RATE_URL =
  "https://nowatch-fullstack-test-assignment.vercel.app/api/measurements?username=";

interface HeartRateResponse {
  measurements: HeartRateMeasurement[];
}

export const registerNewUser = async (name: string) => {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: name }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getTheHeartRate = async (
  userName: string,
): Promise<HeartRateResponse> => {
  const response = await fetch(HEART_RATE_URL + userName);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
