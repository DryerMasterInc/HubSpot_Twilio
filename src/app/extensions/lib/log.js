const logToServer = async (runServerless, message) => {
  try {
    await runServerless({
      name: 'logMessage',
      parameters: { message },
    });
  } catch (error) {
    console.error('Failed to log message:', error);
  }
};

export default logToServer;
