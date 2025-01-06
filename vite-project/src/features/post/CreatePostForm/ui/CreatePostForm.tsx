import { useCreatePostMutation } from "@/entities/post/api/apiPosts";
import { apiPostsAndComments } from "@/entities/post/api/apiPostsAndComments";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postFormSchema, PostFormSchema } from "../model/types/PostFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreatePostForm = () => {
  const [createPost, { isError }] = useCreatePostMutation();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setError,
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
  });

  const onSubmitHandler = async (data: PostFormSchema) => {
    const newPost = { title: data.postTitle };
    await createPost(newPost).unwrap();
    if (isError) {
      setError("postTitle", {
        type: "server",
        message: "Название вашего поста не понравилось нашему серверу!",
      });
    }
    dispatch(apiPostsAndComments.util.invalidateTags(["PostsWithComments"]));
    reset();
  };

  return (
    <Stack>
      <Typography sx={{ fontSize: "larger" }}>Create Post</Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          {...register("postTitle")}
          helperText={errors.postTitle?.message}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Stack>
  );
};
