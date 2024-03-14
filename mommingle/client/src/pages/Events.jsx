import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const SearchEvent = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const cat = useLocation().search;

  useEffect(() => {
    fetchData();
  }, [cat, selectedCategory, selectedDate, searchTerm]);

  const fetchData = async () => {
    try {
      let url = `/posts`;
      let params = {};

      if (selectedCategory) {
        params.category = selectedCategory;
      }

      if (selectedDate) {
        params.date = selectedDate;
      }

      if (searchTerm) {
        params.searchTerm = searchTerm;
      }

      const res = await axios.get(url, { params });
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    return formattedDate;
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search events"
          className="border rounded px-4 py-2 w-1/3 mt-3"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-4 py-2 ml-4"
        >
          <option value="">All Categories</option>
          <option value="Playdate">Social</option>
          <option value="Social">Culture</option>
          <option value="Fitness">Fitness</option>
          <option value="Parenting">Parenting</option>
          <option value="Cooking">Playdate</option>
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-4 py-2 ml-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
        >
          Search
        </button>
      </div>
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
              <br />
              <div className="flex items-center text-gray-500">
                <FaMapMarkerAlt style={{ marginRight: "10px" }} />
                Location: {post.location}
              </div>
              <div className="flex items-center text-gray-500">
                <FaCalendarAlt style={{ marginRight: "10px" }} />
                Date: {formatDate(post.event_date)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchEvent;
