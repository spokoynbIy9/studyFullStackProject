import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentItem } from "../model/types/comment";
import { CommentStatus } from "../model/types/commentStatus";

export const apiComments = createApi({
  reducerPath: "apiComments",
  tagTypes: ["Comments"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001" }),
  endpoints: (builder) => ({
    getCommentsById: builder.query<CommentItem[], string>({
      query: (id: string) => `/posts/${id}/comments`,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation<
      CommentItem[],
      { postId: string; content: string; status: CommentStatus }
    >({
      query: ({ postId, content, status }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: { content, status },
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useGetCommentsByIdQuery, useAddCommentMutation } = apiComments;
