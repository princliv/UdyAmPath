import React, { useState } from "react";
import { auth, firestore } from "../../firebase/firebase"; // firebase.js
import { collection, doc, addDoc } from "firebase/firestore";

const HackathonModal = ({ onClose, type = "Job" }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    try {
      // Recruiters/{uid}/{type}/autoID
      const subCollectionRef = collection(firestore, `Recruiters/${user.uid}/${type}`);
      await addDoc(subCollectionRef, formData);

      alert("Hackathon saved to Firestore!");
      onClose();
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      alert("Failed to save data: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Hackathon Details</h2>

      <div style={sectionStyle}>
        <label style={labelStyle}>Hackathon Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Hackathon Title"
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
          placeholder="Enter Hackathon Location"
          style={inputStyle}
          onChange={handleChange}
          required
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Description:</label>
        <textarea
          name="description"
          placeholder="Describe the Hackathon"
          style={{ ...inputStyle, height: "80px" }}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button type="submit" style={buttonStyle}>CREATE</button>
      <button
        type="button"
        style={{ ...buttonStyle, background: "gray", marginTop: "10px" }}
        onClick={onClose}
      >
        CLOSE
      </button>
    </form>
  );
};

// Same styles
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

export default HackathonModal;
