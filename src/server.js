const cors = require("cors");

const express = require("express");

const userRouter = require("./routes/user.router");

const authRouter = require("./routes/auth.router");

const postRouter = require("./routes/post.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.use("/auth", authRouter);

app.use("/posts", postRouter);

module.exports = app;
