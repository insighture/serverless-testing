import { mockClient } from "aws-sdk-client-mock";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { Callback, Context } from "aws-lambda";
import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";
import { handler } from "../../../src/event-bridge/handler";

const eventBridgeMock = mockClient(EventBridgeClient);

describe("handler with aws-sdk-client-mock dependency", () => {
  const context: Context = {} as Context;
  const callback: Callback = () => {};

  afterEach(() => {
    eventBridgeMock.reset();
  });

  it("should return a successful response with the JSON object", async () => {
    eventBridgeMock.on(PutEventsCommand).resolves({
      FailedEntryCount: 0,
      Entries: [{ EventId: "12345" }],
    });

    const event = {
      body: JSON.stringify({ key: "value" }),
      httpMethod: "POST",
      path: "/test",
    };
    const result = await handler(event, context, callback);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "Sent the event to EventBridge",
      data: { FailedEntryCount: 0, Entries: [{ EventId: "12345" }] },
    });
  });

  it("should return an error response when an error occurs", async () => {
    eventBridgeMock
      .on(PutEventsCommand)
      .rejects(new Error("Something went wrong"));

    const event = {
      body: JSON.stringify({ key: "value" }),
      httpMethod: "POST",
      path: "/test",
    };
    const result = await handler(event, context, callback);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      message: "Error sending the event to EventBridge",
      error: "Something went wrong",
    });
  });
});
