const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const logger = require("../logger");

import dotenv from "dotenv";
dotenv.config();

exports.handler = async (event) => {
  const s3Client = new S3Client({
    region: process.env.S3_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: process.env.S3_KEY_VALUE,
  };

  try {
    // Get the object from S3

    logger.info("retrieving object from S3");
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    const objectData = await response.Body.transformToString();
    logger.info("successfully retrieved object from S3");

    // Return a successful response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Object retrieved successfully",
        data: JSON.parse(objectData),
      }),
    };
  } catch (error) {
    logger.error(error, "error retrieving object from S3");
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving the object",
        error: error.message,
      }),
    };
  }
};
