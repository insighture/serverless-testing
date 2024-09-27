import dotenv from "dotenv";
dotenv.config({ path: "./__test__/.env.test" });

import { handler } from "../../../event-bridge/handler";

describe("Lambda Integration Tests", () => {
  test("should return a successful response from EventBridge", async () => {
    const event = {
      body: JSON.stringify({ key: "value" }),
      httpMethod: "POST",
      path: "/test",
    };

    // Call the Lambda function
    const result = await handler(event);
    const responseBody = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(responseBody.message).toBe("Sent the event to EventBridge");
    expect(responseBody.data).toHaveProperty("FailedEntryCount", 0);
    expect(responseBody.data.Entries[0]).toHaveProperty("EventId");
  });
});
