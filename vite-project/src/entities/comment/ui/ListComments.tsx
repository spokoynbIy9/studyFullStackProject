import { Stack, Typography } from "@mui/material";
import { CommentItem } from "../model/types/comment";

type ListCommentsProps = {
  listComments: CommentItem[];
};
export const ListComments: React.FC<ListCommentsProps> = (props) => {
  const { listComments } = props;

  return (
    <Stack>
      {listComments?.map((comment) => (
        <Stack key={comment.id}>
          <Typography>{comment.content}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};
