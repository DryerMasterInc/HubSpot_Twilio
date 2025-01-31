exports.main = async (context = {}) => {
  const objectId = context.parameters?.context?.crm?.objectId;
  const accessToken = context.secrets?.PRIVATE_APP_ACCESS_TOKEN;

  console.log('Incoming Context:', JSON.stringify(context, null, 2));

  if (!objectId) {
    console.log('Error: Missing Contact ID');
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        phone: null,
        message: 'Contact ID is missing',
      }),
    };
  }

  try {
    const apiUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${objectId}?properties=phone`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('Error: Failed to fetch contact details');
      return {
        statusCode: response.status,
        body: JSON.stringify({
          success: false,
          phone: null,
          message: 'Failed to fetch contact details',
        }),
      };
    }

    const data = await response.json();
    const phone = data.properties?.phone || null;
    const isValid = phone && phone.startsWith('+');

    console.log('Fetched Contact Data:', JSON.stringify(data, null, 2));
    console.log('Phone Valid:', isValid);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: isValid,
        phone: isValid ? phone : null,
        message: isValid ? 'Valid phone number found' : 'No valid phone number',
      }),
    };
  } catch (error) {
    console.error('Error during fetch:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        phone: null,
        message: 'Server error while fetching contact details',
      }),
    };
  }
};
