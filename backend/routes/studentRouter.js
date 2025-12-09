// routes/studentRouter.js
import express from "express";
import { getEventsForStudents } from "../controllers/studentController.js";

const router = express.Router();

// Routes
// router.post("/", createStudent);
router.get("/events", getEventsForStudents);

export default router;
