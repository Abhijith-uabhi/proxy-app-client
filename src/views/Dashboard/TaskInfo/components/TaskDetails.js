import { Box, Heading, Text, VStack, Flex } from "@chakra-ui/react";
import dayjs from "dayjs"

const TaskInformation = ({task}) => {
  console.log("THE TASK DATE",task?.created_on);
  
  
  return (
    <Box p={4} w="100%">
      {/* <Flex align="center" mb={4}>
        <Heading as="h3" size="sm" mr={2}>
          Taskname:
        </Heading>
        <Text as="span" fontSize="lg">
          Travelling
        </Text>
      </Flex> */}
      <Heading as="h3" size="lg" mb={4}>
       {task?.title}
      </Heading>

      <VStack align="start" spacing={3}>
        <Box mb={2}>
          <Heading as="h3" size="sm" mb={2}>
            Description:
          </Heading>
          <Text >
           {task?.description}
          </Text>
        </Box>
        {/* <Box>
          <Flex align="center" mb={4}>
            <Heading as="h3" size="sm" mr={2}>
              Created At:
            </Heading>
            <Text as="span" fontSize="lg">
             {dayjs.unix(task?.created_on).format("YYYY-MM-DD")}
            </Text>
          </Flex>
        </Box> */}
      </VStack>
    </Box>
  );
};

export default TaskInformation;
