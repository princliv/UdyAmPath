import React, { useState } from "react";

const QuizModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    totalQuestions: "",
    date: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Quiz Details</h2>

      <div style={sectionStyle}>
        <label style={labelStyle}>Quiz Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Quiz Title"
          style={inputStyle}
          onChange={handleChange}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Total Questions:</label>
        <input
          type="number"
          name="totalQuestions"
          placeholder="Number of Questions"
          style={inputStyle}
          onChange={handleChange}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Date:</label>
        <input
          type="date"
          name="date"
          style={inputStyle}
          onChange={handleChange}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Time:</label>
        <input
          type="time"
          name="time"
          style={inputStyle}
          onChange={handleChange}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Description:</label>
        <textarea
          name="description"
          placeholder="Describe the Quiz"
          style={{ ...inputStyle, height: "80px" }}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" style={buttonStyle}>
        CREATE
      </button>
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

export default QuizModal;
