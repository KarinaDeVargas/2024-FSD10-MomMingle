import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = ({setShowSignUpForm}) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/events");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-80 p-8 border border-gray-300 rounded shadow-lg bg-white bg-opacity-50"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-xl font-semibold mb-6">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-2 py-1 border border-gray-300 rounded"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-2 py-1 border border-gray-300 rounded"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-2 py-1 border border-gray-300 rounded"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-pastel-darker-blue text-white font-semibold rounded hover:bg-blue-500"
        >
          Sign Up
        </button>
        {err && <p>{err}</p>}
        <div className="text-center mt-4">
          <p className="text-gray-700">Already have an account?</p>
          <button
            className="text-pastel-darker-blue hover:underline inline ml-1"
            onClick={() => setShowSignUpForm(false)}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
