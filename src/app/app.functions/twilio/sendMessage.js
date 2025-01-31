exports.main = async (context = {}) => {
  const { phone, message } = context.parameters;

  console.log('Sending Message:', JSON.stringify({ phone, message }, null, 2));

  if (!phone || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: 'Phone number or message is missing',
      }),
    };
  }

  try {
    // Simulate sending a message
    console.log(`Message sent to ${phone}: "${message}"`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Message sent successfully!',
      }),
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to send the message',
      }),
    };
  }
};
