const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());

const cors = require("cors");

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOption));

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Request Recieved", req.body.type);

  res.send({});
});

app.delete("/posts/:id", (req, res) => {
  let isDeleted = false;
  for (const key in posts) {
    if (posts[key].id === req.params.id) {
      delete posts[key];
      isDeleted = true;
    }
  }
  if (isDeleted) {
    axios.post("http://localhost:4005/events", {
      type: "PostDelete",
      data: { postId: req.params.id },
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(404);
  }
});

app.listen(4000, () => {
  console.log("Server 4000 is starting...");
});
