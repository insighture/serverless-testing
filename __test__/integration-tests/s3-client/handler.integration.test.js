import { handler } from "../../../s3-client/handler";

describe("Lambda Integration Tests", () => {
  test("should return object data from S3 bucket", async () => {
    // Event object can be empty since S3 params are hardcoded in the Lambda
    const event = {};

    // Call the Lambda function
    const result = await handler(event);
    const responseBody = JSON.parse(result.body);

    // Check if the function successfully retrieves data
    expect(result.statusCode).toBe(200);
    expect(responseBody.message).toBe("Object retrieved successfully");

    expect(responseBody.data).toHaveProperty("name"); // Assuming 'name' exists in the JSON object
  });
});
