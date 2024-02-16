// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import './styles.css'; // Import the CSS file

function App() {
  return (
    <div>
      <header className="header"> {/* Apply header styles */}
        <div className="logo">
          <img src="mommingle-logo.png" alt="MomMingle Logo" />
        </div>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <section id="hero" className="hero"> {/* Apply hero section styles */}
        <div className="heroContent">
          <h1>Welcome to MomMingle</h1>
          <p>Connect, Share, Thrive!</p>
          <a href="#signup" className="btn">Get Started</a> {/* Apply button styles */}
        </div>
      </section>
      <section id="about" className="about"> {/* Apply about section styles */}
        <div className="aboutContent">
          <h2>About MomMingle</h2>
          <p>MomMingle is a versatile web application designed to cater to the diverse needs and interests of mothers everywhere. Whether they're stay-at-home moms, working moms, single moms, or anything in between, MomMingle offers a centralized platform for moms to connect, share experiences, and build meaningful relationships.</p>
        </div>
      </section>
      {/* Other sections for features, testimonials, etc. */}
      <footer className="footer"> {/* Apply footer styles */}
        <p>&copy; 2024 MomMingle. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
