import React from 'react';
import { Flex } from '@hubspot/ui-extensions';

const SendMessage = ({ children }) => {
  return (
    <Flex
      direction="column"
      style={{
        border: '20px solid #ddd',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'pink',
      }}
    >
      hello
      {children}
    </Flex>
  );
};

export default SendMessage;
