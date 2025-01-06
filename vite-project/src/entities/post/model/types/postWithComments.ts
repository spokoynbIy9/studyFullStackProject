import { CommentItem } from "@/entities/comment/model/types/comment";

export type PostWithComments = {
  id: string;
  title: string;
  comments: CommentItem[];
};
