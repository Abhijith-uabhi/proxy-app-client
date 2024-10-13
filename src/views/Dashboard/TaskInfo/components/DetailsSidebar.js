import { Box, Heading, Text, VStack, Badge } from "@chakra-ui/react";

const DetailsSidebar = () => {
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
          <Text>Sarah Andrews</Text>
        </Box>
        <Box>
          <Heading as="h3" size="sm">
            Assignee:
          </Heading>
          <Text>Unassigned</Text>
        </Box>
        <Box>
          <Heading as="h3" size="sm">
            Due Date:
          </Heading>
          <Text>1/12/2024</Text>
        </Box>
        <Box>
          <Heading  size="sm">
            Priority:
          </Heading>
          <Badge colorScheme="yellow">Medium</Badge>
        </Box>
      </VStack>
    </Box>
  );
};

export default DetailsSidebar;
