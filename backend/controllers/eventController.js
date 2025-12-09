// controllers/eventController.js
import { pool } from "../config/db.js"; // fixed

export const getEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events");
    res.json({ events: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const createEvent = async (req, res) => {
  const {
    name,
    date,
    time,
    venue,
    description,
    acoustic_night,
    stalls,
    stall_count,
    capacity,
    organizer,
    category,
    image,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO events
      (name, date, time, venue, description, acoustic_night, stalls, stall_count, capacity, organizer, category, image)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *`,
      [
        name,
        date,
        time,
        venue,
        description,
        acoustic_night,
        stalls,
        stall_count,
        capacity,
        organizer,
        category,
        image,
      ]
    );

    res.status(201).json({ event: result.rows[0] });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    date,
    time,
    venue,
    description,
    acoustic_night,
    stalls,
    stall_count,
    capacity,
    organizer,
    category,
    image,
  } = req.body;

  try {
    const result = await pool.query(
      "update events set name=$1, date=$2, time=$3, venue=$4, description=$5, acoustic_night=$6, stalls=$7, stall_count=$8, capacity=$9, organizer=$10, category=$11, image=$12 where id=$13 returning *",
      [
        name,
        date,
        time,
        venue,
        description,
        acoustic_night,
        stalls,
        stall_count,
        capacity,
        organizer,
        category,
        image,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ event: result.rows[0] });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM events WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};
