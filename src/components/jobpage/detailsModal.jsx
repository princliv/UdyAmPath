import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "../../firebase/firebase"; // Use correct named exports

const JobDetailsPage = ({ job, onClose }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("jobFormData");
    return saved ? JSON.parse(saved) : {
      firstName: "", lastName: "", email: "", phone: "",
      linkedin: "", github: "", resume: null, captchaInput: ""
    };
  });
  const [resumeName, setResumeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [captcha, setCaptcha] = useState({ q: "", answer: "" });

  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptcha({ q: `${num1} + ${num2}`, answer: (num1 + num2).toString() });
  }, []);

  useEffect(() => {
    localStorage.setItem("jobFormData", JSON.stringify(formData));
  }, [formData]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      const file = files[0];
      setResumeName(file?.name || "");
      setFormData(prev => ({ ...prev, resume: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.resume)
      return "All required fields must be filled.";
    if (!emailRegex.test(formData.email)) return "Invalid email format.";
    if (!phoneRegex.test(formData.phone)) return "Invalid phone number.";
    if (formData.captchaInput !== captcha.answer) return "CAPTCHA answer is incorrect.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return showToast(error, "error");

    setLoading(true);
    try {
      const fileRef = storageRef(storage, `resumes/${formData.resume.name}`);
      await uploadBytes(fileRef, formData.resume);
      const resumeURL = await getDownloadURL(fileRef);

      await push(ref(database, `applications/${job.id}`), {
        ...formData,
        resume: resumeURL,
        status: "Pending",
        timestamp: new Date().toISOString(),
      });

      localStorage.removeItem("jobFormData");
      setFormData({
        firstName: "", lastName: "", email: "", phone: "",
        linkedin: "", github: "", resume: null, captchaInput: ""
      });
      setResumeName("");
      showToast("Application submitted successfully!");
    } catch (err) {
      showToast("Submission failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!job) return null;

  return (
    <div role="dialog" aria-modal="true" tabIndex={-1} ref={formRef}
      style={{
        position: "fixed", top: "5%", left: "50%", transform: "translateX(-50%)",
        zIndex: 9999, background: "#fff", borderRadius: "12px", padding: "30px",
        width: "80%", maxWidth: "1000px", boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
      }}>
      <button onClick={onClose} aria-label="Close" style={{
        position: "absolute", top: 10, right: 10, background: "none",
        border: "none", fontSize: "20px", cursor: "pointer"
      }}>×</button>

      <div style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: 2 }}>
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
                background: "#e0e0e0", padding: "6px 10px", borderRadius: "20px",
                fontSize: "13px"
              }}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Right Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }} aria-label="Job Application Form">
          <h3 style={{ marginBottom: "10px" }}>Apply for this Job</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <input name="firstName" required aria-label="First Name" value={formData.firstName} onChange={handleChange} placeholder="First Name" style={inputStyle} />
            <input name="lastName" required aria-label="Last Name" value={formData.lastName} onChange={handleChange} placeholder="Last Name" style={inputStyle} />
          </div>
          <input name="email" type="email" required aria-label="Email" value={formData.email} onChange={handleChange} placeholder="Email ID" style={inputStyle} />
          <input name="phone" type="tel" required aria-label="Phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" style={inputStyle} />
          <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn Profile" style={inputStyle} />
          <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub Profile" style={inputStyle} />

          <label>Upload Resume (PDF/DOC)</label>
          <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required />
          {resumeName && <span style={{ fontSize: "13px", color: "#333" }}>Selected: {resumeName}</span>}

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
    </div>
  );
};

const inputStyle = {
  padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", width: "100%"
};

const submitButtonStyle = {
  backgroundColor: "#3f92c3", color: "#fff", border: "none",
  padding: "12px", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer"
};

export default JobDetailsPage;
