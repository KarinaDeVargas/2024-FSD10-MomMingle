import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    axios
      .get(`https://mommingle-00a20919c13a.herokuapp.com/api/users/${id}`)
      .then((response) => {
        setEditedData(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch user data.");
      });
  }, [id]);

  const handleInputChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  const handleSaveClick = () => {
    axios
      .put(
        `https://mommingle-00a20919c13a.herokuapp.com/api/users/${id}`,
        editedData
      )
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => {
        setError("Failed to save user data.");
      });
    setShowModal(false);
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  return (
    <div className="home">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelClick}>
              &times;
            </span>
            <div className="center">
              <form>
                <h3>Edit User</h3>

                <div className="box">
                  <label htmlFor="username">Username:</label>
                  <input
                    className="input"
                    type="text"
                    id="username"
                    name="username"
                    value={editedData.username || ""}
                    onChange={(e) => handleInputChange(e, "username")}
                  />
                </div>

                <div className="box">
                  <label htmlFor="email">Email:</label>
                  <input
                    className="input"
                    type="text"
                    id="email"
                    name="email"
                    value={editedData.email || ""}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </div>

                <div className="box">
                  <label htmlFor="role">Role:</label>
                  <input
                    className="input"
                    type="text"
                    id="role"
                    name="role"
                    value={editedData.role || ""}
                    onChange={(e) => handleInputChange(e, "role")}
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
      )}
    </div>
  );
};

export default EditUser;
