const { createLogger, format, transports, Logger, info } = require("winston");

function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace("T", " ");

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, "") : ""
  }`;
}

// dev format
const devFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

//prod format
const prodFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams) //config later
);

let logger = null;
if (process.env.NODE_ENV === "production") {
  logger = createLogger({
    level: "info",
    format: prodFormat,
    transports: [
      new transports.File({ filename: "logs/error.log", level: "error" }),
      new transports.File({ filename: "logs/combined" }),
    ],
  });
} else {
  logger = createLogger({
    level: "info",
    format: devFormat,
    transports: [
      new transports.Console({
        colorize: true,
        name: "console",
        timestamp: () => new Date(),
      }),
    ],
  });
}

module.exports = logger;
