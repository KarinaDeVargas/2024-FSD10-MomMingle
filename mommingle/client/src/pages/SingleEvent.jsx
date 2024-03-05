import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Delete from "../images/delete.png";
import Edit from "../images/edit.png";

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
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        {/*<img src={`../upload/${post?.img}`} alt="" />*/}
        <div className="user">
          <div className="info">
            <span>Host: {post.username}</span>
            <p>Posted {moment(post.created_at).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              {/*<Link to={`/write?edit=2`} state={post}>*/}
              <img src={Edit} alt="" />
              {/*</Link>*/}
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>
        <p>Event Date: {post.event_date}</p>
        <p>Location: {post.location}</p>
        <p>Category: {post.category}</p>
        <p>Activities: {post.activities}</p>
        <p>Age Range: {post.age_range}</p>
      </div>
    </div>
  );
};

export default SingleEvent;
