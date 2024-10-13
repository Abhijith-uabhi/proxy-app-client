import { Box, Heading, Text, VStack, Flex } from "@chakra-ui/react";

const TaskInformation = () => {
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
        Travelling
      </Heading>

      <VStack align="start" spacing={3}>
        <Box mb={2}>
          <Heading as="h3" size="sm" mb={2}>
            Description:
          </Heading>
          <Text >
            I want to drop my parents in to alshifa hosptal for checkup and return them in to home safely
            
          </Text>
        </Box>
        <Box>
          <Flex align="center" mb={4}>
            <Heading as="h3" size="sm" mr={2}>
              Created At:
            </Heading>
            <Text as="span" fontSize="lg">
              11/11/2024
            </Text>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default TaskInformation;
