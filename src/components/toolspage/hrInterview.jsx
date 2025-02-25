import React, { useState, useEffect } from "react";

const HrInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [userExperiences, setUserExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState("");

  // Fetch data from hrdata.json
  useEffect(() => {
    fetch("/hrdata.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.hr_questions || []);
        setUserExperiences(JSON.parse(localStorage.getItem("userExperiences")) || []);
      })
      .catch((error) => console.error("Error loading HR data:", error));
  }, []);

  // Handle form submission
  const handleAddExperience = () => {
    if (newExperience.trim() === "") return;

    const updatedExperiences = [...userExperiences, newExperience];
    setUserExperiences(updatedExperiences);
    localStorage.setItem("userExperiences", JSON.stringify(updatedExperiences));
    setNewExperience("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>HR Interview Questions</h2>

      {/* Display HR Questions */}
      <div style={styles.questionContainer}>
        {questions.map((q, index) => (
          <div key={index} style={styles.questionBox}>
            <h3 style={styles.question}>Q{index + 1}: {q.question}</h3>
            <p style={styles.answer}>{q.answer}</p>
          </div>
        ))}
      </div>

      {/* User Experience Section */}
      <h2 style={styles.heading}>Add Your Experience</h2>
      <textarea
        value={newExperience}
        onChange={(e) => setNewExperience(e.target.value)}
        placeholder="Share your HR interview experience..."
        style={styles.textarea}
      />
      <button onClick={handleAddExperience} style={styles.button}>Submit</button>

      {/* Display User Experiences */}
      {userExperiences.length > 0 && (
        <div>
          <h2 style={styles.heading}>User Experiences</h2>
          <ul>
            {userExperiences.map((exp, index) => (
              <li key={index} style={styles.experienceItem}>{exp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  questionContainer: {
    textAlign: "left",
  },
  questionBox: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  question: {
    color: "#007BFF",
  },
  answer: {
    color: "#555",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "80px",
    marginBottom: "10px",
  },
  button: {
    background: "#007BFF",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  experienceItem: {
    background: "#e0f7fa",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
  },
};

export default HrInterview;
