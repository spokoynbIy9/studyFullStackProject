import { Stack, Typography } from "@mui/material";
import { useGetPostsAndComsQuery } from "../api/apiPostsAndComments";
import { ListComments } from "@/entities/comment";
import { CreateCommentForm } from "@/features/comment/CreateCommentForm";
import { PostInfo } from "./PostInfo";

export const ListPosts = () => {
  const { data } = useGetPostsAndComsQuery();

  return (
    <Stack sx={{ flexDirection: "column" }}>
      <Typography>ListPosts</Typography>
      <Stack gap={2}>
        {data?.map((post) => {
          return (
            <Stack
              key={post.id}
              sx={{ flexDirection: "column", border: "1px solid black" }}
            >
              <PostInfo postId={post.id} postTitle={post.title} />
              <Stack sx={{ flexDirection: "column" }}>
                <Typography>Comment List for {post.id}</Typography>
                <ListComments listComments={post.comments} />
                <CreateCommentForm postId={post.id} />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
