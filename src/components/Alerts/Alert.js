import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const CustomAlert = ({ status, description }) => {
  console.log("WORKING THE ALERT COMPONENT",status,description);
  
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{status.charAt(0).toUpperCase() + status.slice(1)}!</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
