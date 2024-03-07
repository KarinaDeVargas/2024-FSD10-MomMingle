import { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../context/authContext";


const ChatApp = () => {
  const { currentUser } = useContext(AuthContext); // Access currentUser from AuthContext
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const socketRef = useRef(null); // Ref for socket instance

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io.connect("http://localhost:8800");

    socketRef.current.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Disconnect socket when component unmounts
      socketRef.current.disconnect();
    };
  }, []);

  const handleMessageSend = async () => {
    try {
      // Check if currentUser and selectedUser are not null
      if (currentUser && selectedUser) {
        console.log(currentUser);
        console.log(selectedUser);
        console.log(message);
        // Emit chatMessage event to the server using Socket.IO
        socketRef.current.emit("chatMessage", {
          senderId: currentUser.user_id,
          receiverId: selectedUser.user_id,
          message,
        });
    
        setMessage("");
      } else {
        console.error("Error sending message: currentUser or selectedUser is null");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Select a user to chat with:</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.user_id}
                onClick={() => setSelectedUser(user)}
                className="cursor-pointer py-2 px-4 rounded hover:bg-gray-200"
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>

        {selectedUser && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Chatting with {selectedUser.username}</h2>
            <div className="mb-4">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.senderId}: </strong>
                  <span>{msg.message}</span>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
            />
            <button
              onClick={handleMessageSend}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
