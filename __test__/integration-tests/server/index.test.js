import request from "supertest";
import app from "../../../server/index.js";

describe("Test /trigger/s3-client route", () => {
  it("should call the S3 client handler and return the response", async () => {
    const response = await request(app).get("/trigger/s3-client");

    expect(response.status).toBe(200);

    const responseBody = JSON.parse(response.body.body);
    expect(responseBody.message).toBe("Object retrieved successfully");
    expect(responseBody.data).toHaveProperty("name");
  });

  it("should return 500 when there is an error in the handler", async () => {
    jest.mock("../../../s3-client/handler.js", () => ({
      handler: jest.fn().mockRejectedValue(new Error("S3 Error")),
    }));

    const response = await request(app).get("/trigger/s3-client");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal Server Error");
  });
});
