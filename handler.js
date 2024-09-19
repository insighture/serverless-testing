exports.handler = async (event) => {
  const name = event.name || "Guest"; // Default to 'Guest' if no name is provided
  const message = `Hello, ${name}! Welcome to AWS Lambda.`;

  // Create a response object
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: message,
      input: event,
    }),
  };
};
