import { HeartRateMeasurement } from "@/types/heartRate";
import { timestampCompare } from "@/lib/time";

export const sortAndRemoveDuplicates = (
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
