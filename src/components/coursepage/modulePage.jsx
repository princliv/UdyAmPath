import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ModulePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const moduleData = location.state?.module;

  const [moduleDetails, setModuleDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!moduleData) {
      // If no module data is passed, navigate back
      navigate(-1);
      return;
    }

    // Fetch module data based on the module title
    fetch(`/moduledata.json`)
      .then((response) => response.json())
      .then((data) => {
        const foundModule = data.find((mod) => mod.title === moduleData.title);
        setModuleDetails(foundModule);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading module data:", error);
        setLoading(false);
      });
  }, [moduleData, navigate]);

  if (loading) {
    return <p>Loading module details...</p>;
  }

  if (!moduleDetails) {
    return <p>No module data available.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{moduleDetails.title}</h1>
      <p style={styles.description}>{moduleDetails.description}</p>
      <h3 style={styles.subTitle}>Topics Covered:</h3>
      <ul style={styles.topicList}>
        {moduleDetails.topics.map((topic, index) => (
          <li key={index} style={styles.topicItem}>{topic}</li>
        ))}
      </ul>
      <button
        onClick={() => navigate(-1)}
        style={styles.backButton}
      >
        Go Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  description: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  subTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  topicList: {
    listStyleType: "disc",
    paddingLeft: "20px",
  },
  topicItem: {
    fontSize: "16px",
    color: "#333",
  },
  backButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ModulePage;