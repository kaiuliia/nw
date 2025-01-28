import { registerNewUser } from "@/lib/actions/register"; // Update the path based on your project structure

global.fetch = jest.fn();

describe("registerNewUser", () => {
  it("should successfully register a new user", async () => {
    const mockResponse = { success: true, username: "testUser" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await registerNewUser("testUser");

    expect(fetch).toHaveBeenCalledWith(
      "https://nowatch-fullstack-test-assignment.vercel.app/api/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "testUser" }),
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when the response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    await expect(registerNewUser("testUser")).rejects.toThrow(
      "HTTP error! status: 400",
    );
  });
});
