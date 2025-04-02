import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ModulePage = () => {
  const location = useLocation();
  const moduleData = location.state?.module;
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  if (!moduleData || !moduleData.pathway) {
    return <p style={styles.errorText}>No module data available.</p>;
  }

  const handleModuleClick = (index) => {
    setSelectedModuleIndex(index);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Modules</h2>
        {moduleData.pathway.map((step, index) => (
          <div
            key={index}
            style={{
              ...styles.moduleItem,
              backgroundColor: selectedModuleIndex === index ? "#c7b3ff" : "#ece6ff",
              boxShadow: selectedModuleIndex === index ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
            }}
            onClick={() => handleModuleClick(index)}
          >
            {step.title}
          </div>
        ))}
      </div>
      <div style={styles.content}>
        <h2 style={styles.moduleTitle}>{moduleData.pathway[selectedModuleIndex].title}</h2>
        <p style={styles.moduleDetails}>{moduleData.pathway[selectedModuleIndex].details}</p>
        <div style={styles.moduleContent}>
          {renderModuleContent(moduleData.pathway[selectedModuleIndex].data)}
        </div>
      </div>
    </div>
  );
};

const renderModuleContent = (data) => {
  switch (data.type) {
    case "text":
      return <p style={styles.textContent}>{data.content}</p>;
    case "video":
      return <video controls style={styles.media} src={data.content} />;
    case "pdf":
      return <iframe style={styles.media} src={data.content} title="PDF Document" />;
    case "image":
      return <img style={styles.media} src={data.content} alt="Module Content" />;
    default:
      return <p style={styles.errorText}>Unsupported content type.</p>;
  }
};

const styles = {
  container: {
    display: "flex",
    padding: "20px",
    gap: "20px",
    backgroundColor: "#faf9ff",
    minHeight: "100vh",
  },
  sidebar: {
    width: "270px",
    background: "#f4f4f4",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  sidebarTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    textAlign: "center",
  },
  moduleItem: {
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "8px",
    textAlign: "center",
    transition: "background 0.3s, box-shadow 0.3s",
  },
  content: {
    flex: 1,
    background: "#ffffff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  moduleTitle: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#5a3ec8",
  },
  moduleDetails: {
    fontSize: "30px",
    marginBottom: "20px",
    lineHeight: "1.5",
    color: "#555",
  },
  moduleContent: {
    marginTop: "20px",
  },
  media: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  textContent: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333",
  },
  errorText: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
};

export default ModulePage;
