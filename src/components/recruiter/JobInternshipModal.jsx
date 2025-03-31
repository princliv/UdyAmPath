import React, { useState } from "react";

const JobInternshipModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    type: "",
    position: "",
    mode: "",
    qualification: "",
    experience: "",
    skills: [],
    rounds: "",
    applyBefore: "",
    description: "",
  });

  const skillOptions = ["JavaScript", "Python", "React", "Node.js", "Java", "C++", "Other"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSkillSelect = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, selectedSkill] });
    }
  };

  const removeSkill = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Job / Internship Details</h2>
      
      <div style={sectionStyle}>
        <label style={labelStyle}>Type:</label>
        <div>
          <input type="radio" name="type" value="Technical" onChange={handleChange} /> Technical
          <input type="radio" name="type" value="Non-Technical" onChange={handleChange} style={{ marginLeft: "10px" }} /> Non-Technical
        </div>
      </div>
      
      <div style={sectionStyle}>
        <label style={labelStyle}>Position:</label>
        <input type="text" name="position" placeholder="Enter Position Hiring For" style={inputStyle} onChange={handleChange} />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Mode:</label>
        <div>
          <input type="radio" name="mode" value="In Office" onChange={handleChange} /> In Office
          <input type="radio" name="mode" value="Work From Home" onChange={handleChange} style={{ marginLeft: "10px" }} /> Work From Home
          <input type="radio" name="mode" value="Hybrid" onChange={handleChange} style={{ marginLeft: "10px" }} /> Hybrid
        </div>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Min. Qualification:</label>
        <select name="qualification" onChange={handleChange} style={inputStyle}>
          <option value="">Select Minimum Qualification Requirement</option>
          <option value="High School">High School</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
          <option value="Doctorate">Doctorate</option>
        </select>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Experience:</label>
        <input type="text" name="experience" placeholder="Experience Requirement" style={inputStyle} onChange={handleChange} />
      </div>
      
      <div style={sectionStyle}>
        <label style={labelStyle}>Required Skills:</label>
        <select onChange={handleSkillSelect} style={inputStyle}>
          <option value="">Select Primary Required Skills</option>
          {skillOptions.map((skill, index) => (
            <option key={index} value={skill}>{skill}</option>
          ))}
        </select>

        <div style={skillsContainer}>
          {formData.skills.map((skill, index) => (
            <span key={index} style={skillBadge}>
              {skill} <button type="button" style={removeButton} onClick={() => removeSkill(skill)}>X</button>
            </span>
          ))}
        </div>
      </div>
      
      <div style={sectionStyle}>
        <label style={labelStyle}>Total Rounds:</label>
        <input type="number" name="rounds" placeholder="Number of Rounds Conducted" style={inputStyle} onChange={handleChange} />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Apply Before:</label>
        <input type="date" name="applyBefore" style={inputStyle} onChange={handleChange} />
      </div>
      
      <div style={sectionStyle}>
        <label style={labelStyle}>Description:</label>
        <textarea name="description" placeholder="Describe the Job and Expectation from the Job Seeker" style={{ ...inputStyle, height: "80px" }} onChange={handleChange}></textarea>
      </div>
      
      <button type="submit" style={buttonStyle}>CREATE</button>
      <button type="button" style={{ ...buttonStyle, background: "gray", marginTop: "10px" }} onClick={onClose}>CLOSE</button>
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
const skillsContainer = { marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "5px" };
const skillBadge = {
  background: "#e0e0e0",
  padding: "5px 10px",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};
const removeButton = {
  background: "grey",
  color: "white",
  border: "none",
  padding: "2px 5px",
  borderRadius: "50%",
  cursor: "pointer",
};

export default JobInternshipModal;