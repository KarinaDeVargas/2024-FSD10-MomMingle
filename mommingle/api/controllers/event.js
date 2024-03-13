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
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO attendees (event_id, user_id) VALUES (?, ?)";
    const values = [req.params.id, userInfo.user_id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Attendee has been added.");
    });
  });
};
