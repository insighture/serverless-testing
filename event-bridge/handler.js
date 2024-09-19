const {PutEventsCommand, EventBridgeClient} = require("@aws-sdk/client-eventbridge");

require('dotenv').config();

exports.handler = async (event) => {
    const eventBridgeClient = new EventBridgeClient({
        region: process.env.EVENT_BRIDGE_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        }
    });

    // Extract data from the API Gateway event
    const {body, httpMethod, path} = event;
    const parsedBody = JSON.parse(body);

    const params = {
        Entries: [
            {
                Source: 'custom.apiRequest',
                DetailType: 'API Gateway Request',
                Detail: JSON.stringify({
                    httpMethod,
                    path,
                    requestBody: parsedBody
                }),
                EventBusName: 'default',
            }
        ]
    };

    const command = new PutEventsCommand(params);

    try {
        // Send the event to EventBridge
        const response = await eventBridgeClient.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Sent the event to EventBridge",
                data: response
            }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error sending the event to EventBridge",
                error: error.message
            }),
        };
    }
};