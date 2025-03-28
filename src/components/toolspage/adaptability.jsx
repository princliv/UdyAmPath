import React, { useState } from "react";

const Adaptability = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    "How well do you handle unexpected changes?",
    "Are you open to learning new skills quickly?",
    "Do you stay calm under pressure?",
    "How often do you step out of your comfort zone?"
  ];

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getTips = () => {
    let tips = [];
    
    if (Object.values(answers).includes("Rarely")) {
      tips.push("Try embracing small changes in daily life to build adaptability.");
    }
    if (Object.values(answers).includes("Sometimes")) {
      tips.push("Work on strengthening resilience by challenging yourself more frequently.");
    }
    if (Object.values(answers).includes("Often")) {
      tips.push("You’re doing well! Keep improving by staying proactive in learning new skills.");
    }
    if (Object.values(answers).includes("Always")) {
      tips.push("Great job! Stay adaptable by continuing to take on new challenges.");
    }
    
    return tips;
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "40px auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "10px" }}>Improving Adaptability</h2>
      <p style={{ textAlign: "center", color: "#555", fontSize: "14px" }}>
        Adaptability is a key soft skill that helps you adjust to new situations, challenges, and opportunities.
      </p>

      <h3 style={{ color: "#333", marginTop: "20px" }}>Self-Assessment Quiz</h3>
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#444", fontWeight: "bold" }}>{question}</label>
          <select
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" }}
            onChange={(e) => handleChange(index, e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Always">Always</option>
            <option value="Often">Often</option>
            <option value="Sometimes">Sometimes</option>
            <option value="Rarely">Rarely</option>
          </select>
        </div>
      ))}

      {!submitted ? (
        <button
          style={{
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px"
          }}
          onClick={handleSubmit}
        >
          Submit Answers
        </button>
      ) : (
        <div style={{
          backgroundColor: "#e6f7e6",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "15px"
        }}>
          <h3 style={{ color: "#2d6a4f", marginBottom: "10px" }}>Tips to Improve Adaptability</h3>
          <ul style={{ paddingLeft: "20px", color: "#444", fontSize: "14px" }}>
            {getTips().map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Adaptability;
