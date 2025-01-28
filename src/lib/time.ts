import { HeartRateMeasurement } from "@/types/heartRate";

export const timestampCompare = (
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
