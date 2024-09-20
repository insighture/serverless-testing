# serverless-testing

AWS Lambda functions with basic unit tests & integration tests

## Project Structure

- `src/s3-client/handler.ts`: Contains the AWS Lambda function to retrieve an object from an S3 bucket.
- `src/event-bridge/handler.ts`: Contains the AWS Lambda function to trigger an EventBridge event.
- `src/handler.ts`: Contains a simple AWS Lambda function that returns a greeting message.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `README.md`: This file.

## Prerequisites

- Node.js
- npm
- AWS account with S3 access
- AWS credentials configured in `.env` file
- TypeScript

## Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd serverless-testing
   checkout ts-main
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Update `.env`, `.env.test` file in the root directory and add your AWS credentials and S3 bucket details:
   ```plaintext
   AWS_ACCESS_KEY=<your-access-key>
   AWS_SECRET_KEY=<your-secret-key>
   S3_BUCKET_REGION=<your-bucket-region>
   S3_BUCKET_NAME=<your-bucket-name>
   S3_KEY_VALUE=<your-object-key>
   EVENT_BRIDGE_REGION=<your-event-bridge-region>
   ```
4. Compile TypeScript to JavaScript:
   ```sh
   npm run build
   ```

## Testing

To run the unit tests and integration tests, use the following command:

- Unit tests

```sh
npm run test:unit
```

- Integration tests

```sh
npm run test:integration
```

- All tests

```sh
npm run test
```

- Test coverage

```sh
npm run test:coverage
```
