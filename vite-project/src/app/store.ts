import { apiComments } from "@/entities/comment/api/apiComments";
import { apiPosts } from "@/entities/post/api/apiPosts";
import { apiPostsAndComments } from "@/entities/post/api/apiPostsAndComments";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [apiPosts.reducerPath]: apiPosts.reducer,
    [apiComments.reducerPath]: apiComments.reducer,
    [apiPostsAndComments.reducerPath]: apiPostsAndComments.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiPosts.middleware,
      apiComments.middleware,
      apiPostsAndComments.middleware
    ),
});
