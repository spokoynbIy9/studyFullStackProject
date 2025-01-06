import { useAddCommentMutation } from "@/entities/comment/api/apiComments";
import { CommentStatus } from "@/entities/comment/model/types/commentStatus";
import { apiPostsAndComments } from "@/entities/post/api/apiPostsAndComments";
import { Button, Input, Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type CreateCommentFormProps = {
  postId: string;
};

export const CreateCommentForm: React.FC<CreateCommentFormProps> = (props) => {
  const { postId } = props;
  const [addComment] = useAddCommentMutation();
  const [contentComment, setContentComment] = useState("");
  const dispatch = useDispatch();
  return (
    <Stack>
      <Input
        value={contentComment}
        onChange={(e) => setContentComment(e.target.value)}
      />
      <Button
        onClick={async () => {
          await addComment({
            postId,
            content: contentComment,
            status: CommentStatus.pending,
          });
          dispatch(
            apiPostsAndComments.util.invalidateTags(["PostsWithComments"])
          );
          setContentComment("");
        }}
      >
        add comment
      </Button>
    </Stack>
  );
};
