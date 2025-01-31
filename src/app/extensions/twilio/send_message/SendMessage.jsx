import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, Input, Form, Alert } from '@hubspot/ui-extensions';
import logToServer from '../../lib/log.js'; // Import logging function

const SendMessage = ({ context, runServerless }) => {
  const [phoneDetails, setPhoneDetails] = useState({
    phone: null,
    success: false,
    message: '',
  });
  const [message, setMessage] = useState('');
  const [sendResponse, setSendResponse] = useState({
    success: null,
    message: '',
  });
  const [isFetching, setIsFetching] = useState(true); // Loading state for fetching phone number
  const [isSending, setIsSending] = useState(false); // Loading state for sending message

  // Fetch contact phone details on load
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      setIsFetching(true);
      try {
        const serverResponse = await runServerless({
          name: 'checkPhoneNumber',
          parameters: { context },
        });

        if (serverResponse?.response?.body) {
          const parsedBody = JSON.parse(serverResponse.response.body);
          setPhoneDetails(parsedBody);
        } else {
          setPhoneDetails({
            phone: null,
            success: false,
            message: 'Unable to retrieve phone number.',
          });
        }
      } catch (error) {
        await logToServer(
          runServerless,
          `Error fetching phone number: ${error.message}`
        );
        setPhoneDetails({
          phone: null,
          success: false,
          message:
            'An unexpected error occurred while fetching contact details.',
        });
      } finally {
        setIsFetching(false); // Stop loading after fetching
      }
    };

    fetchPhoneNumber();
  }, [context, runServerless]);

  // Handle sending the message
  const handleSendMessage = async () => {
    setIsSending(true); // Start loading for sending
    try {
      const serverResponse = await runServerless({
        name: 'sendMessage',
        parameters: { phone: phoneDetails.phone, message },
      });

      const parsedResponse = JSON.parse(serverResponse?.response?.body);

      if (parsedResponse.success) {
        setSendResponse({
          success: true,
          message: 'Your message has been sent successfully.',
        });

        // Clear the input field after successful send
        setMessage('');
      } else {
        setSendResponse({
          success: false,
          message: parsedResponse.message || 'Failed to send the message.',
        });
      }

      // Log success or failure
      await logToServer(
        runServerless,
        `Message send status: ${parsedResponse.success}, Response: ${parsedResponse.message}`
      );
    } catch (error) {
      await logToServer(
        runServerless,
        `Error sending message: ${error.message}`
      );
      setSendResponse({
        success: false,
        message: 'An unexpected error occurred while sending your message.',
      });
    } finally {
      setIsSending(false); // Stop loading after sending
    }
  };

  return (
    <Flex direction="column" style={{ padding: '20px', maxWidth: '400px' }}>
      {/* Header Section */}
      <Text
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#33475b',
        }}
      >
        Twilio Message Sender
      </Text>

      {/* Loading or Contact Info */}
      {isFetching ? (
        <Text style={{ marginBottom: '15px', color: '#8695a4' }}>
          Loading phone details...
        </Text>
      ) : phoneDetails.success ? (
        <Text style={{ marginBottom: '10px', color: '#33475b' }}>
          Phone Number: {phoneDetails.phone}
        </Text>
      ) : (
        <Alert variant="danger" style={{ marginBottom: '10px' }}>
          Unable to retrieve a valid phone number for this contact.
        </Alert>
      )}

      {/* Message Form */}
      {phoneDetails.success && !isFetching && (
        <Form>
          <Input
            label="Message"
            name="message-input"
            placeholder="Type your message here..."
            value={message}
            onChange={setMessage} // Directly update the state
            disabled={isSending} // Disable input while sending
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #cbd6e2',
            }}
          />

          <Button
            onClick={handleSendMessage}
            disabled={isSending} // Disable button while sending or if no message
            style={{
              backgroundColor: isSending ? '#cbd6e2' : '#0070d2',
              color: isSending ? '#8695a4' : '#fff',
              marginTop: '10px',
              padding: '10px',
            }}
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </Button>
        </Form>
      )}

      {/* Response Message */}
      {sendResponse.message && (
        <Alert
          variant={sendResponse.success ? 'success' : 'danger'}
          style={{ marginTop: '15px' }}
        >
          {sendResponse.message}
        </Alert>
      )}
    </Flex>
  );
};

export default SendMessage;
