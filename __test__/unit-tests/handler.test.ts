import { describe, test, expect } from "@jest/globals";
import { handler } from "../../src/handler";
import { Callback, Context } from "aws-lambda";

describe("Lambda Function Tests", () => {
  const context: Context = {} as Context;
  const callback: Callback = () => {};

  test("should return a message with the provided name", async () => {
    const event = { name: "John" }; // Input event with name
    const result = await handler(event, context, callback);
    const responseBody = JSON.parse(result.body);

    // Check response structure
    expect(result.statusCode).toBe(200);
    expect(responseBody.message).toBe("Hello, John! Welcome to AWS Lambda.");
  });

  test("should return a message with default name when no name is provided", async () => {
    const event = {}; // Input event without name
    const result = await handler(event, context, callback);
    const responseBody = JSON.parse(result.body);

    // Check response structure
    expect(result.statusCode).toBe(200);
    expect(responseBody.message).toBe("Hello, Guest! Welcome to AWS Lambda.");
  });
});
