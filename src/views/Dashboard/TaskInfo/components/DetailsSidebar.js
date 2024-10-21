import { Box, Heading, Text, VStack, Badge } from "@chakra-ui/react";
import dayjs from "dayjs"

const DetailsSidebar = ({task}) => {
  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" w="100%">
      <Heading as="h2" size="md" mb={4}>
        Details
      </Heading>
      <VStack align="start" spacing={3}>
      
        <Box>
          <Heading as="h3" size="sm">
            Created by:
          </Heading>
          <Text>{task?.createdBy[0].first_name}</Text>
        </Box>
        <Box>
          <Heading as="h3" size="sm">
            Assignee:
          </Heading>
          <Text>{task?.volunteer_id?task?.assignedBy[0].first_name:"Un Assigned"}</Text>
        </Box>
        <Box>
          <Heading as="h3" size="sm">
            Due Date:
          </Heading>
          <Text>{dayjs(task?.due_date).format("YYYY-MM-DD")}</Text>
        </Box>
        <Box>
          <Heading  size="sm">
            Priority:
          </Heading>
          <Badge
            bg={task?.priority === "High" ? "red.400" : task?.priority === "Medium" ? "green.400" :"gray.400"}
            color={"white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {task?.priority}
          </Badge>
        </Box>
      </VStack>
    </Box>
  );
};

export default DetailsSidebar;
