exports.main = async (context = {}) => {
  const message = context.parameters?.message || 'No message provided';

  // Print the log to the server console
  console.log(`[Server Log]: ${message}`);

  // Return a response indicating success
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: 'Log successfully recorded.',
      loggedMessage: message,
    }),
  };
};
