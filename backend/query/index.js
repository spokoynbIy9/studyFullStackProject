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
    const { id, content, postId } = data;
    const curComments = posts[postId].comments;
    curComments.push({ id, content });
  }

  if (type === "PostDelete") {
    const { postId } = data;
    delete posts[postId];
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("Server 4002 is running...");
});
