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



function TaskRow(props) {
  const { title, description, priority, due_date, listType, task_id, updateTask, deleteTask, fetchTasks, status, address, city, state, country } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const history = useHistory()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [modalDescription, setModalDescription] = useState("")
  const [alert, setAlert] = useState({ show: false, status: '', description: '' });

  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 10;



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
      await updateTask({ title, description, priority, due_date: dayjs(due_date).format('YYYY-MM-DD'), address, city, country, state }, task_id)
    } catch (error) {
      console.log("Error editing a task", error);

    }
  }


  return (
    <>
      <Tr>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {listType !== "all_tasks" ? <Link textDecoration="underline" onClick={(() => {
              history.push({
                pathname: `/admin/task/info/${task_id}`,  // Passing data as state
                state: { type: listType }
              });
            })}>
              {title}
            </Link> : (title)}

          </Text>
        </Td>

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {description}
          </Text>
        </Td>
        <Td>
          <Badge
            bg={priority === "High" ? "red.400" : priority === "Medium" ? "green.400" : bgStatus}
            color={"white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {priority}
          </Badge>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {country},{state}
          </Text>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">{city}</Text>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">{address}</Text>

        </Td>

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {dayjs(due_date).format("YYYY-MM-DD")}
          </Text>
        </Td>
        {listType === "user_tasks" ? (<>
          <Td>
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              {status}
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
  )
}

export default TaskRow;
