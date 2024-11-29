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




  const handlePageChange = async (selectedPage) => {
    console.log("Selected page:", selectedPage.selected);
    try {
      setCurrentPage(selectedPage.selected);
      await fetchTasks(selectedPage.selected, tasksPerPage);
    } catch (error) {
      console.error("Error in handlePageChange:", error);
    }
  };



  const handleOk = async () => {
    try {
      if (listType === "user_tasks") {
        await deleteTask(tasks[currentPage].task_id)
      } else {
        let type
        if (listType === 'all_tasks') type = "assign"

        else if (listType === "assigned_tasks") type = "unassign"


        await updateTask({ volunteer_id: "" }, tasks[currentPage].task_id, type)

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

  useEffect(() => {
    fetchTasks(currentPage, tasksPerPage);
  }, [currentPage]);


  return (
    <>
      {tasks.map((task, index) => (
        <Tr key={task.task_id}>
          <Td>
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              {listType !== "all_tasks" ? (
                <Link
                  textDecoration="underline"
                  onClick={() =>
                    history.push({
                      pathname: `/admin/task/info/${task.task_id}`,
                      state: { type: listType },
                    })
                  }
                >
                  {task.title}
                </Link>
              ) : (
                task.title
              )}
            </Text>
          </Td>
          <Td>
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              {task.description}
            </Text>
          </Td>
          <Td>
            <Badge
              bg={
                task.priority === "High"
                  ? "red.400"
                  : task.priority === "Medium"
                    ? "green.400"
                    : bgStatus
              }
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
          {listType === "user_tasks" && (
            <Td>
              <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                {task.status}
              </Text>
            </Td>
          )}
          <Td>
            <Flex
              direction={{ sm: "column", md: "row" }}
              align="flex-start"
              p={{ md: "24px" }}
            >
              <Button
                p="0px"
                bg="transparent"
                onClick={() => {
                  setShowConfirmModal(true);
                  setModalDescription(
                    listType === "all_tasks"
                      ? "Are you sure to assign this task?"
                      : "Are you sure want to unassign this task?"
                  );
                }}
              >
                <Flex
                  color={listType === "all_tasks" ? "blue.500" : "red.500"}
                  cursor="pointer"
                  align="center"
                  p="12px"
                >
                  <Icon
                    as={
                      listType === "all_tasks"
                        ? FaUserPlus // Assign icon
                        : FaTrashAlt // Delete icon
                    }
                    me="4px"
                  />
                  <Text fontSize="sm" fontWeight="semibold">
                    {listType === "all_tasks" ? "Assign Task" : "Unassign/Delete"}
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </Td>
        </Tr>
      ))}

      <Flex justify="center" mt="4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(totalTasksCount / tasksPerPage)}
          onPageChange={(selected) => setCurrentPage(selected.selected)}
          containerClassName={"pagination"}
          activeClassName={"active"} 
        />
      </Flex>

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
