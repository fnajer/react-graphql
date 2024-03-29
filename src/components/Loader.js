import React from 'react';
import { GridLoader } from 'react-spinners';
import { Box } from 'gestalt';

const Loader = ({ show }) => {
  return (
    show && <Box position="fixed" dangerouslySetInlineStyle={{
      __style: {
        bottom: 300,
        left: '50%',
        transform: 'translateX(-50%)'
      }
    }}>
      <GridLoader
        size={50}
        margin="3px"
        color="darkorange"
      />
    </Box>
  )
}

export default Loader
