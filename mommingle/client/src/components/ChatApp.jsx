import { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const ChatApp = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

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
    socketRef.current = io.connect("http://localhost:8800/");

    socketRef.current.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.connected);
    });

    socketRef.current.emit("joinRoom", { roomId: currentUser.user_id });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async (receiver) => {
    try {
      const response = await axios.get(
        `/messages/${currentUser.user_id}/${receiver.user_id}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleUserSelect = (receiver) => {
    setSelectedUser(receiver);
    fetchMessages(receiver);
  };

  const handleMessageSend = async () => {
    try {
      if (currentUser && selectedUser) {
        socketRef.current.emit("chatMessage", {
          senderId: currentUser.user_id,
          receiverId: selectedUser.user_id,
          message,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderId: currentUser.user_id,
            receiverId: selectedUser.user_id,
            message,
          },
        ]);

        setMessage("");
      } else {
        console.error(
          "Error sending message: currentUser or selectedUser is null"
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 border-r border-gray-300 pr-4">
          <h2 className="text-3xl font-semibold mb-4 border-b pb-2">Chat</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.user_id}
                onClick={() => handleUserSelect(user)}
                className={`cursor-pointer py-2 px-4 rounded ${
                  selectedUser && selectedUser.user_id === user.user_id
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
        {selectedUser && (
          <div className="col-span-9 pl-4">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              {selectedUser.username}
            </h2>
            <div
              className="mb-4 overflow-y-auto"
              style={{ maxHeight: "500px" }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.senderId == currentUser.user_id
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg p-2 ${
                      msg.senderId == currentUser.user_id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
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
