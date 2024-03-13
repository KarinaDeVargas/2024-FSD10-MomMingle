import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";
import SearchEvent from "./pages/SearchEvent";
import SingleEvent from "./pages/SingleEvent";
import Events from "./pages/Events";
import Messages from "./pages/Messages";
import Admin from "./pages/Admin";
import EditUser from "./pages/EditUser";
import "./style/style_css.css";
import "./style/tailwind.css";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="app">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/post/:id",
        element: <SingleEvent />,
      },
      {
        path: "/searchevent",
        element: <SearchEvent />,
      },
      {
        path: "/createevent",
        element: <CreateEvent />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/editUser/:id",
        element: <EditUser />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import './styles.css'; // Import the CSS file
// import

// // Header component
// const Header = () => (
//   <header className="header">
//     <div className="logo">
//       <img src="./images/logo-no-background.png" alt="Error MomMingle Logo" />
//     </div>
//     <nav>
//       <ul>
//         <li><a href="#about">About</a></li>
//         <li><a href="#events">Events</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//     </nav>
//   </header>
// );

// // Hero section component
// const Hero = () => (
//   <section id="hero" className="hero">
//     <div className="heroContent">
//       <h1>Welcome to MomMingle</h1>
//       <p>Connect, Share, Thrive!</p>
//       <a href="#signup" className="btn">Get Started</a>
//     </div>
//   </section>
// );

// // About Us section component
// const About = () => (
//   <section id="about" className="about">
//     <div className="aboutContent">
//       <h2>About MomMingle</h2>
//       <p>MomMingle is a versatile web application designed to cater to the diverse needs and interests of mothers everywhere. Whether they're stay-at-home moms, working moms, single moms, or anything in between, MomMingle offers a centralized platform for moms to connect, share experiences, and build meaningful relationships.</p>
//     </div>
//   </section>
// );

// // Footer component
// const Footer = () => (
//   <footer className="footer">
//     <p>&copy; 2024 MomMingle. All rights reserved.</p>
//   </footer>
// );

// // Main App component
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     // Implement login functionality
//     setIsLoggedIn(true);
//   };

//   return (
//     <div>
//       <Header />
//       <Hero />
//       <About />
//       {/* we could add other sections for features, testimonials, etc. */}
//       <Footer />
//     </div>
//   );
// }

// export default App;
