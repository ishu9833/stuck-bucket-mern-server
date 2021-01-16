const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello World",
  });
});

app.use((req, res, next) => {
  const error = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.status(404).json({
      msg: error.message,
      status: 404,
    });
  }

  return res.status(500).json({
    msg: 'Internal Server Error',
    status: 500,
  });
});

app.listen(port, () => {
  console.log("Server Listening on port", port);
});
