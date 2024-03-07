import React, { useState } from "react";
import BackgroundImg from "../images/bg-image.webp";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Home = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 w-full z-0"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
        maxWidth: "none", // Override max-width for the container
      }}
    >
      <div className="container mx-auto flex justify-center items-center h-screen flex-col">
        <div className="w-1/2">
          <h1 className="text-4xl font-semibold mb-4 text-center">
            Embark on a journey of endless mom adventures in one place
          </h1>
          <p className="text-center mb-8">
            Join MomMingle to conveniently discover and book a variety of
            mom-friendly events, ranging from informative workshops to enjoyable
            playdates, all in one convenient platform.
          </p>
        </div>
        {!showSignUpForm ? (
          <LoginForm setShowSignUpForm={setShowSignUpForm} />
        ) : (
          <SignUpForm setShowSignUpForm={setShowSignUpForm} />
        )}
      </div>
    </div>
  );
};

export default Home;
