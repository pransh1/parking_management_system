import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnections.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import parkingSpaceRoutes from "./routes/parkingSpaceRoutes.js";
const app = express();
dotenv.config({ path: "./.env" });

dbConnection();

const port = process.env.PORT || 4001;

app.use(express.json());
app.use(cors());

app.use("/api/register", userRoutes);
app.use("/api/login", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/parking-spaces", parkingSpaceRoutes);
app.listen(port, () => {
  console.log(`server running on PORT ${port}`);
});
