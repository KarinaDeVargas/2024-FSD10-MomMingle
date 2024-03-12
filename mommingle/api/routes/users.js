import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

// Route for fetching users
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
