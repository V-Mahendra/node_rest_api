require("dotenv").config();

const express = require("express");
const winston = require("winston")

const app = express();

const mongoose = require("mongoose");

const Booksroute = require("./routers/books");

//  ----------------  Middlewares  ----------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  ----------------     Logger    ----------------------------

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

//  ----------------     Router    ----------------------------

app.use("/api/books", Booksroute);

//  ----------------  Connection  ----------------------------

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    logger.info(`connected to mongoDb Atlas`);
  })
  .catch((error) => {
    logger.error(`something went wrong`, error);
  });

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`);
});
