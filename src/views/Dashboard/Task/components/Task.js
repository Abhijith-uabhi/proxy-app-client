// Chakra imports
import {
    Button,
    Flex,
    Spacer,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import TaskRow from "components/Tables/TasksRow";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import taskService from "services/taksService";

const Tasks = ({ title, captions, listType }) => {
    const textColor = useColorModeValue("gray.700", "white");
    const history = useHistory()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (listType)
            fetchTasks(listType)
    }, [listType])


    const handleCreateTasks = () => {
        history.push("/admin/create/tasks")
    }

    const fetchTasks = async (type) => {
        try {
            const response = await taskService.getall(type)
            // console.log("THE RESPONSE DATA",response.data);
            
            setTasks(response.data)
        } catch (error) {
            console.log("Error fetching the  tasks", error);

        }
    }

    const handleDeleteTask = async (task_id) => {
        try {
            console.log((task_id));
            const res = await taskService.deleteTask(task_id)
            if (res) fetchTasks(listType)
            return res

        } catch (error) {
            console.log("error deleteting the task", error);

        }
    }


    const handleEditTask = async (values, id) => {
        try {
            console.log(values);
            history.push({
                pathname: "/admin/edit/tasks",
                state: { taskData: values, task_id: id }  // Passing data as state
            });
        } catch (error) {
            console.log("Error editing a task", error);

        }
    }

    return (
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader>
                <Flex justify="space-between" align='center' mb='1rem' w='100%'>
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                        {title}
                    </Text>
                    {listType === "user_tasks" ? (
                        <Button
                            colorScheme='teal'
                            borderColor='teal.300'
                            color='teal.300'
                            variant='outline'
                            fontSize='xs'
                            p='8px 32px'
                            onClick={() => { handleCreateTasks() }}
                        >
                            CREATE TASK
                        </Button>
                    ) : <></>}

                </Flex>
            </CardHeader>

            <CardBody>
                <Table variant='simple' color={textColor}>
                    <Thead>
                        <Tr my='.8rem' pl='0px' color='gray.400'>
                            {captions.map((caption, idx) => {
                                return (
                                    <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                                        {caption}
                                    </Th>
                                );
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tasks.map((row) => {
                            return (
                                <TaskRow
                                    fetchTasks={fetchTasks}
                                    updateTask={handleEditTask}
                                    deleteTask={handleDeleteTask}
                                    task_id={row._id}
                                    listType={listType}
                                    key={row._id}
                                    title={row.title}
                                    description={row.description}
                                    priority={row.priority}
                                    due_date={row.due_date}
                                />
                            );
                        })}
                    </Tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default Tasks;
