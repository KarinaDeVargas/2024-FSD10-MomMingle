import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Admin = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/users");
        setUsers(response.data);
      } catch (error) {
        handleFetchError(error);
      }
    };

    const checkAdminStatus = async () => {
      try {
        // Assuming currentUser contains user data including the role
        setIsAdmin(currentUser && currentUser.role === "admin");
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    checkAdminStatus();
  }, [currentUser]); // useEffect dependency

  const handleFetchError = (error) => {
    console.error("Error fetching users:", error);
    setError("Error fetching users. Please try again.");
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8800/api/users/${userId}`);
      setUsers(users.filter((user) => user.user_id !== userId));
      window.alert("User deleted successfully!");
    } catch (error) {
      handleDeleteError(error);
    } finally {
      setDeleteUserId(null);
    }
  };

  const handleDeleteError = (error) => {
    console.error("Error deleting user:", error);
    setError("Error deleting user. Please try again.");
  };

  const handleDeleteConfirmation = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setDeleteUserId(userId);
      deleteUser(userId);
    }
  };

  return (
    <div className="usersPanel">
      <div className="usersContainer">
        <div className="usersTable">
          {loading && <p>Loading...</p>}
          {!loading && (
            <>
              {!isAdmin && (
                <p>You do not have permission to access this page.</p>
              )}
              {isAdmin && (
                <>
                  {error && (
                    <p
                      style={{
                        fontSize: "25px",
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </p>
                  )}
                  {!error && (
                    <>
                      <h1 className="usersHeading">Manage Users Account</h1>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.user_id}>
                              <td>{user.user_id}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>{user.role}</td>
                              <td>
                                <Link to={`/editUser/${user.user_id}`}>
                                  <button className="table_btn">Edit</button>
                                </Link>
                                <button
                                  className="table_btn"
                                  onClick={() =>
                                    handleDeleteConfirmation(user.user_id)
                                  }
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
