// Chakra imports
import {
    Avatar,
    Button,
    Flex,
    Text,
    useColorModeValue,
    Box,
    Heading, VStack
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import ConfirmModal from "components/Modals/confirmModal";
import taskService from "../../../../services/taksService";
import CustomAlert from "components/Alerts/Alert";
import UserInfoModal from "components/Modals/userInfoModal";

const AssigneeList = ({ task, fetchTask }) => {
    // Chakra color mode
    const textColor = useColorModeValue("gray.700", "white");
    const [assigners, setAssigners] = useState([])
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [selectedAssigner, setSelectedAssigner] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const [showUserInfo, setShowUserInfo] = useState(false)


    useEffect(() => {
        if (task)
            setAssigners(task.assignees)
    }, [task])

    const handleApprove = async () => {
        try {
            const volunteerId = task.volunteer_id ? null : selectedAssigner._id;
            const res = await taskService.updateTask(task._id, { volunteer_id: volunteerId, status: "ASSIGNED" }, volunteerId ? null : "remove_volunteer");

            if (res.data) {
                setShowAlert(true)
                await fetchTask()
            }

            setTimeout(() => {
                setShowAlert(false)
            }, 2000);

            setShowConfirmModal(false);
        } catch (error) {
            console.error("Error assigning the volunteer:", error);
        }
    }



    return (
        <>
            <Box p={4} border="1px" mt={2} borderColor="gray.200" borderRadius="md" w="100%">


                {/* <Card p='16px'> */}
                <Heading p='12px 5px' mb='12px'>
                    <Text fontSize='lg' color={textColor} fontWeight='bold'>
                        Assigners
                    </Text>
                </Heading>
                <VStack >
                    <Flex direction='column' w='100%'>
                        {assigners.length ? assigners.map((assignee) => (
                            <Flex justifyContent='space-between' mb='21px'>
                                <Flex align='center'>
                                    <Avatar name={`${assignee?.first_name} ${assignee?.last_name}`}
                                    />
                                    <Flex direction='column'>
                                        <Text fontSize='sm' color={textColor} fontWeight='bold' ml={3}>
                                            {assignee.first_name}{" "}{assignee.last_name}
                                        </Text>


                                    </Flex>
                                </Flex>

                                <Button p='0px' bg='transparent' variant='no-hover' onClick={() => {
                                    setShowConfirmModal(true)
                                    setSelectedAssigner(assignee)
                                }}

                                    isDisabled={!task.volunteer_id ? false : task.volunteer_id === assignee._id ? false : true} // Set this to true or false based on your logic

                                >
                                    <Text
                                        fontSize='sm'
                                        fontWeight='600'
                                        color='teal.300'
                                        alignSelf='center'>
                                        {task.volunteer_id === assignee._id ? "REMOVE" : "APPROVE"}
                                    </Text>
                                </Button>
                                <Button p='0px' bg='transparent' variant='no-hover' onClick={() => {
                                    setShowUserInfo(true)
                                    setSelectedAssigner(assignee)
                                }}

                                    isDisabled={!task.volunteer_id ? false : task.volunteer_id === assignee._id ? false : true} // Set this to true or false based on your logic

                                >
                                    <Text
                                        fontSize='sm'
                                        fontWeight='600'
                                        color='teal.300'
                                        alignSelf='center'>
                                        VIEW PROFILE
                                    </Text>
                                </Button>



                            </Flex>
                        )) : <>No Assignees</>}
                    </Flex>

                </VStack>


                {/* // </Card> */}
            </Box>
            {showConfirmModal && <ConfirmModal isOpen={showConfirmModal} onClose={setShowConfirmModal}
                title={"Confirm"}
                description={!task.volunteer_id ? `Are you sure to assign this task to ${selectedAssigner.first_name}  ${selectedAssigner.last_name}..?`
                    : `Are you sure to romove this volunteer  ${selectedAssigner.first_name}  ${selectedAssigner.last_name} from your task..?`}
                handleConfirm={handleApprove}

            />}
            {showUserInfo && <UserInfoModal isOpen={showUserInfo} onClose={setShowUserInfo} user={selectedAssigner} />}
            {showAlert && <CustomAlert
                status='success'
                description={`Successfully ${task.volunteer_id ? 'unassigned' : `assigned ${selectedAssigner.first_name} ${selectedAssigner.last_name}`} for this task`}
            />}
        </>

    );
};

export default AssigneeList;
