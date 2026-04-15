import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createJobApplication } from "../../firebase/recruiterContent";

const InternApply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {};
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    reason: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  if (!job) {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      await createJobApplication({
        jobId: job.id || null,
        jobTitle: job.title,
        company: job.company,
        recruiterId: job.recruiterId || null,
        roleType: "Internship",
        location: Array.isArray(job.location) ? job.location : [job.location || "Not specified"],
        formData: {
          fullName: formData.fullName,
          email: formData.email,
          reason: formData.reason,
          resume: formData.resume?.name || "",
        },
      });
      setToast({ type: "success", message: "Application submitted successfully!" });
      setFormData({ fullName: "", email: "", reason: "", resume: null });
    } catch (error) {
      console.error("Internship application failed:", error);
      setToast({ type: "error", message: "Failed to submit application. Please login and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#ffffff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      borderRadius: "16px",
      fontFamily: "Segoe UI, sans-serif"
    }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "25px",
        color: "#3F92C3"
      }}>
        Apply for {job.title} at {job.company}
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Full Name</label>
          <input name="fullName" type="text" required placeholder="Your full name" style={inputStyle} value={formData.fullName} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Email Address</label>
          <input name="email" type="email" required placeholder="you@example.com" style={inputStyle} value={formData.email} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Resume (PDF)</label>
          <input name="resume" type="file" accept=".pdf" required style={inputStyle} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Why are you interested in this internship?</label>
          <textarea name="reason" rows="4" required placeholder="Write your reason here..." style={{ ...inputStyle, resize: "vertical" }} value={formData.reason} onChange={handleChange} />
        </div>

        <button type="submit" style={{
          backgroundColor: "#3F92C3",
          color: "#fff",
          padding: "12px 20px",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          width: "100%",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transition: "0.2s ease"
        }}
        disabled={loading}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#196795"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#3F92C3"}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
        {toast && (
          <div style={{
            marginTop: "12px",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: toast.type === "error" ? "#fde8e8" : "#e8f9ee",
            color: toast.type === "error" ? "#b42318" : "#027a48",
            fontSize: "14px",
          }}>
            {toast.message}
          </div>
        )}
      </form>
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  fontFamily: "inherit",
  backgroundColor: "#f9f9f9",
  outline: "none",
  boxSizing: "border-box"
};

export default InternApply;
