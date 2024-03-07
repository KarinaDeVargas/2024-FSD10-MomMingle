import { db } from "../db.js";

const getUsers = async (req, res) => {
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

export default getUsers;
