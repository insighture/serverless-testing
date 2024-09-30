export const handler = async (event) => {
  const { body } = event;
  const name = body.name || "Guest"; // Default to 'Guest' if no name is provided
  const message = `Hello, ${name}! Welcome to AWS Lambda.`;

  // Create a response object
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: message,
      input: body,
    }),
  };
};
