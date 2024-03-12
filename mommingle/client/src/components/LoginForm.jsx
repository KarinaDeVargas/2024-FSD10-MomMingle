import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const LoginForm = ({ setShowSignUpForm }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(inputs);
      console.log("Login response:", response); // Log the entire response
      if (response && response.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/events");
      }
    } catch (err) {
      setError(err.response ? err.response.data : err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        className="w-80 p-8 border border-gray-300 rounded shadow-lg mb-4 bg-white bg-opacity-50"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-xl font-semibold mb-6">Login</h2>
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
          Log In
        </button>
        {err && <p>Error: {err.message}</p>}
      </form>
      <div className="w-80 p-8 border border-gray-300 rounded shadow-lg bg-white bg-opacity-75">
        <div className="text-center mt-4">
          <p className="text-gray-700 inline">Don't have an account?</p>
          <button
            className="text-pastel-darker-blue hover:underline inline ml-1"
            onClick={() => setShowSignUpForm(true)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
