import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box } from '@chakra-ui/react';
import { motion } from "framer-motion";


const CustomAlert = ({ status, description }) => {
  console.log("Hello worlf");
  

  const MotionBox = motion(Box);


  return (
    <MotionBox
      initial={{ x: '100vw' }}  // Starts off-screen to the right
      animate={{ x: 0 }}        // Moves to the center (half of the screen)
      transition={{ type: "spring", stiffness: 50, duration: 0.5 }}  // Smooth animation
      position="fixed"
      top="10%"
      right="0"   // Aligns the box with the right side of the screen
      width="40%" // Takes up half of the screen width
      zIndex={9999}  // Ensures the alert stays on top
    >
      <Alert status={status}>
        <AlertIcon />
        <AlertTitle>{status.charAt(0).toUpperCase() + status.slice(1)}!</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </MotionBox>

  );
};

export default CustomAlert;
