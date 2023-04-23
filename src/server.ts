import express from "express";

const server = express();

// for parsing application/json
server.use(express.json());

// for parsing application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data using formidable
server.use(express.static("public"));

export default server;
