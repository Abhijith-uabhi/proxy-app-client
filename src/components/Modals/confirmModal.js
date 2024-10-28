import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const ConfirmModal = ({isOpen, onClose,title,description,handleConfirm }) => {

    

  return (
    <>
      {/* Modal component */}
      <Modal isOpen={isOpen} onClose={()=>onClose(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {description}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>{onClose(false)}}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={()=>handleConfirm()}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
