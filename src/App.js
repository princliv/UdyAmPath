import "@fortawesome/fontawesome-free/css/all.min.css";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { auth, database } from "./firebase/firebase";

import { signOut } from "firebase/auth";
import backgroud from "./assets/background.png";
import flogo from "./assets/footerLogo.png";
import AuthModal from "./pages/AuthModal";
import FounderNoteModal from "./pages/FounderModal";

const ModulePage = lazy(() => import("./components/coursepage/modulePage"));
const PathwayPhaseDetail = lazy(() => import("./components/coursepage/PathwayPhaseDetail"));
const SpecializationDetail = lazy(() => import("./components/coursepage/SpecializationDetail"));
const TestPage = lazy(() => import("./components/coursepage/TestPage"));
const BaseDetails = lazy(() => import("./components/jobpage/baseDetails"));
const BasePage = lazy(() => import("./components/jobpage/basePage"));
const Books = lazy(() => import("./components/notespage/books"));
const FlashCard = lazy(() => import("./components/notespage/FlashCard"));
const Notes = lazy(() => import("./components/notespage/notes"));
const PyqPage = lazy(() => import("./components/notespage/PyqPage"));
const Adaptability = lazy(() => import("./components/toolspage/adaptability"));
const Communication = lazy(() => import("./components/toolspage/communication"));
const GroupDiscussion = lazy(() => import("./components/toolspage/groupDiscussion"));
const HrInterview = lazy(() => import("./components/toolspage/hrInterview"));
const Placement = lazy(() => import("./components/toolspage/placementpaper"));
const PlaceTest = lazy(() => import("./components/toolspage/placeTest"));
const Pd = lazy(() => import("./components/toolspage/projectlist"));
const ProjectModal = lazy(() => import("./components/toolspage/projectModal"));
const TechInterview = lazy(() => import("./components/toolspage/techInterview"));
const TimeManagement = lazy(() => import("./components/toolspage/timemanage"));
const CourseDetail = lazy(() => import("./pages/coursedetail"));
const CoursePage = lazy(() => import("./pages/coursepage"));
const Homepage = lazy(() => import("./pages/homepage"));
const JobPage = lazy(() => import("./pages/jobpage"));
const NotesPage = lazy(() => import("./pages/notespage"));
const Profile = lazy(() => import("./pages/profile"));
const Recruiter = lazy(() => import("./pages/recruiter"));
const ToolsPage = lazy(() => import("./pages/toolspage"));
const JobSimulator = lazy(() => import("./components/coursepage/JobSimulator"));
const ResumeCheck = lazy(() => import("./components/jobpage/ResumeCheck"));
const InterCheck = lazy(() => import("./components/jobpage/InterviewCheck"));
const InternApply = lazy(() => import("./components/jobpage/internApply"));
const JobDetail = lazy(() => import("./components/jobpage/jobDetails"));

function ProtectedRoute({ user, loading, children }) {
  if (loading) return null;
  return user ? children : <Navigate to="/homepage" replace />;
}

function RecruiterRoute({ user, loading, userType, children }) {
  if (loading) return null;
  const normalizedType = (userType || "").toLowerCase();
  return user && normalizedType === "recruiter" ? children : <Navigate to="/homepage" replace />;
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Now correctly inside Router
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const isTablet = useMediaQuery({ minWidth: 821, maxWidth: 1120 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showModal, setShowModal] = useState(false);
  const [isMobileProfileMenuOpen, setIsMobileProfileMenuOpen] = useState(false);
  const mobileProfileMenuRef = useRef(null);

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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/login") {
      setAuthMode("login");
      setIsModalOpen(true);
    }

    if (location.pathname === "/signup") {
      setAuthMode("signup");
      setIsModalOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileProfileMenuOpen) {
      return;
    }

    const handleOutsideClick = (event) => {
      if (mobileProfileMenuRef.current && !mobileProfileMenuRef.current.contains(event.target)) {
        setIsMobileProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isMobileProfileMenuOpen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setUserType("");
        setIsAuthLoading(false);
        return;
      }

      try {
        const snapshot = await get(ref(database, `users/${currentUser.uid}`));
        const profile = snapshot.exists() ? snapshot.val() : null;
        setUserType(profile?.userType || "");
      } catch (error) {
        console.error("Failed to read user profile:", error);
        setUserType("");
      } finally {
        setIsAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))  // Clears the user state
      .catch((error) => console.error("Logout error:", error));
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const showMobileBottomBar = isMobile && !isAuthPage && location.pathname !== "/recruiter";

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
    if (isAuthPage) {
      navigate("/homepage", { replace: true });
    }
  };

  const applyInlineHover = (event, hoverStyles) => {
    Object.assign(event.currentTarget.style, hoverStyles);
  };

  const clearInlineHover = (event, defaultStyles) => {
    Object.assign(event.currentTarget.style, defaultStyles);
  };

  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1200,
    width: "100%",
    borderBottom: "1px solid rgba(17, 129, 200, 0.16)",
    background: "#ffffff",
    boxShadow: scrolled
      ? "0 10px 30px rgba(15, 23, 42, 0.09)"
      : "0 6px 22px rgba(15, 23, 42, 0.06)",
    transition: "all 0.3s ease",
  };

  const headerInnerStyle = {
    maxWidth: "1240px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: isMobile ? "flex-start" : "space-between",
    gap: "16px",
    padding: isMobile ? "10px 16px" : scrolled ? "10px 20px" : "14px 20px",
    flexWrap: "nowrap",
  };

  const logoStyle = {
    height: isMobile ? "44px" : "50px",
    cursor: "pointer",
    transition: "transform 0.22s ease, filter 0.22s ease",
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "14px" : "24px",
    flexWrap: "wrap",
    justifyContent: isMobile ? "flex-start" : "flex-end",
  };

  const navTextBase = {
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    padding: "6px 2px",
    color: "#1181c8",
    borderBottom: "2px solid transparent",
    transition: "color 0.25s ease, border-color 0.25s ease, transform 0.2s ease",
  };

  const navLinkStyle = ({ isActive }) => ({
    ...navTextBase,
    color: isActive ? "#004aad" : navTextBase.color,
    borderBottom: isActive ? "2px solid #1181c8" : navTextBase.borderBottom,
  });

  const actionButtonStyle = {
    padding: "9px 16px",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "14px",
    background: "linear-gradient(135deg, #1181c8 0%, #004aad 100%)",
    color: "#ffffff",
    boxShadow: "0 10px 24px rgba(17, 129, 200, 0.28)",
    transition: "transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease",
  };

  const secondaryActionStyle = {
    ...actionButtonStyle,
    background: scrolled ? "#0f2f62" : "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "none",
    transition: "transform 0.22s ease, background 0.22s ease",
  };

  const footerStyle = {
    background: "linear-gradient(130deg, #1181c8 0%, #0c58a5 60%, #0a4a90 100%)",
    color: "#ffffff",
    textAlign: "left",
    padding: isMobile ? "38px 18px 24px" : "48px 24px 28px",
    marginTop: 0,
    borderTop: "1px solid rgba(255, 255, 255, 0.16)",
  };

  const footerInnerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
        ? "1.4fr 1fr 1fr"
        : "1.6fr 1fr 1fr 1fr",
    gap: isMobile ? "24px" : "28px",
  };

  const footerHeadingStyle = {
    fontSize: "18px",
    fontWeight: 700,
    margin: "0 0 14px",
    letterSpacing: "0.01em",
  };

  const footerLinkStyle = {
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "14px",
    lineHeight: "1.9",
    display: "inline-block",
    transition: "color 0.2s ease, transform 0.2s ease",
  };

  const footerTextStyle = {
    margin: "0 0 8px",
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: "1.6",
  };

  const mobileBottomDockWrapStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    zIndex: 1300,
    pointerEvents: "none",
  };

  const mobileDockSectionBase = {
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "auto",
  };

  const mobileLeftDockStyle = {
    ...mobileDockSectionBase,
    width: "62px",
  };

  const mobileCenterDockStyle = {
    ...mobileDockSectionBase,
    width: "182px",
    height: "50px",
    minHeight: "50px",
    padding: "3px 6px",
    borderRadius: "999px",
    background: "rgba(39, 43, 52, 0.94)",
    backdropFilter: "blur(14px) saturate(140%)",
    WebkitBackdropFilter: "blur(14px) saturate(140%)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)",
    justifyContent: "space-between",
  };

  const mobileRightDockStyle = {
    ...mobileDockSectionBase,
    width: "62px",
    position: "relative",
  };

  const mobileDockMenuStyle = {
    position: "absolute",
    bottom: "72px",
    right: 0,
    width: "172px",
    background: "rgba(39, 43, 52, 0.96)",
    backdropFilter: "blur(14px) saturate(140%)",
    WebkitBackdropFilter: "blur(14px) saturate(140%)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    borderRadius: "14px",
    boxShadow: "0 14px 28px rgba(0, 0, 0, 0.28)",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  const mobileMenuItemStyle = {
    width: "100%",
    border: "none",
    textDecoration: "none",
    background: "transparent",
    color: "#ffffff",
    borderRadius: "10px",
    padding: "10px 12px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  };

  const mobileCenterActionBase = {
    textDecoration: "none",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(55, 60, 70, 0.96)",
    backdropFilter: "blur(14px) saturate(140%)",
    WebkitBackdropFilter: "blur(14px) saturate(140%)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)",
    borderRadius: "50%",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f9fcff",
    cursor: "pointer",
    transition: "all 0.22s ease",
    flexDirection: "column",
    gap: "0",
    fontSize: "0",
    fontWeight: 600,
    lineHeight: 1,
    width: "40px",
    height: "40px",
    padding: "0",
    minWidth: "40px",
  };

  const mobileCenterLinkStyle = ({ isActive }) => ({
    ...mobileCenterActionBase,
    color: "#ffffff",
    background: isActive ? "linear-gradient(135deg, #1181c8 0%, #004aad 100%)" : mobileCenterActionBase.background,
    border: isActive ? "1px solid rgba(158, 216, 255, 0.85)" : mobileCenterActionBase.border,
    boxShadow: isActive ? "0 10px 22px rgba(17, 129, 200, 0.4)" : mobileCenterActionBase.boxShadow,
    transform: isActive ? "translateY(-2px)" : "translateY(0)",
  });

  const mobileNavItemBase = {
    textDecoration: "none",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(39, 43, 52, 0.94)",
    backdropFilter: "blur(14px) saturate(140%)",
    WebkitBackdropFilter: "blur(14px) saturate(140%)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)",
    color: "#f9fcff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "0",
    fontSize: "0",
    fontWeight: 600,
    lineHeight: 1,
    width: "50px",
    height: "50px",
    padding: "0",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.22s ease",
  };

  const mobileNavLinkStyle = ({ isActive }) => ({
    ...mobileNavItemBase,
    color: "#ffffff",
    background: isActive ? "linear-gradient(135deg, #1181c8 0%, #004aad 100%)" : mobileNavItemBase.background,
    border: isActive ? "1px solid rgba(158, 216, 255, 0.85)" : mobileNavItemBase.border,
    boxShadow: isActive ? "0 10px 22px rgba(17, 129, 200, 0.4)" : mobileNavItemBase.boxShadow,
    transform: isActive ? "translateY(-2px)" : "translateY(0)",
  });

  const mobileIconStyle = {
    fontSize: "18px",
    lineHeight: 1,
  };

  const mobileCenterIconStyle = {
    fontSize: "15px",
    lineHeight: 1,
  };

  return (
    <>
      {location.pathname !== "/recruiter" && (
        <header style={headerStyle}>
          <div style={headerInnerStyle}>
            <Link to="/homepage">
              <img
                src={backgroud}
                alt="Logo"
                style={logoStyle}
                onMouseEnter={(event) =>
                  applyInlineHover(event, {
                    transform: "translateY(-1px) scale(1.03)",
                    filter: "drop-shadow(0 10px 18px rgba(17, 129, 200, 0.28))",
                  })
                }
                onMouseLeave={(event) =>
                  clearInlineHover(event, {
                    transform: "translateY(0) scale(1)",
                    filter: "none",
                  })
                }
              />
            </Link>
            {!isMobile && <nav style={navStyle}>
              <NavLink
                to="/coursepage"
                style={navLinkStyle}
                onMouseEnter={(event) =>
                  applyInlineHover(event, {
                    transform: "translateY(-1px)",
                    color: "#004aad",
                    borderBottomColor: "#1181c8",
                  })
                }
                onMouseLeave={(event) =>
                  clearInlineHover(event, {
                    transform: "translateY(0)",
                    color: "#1181c8",
                    borderBottomColor: "transparent",
                  })
                }
              >
                Courses
              </NavLink>
              <NavLink
                to="/jobpage"
                style={navLinkStyle}
                onMouseEnter={(event) =>
                  applyInlineHover(event, {
                    transform: "translateY(-1px)",
                    color: "#004aad",
                    borderBottomColor: "#1181c8",
                  })
                }
                onMouseLeave={(event) =>
                  clearInlineHover(event, {
                    transform: "translateY(0)",
                    color: "#1181c8",
                    borderBottomColor: "transparent",
                  })
                }
              >
                Opportunity
              </NavLink>
              <NavLink
                to="/toolspage"
                style={navLinkStyle}
                onMouseEnter={(event) =>
                  applyInlineHover(event, {
                    transform: "translateY(-1px)",
                    color: "#004aad",
                    borderBottomColor: "#1181c8",
                  })
                }
                onMouseLeave={(event) =>
                  clearInlineHover(event, {
                    transform: "translateY(0)",
                    color: "#1181c8",
                    borderBottomColor: "transparent",
                  })
                }
              >
                Tools
              </NavLink>

              {!user ? (
                <button
                  onClick={() => openAuthModal("login")}
                  style={actionButtonStyle}
                  onMouseEnter={(event) =>
                    applyInlineHover(event, {
                      transform: "translateY(-1px)",
                      boxShadow: "0 12px 26px rgba(17, 129, 200, 0.32)",
                      filter: "brightness(1.04)",
                    })
                  }
                  onMouseLeave={(event) =>
                    clearInlineHover(event, {
                      transform: "translateY(0)",
                      boxShadow: "0 10px 24px rgba(17, 129, 200, 0.28)",
                      filter: "brightness(1)",
                    })
                  }
                >
                  Login
                </button>
              ) : (
                <>
                  <NavLink
                    to="/profile"
                    style={navLinkStyle}
                    onMouseEnter={(event) =>
                      applyInlineHover(event, {
                        transform: "translateY(-1px)",
                        color: "#004aad",
                        borderBottomColor: "#1181c8",
                      })
                    }
                    onMouseLeave={(event) =>
                      clearInlineHover(event, {
                        transform: "translateY(0)",
                        color: "#1181c8",
                        borderBottomColor: "transparent",
                      })
                    }
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    style={secondaryActionStyle}
                    onMouseEnter={(event) =>
                      applyInlineHover(event, {
                        transform: "translateY(-1px)",
                        filter: "brightness(1.07)",
                      })
                    }
                    onMouseLeave={(event) =>
                      clearInlineHover(event, {
                        transform: "translateY(0)",
                        filter: "brightness(1)",
                      })
                    }
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>}
          </div>
        </header>
      )}
      <main style={{ paddingBottom: showMobileBottomBar ? "92px" : "0" }}>
      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/coursepage" element={<CoursePage />} />
        <Route path="/jobpage" element={<JobPage />} />
        <Route path="/toolspage" element={<ToolsPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user} loading={isAuthLoading}>
              <Profile />
            </ProtectedRoute>
          }
        />
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
        <Route path="/login" element={<div style={{ minHeight: "100vh" }} />} />
        <Route path="/signup" element={<div style={{ minHeight: "100vh" }} />} />
        <Route
          path="/recruiter"
          element={
            <RecruiterRoute user={user} loading={isAuthLoading} userType={userType}>
              <Recruiter />
            </RecruiterRoute>
          }
        />
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
      </Suspense>
      </main>

      {showMobileBottomBar && (
        <nav style={mobileBottomDockWrapStyle} aria-label="Mobile bottom navigation">
          <div style={mobileLeftDockStyle}>
            <NavLink to="/homepage" style={mobileNavLinkStyle} onClick={() => setIsMobileProfileMenuOpen(false)}>
              <i className="fas fa-home" style={mobileIconStyle} aria-hidden="true" />
              <span>Home</span>
            </NavLink>
          </div>

          <div style={mobileCenterDockStyle}>
            <NavLink to="/coursepage" style={mobileCenterLinkStyle} onClick={() => setIsMobileProfileMenuOpen(false)}>
              <i className="fas fa-book-open" style={mobileIconStyle} aria-hidden="true" />
              <span>Courses</span>
            </NavLink>
            <NavLink to="/jobpage" style={mobileCenterLinkStyle} onClick={() => setIsMobileProfileMenuOpen(false)}>
              <i className="fas fa-briefcase" style={mobileIconStyle} aria-hidden="true" />
              <span>Jobs</span>
            </NavLink>
            <NavLink to="/toolspage" style={mobileCenterLinkStyle} aria-label="Tools" onClick={() => setIsMobileProfileMenuOpen(false)}>
              <i className="fas fa-plus" style={mobileCenterIconStyle} aria-hidden="true" />
              <span>Tool</span>
            </NavLink>
          </div>

          <div style={mobileRightDockStyle} ref={mobileProfileMenuRef}>
            {user ? (
              <>
                <button
                  style={mobileNavItemBase}
                  onClick={() => setIsMobileProfileMenuOpen((prev) => !prev)}
                  aria-label="Open profile options"
                >
                  <i className="fas fa-user-circle" style={mobileIconStyle} aria-hidden="true" />
                  <span>Profile</span>
                </button>

                {isMobileProfileMenuOpen && (
                  <div style={mobileDockMenuStyle}>
                    <Link
                      to="/profile"
                      style={mobileMenuItemStyle}
                      onClick={() => setIsMobileProfileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileProfileMenuOpen(false);
                        handleLogout();
                      }}
                      style={mobileMenuItemStyle}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMobileProfileMenuOpen(false);
                  openAuthModal("login");
                }}
                style={mobileNavItemBase}
              >
                <i className="fas fa-user" style={mobileIconStyle} aria-hidden="true" />
                <span>Login</span>
              </button>
            )}
          </div>
        </nav>
      )}

      <AuthModal isOpen={isModalOpen} onClose={closeAuthModal} initialMode={authMode} />
      {showModal && <FounderNoteModal onClose={handleCloseModal} />}
      {/* Footer (Hidden on Login & Signup pages) */}
      {!isAuthPage && (
        <footer style={footerStyle}>
          <div style={footerInnerStyle}>
            <div>
              <img
                src={flogo}
                alt="Company Logo"
                style={{ width: isMobile ? "220px" : "280px", height: "auto", marginBottom: "12px" }}
              />
              <p style={{ ...footerTextStyle, maxWidth: "460px" }}>
                A complete solution for learning, time management, mental wellness, and career growth.
              </p>
              <p style={{ ...footerTextStyle, opacity: 0.85 }}>
                Build skills. Find opportunities. Grow with confidence.
              </p>
            </div>

            <div>
              <h6 style={footerHeadingStyle}>Products</h6>
              <Link to="/coursepage" style={footerLinkStyle} onMouseEnter={(event) => applyInlineHover(event, { color: "#ffffff", transform: "translateX(2px)" })} onMouseLeave={(event) => clearInlineHover(event, { color: "rgba(255, 255, 255, 0.9)", transform: "translateX(0)" })}>Courses</Link><br />
              <Link to="/coursepage" style={footerLinkStyle} onMouseEnter={(event) => applyInlineHover(event, { color: "#ffffff", transform: "translateX(2px)" })} onMouseLeave={(event) => clearInlineHover(event, { color: "rgba(255, 255, 255, 0.9)", transform: "translateX(0)" })}>Specializations</Link><br />
              <Link to="/notespage" style={footerLinkStyle} onMouseEnter={(event) => applyInlineHover(event, { color: "#ffffff", transform: "translateX(2px)" })} onMouseLeave={(event) => clearInlineHover(event, { color: "rgba(255, 255, 255, 0.9)", transform: "translateX(0)" })}>Notes</Link><br />
              <Link to="/jobpage" style={footerLinkStyle} onMouseEnter={(event) => applyInlineHover(event, { color: "#ffffff", transform: "translateX(2px)" })} onMouseLeave={(event) => clearInlineHover(event, { color: "rgba(255, 255, 255, 0.9)", transform: "translateX(0)" })}>Jobs</Link>
            </div>

            <div>
              <h6 style={footerHeadingStyle}>Tools</h6>
              <Link to="/techInterview" style={footerLinkStyle} onMouseEnter={(event) => applyInlineHover(event, { color: "#ffffff", transform: "translateX(2px)" })} onMouseLeave={(event) => clearInlineHover(event, { color: "rgba(255, 255, 255, 0.9)", transform: "translateX(0)" })}>Interview Practice</Link><br />
              <Link to="/projectModal" style={footerLinkStyle} onMouseEnter={(event) => applyInlineHover(event, { color: "#ffffff", transform: "translateX(2px)" })} onMouseLeave={(event) => clearInlineHover(event, { color: "rgba(255, 255, 255, 0.9)", transform: "translateX(0)" })}>Project Listing</Link><br />
              <Link to="/toolspage" style={footerLinkStyle} onMouseEnter={(event) => applyInlineHover(event, { color: "#ffffff", transform: "translateX(2px)" })} onMouseLeave={(event) => clearInlineHover(event, { color: "rgba(255, 255, 255, 0.9)", transform: "translateX(0)" })}>Mentora</Link><br />
              <Link to="/toolspage" style={footerLinkStyle} onMouseEnter={(event) => applyInlineHover(event, { color: "#ffffff", transform: "translateX(2px)" })} onMouseLeave={(event) => clearInlineHover(event, { color: "rgba(255, 255, 255, 0.9)", transform: "translateX(0)" })}>Career Supportive Tools</Link>
            </div>

            {!isTablet && !isMobile && (
              <div>
                <h6 style={footerHeadingStyle}>Contact</h6>
                <p style={footerTextStyle}><i className="fas fa-home"></i> Roorkee, Uttarakhand, 247667, India</p>
                <p style={footerTextStyle}><i className="fas fa-envelope"></i> udyampath@gmail.com</p>
                <p style={footerTextStyle}><i className="fas fa-phone"></i> +91 969 312 093</p>
                <p style={footerTextStyle}><i className="fas fa-print"></i> +01 234 567 89</p>
              </div>
            )}
          </div>

          <hr style={{ margin: "24px auto 14px", width: "100%", maxWidth: "1200px", borderColor: "rgba(255,255,255,0.3)" }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
            <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.9)" }}>
              © 2026 UdyAmPath. Crafted for modern career growth.
            </p>
            <a
              href="https://yourwebsite.com"
              style={{ color: "rgba(255,255,255,0.95)", textDecoration: "none", fontSize: "13px", transition: "opacity 0.2s ease" }}
              onMouseEnter={(event) => applyInlineHover(event, { opacity: "0.85" })}
              onMouseLeave={(event) => clearInlineHover(event, { opacity: "1" })}
            >
              Visit Website
            </a>
          </div>
        </footer>
      )}
    </>
  );
}

export default App;
