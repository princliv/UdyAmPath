import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ModulePage = () => {
  const location = useLocation();
  const course = location.state?.course || {}; // Get selected course data from navigation state

  const [modules, setModules] = useState([]); // Modules for sidebar
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0); // For selected module
  const [moduleDetails, setModuleDetails] = useState(null); // Details of the selected module
  const [loading, setLoading] = useState(true);

  // Fetch modules for the selected course from moduledata.json
  useEffect(() => {
    if (course.title) {
      console.log("Fetching moduledata.json for:", course.title);
      fetch("/moduledata.json")
        .then((response) => response.json())
        .then((data) => {
          console.log("Moduledata.json response:", data);
          if (data[course.title]) {
            setModules(data[course.title]); // Set modules for the selected course
            setSelectedModuleIndex(0); // Default to the first module
          } else {
            console.error("No modules found for course:", course.title);
            setModules([]); // Ensure modules are empty if not found
          }
        })
        .catch((error) => {
          console.error("Error loading module data:", error);
          setModules([]); // Clear modules in case of error
        });
    }
  }, [course]);

  // Fetch module details based on selected module
  useEffect(() => {
    if (modules.length > 0) {
      console.log("Fetching details for selected module:", modules[selectedModuleIndex].title);
      const selectedModule = modules[selectedModuleIndex];
      setModuleDetails(selectedModule || null); // Set module details
      setLoading(false); // Stop loading when details are fetched
    }
  }, [modules, selectedModuleIndex]);

  const handleNext = () => {
    if (selectedModuleIndex < modules.length - 1) {
      setSelectedModuleIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedModuleIndex > 0) {
      setSelectedModuleIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarHeader}>Modules</h3>
        <ul style={styles.moduleList}>
          {modules.map((module, index) => (
            <li
              key={index}
              style={{
                ...styles.moduleItem,
                backgroundColor: index === selectedModuleIndex ? "#d1c4ff" : "#f4f4f4",
              }}
              onClick={() => setSelectedModuleIndex(index)}
            >
              {module.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Module Content */}
      <div style={styles.content}>
        {loading ? (
          <p>Loading module details...</p>
        ) : moduleDetails ? (
          <>
            <h2>{moduleDetails.title}</h2>
            <p>{moduleDetails.details}</p>
            {moduleDetails.image && (
              <img src={moduleDetails.image} alt={moduleDetails.title} style={styles.image} />
            )}
            <div style={styles.navButtons}>
              <button style={styles.navButton} onClick={handlePrev} disabled={selectedModuleIndex === 0}>
                Previous
              </button>
              <button
                style={styles.navButton}
                onClick={handleNext}
                disabled={selectedModuleIndex === modules.length - 1}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No module details found.</p>
        )}
      </div>
    </div>
  );
};

// Internal CSS
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#e4deff",
    padding: "20px",
    overflowY: "auto",
  },
  sidebarHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  moduleList: {
    listStyleType: "none",
    padding: 0,
  },
  moduleItem: {
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "5px",
    textAlign: "left",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  image: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  navButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  navButton: {
    padding: "10px 15px",
    backgroundColor: "#3f92c3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ModulePage;
