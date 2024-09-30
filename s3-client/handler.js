import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

import logger from "../logger.js";
import { fromIni } from "@aws-sdk/credential-providers";

export const handler = async (event) => {
  const s3ClientConfig = {
    region: process.env.S3_BUCKET_REGION,
  };

  if (process.env.AWS_PROFILE) {
    s3ClientConfig.credentials = fromIni({ profile: process.env.AWS_PROFILE });
  }

  const s3Client = new S3Client(s3ClientConfig);

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
