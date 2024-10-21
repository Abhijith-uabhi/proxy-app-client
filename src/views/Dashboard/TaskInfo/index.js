// Chakra imports
import { Box, Flex, Grid, Icon, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CommentSection from "./components/CommentSection"
import DetailsSidebar from "./components/DetailsSidebar";
import TaskInformation from "./components/TaskDetails";
import Card from "components/Card/Card";
import { useParams } from 'react-router-dom';
import taskService from "../../../services/taksService";
import AssigneeList from "./components/Assignees";


function TaskInfo() {
  const [task, setTask] = useState()
  const { id } = useParams();

  useEffect(() => {
    fetchTask()
  }, [])

  const fetchTask = async () => {
    try {
      const task = await taskService.getSingleTask(id)
      setTask(task.data)

    } catch (error) {
      console.log("ERROR FETCHING THE TASK", error);

    }
  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card>
        <Grid templateColumns="2fr 1fr" gap={6}>
          <GridItem>
            <TaskInformation task={task} />
            <CommentSection task={task} />
          </GridItem>
          <GridItem>
            <DetailsSidebar task={task} />
            <AssigneeList task={task}/>
          </GridItem>
        </Grid>
      </Card>

    </Flex>




  );
}

export default TaskInfo;
