import React, { useState } from "react";
import { getFirestore, collection, doc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const WorkshopModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    organizer: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const db = getFirestore();
      const workshopsRef = collection(db, "Recruiters", user.uid, "Workshops");

      await addDoc(workshopsRef, formData);

      setSaving(false);
      onClose();
    } catch (err) {
      setSaving(false);
      setError("Failed to save workshop: " + err.message);
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Workshop Details</h2>

      <div style={sectionStyle}>
        <label style={labelStyle}>Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Workshop Title"
          style={inputStyle}
          onChange={handleChange}
          required
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Date:</label>
        <input
          type="date"
          name="date"
          style={inputStyle}
          onChange={handleChange}
          required
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Time:</label>
        <input
          type="time"
          name="time"
          style={inputStyle}
          onChange={handleChange}
          required
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Location:</label>
        <input
          type="text"
          name="location"
          placeholder="Enter Workshop Location"
          style={inputStyle}
          onChange={handleChange}
          required
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Organizer:</label>
        <input
          type="text"
          name="organizer"
          placeholder="Enter Organizer Name"
          style={inputStyle}
          onChange={handleChange}
          required
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Description:</label>
        <textarea
          name="description"
          placeholder="Describe the Workshop"
          style={{ ...inputStyle, height: "80px" }}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" style={buttonStyle} disabled={saving}>
        {saving ? "Saving..." : "CREATE"}
      </button>
      <button
        type="button"
        style={{ ...buttonStyle, background: "gray", marginTop: "10px" }}
        onClick={onClose}
        disabled={saving}
      >
        CLOSE
      </button>
    </form>
  );
};

// Styles
const formStyle = { padding: "10px" };
const sectionStyle = { marginBottom: "15px" };
const labelStyle = { fontWeight: "bold", marginTop: "10px", display: "block" };
const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "5px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
};
const buttonStyle = {
  background: "#0D47A1",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
};

export default WorkshopModal;
