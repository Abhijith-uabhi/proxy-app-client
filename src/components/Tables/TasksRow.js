import {
  Avatar,
  Badge,
  Button,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Link
} from "@chakra-ui/react";
import CustomAlert from "components/Alerts/Alert";
import Card from "components/Card/Card";
import ConfirmModal from "components/Modals/confirmModal";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import taskService from "services/taksService";
import ReactPaginate from "react-paginate";


function TaskRow(props) {
  const { tasks, title, description, priority, due_date, listType, task_id, updateTask, deleteTask, fetchTasks, status, location } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const history = useHistory()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [modalDescription, setModalDescription] = useState("")
  const [alert, setAlert] = useState({ show: false, status: '', description: '' });

  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 10;


  const displayedTasks = tasks.slice(
    currentPage * tasksPerPage,
    (currentPage + 1) * tasksPerPage
  );

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };


  const handleOk = async () => {
    try {
      if (listType === "user_tasks") {
        await deleteTask(task_id)
      } else {
        let type
        if (listType === 'all_tasks') type = "assign"

        else if (listType === "assigned_tasks") type = "unassign"


        await updateTask({ volunteer_id: "" }, task_id, type)

      }
      setShowConfirmModal(false)

    } catch (error) {
      console.log("error in the handleok function", error);
      if (listType === "user_tasks") {
        setAlert({ show: true, status: 'error', description: 'Failed to delete the task' });

      } else {
        setAlert({ show: true, status: 'error', description: 'Failed to assign the task' });

      }
    }
  }


  const handleEditTask = async () => {
    try {
      await updateTask({ title, description, priority, due_date: dayjs(due_date).format('YYYY-MM-DD'), location }, task_id)
    } catch (error) {
      console.log("Error editing a task", error);

    }
  }



  return (
    <>
      <Tr key={task.task_id}>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {listType !== "all_tasks" ? <Link textDecoration="underline" onClick={(() => {
              history.push({
                pathname: `/admin/task/info/${task.task_id}`,  // Passing data as state
                state: { type: listType }
              });
            })}>
              {task.title}
            </Link> : (task.title)}

          </Text>
        </Td>

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {task.description}
          </Text>
        </Td>
        <Td>
          <Badge
            bg={task.priority === "High" ? "red.400" : task.priority === "Medium" ? "green.400" : bgStatus}
            color={"white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {task.priority}
          </Badge>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {task.location}
          </Text>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {dayjs(task.due_date).format("YYYY-MM-DD")}
          </Text>
        </Td>
        {listType === "user_tasks" ? (<>
          <Td>
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              {task.status}
            </Text>
          </Td></>) : (<></>)}
        <Td>
          <Flex
            direction={{ sm: "column", md: "row" }}
            align="flex-start"
            p={{ md: "24px" }}
          >
            {listType === "user_tasks" ? <>      <Button
              p="0px"
              bg="transparent"
              mb={{ sm: "10px", md: "0px" }}
              me={{ md: "12px" }}

              onClick={() => { setShowConfirmModal(true), setModalDescription("Are you sure want to delete this task") }}
            >
              <Flex color="red.500" cursor="pointer" align="center" p="12px">
                <Icon as={FaTrashAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold">
                  DELETE
                </Text>
              </Flex>
            </Button>
              <Button p="0px" bg="transparent" onClick={() => { handleEditTask() }}>
                <Flex color={textColor} cursor="pointer" align="center" p="12px">
                  <Icon as={FaPencilAlt} me="4px" />
                  <Text fontSize="sm" fontWeight="semibold">
                    EDIT
                  </Text>
                </Flex>
              </Button></> : <>  <Button p="0px" bg="transparent" onClick={(() => {
                setShowConfirmModal(true)
                setModalDescription(listType == "all_tasks" ? "Are you sure to assign this task..!" : "Are you sure want to un assign this task..?")
              })}>
                {
                  listType === "all_tasks" ? (
                    <Flex color={textColor} cursor="pointer" align="center" p="12px">
                      <Icon as={FaUserPlus} me="4px" /> {/* Icon representing "Assign Task" */}
                      <Text fontSize="sm" fontWeight="semibold">
                        Assign Task
                      </Text>
                    </Flex>
                  ) : (<></>)
                }
                {
                  listType === "assigned_tasks" ? (
                    <Flex color={textColor} cursor="pointer" align="center" p="12px">
                      <Icon as={FaUserPlus} me="4px" /> {/* Icon representing "Assign Task" */}
                      <Text fontSize="sm" fontWeight="semibold">
                        Unassign Task
                      </Text>
                    </Flex>
                  ) : (<></>)
                }


              </Button></>}

          </Flex>
        </Td>
      </Tr>

      {tasks.length > 0 && (
        <Flex justifyContent="center" mt="4">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>
            Previous
          </Button>
          <Text mx="2">Page {currentPage + 1}</Text>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(tasks.length / tasksPerPage) - 1))
            }
          >
            Next
          </Button>
        </Flex>

      )}

      {
        showConfirmModal && (
          <ConfirmModal
            isOpen={showConfirmModal}
            onClose={setShowConfirmModal}
            title="Confirm"
            description={modalDescription}
            handleConfirm={handleOk}
          />)
      }
    </>
  );
}

export default TaskRow;
