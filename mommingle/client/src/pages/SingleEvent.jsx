import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import DeleteIcon from "../images/delete.png";
import EditIcon from "../images/edit.png";

const SingleEvent = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
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

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-sm font-bold mr-2">
              Host: {post.username}
            </span>
            <p className="text-xs">
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
        <img
          className="w-full h-48 object-cover object-center"
          src={`../upload/${post.img}`}
          alt={post.title}
        />
        <p
          className="text-base mb-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>
        <p className="text-sm mb-2">Event Date: {post.event_date}</p>
        <p className="text-sm mb-2">Location: {post.location}</p>
        <p className="text-sm mb-2">Category: {post.category}</p>
        <p className="text-sm mb-2">Activities: {post.activities}</p>
        <p className="text-sm mb-2">Age Range: {post.age_range}</p>
      </div>
    </div>
  );
};

export default SingleEvent;
