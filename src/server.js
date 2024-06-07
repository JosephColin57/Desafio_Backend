const cors = require("cors");

const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "FirstServiceV1 API - 👋🌎🌍🌏",
  });
});


module.exports = app;
