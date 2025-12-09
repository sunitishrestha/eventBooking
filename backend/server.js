import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouters from "./routes/authRouters.js";
import "./config/db.js";
import eventRouters from "./routes/eventRouters.js";
import studentRouter from "./routes/studentRouter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Routes
app.use("/api/auth", authRouters);
app.use("/api/events", eventRouters);
app.use("/students", studentRouter);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
