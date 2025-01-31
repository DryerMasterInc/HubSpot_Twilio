exports.main = async (context = {}) => {
  const responseMessage = `This is coming from a serverless function!`;

  // Extract relevant data from context
  const objectId = context.parameters?.context?.crm?.objectId;
  const accessToken = context.secrets?.PRIVATE_APP_ACCESS_TOKEN;

  // Log access token and object ID
  console.log(' ===================================== ');
  console.log('Access Token:', accessToken);
  console.log('Object ID:', objectId);
  console.log(' ===================================== ');

  try {
    // HubSpot API endpoint to fetch contact properties
    const apiUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${objectId}?properties=phone,email,firstname`;

    // Make the fetch request
    const fetchResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!fetchResponse.ok) {
      throw new Error(
        `Failed to fetch contact data. Status: ${fetchResponse.status}`
      );
    }

    const data = await fetchResponse.json();

    // Log the fetched contact data
    console.log('Fetched Contact Data:', data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        response: `Phone: ${data.properties.phone || 'Not available'}, Email: ${
          data.properties.email || 'Not available'
        }, First Name: ${data.properties.firstname || 'Not available'}`,
      }),
    };
  } catch (error) {
    console.error('Fetch Error:', {
      message: error.message,
      stack: error.stack,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch contact details.' }),
    };
  }
};
