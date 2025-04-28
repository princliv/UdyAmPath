import React from "react";

const FounderNoteModal = ({ onClose }) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h3 style={styles.founderNoteTitle}>A Message From The Team</h3>
        <p style={styles.founderNoteText}>
          ✨ "We created this platform because we believe career journeys should be exciting, not scary. We're just getting started — and we'd love for you to be part of it."
        </p>
        <p style={styles.founderNoteText}>
          - The Team at UdyamPath
        </p>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    animation: "fadeIn 0.5s ease-out", // Added fade-in animation
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)", // Added shadow for depth
    transform: "scale(1.05)", // Slightly scale up for a more lively effect
    animation: "zoomIn 0.5s ease-out", // Added zoom-in animation
  },
  founderNoteTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
    fontFamily: "'Roboto', sans-serif", // More modern font
    letterSpacing: "1px", // Added letter spacing for a clean look
  },
  founderNoteText: {
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.7",
    fontStyle: "italic",
    marginBottom: "20px",
    fontFamily: "'Open Sans', sans-serif", // Modern sans-serif font
  },
  closeButton: {
    marginTop: "20px",
    padding: "12px 25px",
    backgroundColor: "#1181c8",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease", // Smooth background transition
  },
};

// Keyframe animations
const animationStyles = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes zoomIn {
    0% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }
`;

export default FounderNoteModal;
