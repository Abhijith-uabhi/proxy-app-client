// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { tablesTableData } from "variables/general";
import Tasks from "./components/Task";
import taskService from "services/taksService";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TaskPage() {
  const location = useLocation()
  const [listType, setListType] = useState()
  const history=useHistory()
  

  useEffect(() => {
    if (location.pathname === '/admin/tasks') {
      setListType("all_tasks")
    }
    else if (location.pathname === "/admin/your/tasks") {
      setListType("user_tasks")
    }
  }, [])





  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Tasks
        listType={listType}
        title={"Tasks"}
        captions={["Task Name", "Description", "Priority", "Due_date", "Actions"]}
      />

    </Flex>
  );
}

export default TaskPage;
