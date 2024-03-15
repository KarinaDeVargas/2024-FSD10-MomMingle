import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || "");
  const [eventDate, setEventDate] = useState(state?.event_date || null);
  const [location, setLocation] = useState(state?.location || "");
  const [activities, setActivities] = useState(state?.activities || "");
  const [ageRange, setAgeRange] = useState(state?.age_range || "");
  const [errors, setErrors] = useState({});

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
    const errors = {};
    if (!title) errors.title = "Please fill the title";
    if (!value.trim()) errors.description = "Please fill the description";
    if (!category) errors.category = "Please select a category";
    if (!eventDate) errors.eventDate = "Please select an event date";
    if (!location) errors.location = "Please fill the location";
    if (!activities) errors.activities = "Please fill the activities";
    if (!ageRange) errors.ageRange = "Please select an age range";
    if (!file) errors.file = "Please upload an image";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});

    const imgUrl = await upload();

    try {
      postId
        ? await axios.put(`/posts/${postId}`, {
            title,
            description: value,
            category,
            event_date: eventDate,
            location,
            activities,
            age_range: ageRange,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            description: value,
            category,
            event_date: eventDate,
            location,
            activities,
            age_range: ageRange,
            img: file ? imgUrl : "",
            created_at: new Date(Date.now())
              .toISOString()
              .slice(0, 19)
              .replace("T", " "),
          });
      navigate("/events");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-event-container">
      <div className="content">
        <h1>Title</h1>
        <input
          className="event-input"
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <div className="editor-container">
          <h1>Description</h1>
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        {errors.description && <p className="error">{errors.description}</p>}

        <h1>Event Date</h1>
        <DatePicker
          className="event-input"
          selected={eventDate}
          onChange={(date) => setEventDate(date)}
          placeholderText="Select Event Date"
        />
        {errors.eventDate && <p className="error">{errors.eventDate}</p>}

        <h1>Location</h1>
        <input
          className="event-input"
          type="text"
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        {errors.location && <p className="error">{errors.location}</p>}

        <h1>Activities</h1>
        <input
          className="event-input"
          type="text"
          value={activities}
          placeholder="Activities"
          onChange={(e) => setActivities(e.target.value)}
        />
        {errors.activities && <p className="error">{errors.activities}</p>}

        <h1>Age Range</h1>
        <select
          className="event-input"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
        >
          <option value="">Select Age Range</option>
          <option value="0-5 years">0-5 years</option>
          <option value="6-10 years">6-10 years</option>
          <option value="Adults Only">Adults Only</option>
          <option value="Any Age">Any Age</option>
        </select>
        {errors.ageRange && <p className="error">{errors.ageRange}</p>}

        <div className="category">
          <h1>Category</h1>
          <select
            className="event-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="social">Social</option>
            <option value="culture">Culture</option>
            <option value="fitness">Fitness</option>
            <option value="parenting">Parenting</option>
            <option value="playdate">Playdate</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div className="publish">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file-label" htmlFor="file">
            Upload Image
          </label>
          {errors.file && <p className="error">{errors.file}</p>}
          <div className="buttons">
            <button className="publish-button" onClick={handleClick}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
