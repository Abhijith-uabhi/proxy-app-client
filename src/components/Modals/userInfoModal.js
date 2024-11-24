import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    Badge,
    Divider,
    Stack,
    VStack,
    Avatar,
    Flex,
    Icon,
} from '@chakra-ui/react';
import { MdStar } from "react-icons/md";
import userService from 'services/userService';

const UseruserInfoModal = ({ isOpen, onClose, user }) => {
    const [userInfo, setUseruserInfo] = useState()
    useEffect(() => {
        if (user) getUser();
    }, [user]);

    const getUser = async () => {
        try {
            const res = await userService.getUser(user._id);
            setUseruserInfo(res.data)
        } catch (error) {
            console.error("ERROR GETTING USER:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex alignItems="center" gap={2}>
                        <Avatar
                            name={`${userInfo?.first_name} ${userInfo?.last_name}`}
                            size="lg"
                            bg="teal.400"
                        />
                        <VStack align="start" spacing={0}>
                            <Text fontSize="xl" fontWeight="bold">
                                {`${userInfo?.first_name} ${userInfo?.last_name}`}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                {userInfo?.email}
                            </Text>
                        </VStack>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* User Details Section */}
                    <Box>
                        <Stack spacing={4}>
                            <Flex justify="space-between">
                                <Text fontWeight="medium">Phone:</Text>
                                <Text>{userInfo?.phone_number || "Not provided"}</Text>
                            </Flex>
                            <Flex justify="space-between">
                                <Text fontWeight="medium">Role:</Text>
                                <Badge colorScheme="green" px={2}>
                                    {userInfo?.role}
                                </Badge>
                            </Flex>
                            
                            <Flex justify="space-between" alignItems="center">
                                <Text fontWeight="medium">Avg. Task Assigned Rating:</Text>
                                <Flex align="center" gap={1}>
                                    <Text>{userInfo?.avg_assigned_task_rating || "N/A"}</Text>
                                    <Icon as={MdStar} color="yellow.400" />
                                </Flex>
                            </Flex>
                            <Flex justify="space-between" alignItems="center">
                                <Text fontWeight="medium">Avg. Task Created Rating:</Text>
                                <Flex align="center" gap={1}>
                                    <Text>{userInfo?.avg_created_task_rating || "N/A"}</Text>
                                    <Icon as={MdStar} color="yellow.400" />
                                </Flex>
                            </Flex>
                        </Stack>

                        <Divider my={4} />

                        
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => onClose(false)} colorScheme="teal">
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UseruserInfoModal;
