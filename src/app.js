const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("dotenv").config();
require("./db.js");

const server = express();
server.name = "API";

server.use(cors());
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

module.exports = server;
