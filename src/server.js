const cors = require("cors");

const express = require("express");

const userRouter = require("./routes/user.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);


module.exports = app;
