const morgan = require("morgan");
const fs = require("fs");
const rfs = require('rotating-file-stream');
const path = require("path");
module.exports = function (app) {
  const format = process.env.NODE_ENV === "production" ? "combined" : "dev";

  const accessLogStream200 = fs.createWriteStream("access200.log",{
      path: path.join(__dirname, "../../", "logs"),
      interval: '1d',
      size: '25MB'
  });

  const accessLogStream400 = fs.createWriteStream("access400.log",{
    path: path.join(__dirname, "../../", "logs"),
    interval: '1d',
    size: '25MB'
});

  app.use(
    morgan(format, {
      skip: (req, res) => {
        return res.statusCode < 400;
      },
      stream:
        process.env.NODE_ENV === "production"
          ? accessLogStream400
          : process.stderr,
    })
  );

  app.use(
    morgan(format, {
      skip: (req, res) => res.statusCode >= 400,
      stream:
        process.env.NODE_ENV === "production"
          ? accessLogStream200
          : process.stdout,
    })
  );
};
