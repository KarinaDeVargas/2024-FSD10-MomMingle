import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getAttendees = (req, res) => {
  const q = "SELECT * FROM attendees WHERE event_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addAttendee = (req, res) => {
  const { user_id, event_id } = req.body;

  // Assuming you have some validation for user_id and event_id
  if (!user_id || !event_id) {
    return res.status(400).json({ message: "Missing user_id or event_id" });
  }

  // Insert the user into the attendees table
  const q = "INSERT INTO attendees (user_id, event_id) VALUES (?, ?)";
  db.query(q, [user_id, event_id], (err, result) => {
    if (err) {
      console.error("Error adding user to event:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while adding user to event" });
    }

    return res
      .status(201)
      .json({ message: "User added to event successfully" });
  });
};
