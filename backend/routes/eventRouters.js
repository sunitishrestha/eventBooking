const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

const { createEvent, getEvents, updateEvent, deleteEvent } = eventController;

// Routes
router.post("/", createEvent);
router.get("/", getEvents);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
module.exports = router;
