import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import DeleteIcon from "../images/delete.png";
import EditIcon from "../images/edit.png";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaChild,
  FaRunning,
  FaTag,
} from "react-icons/fa";

const SingleEvent = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const [attendees, setAttendees] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event details
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);

        // Fetch attendees for the event
        const attendeesRes = await axios.get(
          `http://localhost:8800/api/events/${postId}/attendees`
        );

        // Fetch usernames for the fetched user_ids
        const userIds = attendeesRes.data.map((attendee) => attendee.user_id);
        const usersRes = await axios.get(
          `http://localhost:8800/api/users?user_ids=${userIds.join(",")}`
        );

        // Combine attendees data with usernames
        const attendeesWithUsernames = attendeesRes.data.map((attendee) => {
          const user = usersRes.data.find(
            (user) => user.user_id === attendee.user_id
          );
          return { ...attendee, username: user.username };
        });

        setAttendees(attendeesWithUsernames);

        // Fetch comments for the event
        const commentsRes = await axios.get(
          `http://localhost:8800/api/events/${postId}/comments`
        );

        // Fetch usernames for the fetched user_ids in comments
        const commentUserIds = commentsRes.data.map(
          (comment) => comment.user_id
        );
        const commentUsersRes = await axios.get(
          `http://localhost:8800/api/users?user_ids=${commentUserIds.join(",")}`
        );

        // Combine comments data with usernames
        const commentsWithUsernames = commentsRes.data.map((comment) => {
          const user = commentUsersRes.data.find(
            (user) => user.user_id === comment.user_id
          );
          return { ...comment, username: user.username };
        });

        setComments(commentsWithUsernames);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/events");
    } catch (err) {
      console.log(err);
    }
  };

  const handleJoinEvent = async () => {
    try {
      const user_id = currentUser.user_id;
      const response = await axios.post(
        `http://localhost:8800/api/events/${postId}/attendees`,
        {
          user_id: user_id,
          event_id: postId,
        }
      );
      console.log("User joined event successfully:", response.data);
      alert("You have successfully requested joining the event!");

      // Fetch updated attendees list after joining the event
      const attendeesRes = await axios.get(
        `http://localhost:8800/api/events/${postId}/attendees`
      );
      setAttendees(attendeesRes.data);
    } catch (error) {
      console.error("Error joining event:", error);
      alert("An error occurred while requesting. Please try again later.");
    }
  };

  const submitComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8800/api/events/${postId}/comments`,
        {
          cmt_text: commentText,
          user_id: currentUser.user_id,
          event_id: postId,
        }
      );
      console.log("Comment added successfully:", response.data);
      // Clear the comment input after submission
      setCommentText("");
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-sm font-bold mr-4">
              Host By: {post.username}
            </span>
            <p className="text-sm">
              Posted {moment(post.created_at).fromNow()}
            </p>
          </div>
          {currentUser.username === post.username && (
            <div className="flex items-center">
              <Link
                to={`/createevent?edit=${postId}`}
                state={post}
                className="mr-4"
              >
                <img
                  src={EditIcon}
                  alt="Edit"
                  className="w-6 h-6 cursor-pointer"
                />
              </Link>
              <img
                onClick={handleDelete}
                src={DeleteIcon}
                alt="Delete"
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex">
          <div className="eventMain">
            <img
              className="w-full"
              src={`../upload/${post.img}`}
              alt={post.title}
            />
            <p
              className="text-base mb-4"
              style={{ marginBottom: "30px", marginTop: "20px" }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.description),
              }}
            ></p>
            <div className="subContainer">
              <h1 style={{ margin: "10px" }}>Comment</h1>
              <div className="comment-container">
                <input
                  className="comment-input"
                  type="text"
                  placeholder="Leave your comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className="save-button" onClick={() => submitComment()}>
                  Save
                </button>
              </div>
              <ul>
                {comments.map((comment) => (
                  <li key={comment.comment_id} style={{ marginBottom: "5px" }}>
                    <strong>{comment.username}: </strong>
                    {comment.cmt_text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="eventSub">
            <div className="subContainer">
              <p
                className="text-sm mb-2"
                style={{
                  margin: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaTag
                  style={{
                    marginRight: "10px",
                    fontSize: "18px",
                    color: "gray",
                  }}
                />
                <span>Category: {post.category}</span>
              </p>
              <p
                className="text-sm mb-2"
                style={{
                  margin: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaRunning
                  style={{
                    marginRight: "10px",
                    fontSize: "18px",
                    color: "gray",
                  }}
                />
                <span>Activities: {post.activities}</span>
              </p>
              <p
                className="text-sm mb-2"
                style={{
                  margin: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaChild
                  style={{
                    marginRight: "10px",
                    fontSize: "18px",
                    color: "gray",
                  }}
                />
                <span>Age Range: {post.age_range}</span>
              </p>
              <p
                className="text-sm mb-2"
                style={{
                  margin: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaMapMarkerAlt
                  style={{
                    marginRight: "10px",
                    fontSize: "18px",
                    color: "gray",
                  }}
                />
                <span>Location: {post.location}</span>
              </p>
              <p
                className="text-sm mb-2"
                style={{
                  margin: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaCalendarAlt
                  style={{
                    marginRight: "10px",
                    fontSize: "18px",
                    color: "gray",
                  }}
                />
                <span>
                  Event Date:{" "}
                  {moment(post.event_date).format("YYYY-MM-DD HH:mm")}
                </span>
              </p>
              <button className="join_btn" onClick={handleJoinEvent}>
                Join the Event
              </button>
            </div>

            <div className="subContainer">
              <p
                className="text-sm mb-2"
                style={{
                  margin: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaUsers
                  style={{
                    marginRight: "10px",
                    fontSize: "18px",
                    color: "gray",
                  }}
                />
                <span>Attendees:</span>
              </p>
              <ul className="attendees-list">
                {attendees.map((attendee) => (
                  <li key={attendee.att_id}>
                    <span>{attendee.username}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
