import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostWithComments } from "../model/types/postWithComments";

export const apiPostsAndComments = createApi({
  reducerPath: "apiPostsAndComments",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4002" }),
  tagTypes: ["PostsWithComments"],
  endpoints: (builder) => ({
    getPostsAndComs: builder.query<PostWithComments[], void>({
      query: () => "posts",
      transformResponse: (response: Response) => Object.values(response),
      providesTags: ["PostsWithComments"],
    }),
  }),
});

export const { useGetPostsAndComsQuery } = apiPostsAndComments;
