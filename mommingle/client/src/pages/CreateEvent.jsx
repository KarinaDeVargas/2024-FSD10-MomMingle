import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const CreateEvent = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || "");
  const [eventDate, setEventDate] = useState(state?.event_date || "");
  const [location, setLocation] = useState(state?.location || "");
  const [activities, setActivities] = useState(state?.activities || "");
  const [ageRange, setAgeRange] = useState(state?.age_range || "");

  const navigate = useNavigate();

  const postId = new URLSearchParams(useLocation().search).get("edit");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      await axios.put(`/posts/${postId}`, {
        title,
        description: value,
        category,
        event_date: eventDate,
        location,
        activities,
        age_range: ageRange,
        img: file ? imgUrl : "",
      });
      navigate("/events");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>

        <input
          type="text"
          value={eventDate}
          placeholder="Event Date"
          onChange={(e) => setEventDate(e.target.value)}
        />

        <input
          type="text"
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="text"
          value={activities}
          placeholder="Activities"
          onChange={(e) => setActivities(e.target.value)}
        />

        <input
          type="text"
          value={ageRange}
          placeholder="Age Range"
          onChange={(e) => setAgeRange(e.target.value)}
        />

        <div className="category">
          <h1>Category</h1>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="social">Social</option>
            <option value="culture">Culture</option>
            <option value="fitness">Fitness</option>
            <option value="parenting">Parenting</option>
            <option value="playdate">Playdate</option>
          </select>
        </div>

        <div className="publish">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
