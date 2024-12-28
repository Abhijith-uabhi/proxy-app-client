import { Box, Heading, Text, VStack, Badge, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";

const DetailsSidebar = ({ task, isTaskOwner }) => {
  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" w="100%">
      <Heading as="h2" size="md" mb={4}>
        Details
      </Heading>
      <VStack align="start" spacing={3} w="100%">
        <Flex align="center" w="100%">
          <Text fontWeight="bold" minW="120px">
            Created by
          </Text>
          <Text>:</Text>
          <Text ml={2}>{task?.createdBy[0]?.first_name || "N/A"}</Text>
        </Flex>

        {isTaskOwner && (
          <Flex align="center" w="100%">
            <Text fontWeight="bold" minW="120px">
              Assignee
            </Text>
            <Text>:</Text>
            <Text ml={2}>
              {task?.volunteer_id
                ? `${task?.assignedBy[0]?.first_name || ""} ${task?.assignedBy[0]?.last_name || ""
                }`
                : "Unassigned"}
            </Text>
          </Flex>
        )}

        <Flex align="center" w="100%">
          <Text fontWeight="bold" minW="120px">
            Created At
          </Text>
          <Text>:</Text>
          <Text ml={2}>
            {dayjs.unix(task?.created_on).format("YYYY-MM-DD") || "N/A"}
          </Text>
        </Flex>

        <Flex align="center" w="100%">
          <Text fontWeight="bold" minW="120px">
            Due Date
          </Text>
          <Text>:</Text>
          <Text ml={2}>
            {dayjs(task?.due_date).format("YYYY-MM-DD") || "N/A"}
          </Text>
        </Flex>

        <Flex align="center" w="100%">
          <Text fontWeight="bold" minW="120px">
            Status
          </Text>
          <Text>:</Text>
          <Text ml={2}>
            {task?.status}
          </Text>
        </Flex>

        <Flex align="center" w="100%">
          <Text fontWeight="bold" minW="120px">
            Priority
          </Text>
          <Text>:</Text>
          <Badge
            ml={2}
            bg={
              task?.priority === "High"
                ? "red.400"
                : task?.priority === "Medium"
                  ? "green.400"
                  : "gray.400"
            }
            color="white"
            fontSize="12px"
            p="3px 10px"
            borderRadius="8px"
          >
            {task?.priority || "N/A"}
          </Badge>
        </Flex>
      </VStack>
    </Box>
  );
};

export default DetailsSidebar;
