import express from "express";
import getUsers from "../controllers/user.js";

const router = express.Router();

// Route for fetching users
router.get("/", getUsers);

export default router;
