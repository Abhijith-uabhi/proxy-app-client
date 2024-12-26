// Chakra imports
import { Box, Flex, Grid, Icon, GridItem, Select, VStack, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CommentSection from "./components/CommentSection"
import DetailsSidebar from "./components/DetailsSidebar";
import TaskInformation from "./components/TaskDetails";
import Card from "components/Card/Card";
import { useParams } from 'react-router-dom';
import taskService from "../../../services/taksService";
import AssigneeList from "./components/Assignees";
import { position } from "stylis";
import { useSelector } from "react-redux";
import RatingModal from "components/Modals/ratingModal";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import userService from "services/userService";



function TaskInfo() {
  const [task, setTask] = useState()
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth)
  const [allowComments, setAllowComments] = useState(false)
  const [showRatingModal, setShowratingModal] = useState(false)
  const [ratingData, setratingModalData] = useState({ title: "", description: "" })
  const [taskStatus, setTaskStatus] = useState()


  useEffect(() => {
    fetchTask()
  }, [])

  const fetchTask = async () => {
    try {
      const task = await taskService.getSingleTask(id);
      setTaskStatus(task.data.status)
      setTask(task.data);

      if (task.data.created_by === user._id) {
        // Allow comments if the user created the task
        setAllowComments(true);

        if (task.data.status === "COMPLETED") {

          const isRated = task.data.assignedBy[0].assigned_task_ratings?.length &&
            task.data.assignedBy[0].assigned_task_ratings.find((item) => item.task_name === task.data.title && item.ratingBy === user._id)
          console.log("CHECK THE TASK IS ALREADY RATED", isRated);

          if (!isRated) {
            setratingModalData({
              ratedTo: task.data.volunteer_id,
              rating_type: "assigned",
              title: "Rate the Volunteer",
              description: `The volunteer ${task.data.assignedBy[0].first_name} ${task.data.assignedBy[0].last_name} successfully completed your task. Share your feedback by rating their performance.`,
            });
            setShowratingModal(true);

          }


        }
      } else if (task.data.volunteer_id === user._id) {
        // Allow comments if the user is the volunteer
        setAllowComments(true);

        if (task.data.status === "COMPLETED") {
          const isRated = task.data.createdBy[0]?.created_task_ratings?.length &&
            task.data.createdBy[0].created_task_ratings.find((item) => item.task_name === task.data.title && item.ratingBy === user._id)
          console.log("CHECK THE TASK IS ALREADY RATED", isRated);

          if (!isRated) {
            setratingModalData({
              ratedTo: task.data.created_by,
              rating_type: "created",
              title: "Rate the Task Creator",
              description: `Please rate your experience working with the task creator ${task.data.createdBy[0].first_name} ${task.data.createdBy[0].last_name} for this task.`,
            });
            setShowratingModal(true);
          }


        }
      }
    } catch (error) {
      console.error("Error fetching the task:", error);
    }
  };

  const onsubmitRating = async (rating) => {
    try {
      const payload = {
        rating,
        ratedTo: ratingData?.ratedTo,
        rating_type: ratingData.rating_type,
        task_name: task.title
      }
      console.log("THE PAYLOAD IS", payload, task);

      const res = await userService.submitRating(payload)
    } catch (error) {
      console.log("ERROR SUBMITTING THE RATING", error);

    }
  }

  const onChangeStatus = (e) => {
    console.log(e.target.value);
    console.log(task.status);
    setTaskStatus(e.target.value)


  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card>
        <Grid templateColumns="2fr 1fr" gap={6} >
          <GridItem maxHeight={"100vh"} overflowY={"auto"} css={{
            '&::-webkit-scrollbar': { display: 'none' }, // Hides scrollbar for Chrome, Safari, and Edge
            '-ms-overflow-style': 'none', // Hides scrollbar for Internet Explorer and Edge
            'scrollbar-width': 'none', // Hides scrollbar for Firefox    
          }}>
            <TaskInformation task={task} />
            {allowComments && (
              <CommentSection task={task} user={user} />
            )}

          </GridItem>

          <GridItem >
            <Box display="inline-flex" alignItems="center" paddingBottom="10px" gap="4">
              <Text fontSize="md" fontWeight="semibold">Task Status</Text>
              <Text>:</Text>
              <Select
                placeholder="Select Task Status"
                value={taskStatus}
                onChange={onChangeStatus}
                aria-label="Select Task Status"
                width="200px"
              >
                <option value="COMPLETED">Completed</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="NOT_STARTED">Not Started</option>
                <option value="WAITING_FOR_APPROVAL">Waiting for Approval</option>
                <option value="CREATED">Created</option>
              </Select>
            </Box>
            <DetailsSidebar task={task} isTaskOwner={task?.created_by === user?._id} />
            {task?.created_by === user?._id ? <AssigneeList task={task} fetchTask={fetchTask} /> : <></>}

          </GridItem>
        </Grid>
      </Card>
      <RatingModal isOpen={showRatingModal} onClose={setShowratingModal} content={ratingData} onSubmitRating={onsubmitRating} />
    </Flex>




  );
}

export default TaskInfo;
