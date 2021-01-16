const express = require("express");
const cors = require("cors");
const { useMorgan } = require('./middlewares')
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const { logger } = require('./util');




const app = express();
useMorgan(app)
app.use(cors());
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Database connected");
  })
  .catch((e) => {
    console.log(e);
    logger.error(e.message)
  });

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
    msg: "Internal Server Error",
    status: 500,
  });
});

app.listen(process.env.PORT, () => {
 logger.info(`Server Listening on port, ${process.env.PORT}`);
});
