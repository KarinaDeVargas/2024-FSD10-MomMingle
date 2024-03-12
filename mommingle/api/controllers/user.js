import { db } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    // Fetch users from the database
    const users = await new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users";
      db.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const sql = "SELECT * FROM users WHERE user_id = ?";
    const user = await new Promise((resolve, reject) => {
      db.query(sql, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user[0]);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const sql = "DELETE FROM users WHERE user_id = ?";
    await db.query(sql, [userId]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, role } = req.body;
    const sql =
      "UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?";
    await db.query(sql, [username, email, role, userId]);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
