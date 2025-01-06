import { ListPosts } from "@/entities/post";
import { CreatePostForm } from "@/features/post/CreatePostForm";
import { Stack } from "@mui/material";

const HomePage = () => {
  return (
    <Stack>
      <CreatePostForm />
      <ListPosts />
    </Stack>
  );
};

export default HomePage;
