import { db } from "../db.js";

const saveAndSendMessage = async (io, senderId, receiverId, message) => {
  try {
    // Save message to the database
    const sql = "INSERT INTO chat_messages (senderId, receiverId, message) VALUES (?, ?, ?)";
    await db.query(sql, [senderId, receiverId, message]);

    // Emit the message to the receiver
    io.to(receiverId).emit("message", { senderId, message });
  } catch (error) {
    console.error("Error saving or sending message:", error);
  }
};

export default {
  saveAndSendMessage,
};
