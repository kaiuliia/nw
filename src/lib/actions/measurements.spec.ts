import { getTheHeartRate } from "@/lib/actions/measurements"; // Update the path based on your project structure
import { HeartRateMeasurement } from "@/types/heartRate";

global.fetch = jest.fn();

describe("getTheHeartRate", () => {
  it("should successfully fetch heart rate measurements", async () => {
    const mockMeasurements: HeartRateMeasurement[] = [
      { timestamp: 1672531200000, heartRate: 75 },
      { timestamp: 1672531260000, heartRate: 80 },
    ];
    const mockResponse = { measurements: mockMeasurements };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await getTheHeartRate("testUser");

    expect(fetch).toHaveBeenCalledWith(
      "https://nowatch-fullstack-test-assignment.vercel.app/api/measurements?username=testUser",
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when the response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getTheHeartRate("testUser")).rejects.toThrow(
      "HTTP error! status: 404",
    );
  });
});
