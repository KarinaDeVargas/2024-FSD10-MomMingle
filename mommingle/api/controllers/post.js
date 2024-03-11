import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.category
    ? "SELECT * FROM events WHERE category=?"
    : "SELECT e.*, u.username FROM events e JOIN users u ON e.user_id = u.user_id";

  db.query(q, [req.query.category], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT e.*, u.username FROM events e JOIN users u ON e.user_id = u.user_id WHERE e.event_id = ?;";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO events(`title`, `description`, `img`, `category`, `event_date`, `location`, `activities`, `age_range`, `created_at`, `user_id`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.category,
      req.body.event_date,
      req.body.location,
      req.body.activities,
      req.body.age_range,
      req.body.created_at,
      userInfo.user_id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM events WHERE `event_id` = ? AND `user_id` = ?";

    db.query(q, [postId, userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json("Post ID is missing in the request.");
    }

    const q =
      "UPDATE events SET `title`=?, `description`=?, `img`=?, `category`=?, `event_date`=?, `location`=?, `activities`=?, `age_range`=? WHERE `event_id` = ? AND `user_id` = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.category,
      req.body.event_date,
      req.body.location,
      req.body.activities,
      req.body.age_range,
    ];

    db.query(q, [...values, postId, userInfo.user_id], (err, data) => {
      if (err) {
        console.error("Error updating post:", err);
        return res.status(500).json(err);
      }
      return res.json("Post has been updated.");
    });
  });
};
