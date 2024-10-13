// Chakra imports
import { Box, Flex, Grid, Icon, GridItem } from "@chakra-ui/react";
import React from "react";
import CommentSection from "./components/CommentSection"
import DetailsSidebar from "./components/DetailsSidebar";
import TaskInformation from "./components/TaskDetails";
import Card from "components/Card/Card";

function TaskInfo() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card>
        <Grid templateColumns="2fr 1fr" gap={6}>
          <GridItem>
            <TaskInformation />
            <CommentSection mt={6} />
          </GridItem>
          <GridItem>
            <DetailsSidebar />
          </GridItem>
        </Grid>
      </Card>

    </Flex>




  );
}

export default TaskInfo;
