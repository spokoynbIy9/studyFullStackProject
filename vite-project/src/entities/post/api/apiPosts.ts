import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../model/types/post";

export const apiPosts = createApi({
  reducerPath: "apiPosts",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `posts`,
      transformResponse: (response: Response) => Object.values(response),
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation<Post, Omit<Post, "id">>({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = apiPosts;
