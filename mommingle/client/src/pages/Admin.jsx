import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Admin = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/users");
      setUsers(response.data);
    } catch (error) {
      handleFetchError(error);
    }
  };

  useEffect(() => {
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

  const openEditModal = (user) => {
    setEditUser(user);
    // Ensure the modal is shown here
    document.getElementById("myModal").style.display = "block";
  };

  const handleSaveClick = () => {
    axios
      .put(`http://localhost:8800/api/users/${editUser.user_id}`, {
        username: editUser.username,
        email: editUser.email,
        role: editUser.role,
      })
      .then(() => {
        window.alert("User data updated successfully!");
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        window.alert("Failed to update user data. Please try again.");
      });
    document.getElementById("myModal").style.display = "none";
  };

  const handleCancelClick = () => {
    document.getElementById("myModal").style.display = "none";
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
                                <button
                                  className="table_btn"
                                  onClick={() => openEditModal(user)}
                                >
                                  Edit
                                </button>
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
      {/* Modal */}
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() =>
              (document.getElementById("myModal").style.display = "none")
            }
          >
            &times;
          </span>
          <form>
            <h1>Edit User</h1>
            <div className="box">
              <label htmlFor="username">Username:</label>
              <input
                className="input"
                type="text"
                id="username"
                value={editUser?.username || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, username: e.target.value })
                }
              />
            </div>
            <div className="box">
              <label htmlFor="email">Email:</label>
              <input
                className="input"
                type="text"
                id="email"
                value={editUser?.email || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
            </div>
            <div className="box">
              <label htmlFor="role">Role:</label>
              <input
                className="input"
                type="text"
                id="role"
                value={editUser?.role || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
              />
            </div>
            <button
              className="modal_btn"
              type="button"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="modal_btn"
              type="button"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
