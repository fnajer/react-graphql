import React from 'react';
import { Box, Toast } from 'gestalt';

const ToastMessage = ({ show, message }) => {
  return (
    show && 
    <Box
      position="fixed" 
      dangerouslySetInlineStyle={{
        __style: {  
          bottom: 200,
          left: '50%',
          transform: 'translateX(-50%)'
        }
      }}
    >
      <Toast color="orange" text={message}/>
    </Box>
  );
}

export default ToastMessage;
