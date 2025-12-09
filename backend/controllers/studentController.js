import { pool } from "../config/db.js";

// Get all events for student dashboard
export const getEventsForStudents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY date ASC");
    // Send as an array of events
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
