const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { mockClient } = require("aws-sdk-client-mock");
const { handler } = require("../../../s3-client/handler");

const s3Mock = mockClient(S3Client);

describe("handler with aws-sdk-client-mock dependency", () => {
  afterEach(() => {
    s3Mock.reset();
  });

  it("should return a successful response with the JSON object", async () => {
    s3Mock.on(GetObjectCommand).resolves({
      Body: {
        transformToString: jest
          .fn()
          .mockResolvedValue('{"name":"SampleProduct","version":"v1"}'),
      },
    });

    const result = await handler({});

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

    const event = {}; // Mock event if needed
    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      message: "Error retrieving the object",
      error: "Something went wrong",
    });
  });
});
