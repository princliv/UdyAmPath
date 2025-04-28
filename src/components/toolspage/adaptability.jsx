import React, { useState, useEffect } from "react";

const Adaptability = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("adaptabilityAnswers"));
    if (savedAnswers) {
      setAnswers(savedAnswers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adaptabilityAnswers", JSON.stringify(answers));
    const completedQuestions = Object.values(answers).filter((answer) => answer !== "").length;
    setProgress((completedQuestions / questions.length) * 100);
  }, [answers]);

  const questions = [
    "How well do you handle unexpected changes?",
    "Are you open to learning new skills quickly?",
    "Do you stay calm under pressure?",
    "How often do you step out of your comfort zone?",
  ];

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    localStorage.removeItem("adaptabilityAnswers");
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

  const calculateAdaptabilityScore = () => {
    const scores = Object.values(answers).map((answer) => {
      switch (answer) {
        case "Always":
          return 4;
        case "Often":
          return 3;
        case "Sometimes":
          return 2;
        case "Rarely":
          return 1;
        default:
          return 0;
      }
    });

    const totalScore = scores.reduce((a, b) => a + b, 0);
    const averageScore = totalScore / scores.length;

    return averageScore;
  };

  const adaptabilityScore = calculateAdaptabilityScore();

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "20px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Roboto', sans-serif",
      background: "linear-gradient(135deg, #dfe9f3 10%, white 100%)"
    }}>
      <h2 style={{ textAlign: "center", color: "#3b3b3b", marginBottom: "10px", fontSize: "28px", fontWeight: "bold" }}>
        Improving Adaptability
      </h2>
      <p style={{ textAlign: "center", color: "#555", fontSize: "16px", marginBottom: "20px" }}>
        Adaptability is a key soft skill that helps you adjust to new situations, challenges, and opportunities.
      </p>

      {!submitted ? (
        <>
          <h3 style={{ color: "#3b3b3b", marginTop: "20px", fontSize: "22px", fontWeight: "bold" }}>
            Self-Assessment Quiz
          </h3>
          <div style={{ marginBottom: "20px", fontSize: "14px", color: "#555" }}>
            <div style={{ marginBottom: "5px" }}>
              <strong>Progress: {Math.round(progress)}%</strong>
            </div>
            <div style={{ height: "8px", backgroundColor: "#e0e0e0", borderRadius: "4px" }}>
              <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#007bff", borderRadius: "4px" }}></div>
            </div>
          </div>

          {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", marginBottom: "10px", color: "#444", fontWeight: "bold", fontSize: "16px" }}>
                {question}
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                }}
                value={answers[index] || ""}
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

          <button
            style={{
              width: "100%",
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              marginTop: "20px",
              transition: "background-color 0.3s ease",
            }}
            onClick={handleSubmit}
            disabled={Object.values(answers).includes("")}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Submit Answers
          </button>
        </>
      ) : (
        <div>
          <h3 style={{ color: "#2d6a4f", marginBottom: "20px", fontSize: "24px" }}>
            Adaptability Score: {adaptabilityScore}
          </h3>
          <h4 style={{ color: "#3b3b3b", fontSize: "20px", fontWeight: "bold" }}>
            Tips to Improve Adaptability
          </h4>
          <ul style={{ paddingLeft: "20px", color: "#444", fontSize: "16px", marginBottom: "20px" }}>
            {getTips().map((tip, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>{tip}</li>
            ))}
          </ul>

          <button
            style={{
              width: "100%",
              backgroundColor: "#ff6600",
              color: "white",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              transition: "background-color 0.3s ease",
            }}
            onClick={handleRetake}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e65c00")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff6600")}
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Adaptability;
