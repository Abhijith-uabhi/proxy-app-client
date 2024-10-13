import { useState } from "react";
import { Box, Heading, Input, Button, VStack, Text, HStack, Flex, Avatar } from "@chakra-ui/react";

const CommentSection = () => {
  const [comments, setComments] = useState([
    { user: "User 1", text: "This is a comment.", created_at: "2024-10-12", time: "12:30 PM", replies: [] },
    { user: "User 2", text: "Another comment here.", created_at: "2024-10-12", time: "1:00 PM", replies: [] },
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // Track which user is being replied to
  const [parentCommentId, setParentCommentId] = useState(null); // Track which comment ID the reply is for

  // Function to handle adding a new comment or reply
  const addComment = () => {
    if (newComment.trim() === "") return; // Prevent empty comments
    
    const newCommentData = {
      user: "Current User", // Replace with actual user logic if needed
      text: newComment,
      created_at: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      replies: [], // Initialize replies as an empty array
    };

    if (parentCommentId !== null) {
      // If replying to a comment, add it to the specific comment's replies
      const updatedComments = comments.map((comment, index) => {
        if (index === parentCommentId) {
          return {
            ...comment,
            replies: [...comment.replies, newCommentData],
          };
        }
        return comment;
      });
      setComments(updatedComments);
    } else {
      // If adding a new comment
      setComments([...comments, newCommentData]);
    }
    
    setNewComment(""); // Clear input
    setReplyingTo(null); // Reset replying state
    setParentCommentId(null); // Reset parent comment ID
  };

  // Function to handle reply button click
  const handleReply = (user, index) => {
    setReplyingTo(user);
    setNewComment(`@${user} `); // Pre-fill the input with the user's name
    setParentCommentId(index); // Set the parent comment ID
  };

  // Recursive function to render comments and replies
  const renderComments = (comments) => {
    return comments.map((comment, index) => (
      <Box key={index} w="100%" pl={4} borderLeft="1px" borderColor="gray.200" mt={2}>
        <Flex align="start">
          <Avatar name={comment.user} />
          <Box pl={3}>
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="sm">{comment.user}</Text>
              <Text fontSize="sm" color="gray.500" pl={2}>
                {comment.created_at} • {comment.time}
              </Text>
            </Flex>
            <Text fontSize="md" mt={1}>
              {comment.text}
            </Text>
            {/* Reply Button */}
            <Button size="xs" mt={2} onClick={() => handleReply(comment.user, index)}>
              Reply
            </Button>

            {/* Display Replies Recursively */}
            {comment.replies.length > 0 && (
              <VStack align="start" spacing={2} mt={3}>
                {renderComments(comment.replies)}
              </VStack>
            )}
          </Box>
        </Flex>
      </Box>
    ));
  };

  return (
    <Box p={4} w="100%">
      <Heading as="h2" size="md" mb={4}>
        Comments
      </Heading>
      
      {/* Comment Input and Button in the same row */}
      <HStack w="100%" mb={4}>
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button colorScheme="teal" onClick={addComment}>
          {replyingTo ? "Reply" : "Add Comment"}
        </Button>
      </HStack>

      <VStack align="start" spacing={4} w="100%">
        {/* Render Comments */}
        {renderComments(comments)}
      </VStack>
    </Box>
  );
};

export default CommentSection;
