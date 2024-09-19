const {handler} = require("../../../s3-client/handler");
const {S3Client} = require('@aws-sdk/client-s3');

jest.mock('@aws-sdk/client-s3');

describe('handler with mocking @aws-sdk/client-s3 dependency', () => {
    let s3ClientMock;

    beforeEach(() => {
        s3ClientMock = {
            send: jest.fn()
        };
        S3Client.mockImplementation(() => s3ClientMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a successful response with the JSON object', async () => {
        const mockResponse = {
            Body: {
                transformToString: jest.fn().mockResolvedValue(JSON.stringify({
                    "name": "SampleProduct",
                    "version": "v1"
                }))
            }
        };
        s3ClientMock.send.mockResolvedValue(mockResponse);

        const event = {}; // Mock event if needed
        const result = await handler(event);

        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toEqual({
            message: "Object retrieved successfully",
            data: {
                name: "SampleProduct",
                version: "v1"
            }
        });
    });

    it('should return an error response when an error occurs', async () => {
        const mockError = new Error('Something went wrong');
        s3ClientMock.send.mockRejectedValue(mockError);

        const event = {}; // Mock event if needed
        const result = await handler(event);

        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.body)).toEqual({
            message: "Error retrieving the object",
            error: "Something went wrong"
        });
    });
});