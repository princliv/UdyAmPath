import React, { useState } from "react";

// Modal Components
import JobInternshipModal from "./JobInternshipModal";
import WorkshopModal from "./WorkshopModal";
import QuizModal from "./QuizModal";
import HackathonModal from "./HackathonModal";

const RecruiterHome = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (category) => setActiveModal(category);
  const closeModal = () => setActiveModal(null);

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
    { name: "Jobs", count: 0, color: "#1976D2" },
    { name: "Workshops", count: 0, color: "#9C27B0" },
    { name: "Quizzes", count: 0, color: "#388E3C" },
    { name: "Hackathons", count: 0, color: "#007ACC" },
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
};

export default RecruiterHome;
