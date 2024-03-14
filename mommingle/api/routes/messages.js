import express from "express";
import chatController from "../controllers/chat.js";

const router = express.Router();

// Route handler to fetch messages for a user
router.get("/:userId/:receiverId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const receiverId = req.params.receiverId;
    const messages = await chatController.fetchMessages(userId, receiverId);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
