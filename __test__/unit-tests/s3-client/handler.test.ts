import { S3Client } from "@aws-sdk/client-s3";
import { Context, Callback } from "aws-lambda";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { handler } from "../../../src/s3-client/handler";

jest.mock("@aws-sdk/client-s3");

describe("handler with mocking @aws-sdk/client-s3 dependency", () => {
  let s3ClientMock: { send: jest.Mock };

  beforeEach(() => {
    s3ClientMock = {
      send: jest.fn(),
    };
    (S3Client as jest.Mock).mockImplementation(() => s3ClientMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a successful response with the JSON object", async () => {
    const mockResponse = {
      Body: {
        transformToString: jest.fn().mockImplementation(() => {
          return Promise.resolve('{"name":"SampleProduct","version":"v1"}');
        }) as (encoding?: string) => Promise<string>,
      },
    } as never;
    s3ClientMock.send.mockResolvedValue(mockResponse);

    const event = {}; // Mock event if needed
    const context: Context = {} as Context;
    const callback: Callback = () => {};

    const result = await handler(event, context, callback);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "Object retrieved successfully",
      data: {
        name: "SampleProduct",
        version: "v1",
      },
    });
  });

  it("should return an error response when an error occurs", async () => {
    const mockError = new Error("Something went wrong") as never;
    s3ClientMock.send.mockRejectedValue(mockError);

    const event = {}; // Mock event if needed
    const context: Context = {} as Context;
    const callback: Callback = () => {};

    const result = await handler(event, context, callback);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      message: "Error retrieving the object",
      error: "Something went wrong",
    });
  });
});
