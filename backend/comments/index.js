const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOption));

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Request Recieved", req.body.type);
  if (type === "CommentModerated") {
    const comments = commentsByPostId[data.postId];
    const comment = comments.find((comment) => comment.id === data.id);
    comment.status = data.status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data,
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Server 4001 is running");
});
