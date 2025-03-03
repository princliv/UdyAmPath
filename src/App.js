import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, NavLink, Route, Routes } from "react-router-dom";
import { auth } from "./firebase/firebase"; // Firebase Auth import
import { onAuthStateChanged, signOut } from "firebase/auth";

import BaseDetails from "./components/jobpage/baseDetails";
import BasePage from "./components/jobpage/basePage";
import Books from "./components/notespage/books";
import Notes from "./components/notespage/notes";
import GroupDiscussion from "./components/toolspage/groupDiscussion";
import HrInterview from "./components/toolspage/hrInterview";
import Placement from "./components/toolspage/placementpaper";
import PlaceTest from "./components/toolspage/placeTest";
import ProjectModal from "./components/toolspage/projectModal";
import TechInterview from "./components/toolspage/techInterview";
import CourseDetail from "./pages/coursedetail";
import CoursePage from "./pages/coursepage";
import Homepage from "./pages/homepage";
import JobPage from "./pages/jobpage";
import NotesPage from "./pages/notespage";
import ToolsPage from "./pages/toolspage";
import Login from "./pages/login";  // Login Page Import
import Signup from "./pages/signup"; // Signup Page Import
import Profile from "./pages/profile"; // Profile Page Import
import backgroud from "./assets/background.png";

function App() {
  const [user, setUser] = useState(null);

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

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

          {/* Show Login & Signup if no user is logged in, otherwise show Profile */}
          {!user ? (
            <>
              <NavLink to="/login" style={linkStyle} activeStyle={{ color: "#4169E1" }}>
                Login
              </NavLink>
              <NavLink to="/signup" style={linkStyle} activeStyle={{ color: "#007bff" }}>
                Signup
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" style={linkStyle} activeStyle={{ color: "#007bff" }}>
                Profile
              </NavLink>
              <button onClick={handleLogout} style={{ ...linkStyle, background: "none", border: "none", cursor: "pointer" }}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/coursepage" element={<CoursePage />} />
        <Route path="/jobpage" element={<JobPage />} />
        <Route path="/toolspage" element={<ToolsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notespage" element={<NotesPage />} />
        <Route path="/coursedetail" element={<CourseDetail />} />
        <Route path="/base" element={<BasePage />} />
        <Route path="/basedetails" element={<BaseDetails />} />
        <Route path="/techInterview" element={<TechInterview />} />
        <Route path="/hrInterview" element={<HrInterview />} />
        <Route path="/groupdiscussion" element={<GroupDiscussion />} />
        <Route path="/projectModal" element={<ProjectModal />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/placementpapers" element={<Placement />} />
        <Route path="/placeTest" element={<PlaceTest />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
