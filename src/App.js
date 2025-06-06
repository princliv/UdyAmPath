import "@fortawesome/fontawesome-free/css/all.min.css";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { auth } from "./firebase/firebase";

import { signOut } from "firebase/auth";
import backgroud from "./assets/background.png";
import flogo from "./assets/footerLogo.png";
import ModulePage from "./components/coursepage/modulePage";
import PathwayPhaseDetail from "./components/coursepage/PathwayPhaseDetail";
import SpecializationDetail from "./components/coursepage/SpecializationDetail";
import TestPage from "./components/coursepage/TestPage";
import BaseDetails from "./components/jobpage/baseDetails";
import BasePage from "./components/jobpage/basePage";
import Books from "./components/notespage/books";
import FlashCard from './components/notespage/FlashCard';
import Notes from "./components/notespage/notes";
import PyqPage from './components/notespage/PyqPage';
import Adaptability from "./components/toolspage/adaptability";
import Communication from "./components/toolspage/communication";
import GroupDiscussion from "./components/toolspage/groupDiscussion";
import HrInterview from "./components/toolspage/hrInterview";
import Placement from "./components/toolspage/placementpaper";
import PlaceTest from "./components/toolspage/placeTest";
import Pd from "./components/toolspage/projectlist";
import ProjectModal from "./components/toolspage/projectModal";
import TechInterview from "./components/toolspage/techInterview";
import TimeManagement from "./components/toolspage/timemanage";
import AuthModal from "./pages/AuthModal";
import CourseDetail from "./pages/coursedetail";
import CoursePage from "./pages/coursepage";
import FounderNoteModal from "./pages/FounderModal";
import Homepage from "./pages/homepage";
import JobPage from "./pages/jobpage";
import Login from "./pages/login";
import NotesPage from "./pages/notespage";
import Profile from "./pages/profile";
import Recruiter from "./pages/recruiter";
import Signup from "./pages/signup";
import ToolsPage from "./pages/toolspage";
import JobSimulator from "./components/coursepage/JobSimulator";
import ResumeCheck from "./components/jobpage/ResumeCheck";
import InterCheck from "./components/jobpage/InterviewCheck";
import InternApply from "./components/jobpage/internApply"; // adjust import
import JobDetail from "./components/jobpage/jobDetails";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Now correctly inside Router
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 20000);  // 20 seconds timeout

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))  // Clears the user state
      .catch((error) => console.error("Logout error:", error));
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
  const loginButtonStyle = {
    background: "#1d3480",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  };
  
  

  return (
    <>
      {location.pathname !== "/recruiter" && (
        <header style={headerStyle}>
          <Link to="/homepage">
            <img src={backgroud} alt="Logo" style={logoStyle} />
          </Link>
          <nav style={navStyle}>
            <NavLink to="/coursepage" style={linkStyle} activestyle={{ color: "#007bff" }}>
              Courses
            </NavLink>
            <NavLink to="/jobpage" style={linkStyle} activestyle={{ color: "#007bff" }}>
              Jobs/Internship
            </NavLink>
            <NavLink to="/toolspage" style={linkStyle} activestyle={{ color: "#007bff" }}>
              Tools
            </NavLink>

            {!user ? (
              <button onClick={() => setIsModalOpen(true)} style={loginButtonStyle}>
                Login
              </button>
            ) : (
              <>
                <Link to="/profile" style={linkStyle}>
                  Profile
                </Link>
                <button onClick={handleLogout} style={loginButtonStyle}>
                  Logout
                </button>
              </>
            )}
          </nav>
        </header>
      )}
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
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/adaptability" element={<Adaptability />} />
        <Route path="/timemanage" element={<TimeManagement />} />
        <Route path="/module" element={<ModulePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/pyqs" element={<PyqPage />} />
        <Route path="/flashcards" element={<FlashCard />} />
        <Route path="/specialization/:id" element={<SpecializationDetail />} />
        <Route path="/specialization/:id/pathway/:phaseIndex" element={<PathwayPhaseDetail />} />
        <Route path="/Pdetails" element={<Pd />} />
        <Route path="/intern-apply" element={<InternApply />} />
        <Route path="/jobDetails" element={<JobDetail />} />
        
        <Route path="/job-simulator" element={<JobSimulator />} />
        <Route path="/resume-check" element={<ResumeCheck />} />
        <Route path="/interview-checklist" element={<InterCheck />} />

      </Routes>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isSignup={isSignup} />
      {showModal && <FounderNoteModal onClose={handleCloseModal} />}
      {/* Footer (Hidden on Login & Signup pages) */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <footer style={{ backgroundColor: "#1181c8", color: "white", textAlign: "left", padding: "40px 20px", marginTop: "0px" }}>
        <div style={{
          maxWidth: "1100px",
          margin: "auto",
          display: "flex",
          flexWrap: "nowrap",  // Ensures all columns stay in one row
          justifyContent: "space-between",
          gap: "20px"
        }}>
          {/* Column 1 (Doubled Width) */}
          <div style={{ flex: 2, minWidth: "400px" }}>
            <img src={flogo} alt="Company Logo" style={{ width: "300px", height: "auto", marginBottom: "10px" }} />
            <p>A complete solution for learning, time management, mental wellness, and career growth..</p>
          </div>
          
          {/* Column 2 */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h6 style={{ fontSize: "18px", fontWeight: "bold" }}>Products</h6>
            <a href="/coursepage" style={{ textDecoration: "none", color: "inherit" }}>
              <p>Courses</p>
            </a>
            <a href="/coursepage" style={{ textDecoration: "none", color: "inherit" }}>
              <p>Specializations</p>
            </a>
            <a href="/notespage" style={{ textDecoration: "none", color: "inherit" }}>
              <p>Notes</p>
            </a>
            <a href="/jobpage" style={{ textDecoration: "none", color: "inherit" }}>
              <p>Jobs</p>
            </a>
          </div>
      
          {/* Column 3 */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h6 style={{ fontSize: "18px", fontWeight: "bold" }}>Tools</h6>
            <a href="/techInterview" style={{ textDecoration: "none", color: "inherit"}}>
              <p>Interview Practice</p>
            </a>
            <a href="/projectModal" style={{ textDecoration: "none", color: "inherit"}}>
              <p>Project Listing</p>
            </a>
            <a href="/toolspage" style={{ textDecoration: "none", color: "inherit"}}>
              <p>Mentora</p>
            </a>
            <a href="/toolspage" style={{ textDecoration: "none", color: "inherit"}}>
              <p>Career Supportive Tools</p>
            </a>
          </div>
      
          {/* Column 4 */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h6 style={{ fontSize: "18px", fontWeight: "bold" }}>Contact</h6>
            <p><i className="fas fa-home"></i> Roorkee, Uttarakhand, 247667, India</p>
            <p><i className="fas fa-envelope"></i> udyampath@gmail.com</p>
            <p><i className="fas fa-phone"></i> +91 969 312 093</p>
            <p><i className="fas fa-print"></i> +01 234 567 89</p>
          </div>
        </div>
      
        <hr style={{ margin: "20px 0", width: "100%", borderColor: "white" }} />
      
        <div>
          <p>© 2025 Copyright: <a href="https://yourwebsite.com" style={{ color: "white", textDecoration: "none" }}>YourWebsite.com</a></p>
        </div>
      </footer>
      
      )}
    </>
  );
}

export default App;
