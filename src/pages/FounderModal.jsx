import React, { useEffect } from "react";

const FounderNoteModal = ({ onClose }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(event) => event.stopPropagation()}>
        <button onClick={onClose} style={styles.iconCloseButton} aria-label="Close founder note modal">
          x
        </button>
        <div style={styles.sparkleBadge}>Message</div>
        <h3 style={styles.founderNoteTitle}>A Message From The Team</h3>
        <p style={styles.founderNoteText}>
          <span style={styles.quoteMark}>"</span>
          We created this platform because we believe career journeys should be exciting, not scary.
          We are just getting started, and we would love for you to be part of it.
          <span style={styles.quoteMark}>"</span>
        </p>
        <p style={styles.signatureText}>
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
    padding: "20px",
    background: "radial-gradient(circle at 20% 20%, rgba(17, 129, 200, 0.35), rgba(4, 16, 44, 0.82))",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    animation: "fadeIn 0.35s ease-out",
  },
  modalContent: {
    position: "relative",
    width: "100%",
    maxWidth: "720px",
    padding: "36px 30px 28px",
    borderRadius: "20px",
    textAlign: "center",
    color: "#f8fbff",
    background: "linear-gradient(150deg, rgba(255, 255, 255, 0.2) 0%, rgba(180, 217, 255, 0.12) 45%, rgba(17, 46, 92, 0.28) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.32)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.26)",
    backdropFilter: "blur(18px) saturate(155%)",
    WebkitBackdropFilter: "blur(18px) saturate(155%)",
    animation: "zoomIn 0.35s ease-out",
  },
  sparkleBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    marginBottom: "16px",
    padding: "7px 14px",
    borderRadius: "9999px",
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    color: "#dff4ff",
    background: "rgba(17, 129, 200, 0.34)",
    border: "1px solid rgba(208, 238, 255, 0.35)",
  },
  founderNoteTitle: {
    margin: "0 0 16px",
    fontSize: "clamp(26px, 4vw, 42px)",
    fontWeight: 800,
    color: "#ffffff",
    letterSpacing: "0.01em",
    lineHeight: 1.15,
  },
  founderNoteText: {
    margin: "0 auto",
    maxWidth: "62ch",
    fontSize: "clamp(16px, 2.2vw, 21px)",
    color: "#eaf5ff",
    lineHeight: 1.72,
    fontStyle: "italic",
    fontWeight: 500,
  },
  quoteMark: {
    color: "#9ed8ff",
    fontSize: "1.25em",
    fontWeight: 700,
    margin: "0 2px",
  },
  signatureText: {
    margin: "18px 0 0",
    fontSize: "15px",
    color: "#d2ebff",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontWeight: 700,
  },
  closeButton: {
    marginTop: "24px",
    padding: "12px 26px",
    background: "linear-gradient(135deg, #1181c8 0%, #004aad 100%)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "9999px",
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    boxShadow: "0 8px 20px rgba(0, 74, 173, 0.45)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  iconCloseButton: {
    position: "absolute",
    top: "14px",
    right: "14px",
    width: "34px",
    height: "34px",
    borderRadius: "9999px",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    background: "rgba(255, 255, 255, 0.14)",
    color: "#f2f9ff",
    fontSize: "18px",
    lineHeight: 1,
    cursor: "pointer",
  },
};

export default FounderNoteModal;
