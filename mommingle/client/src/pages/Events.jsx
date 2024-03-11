import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Events = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <div
          className="bg-white rounded-lg shadow-md overflow-hidden"
          key={post.id}
        >
          <img
            className="w-full h-48 object-cover object-center"
            src={`../upload/${post.img}`}
            alt={post.title}
          />
          <div className="p-4">
            <Link
              to={`/post/${post.event_id}`}
              className="block mb-2 text-lg font-semibold text-blue-600 hover:text-blue-700"
            >
              {post.title}
            </Link>
            <p className="text-gray-600">{getText(post.description)}</p>
            <p className="text-gray-500">Hosted By: {post.username}</p>
            <Link
              to={`/post/${post.event_id}`}
              className="text-blue-600 hover:underline"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
