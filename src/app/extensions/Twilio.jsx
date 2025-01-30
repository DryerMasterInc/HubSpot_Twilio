import React, { useState } from 'react';
import { hubspot } from '@hubspot/ui-extensions';

import SendMessage from './twilio/send_message/SendMessage';

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {
  return <SendMessage />;
};
