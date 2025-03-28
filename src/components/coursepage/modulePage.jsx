import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ModulePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [moduleData, setModuleData] = useState(null);
  const module = location.state?.module;

  useEffect(() => {
    if (module) {
      fetch("/path-to/moduledata.json")
        .then((res) => res.json())
        .then((data) => {
          const foundModule = data.find((m) => m.moduleTitle === module.title);
          setModuleData(foundModule);
        })
        .catch((error) => console.error("Error fetching module data:", error));
    }
  }, [module]);

  if (!moduleData) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
        No module data available.
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.goBackButton}>
        ⬅ Back to Course
      </button>

      <h1 style={styles.moduleTitle}>{moduleData.moduleTitle}</h1>
      <p style={styles.moduleDetails}>{moduleData.moduleDetails}</p>

      {/* Additional Content */}
      <div style={styles.moduleContent}>
        <h3>Learning Materials</h3>
        <ul>
          {moduleData.video && (
            <li>
              <a href={moduleData.video} target="_blank" rel="noopener noreferrer">
                Video Lecture
              </a>
            </li>
          )}
          {moduleData.readings && (
            <li>
              <a href={moduleData.readings} target="_blank" rel="noopener noreferrer">
                Reading Materials
              </a>
            </li>
          )}
          {moduleData.quiz && (
            <li>
              <a href={moduleData.quiz} target="_blank" rel="noopener noreferrer">
                Quiz & Exercises
              </a>
            </li>
          )}
        </ul>
      </div>
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
  goBackButton: {
    background: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  moduleTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  moduleDetails: {
    fontSize: "18px",
    color: "#666",
    marginTop: "10px",
  },
  moduleContent: {
    marginTop: "20px",
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "8px",
  },
};

export default ModulePage;
