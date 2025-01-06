import { Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useDeletePostMutation } from "../api/apiPosts";
import React from "react";
import { apiPostsAndComments } from "../api/apiPostsAndComments";

type PostInfoProps = {
  postId: string;
  postTitle: string;
};

export const PostInfo: React.FC<PostInfoProps> = (props) => {
  const { postId, postTitle } = props;
  const dispatch = useDispatch();
  const [deletePost] = useDeletePostMutation();
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Typography>{postTitle}</Typography>
      <Button
        onClick={async () => {
          await deletePost(postId);
          dispatch(
            apiPostsAndComments.util.invalidateTags(["PostsWithComments"])
          );
        }}
      >
        x
      </Button>
    </Stack>
  );
};
