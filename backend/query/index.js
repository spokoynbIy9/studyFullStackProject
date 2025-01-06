const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
const corsOption = {
  origin: ["http://localhost:5173"],
};
const posts = {};
app.use(cors(corsOption));

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const curComments = posts[postId].comments;
    curComments.push({ id, content, status });
  }

  if (type === "PostDelete") {
    const { postId } = data;
    delete posts[postId];
  }

  if (type === "CommentUpdated") {
    const { postId, id, status, content } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("Server 4002 is running...");
});
