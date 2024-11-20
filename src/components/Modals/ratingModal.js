import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const RatingModal = ({isOpen,onClose, onSubmitRating,content }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => setRating(value);

  const submitRating = () => {
    onSubmitRating(rating);
    onClose();
  };

  return (
    <>
    
      {/* Rating Modal */}
      <Modal isOpen={isOpen} onClose={()=>onClose(false)} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{content.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{content.description}</p>
            <HStack justify="center" my={4}>
              {[...Array(5)].map((_, index) => (
                <IconButton
                  key={index}
                  icon={<StarIcon />}
                  aria-label={`Rate ${index + 1}`}
                  colorScheme={index < rating ? "yellow" : "gray"}
                  onClick={() => handleRating(index + 1)}
                />
              ))}
            </HStack>
            <p style={{ textAlign: "center" }}>
              You selected {rating} out of 5 stars.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitRating}>
              Submit
            </Button>
            <Button variant="ghost" onClick={()=>onClose(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RatingModal;
