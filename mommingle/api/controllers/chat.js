import { db } from "../db.js";

const saveAndSendMessage = async (io, senderId, receiverId, message) => {
    try {
      // Save message to the database
      const insertMsgSql =
        "INSERT INTO chat_messages (senderId, receiverId, message) VALUES (?, ?, ?)";
      await db.query(insertMsgSql, [senderId, receiverId, message]);
  
      // Create the message object for the newly inserted message
      const messageJSON = {
        senderId: senderId,
        receiverId: receiverId,
        message: message,
        created_at: new Date().toISOString(),
      };
  
      // Emit the new message to the receiver
      io.to(receiverId).emit("message", messageJSON);
      
    } catch (error) {
      console.error("Error saving or sending message:", error);
    }
  };
  

const fetchMessages = async (senderId, receiverId) => {
  try {
    // Fetch messages between sender and receiver
    const sql = `
        SELECT * FROM chat_messages 
        WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)
      `;
    const messages = await new Promise((resolve, reject) => {
      db.query(
        sql,
        [senderId, receiverId, receiverId, senderId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    // Process and format messages
    const messagesJSON = messages.map((message) => ({
      senderId: message.senderId,
      receiverId: message.receiverId,
      message: message.message,
      created_at: message.created_at,
    }));

    return messagesJSON;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export default {
  saveAndSendMessage,
  fetchMessages,
};
