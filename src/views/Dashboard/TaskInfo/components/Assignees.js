// Chakra imports
import {
    Avatar,
    Button,
    Flex,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";
import userService from "../../../../services/userService"

const AssigneeList = ({ task }) => {
    // Chakra color mode
    const textColor = useColorModeValue("gray.700", "white");
    const [assigners, setAssigners] = useState([])

    useEffect(() => {
        fetchAssigners()
    }, [task])

    const fetchAssigners = async () => {
        try {

            const result = await userService.getAllUsers({ user_ids: task.assignees })
            setAssigners(result.data)

        } catch (error) {
            console.log("ERROR FETCHING THE ASSIGNERS", error);

        }
    }



    return (
        <Card p='16px'>
            <CardHeader p='12px 5px' mb='12px'>
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                    Assigners
                </Text>
            </CardHeader>
            <CardBody px='5px'>
                <Flex direction='column' w='100%'>
                    {assigners.length && assigners.map((assignee) => (
                        <Flex justifyContent='space-between' mb='21px'>
                            <Flex align='center'>
                                <Avatar
                                    src={avatar2}
                                    w='50px'
                                    h='50px'
                                    borderRadius='15px'
                                    me='10px'
                                />
                                <Flex direction='column'>
                                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                                        {assignee.first_name}
                                    </Text>


                                </Flex>
                            </Flex>
                            <Button p='0px' bg='transparent' variant='no-hover'>
                                <Text
                                    fontSize='sm'
                                    fontWeight='600'
                                    color='teal.300'
                                    alignSelf='center'>
                                    APPROVE
                                </Text>
                            </Button>
                        </Flex>
                    ))}
                </Flex>
            </CardBody>
        </Card>
    );
};

export default AssigneeList;
