import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const CreateEvent = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || "");

  const navigate = useNavigate();

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
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            description: value,
            category,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            description: value,
            category,
            img: file ? imgUrl : "",
            created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
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
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
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
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={category === "social"}
              name="cat"
              value="social"
              id="social"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="social">Social</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "culture"}
              name="cat"
              value="culture"
              id="culture"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="culture">Culture</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "fitness"}
              name="cat"
              value="fitness"
              id="fitness"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="fitness">Fitness</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "parenting"}
              name="cat"
              value="parenting"
              id="parenting"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="parenting">Parenting</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "playdate"}
              name="cat"
              value="playdate"
              id="playdate"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="playdate">Playdate</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
