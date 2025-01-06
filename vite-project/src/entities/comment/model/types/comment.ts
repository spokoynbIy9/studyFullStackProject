import { CommentStatus } from "./commentStatus";

export type CommentItem = {
  id: string;
  content: string;
  status: CommentStatus;
};
