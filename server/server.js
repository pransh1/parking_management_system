import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnections.js";

const app = express();
dotenv.config({ path: "./.env" });

dbConnection();

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`server running on PORT ${port}`);
});
