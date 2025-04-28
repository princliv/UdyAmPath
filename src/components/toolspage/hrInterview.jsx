import React, { useState, useEffect } from "react";

// Sample tag categories
const categories = [
  { name: "Fresher", icon: "🧑‍🎓" },
  { name: "Experienced", icon: "👩‍💼" },
  { name: "Technical HR", icon: "💻" },
  { name: "Behavioral", icon: "🧠" },
  { name: "Leadership", icon: "👑" },
];

const HrInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [userExperiences, setUserExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showQuestions, setShowQuestions] = useState(true);  // New state to toggle between Questions and Experiences

  // Fetch data from hrdata.json
  useEffect(() => {
    fetch("/hrdata.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.hr_questions || []);
        setUserExperiences(JSON.parse(localStorage.getItem("userExperiences")) || []);
        setLoading(false);
      })
      .catch((error) => console.error("Error loading HR data:", error));
  }, []);

  // Handle form submission
  const handleAddExperience = () => {
    if (newExperience.trim() === "") return;
    const updatedExperiences = [
      ...userExperiences,
      { experience: newExperience, category: selectedCategory || "General" },
    ];
    setUserExperiences(updatedExperiences);
    localStorage.setItem("userExperiences", JSON.stringify(updatedExperiences));
    setNewExperience("");
  };

  // Filter experiences based on search query
  const filteredExperiences = userExperiences.filter((exp) =>
    exp.experience && exp.experience.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Sticky Header */}
      <header style={styles.header}>
        <h1>HR Interview Questions</h1>
        <nav>
          <button onClick={() => setShowQuestions(true)} style={styles.navButton}>Questions</button> | 
          <button onClick={() => setShowQuestions(false)} style={styles.navButton}>User Experiences</button>
        </nav>
      </header>

      <h2 style={styles.heading}>
        Hello, User! {new Date().getHours() < 12 ? "Good Morning" : "Good Evening"}
      </h2>

      {/* Toggle Search Bar */}
      {showQuestions ? (
        <>
          {/* Search Bar for Questions */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            style={styles.searchBar}
          />
        </>
      ) : (
        <>
          {/* Search Bar for Experiences */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search experiences..."
            style={styles.searchBar}
          />
        </>
      )}

      {/* Display Based on Toggle */}
      {showQuestions ? (
        <div id="questions" style={styles.questionContainer}>
          {loading ? (
            <div>Loading questions...</div>
          ) : (
            questions.map((q, index) => (
              <div key={index} style={styles.questionBox}>
                <h3 style={styles.question}>
                  {index + 1}: {q.question}
                </h3>
                <p style={styles.answer}>{q.answer}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div id="experiences" style={styles.experienceContainer}>
          <h2 style={styles.heading}>Add Your Experience</h2>

          {/* Category Selection */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.selectCategory}
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          {/* Experience Input */}
          <textarea
            value={newExperience}
            onChange={(e) => setNewExperience(e.target.value)}
            placeholder="Share your HR interview experience..."
            style={styles.textarea}
          />
          <button onClick={handleAddExperience} style={styles.button}>
            Submit
          </button>

          {/* Display User Experiences */}
          {filteredExperiences.length > 0 && (
            <div>
              <h2 style={styles.heading}>User Experiences</h2>
              <ul style={styles.experienceList}>
                {filteredExperiences.map((exp, index) => (
                  <li key={index} style={styles.experienceItem}>
                    <strong>Category:</strong> {exp.category}
                    <p>{exp.experience}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Floating Action Button for Adding Experience */}
      {!showQuestions && (
        <button
          onClick={() => window.scrollTo({ top: document.getElementById("experiences").offsetTop, behavior: "smooth" })}
          style={styles.fab}
        >
          ➕
        </button>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    padding: "10px 0",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },
  navButton: {
    background: "none",
    border: "none",
    color: "#007BFF",
    fontSize: "16px",
    cursor: "pointer",
    padding: "5px 10px",
    textDecoration: "underline",
  },
  heading: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    fontSize: "16px",
  },
  questionContainer: {
    textAlign: "left",
    marginBottom: "20px",
  },
  experienceContainer: {
    marginBottom: "20px",
    textAlign: "left",
  },
  questionBox: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  question: {
    color: "#007BFF",
  },
  answer: {
    color: "#555",
  },
  selectCategory: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    width: "100%",
    fontSize: "16px",
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
  experienceList: {
    padding: "0",
    listStyleType: "none",
  },
  experienceItem: {
    background: "#e0f7fa",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
  },
  fab: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "#007BFF",
    color: "white",
    padding: "15px",
    borderRadius: "50%",
    fontSize: "24px",
    border: "none",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
};

export default HrInterview;
