import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiComments = createApi({
  reducerPath: "apiComments",
  tagTypes: ["Comments"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001" }),
  endpoints: (builder) => ({
    getCommentsById: builder.query<Comment[], string>({
      query: (id: string) => `/posts/${id}/comments`,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation<
      Comment[],
      { postId: string; content: string }
    >({
      query: ({ postId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useGetCommentsByIdQuery, useAddCommentMutation } = apiComments;
