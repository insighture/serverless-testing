import { describe, expect, test } from "@jest/globals";
import { handler } from "../../../src/event-bridge/handler";
import { Callback, Context } from "aws-lambda";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";

describe("Lambda Integration Tests", () => {
  test("should return a successful response from EventBridge", async () => {
    const event = {
      body: JSON.stringify({ key: "value" }),
      httpMethod: "POST",
      path: "/test",
    } as APIGatewayProxyEvent;

    const context: Context = {} as Context;
    const callback: Callback = () => {};

    // Call the Lambda function
    const result = await handler(event, context, callback);
    const responseBody = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(responseBody.message).toBe("Sent the event to EventBridge");
    expect(responseBody.data).toHaveProperty("FailedEntryCount", 0);
    expect(responseBody.data.Entries[0]).toHaveProperty("EventId");
  });
});
