import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, Link } from "react-router-dom";
import Homepage from "./pages/homepage";
import CoursePage from "./pages/coursepage";
import JobPage from "./pages/jobpage";
import ToolsPage from "./pages/toolspage";
//import Contact from "";
import Profile from "./pages/profile";
import backgroud from "./assets/background.png";


function App() {
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#f8f9fa",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    height: "50px",
    cursor: "pointer",
  };

  const navStyle = {
    display: "flex",
    gap: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "8px 12px",
    transition: "color 0.3s",
  };

  return (
    <Router>
      {/* Header inside App.js */}
      <header style={headerStyle}>
        <Link to="/homepage">
          <img src={backgroud} alt="Logo" style={logoStyle} />
        </Link>
        <nav style={navStyle}>
          <NavLink to="/coursepage" style={linkStyle} activeStyle={{ color: "#007bff" }}>
            Courses
          </NavLink>
          <NavLink to="/jobpage" style={linkStyle} activeStyle={{ color: "#007bff" }}>
            Jobs/Internship
          </NavLink>
          <NavLink to="/toolspage" style={linkStyle} activeStyle={{ color: "#007bff" }}>
            Tools
          </NavLink>
          
          <NavLink to="/profile" style={linkStyle} activeStyle={{ color: "#007bff" }}>
            Profile
          </NavLink>
        </nav>
      </header>

      {/* Page Routes */}
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/coursepage" element={<CoursePage />} />
        <Route path="/jobpage" element={<JobPage />} />
        <Route path="/toolspage" element={<ToolsPage />} />
        
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
