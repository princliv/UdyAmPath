import { useState } from "react";
import { useLocation } from "react-router-dom";

const CourseDetails = () => {
  const location = useLocation();
  const course = location.state?.course;

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!course) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
        No course data available.
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.courseBox}>
        <img src={course.image} alt={course.title} style={styles.image} />
        <div style={styles.details}>
          <div style={styles.header}>
            <img src={course.logo} alt={course.title} style={styles.logo} />
            <h1 style={styles.title}>{course.title}</h1>
          </div>
          <div style={styles.additionalInfo}>
            <div style={styles.infoItem}><strong>Start Date:</strong> {course.date}</div>
            <div style={styles.infoItem}><strong>Type:</strong> {course.type}</div>
            <div style={styles.infoItem}><strong>Level:</strong> {course.level}</div>
            <div style={styles.infoItem}><strong>Duration:</strong> {course.duration}</div>
          </div>
          <div style={styles.info}>
            <p style={styles.infoText}>{course.exercises} coding exercises • {course.projects} projects</p>
            <p style={styles.description}>{course.description}</p>
          </div>
        </div>
      </div>

      <div style={styles.skillsBox}>
        <h3 style={styles.skillsTitle}>Skills you will gain</h3>
        <div style={styles.skillsContainer}>
          {course.skillsGained?.map((skill, index) => (
            <span key={index} style={styles.skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div style={styles.pathwayBox}>
        <h3 style={styles.pathwayTitle}>Course Pathway</h3>
        {course.pathway?.map((step, index) => (
          <div key={index} style={styles.pathwayItem}>
            <div
              style={styles.pathwayHeader}
              onClick={() => toggleExpand(index)}
            >
              <span>{step.title}</span>
              <span style={styles.expandIcon}>
                {expandedIndex === index ? "➖" : "➕"}
              </span>
            </div>
            {expandedIndex === index && (
              <div style={styles.pathwayDetails}>{step.details}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "85%",
    maxWidth: "1100px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  courseBox: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  image: {
    width: "220px",
    height: "160px",
    borderRadius: "8px",
    marginRight: "20px",
    objectFit: "cover",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },
  logo: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    marginRight: "12px",
  },
  title: {
    margin: "0",
    fontSize: "26px",
    color: "#2c3e50",
  },
  additionalInfo: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    backgroundColor: "#ecf0f1",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  infoItem: {
    fontSize: "14px",
    color: "#34495e",
    backgroundColor: "#d6eaf8",
    padding: "8px 10px",
    borderRadius: "6px",
  },
  info: {
    marginTop: "12px",
    color: "#34495e",
  },
  infoText: {
    fontSize: "16px",
    fontWeight: "500",
  },
  description: {
    fontSize: "14px",
    marginTop: "12px",
  },
  skillsBox: {
    backgroundColor: "#f8f9fa",
    padding: "18px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  skillsTitle: {
    marginBottom: "10px",
    fontSize: "22px",
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  skill: {
    backgroundColor: "#85c1e9",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    color: "#1A237E",
  },
  pathwayBox: {
    backgroundColor: "#d6eaf8",
    padding: "18px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  pathwayTitle: {
    fontSize: "22px",
    marginBottom: "10px",
  },
  pathwayItem: {
    backgroundColor: "#ffffff",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  pathwayHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  expandIcon: {
    fontSize: "18px",
  },
  pathwayDetails: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
    backgroundColor: "#f1f8ff",
    padding: "10px",
    borderRadius: "6px",
  },
};

export default CourseDetails;
