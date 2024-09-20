import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { mockClient } from "aws-sdk-client-mock";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { handler } from "../../../src/s3-client/handler";
import { Callback, Context } from "aws-lambda";

const s3Mock = mockClient(S3Client);

describe("handler with aws-sdk-client-mock dependency", () => {
  const context: Context = {} as Context;
  const callback: Callback = () => {};

  afterEach(() => {
    s3Mock.reset();
  });

  it("should return a successful response with the JSON object", async () => {
    s3Mock.on(GetObjectCommand).resolves({
      Body: {
        transformToString: jest.fn().mockImplementation(() => {
          return Promise.resolve('{"name":"SampleProduct","version":"v1"}');
        }) as (encoding?: string) => Promise<string>,
      },
    } as never);

    const result = await handler({}, context, callback);

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
    s3Mock.on(GetObjectCommand).rejects(new Error("Something went wrong"));

    const result = await handler({}, context, callback);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      message: "Error retrieving the object",
      error: "Something went wrong",
    });
  });
});
