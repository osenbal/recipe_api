import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const server = express();

// CORS
// cors options
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

server.use(bodyParser.json());
// server.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
server.use(cors(corsOptions));

// for parsing application/json
server.use(express.json());

// for parsing application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data using formidable
server.use(express.static("public"));

export default server;
