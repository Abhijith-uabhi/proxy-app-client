import { useState, useRef, useEffect } from "react";
import { Box, Heading, Input, Button, VStack, Text, HStack, Flex, Avatar, Link, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import dayjs from "dayjs"
import commentService from "../../../../services/commentService";
import { socket } from "connection/socket";
import { DotsMenuIcon } from "components/Icons/Icons";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ReplyIcon } from "components/Icons/Icons";

const CommentSection = ({ task, user }) => {


  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // Track which user is being replied to
  const [parentCommentId, setParentCommentId] = useState(null); // Track which comment ID the reply is for
  const inputRef = useRef(null); // Ref to the input box
  const [showReplies, setShowReplies] = useState({})
  const [selectedComment, setSelectedComment] = useState()
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (task)
      fetchComments(null)
  }, [task])


  // Function to handle adding a new comment or reply
  const addComment = async () => {
    try {

      if (!newComment.trim()) return
      let result
      if (isEdit) {
        const updateCommentdata = {
          comment: newComment
        }
        result = await commentService.editComment(selectedComment, updateCommentdata)

        const updatedComents = comments.map((comment) => {
          if (comment._id === selectedComment) {
            return result.data
          } else {
            return comment
          }
        })

        setComments(updatedComents)

      } else {
        const newCommentData = {
          task_id: task._id,
          comment: newComment,
          sender: {
            user_id: user._id,
            first_name: user.first_name,
            last_name: user.last_name
          },
          ...parentCommentId && { parent_id: parentCommentId }, // Set parent_id if it's a reply, else null
        };

        result = await commentService.addComment(newCommentData)

        setComments((prev) => [
          result.data,
          ...prev,

        ]);
      }
      setNewComment(""); // Clear input
      setReplyingTo(null); // Reset replying state
      setParentCommentId(null); // Reset parent comment ID
    } catch (error) {
      console.log("Error add comment", error);

    }

  };



  const fetchComments = async (parent_id) => {
    try {
      const result = await commentService.getcomments(task?._id, parent_id)

      if (result.data) {
        if (!parent_id) {
          setComments(result.data)
        } else {
          setComments((prev) => ([
            ...prev,
            ...result.data
          ]))
        }

      }
    } catch (error) {
      console.log("ERROR FETCHING THE COMMENTS", error);

    }
  }

  // Function to handle reply button click

  const handleReply = (user, id) => {
    console.log("THE ID IS", user);

    setReplyingTo(user);
    // setNewComment(`@${user} `); // Pre-fill the input with the user's name
    setParentCommentId(id); // Set the parent comment ID
    inputRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the input box
    inputRef.current.focus(); // Focus the input

  };

  useEffect(() => {
    socket.on("room_message", (data) => {
      console.log("yes got the socket event here", data);
      fetchComments()

    })
  }, [])

  const handleViewReply = async (commentId) => {
    try {
      fetchComments(commentId),
        setShowReplies((prev) => ({
          ...prev,
          [commentId]: true
        }))
    } catch (error) {
      console.log("Error handle view reply".error);

    }
  }
  const handleHideReply = async (commentId) => {
    try {
      console.log("YES IT IS WORKING");

      setShowReplies((prev) => ({
        ...prev,
        [commentId]: false
      }))
      const updatedComents = comments.filter((item) => item.parent_id !== commentId)
      console.log("the updated comments", updatedComents);

      setComments(updatedComents)
    } catch (error) {
      console.log("ERROR HANDLE HIDE REPLY", error);

    }
  }


  const handleEditComment = (comment_id, user, comment) => {
    try {
      setReplyingTo(user);
      setSelectedComment(comment_id)
      inputRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the input box
      inputRef.current.focus();
      setIsEdit(true)
      setNewComment(comment)
    } catch (error) {
      console.log("error updating the comment", error);

    }
  }



  const handleDeleteComment = async (id) => {
    try {
      const res = await commentService.deleteComment(id)
      if (res.data) {
        const updatedComments = comments.filter((comment) => { return comment._id !== id })
        setComments(updatedComments)
      }
    } catch (error) {
      console.log("Error delete the coment", error);

    }
  }



  // Recursive function to render comments and replies
  const renderComments = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parent_id === parentId) // Filter comments by parent_id
      .map((comment) => (
        <Box key={comment.id} w="100%" pl={parentId ? 8 : 4} borderLeft={parentId ? "none" : "1px"} borderColor="gray.200" mt={2}>
          <Flex align="start">
            <Avatar name={comment && comment.sender?.first_name} />
            <Box pl={3}>
              <Flex align="center" >
                <Text fontWeight="bold" fontSize="md">{comment.sender.first_name}</Text>
                <Text fontSize="sm" ml={2}>
                  {comment.comment}
                </Text>
              </Flex>

              <HStack>
                <Text fontSize="sm" color="gray.500" pl={2}>
                  {dayjs.unix(comment.created_at).fromNow()}
                </Text>Ï
                {/* <Button size="xs" mt={2} onClick={() => handleReply(comment.sender, comment._id)}>
                  Reply
                </Button> */}
                <Menu>
                  <MenuButton>
                    <Button
                      ms="0px"
                      px="0px"
                      variant="transparent-with-icon"
                      leftIcon={
                        <DotsMenuIcon boxSize="16px" />
                      } />

                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleReply(comment.sender, comment._id)} >
                      <ReplyIcon /> <span style={{ paddingLeft: "10px" }}>Reply</span>
                    </MenuItem>
                    {comment.sender.user_id === user._id ? <><MenuItem onClick={() => { handleEditComment(comment._id, comment.sender, comment.comment) }}>
                      <EditIcon /> <span style={{ paddingLeft: "10px" }}>Edit</span>
                    </MenuItem>
                      <MenuItem onClick={() => { handleDeleteComment(comment._id) }}>
                        <DeleteIcon />  <span style={{ paddingLeft: "10px" }}>Delete</span>
                      </MenuItem></> : <></>}

                  </MenuList>
                </Menu>

              </HStack>
              {comment.hasReplies ?
                <HStack mt={2}>
                  <Text fontSize="sm" cursor="pointer" onClick={() => {

                    { showReplies[comment._id] ? handleHideReply(comment._id) : handleViewReply(comment._id) }
                  }}>{showReplies[comment._id] ? "--- Hide replies" : "---- View replies"}</Text>
                </HStack> : <></>}

              {/* Display Replies Recursively */}
              {comments.some((reply) => reply.parent_id === comment._id) && (
                <VStack align="start" spacing={2} mt={3}>
                  {renderComments(comments, comment._id)} {/* Render replies */}
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
          ref={inputRef} // Attach ref to the input box
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button colorScheme="teal" onClick={addComment} onEnter={() => {
        }}>
          {isEdit ? "Edit" : replyingTo ? "Reply" : "Add Comment"}
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
