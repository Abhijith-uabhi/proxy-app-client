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
import CustomAlert from "components/Alerts/Alert";
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
    const [alert, setAlert] = useState({ show: false, status: '', description: '' });



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
            const res = await taskService.deleteTask(task_id)
            if (res) {
                fetchTasks(listType)
                setAlert({ show: true, status: 'success', description: 'Task deleted successfully' })
            }
            setTimeout(() => {
                setAlert({ show: false });
            }, 2000);
            return res

        } catch (error) {
            console.log("error deleteting the task", error);

        }
    }


    const handleEditTask = async (values, id, type) => {
        try {
            console.log("TYPE IN HANDLE EDIT TASK FUNCTION", type);

            if (type === "assign" || type === "unassign") {
                await taskService.updateTask(id, values, type)
                await fetchTasks(listType)
                setAlert(
                    {
                        show: true,
                        status: 'success',
                        description: listType === "all_tasks" ? 'Task assigned successfully' : "Task un assigned successfully"
                    });
            }
            else {
                history.push({
                    pathname: "/admin/edit/tasks",
                    state: { taskData: values, task_id: id }  // Passing data as state
                });
            }
            setTimeout(() => {
                setAlert({ show: false });
            }, 2000);
        } catch (error) {
            if (type === "assign") {
                setAlert({ show: true, status: 'error', description: 'Error assigned task' });

            }
            console.log("Error editing a task", error);

        }
    }

    return (
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            {alert.show && <CustomAlert status={alert.status} description={alert.description} />}

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
