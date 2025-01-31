import React from 'react';
import { hubspot } from '@hubspot/ui-extensions';

import SendMessage from './twilio/send_message/SendMessage';

// Define the extension to be run within the HubSpot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <SendMessage
    context={context}
    runServerless={runServerlessFunction}
    actions={actions}
  />
));
