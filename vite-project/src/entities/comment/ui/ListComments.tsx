import { Stack, Typography } from "@mui/material";
import { CommentItem } from "../model/types/comment";
import { CommentStatus } from "../model/types/commentStatus";

type ListCommentsProps = {
  listComments: CommentItem[];
};
export const ListComments: React.FC<ListCommentsProps> = (props) => {
  const { listComments } = props;

  const commentContent = (comment: CommentItem) => {
    switch (comment.status) {
      case CommentStatus.pending:
        return <Typography>Checking...</Typography>;
      case CommentStatus.approved:
        return <Typography>{comment.content}</Typography>;
      default:
        return <Typography>Rejected</Typography>;
    }
  };

  return (
    <Stack>
      {listComments?.map((comment) => (
        <Stack key={comment.id}>{commentContent(comment)}</Stack>
      ))}
    </Stack>
  );
};
