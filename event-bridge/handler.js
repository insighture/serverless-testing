import {
  PutEventsCommand,
  EventBridgeClient,
} from "@aws-sdk/client-eventbridge";

import logger from "../logger.js";
import { fromIni } from "@aws-sdk/credential-providers";

export const handler = async (event) => {
  const eventBridgeConfig = {
    region: process.env.EVENT_BRIDGE_REGION,
  };

  if (process.env.AWS_PROFILE) {
    eventBridgeConfig.credentials = fromIni({
      profile: process.env.AWS_PROFILE,
    });
  }

  const eventBridgeClient = new EventBridgeClient(eventBridgeConfig);

  // Extract data from the API Gateway event
  const { body, httpMethod, path } = event;
  const parsedBody = JSON.parse(body);

  const params = {
    Entries: [
      {
        Source: "custom.apiRequest",
        DetailType: "API Gateway Request",
        Detail: JSON.stringify({
          httpMethod,
          path,
          requestBody: parsedBody,
        }),
        EventBusName: "default",
      },
    ],
  };

  const command = new PutEventsCommand(params);

  try {
    // Send the event to EventBridge
    logger.info("sending event to event bridge");
    const response = await eventBridgeClient.send(command);

    logger.info("successfully sent event to event bridge");
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Sent the event to EventBridge",
        data: response,
      }),
    };
  } catch (error) {
    logger.error(error, "error sending event to event bridge");

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error sending the event to EventBridge",
        error: error.message,
      }),
    };
  }
};
