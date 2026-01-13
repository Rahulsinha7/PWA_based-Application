import express from "express";
import cors from "cors";
import goalRoutes from "./routes/goalRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/goals", goalRoutes);

export default app;
