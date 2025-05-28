import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const JobDetail = () => {
  const { state } = useLocation();
  const job = state?.job;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    captchaInput: "",
  });

  const [resumeName, setResumeName] = useState("");
  const [coverLetterName, setCoverLetterName] = useState("");
  const [captcha, setCaptcha] = useState({ q: "", a: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setCaptcha({ q: `${a} + ${b}`, a: (a + b).toString() });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") setResumeName(files[0]?.name || "");
    if (name === "coverLetter") setCoverLetterName(files[0]?.name || "");
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.captchaInput !== captcha.a) {
      setToast({ type: "error", message: "CAPTCHA answer is incorrect." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({ type: "success", message: "Application submitted successfully!" });
    }, 1500);
  };

  if (!job) return <p style={{ textAlign: "center", marginTop: "50px" }}>No job data available.</p>;

  return (
    <div style={{
      padding: "30px",
      maxWidth: "1000px",
      margin: "0 auto",
      backgroundColor: "#fff",
      borderTop: "4px solid #3f92c3",
      borderRadius: "20px",
      display: "flex",
      gap: "40px",
      alignItems: "flex-start",
      flexWrap: "wrap"  // Responsive fallback
    }}>
      {/* Job Details - Left Side */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <h2>{job.title}</h2>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location.join(", ")}</p>
        <p><strong>Experience:</strong> {job.experience}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Date Posted:</strong> {job.date}</p>

        <h3>Key Responsibilities</h3>
        <ul>{job.key_responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>

        <h3>Skills Required</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {job.skills_required.map((skill, i) => (
            <span key={i} style={{
              background: "#e0e0e0",
              padding: "6px 10px",
              borderRadius: "20px",
              fontSize: "13px"
            }}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Application Form - Right Side */}
      <form onSubmit={handleSubmit} style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        minWidth: "300px"
      }} aria-label="Job Application Form">
        <h3>Apply for this Job</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="First Name" style={inputStyle} />
          <input name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Last Name" style={inputStyle} />
        </div>
        <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Email ID" style={inputStyle} />
        <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="Phone Number" style={inputStyle} />
        <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn Profile" style={inputStyle} />
        <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub Profile" style={inputStyle} />

        <label>Upload Resume (PDF/DOC)</label>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required />
        {resumeName && <span style={{ fontSize: "13px", color: "#333" }}>Selected: {resumeName}</span>}

        <label>Upload Cover Letter (PDF/DOC)</label>
        <input type="file" name="coverLetter" accept=".pdf,.doc,.docx" onChange={handleChange} />
        {coverLetterName && <span style={{ fontSize: "13px", color: "#333" }}>Selected: {coverLetterName}</span>}

        <label>CAPTCHA: What is {captcha.q}?</label>
        <input name="captchaInput" value={formData.captchaInput} onChange={handleChange} placeholder="Your answer" required style={inputStyle} />

        <button type="submit" disabled={loading} style={submitButtonStyle}>
          {loading ? "Submitting..." : "Apply for the Job"}
        </button>

        {toast && (
          <div style={{
            backgroundColor: toast.type === "error" ? "#f8d7da" : "#d4edda",
            color: toast.type === "error" ? "#721c24" : "#155724",
            padding: "10px", borderRadius: "6px", marginTop: "10px", fontSize: "14px"
          }}>
            {toast.message}
          </div>
        )}
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  width: "100%",
  flex: 1
};

const submitButtonStyle = {
  backgroundColor: "#3f92c3",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer"
};

export default JobDetail;
