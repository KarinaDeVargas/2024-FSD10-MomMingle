import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const cat = useLocation().search;

  useEffect(() => {
    fetchData();
  }, [cat, selectedCategory, selectedDate]);

  const fetchData = async () => {
    try {
      let url = `/events`;
      let params = {};

      if (selectedCategory) {
        params.category = selectedCategory;
      }

      if (selectedDate) {
        params.date = selectedDate;
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

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search events"
          className="border rounded px-4 py-2 w-1/3"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-4 py-2 ml-4"
        >
          <option value="">All Categories</option>
          <option value="Playdate">Playdate</option>
          <option value="Social">Social</option>
          <option value="Fitness">Fitness</option>
          <option value="Crafts">Crafts</option>
          <option value="Parenting">Parenting</option>
          <option value="Cooking">Cooking</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Literature">Literature</option>
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
            key={post.event_id}
          >
            <div className="p-4">
              <Link
                to={`/post/${post.event_id}`}
                className="block mb-2 text-lg font-semibold text-blue-600 hover:text-blue-700"
              >
                {post.title}
              </Link>
              <p className="text-gray-600">{post.description}</p>
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
    </div>
  );
};

export default Admin;
