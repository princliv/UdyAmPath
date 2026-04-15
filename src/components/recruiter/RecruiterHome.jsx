import React, { useEffect, useState } from "react";

// Modal Components
import JobInternshipModal from "./JobInternshipModal";
import WorkshopModal from "./WorkshopModal";
import QuizModal from "./QuizModal";
import HackathonModal from "./HackathonModal";
import { CONTENT_TYPES, fetchMyRecruiterContent, fetchRecruiterApplications } from "../../firebase/recruiterContent";

const RecruiterHome = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [counts, setCounts] = useState({
    jobs: 0,
    workshops: 0,
    quizzes: 0,
    hackathons: 0,
  });
  const [applications, setApplications] = useState([]);

  const openModal = (category) => setActiveModal(category);
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [jobs, workshops, quizzes, hackathons] = await Promise.all([
          fetchMyRecruiterContent(CONTENT_TYPES.JOBS),
          fetchMyRecruiterContent(CONTENT_TYPES.WORKSHOPS),
          fetchMyRecruiterContent(CONTENT_TYPES.QUIZZES),
          fetchMyRecruiterContent(CONTENT_TYPES.HACKATHONS),
        ]);
        const incomingApplications = await fetchRecruiterApplications();

        setCounts({
          jobs: jobs.length,
          workshops: workshops.length,
          quizzes: quizzes.length,
          hackathons: hackathons.length,
        });
        setApplications(incomingApplications);
      } catch (error) {
        console.error("Failed to load recruiter content counts:", error);
      }
    };

    loadCounts();
  }, [activeModal]);

  const containerStyle = {
    display: "flex",
    gap: "20px",
    padding: "0px",
  };

  // Left Section (Ongoing)
  const ongoingStyle = {
    width: "270px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    background: "white",
  };

  const titleStyle = {
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
  };

  const buttonStyle = (bgColor) => ({
    background: bgColor,
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    width: "100%",
    cursor: "pointer",
    fontSize: "16px",
  });

  const ongoingCategories = [
    { name: "Jobs", count: counts.jobs, color: "#1976D2" },
    { name: "Workshops", count: counts.workshops, color: "#9C27B0" },
    { name: "Quizzes", count: counts.quizzes, color: "#388E3C" },
    { name: "Hackathons", count: counts.hackathons, color: "#007ACC" },
  ];

  // Right Section (Create)
  const createStyle = {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    background: "white",
  };

  const itemStyle = {
    background: "#E3ECFF",
    padding: "30px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const createButtonStyle = {
    background: "#0D47A1",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
  };

  const createCategories = ["JOB / INTERNSHIP", "WORKSHOP", "QUIZ", "HACKATHON"];

  const renderModalContent = () => {
    switch (activeModal) {
      case "JOB / INTERNSHIP":
        return <JobInternshipModal onClose={closeModal} />;
      case "WORKSHOP":
        return <WorkshopModal onClose={closeModal} />;
      case "QUIZ":
        return <QuizModal onClose={closeModal} />;
      case "HACKATHON":
        return <HackathonModal onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      {/* Ongoing Section */}
      <div style={ongoingStyle}>
        <div style={titleStyle}>Ongoing</div>
        {ongoingCategories.map((category, index) => (
          <button key={index} style={buttonStyle(category.color)}>
            <span>{category.name}</span>
            <span>{category.count}</span>
          </button>
        ))}
      </div>

      {/* Create Section */}
      <div style={createStyle}>
        {createCategories.map((category, index) => (
          <div key={index} style={itemStyle}>
            <span>{category}</span>
            <button style={createButtonStyle} onClick={() => openModal(category)}>
              CREATE
            </button>
          </div>
        ))}
      </div>

      <div style={{ ...ongoingStyle, width: "340px" }}>
        <div style={titleStyle}>Applications Received</div>
        {applications.length === 0 ? (
          <p style={{ fontSize: "14px", color: "#666" }}>No applications yet.</p>
        ) : (
          applications.slice(0, 8).map((application) => (
            <div
              key={application.id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "8px",
                background: "#fafcff",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>{application.jobTitle}</div>
              <div style={{ fontSize: "12px", color: "#555" }}>
                Applicant: {application.formData?.fullName || application.formData?.firstName || application.applicantEmail}
              </div>
              <div style={{ fontSize: "12px", color: "#555" }}>
                Type: {application.roleType || "Job"} | {application.company}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Component */}
      {activeModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>{renderModalContent()}</div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyle = {
  position: "fixed",
  top: 40,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "600px",
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  
  /* Custom Scrollbar */
  scrollbarWidth: "thin", 
  scrollbarColor: "#888 #f1f1f1",
};


export default RecruiterHome;
