import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDb } from "./config/databaseConnection.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDb();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); 
app.use(cors()); 
app.use(helmet());
app.use("/api/auth", authRouter); 
app.use("/api/user", userRouter);

// Define a simple route to check server status
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is working properly" });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
