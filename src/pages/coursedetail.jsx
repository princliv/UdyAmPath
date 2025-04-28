import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import TestPage from "../components/coursepage/TestPage";

const CourseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!course) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>No course data available.</p>
        <button 
          style={styles.backButton} 
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.courseHeader}>
        <img src={course.image} alt={course.title} style={styles.courseImage} />
        <div style={styles.courseMeta}>
          <div>
            <span style={styles.courseType}>{course.type}</span>
            <h1 style={styles.courseTitle}>{course.title}</h1>
            <div style={styles.courseStats}>
              <span style={styles.statItem}>
                <svg style={styles.statIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                </svg>
                {course.duration}
              </span>
              <span style={styles.statItem}>
                <svg style={styles.statIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M12,9A2,2 0 0,0 10,11A2,2 0 0,0 12,13A2,2 0 0,0 14,11A2,2 0 0,0 12,9Z" />
                </svg>
                {course.level}
              </span>
              <span style={styles.statItem}>
                <svg style={styles.statIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7L16,11.2V18H14V14H10V18H8V11.2L12,7.7Z" />
                </svg>
                Starts {course.date}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.courseContent}>
        <div style={styles.mainContent}>
          <div style={styles.descriptionCard}>
            <h3 style={styles.sectionTitle}>About This Course</h3>
            <p style={styles.courseDescription}>{course.description}</p>
            <div style={styles.activityStats}>
              <span style={styles.activityItem}>
                <svg style={styles.activityIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                {course.exercises} coding exercises
              </span>
              <span style={styles.activityItem}>
                <svg style={styles.activityIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                {course.projects} projects
              </span>
            </div>
            
            {course.pathway?.length > 0 && (
              <button
                onClick={() => navigate("/module", { state: { module: course } })}
                style={styles.primaryButton}
              >
                Start Learning
              </button>
            )}
          </div>

          <div style={styles.skillsCard}>
            <h3 style={styles.sectionTitle}>Skills You'll Gain</h3>
            <div style={styles.skillsContainer}>
              {course.skillsGained?.map((skill, index) => (
                <span key={index} style={styles.skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div style={styles.modulesCard}>
            <h3 style={styles.sectionTitle}>Course Modules</h3>
            {course.pathway?.map((step, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.moduleItem,
                  borderLeft: expandedIndex === index ? "4px solid #7b61ff" : "4px solid transparent"
                }}
              >
                <div 
                  style={styles.moduleHeader} 
                  onClick={() => toggleExpand(index)}
                >
                  <div style={styles.moduleTitleContainer}>
                    <span style={styles.moduleNumber}>{index + 1}</span>
                    <span style={styles.moduleTitleText}>{step.title}</span>
                  </div>
                  <span style={styles.expandIcon}>
                    {expandedIndex === index ? "−" : "+"}
                  </span>
                </div>
                {expandedIndex === index && (
                  <div style={styles.moduleContent}>
                    <div style={styles.moduleDetails}>
                      {step.details.split("\n\nTopics Covered:\n-").map((section, i) => (
                        i === 0 ? <p key={i} style={styles.moduleDescription}>{section}</p> : 
                        <div key={i}>
                          <h4 style={styles.topicsTitle}>Topics Covered:</h4>
                          <ul style={styles.topicsList}>
                            {section.split("\n-").map((point, j) => (
                              <li key={j} style={styles.topicItem}>{point.trim()}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div style={styles.moduleActions}>
                      <button
                        onClick={() => navigate("/module", { state: { module: step } })}
                        style={styles.secondaryButton}
                      >
                        Start Module
                      </button>
                      <button
                        onClick={() => navigate("/test", { state: { courseTitle: course.title } })}
                        style={styles.tertiaryButton}
                      >
                        Take Test
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.aiSupportSection}>
            <h3 style={styles.supportSectionTitle}>Enhanced Learning Support</h3>
            <div style={styles.supportGrid}>
              {aiSupportData.map((item, index) => (
                <div 
                  key={index} 
                  style={{ 
                    ...styles.supportCard,
                    backgroundColor: item.bgColor,
                  }}
                >
                  <div style={styles.supportIcon}>
                    {index === 0 && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="#7b61ff">
                        <path d="M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9L10,17Z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="#7b61ff">
                        <path d="M12,3L2,12H5V20H19V12H22L12,3M12,8A1,1 0 0,1 13,9A1,1 0 0,1 12,10A1,1 0 0,1 11,9A1,1 0 0,1 12,8M7,14C8.66,14 10,15.34 10,17C10,18.66 8.66,20 7,20C5.34,20 4,18.66 4,17C4,15.34 5.34,14 7,14Z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="#7b61ff">
                        <path d="M12,3A9,9 0 0,1 21,12H13A4,4 0 0,0 9,8V3M12,1L2.22,10.11L3,11L4,10.44V21H20V10.44L21,11L21.78,10.11L12,1Z" />
                      </svg>
                    )}
                  </div>
                  <h4 style={styles.supportTitle}>{item.title}</h4>
                  <p style={styles.supportDescription}>{item.description}</p>
                  <div style={styles.tagContainer}>
                    {item.tags.map((tag, idx) => (
                      <span key={idx} style={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const aiSupportData = [
  {
    title: "AI Mentor",
    description: "Get instant explanations and examples from our AI mentor to help you understand complex concepts.",
    bgColor: "#F0F7FF",
    tags: ["24/7 Support", "Concept Clarification", "Personalized Help"],
  },
  {
    title: "Coding Exercises",
    description: "Practice with AI-powered hints and get real-time feedback on your coding solutions.",
    bgColor: "#FFF9E6",
    tags: ["Interactive", "Instant Feedback", "Skill Building"],
  },
  {
    title: "Mock Interviews",
    description: "Prepare for technical interviews with AI-driven simulations and detailed feedback.",
    bgColor: "#F0FFF4",
    tags: ["Tech Interviews", "Performance Analysis", "Confidence Building"],
  },
];

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#2d3748",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
    textAlign: "center",
  },
  errorText: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
  },
  backButton: {
    padding: "12px 24px",
    backgroundColor: "#7b61ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  courseHeader: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    marginBottom: "40px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
  },
  courseMeta: {
    flex: 1,
  },
  courseType: {
    display: "inline-block",
    backgroundColor: "#f0ebff",
    color: "#7b61ff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  courseTitle: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 16px 0",
    lineHeight: "1.3",
  },
  courseStats: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#4a5568",
  },
  statIcon: {
    width: "16px",
    height: "16px",
    color: "#7b61ff",
  },
  courseImage: {
    width: "200px",
    height: "200px",
    borderRadius: "12px",
    objectFit: "cover",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  },
  courseContent: {
    display: "flex",
    gap: "30px",
  },
  mainContent: {
    flex: 2,
  },
  sidebar: {
    flex: 1,
  },
  descriptionCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#2d3748",
  },
  courseDescription: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#4a5568",
    marginBottom: "20px",
  },
  activityStats: {
    display: "flex",
    gap: "20px",
    marginBottom: "24px",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#4a5568",
  },
  activityIcon: {
    width: "16px",
    height: "16px",
    color: "#7b61ff",
  },
  primaryButton: {
    padding: "12px 24px",
    backgroundColor: "#7b61ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    width: "100%",
    marginTop: "16px",
  },
  skillsCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  skill: {
    backgroundColor: "#f0ebff",
    color: "#7b61ff",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
  },
  modulesCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  moduleItem: {
    borderBottom: "1px solid #edf2f7",
    padding: "16px 0",
    transition: "all 0.2s ease",
  },
  moduleHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  moduleTitleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  moduleNumber: {
    width: "28px",
    height: "28px",
    backgroundColor: "#f0ebff",
    color: "#7b61ff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600",
  },
  moduleTitleText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#2d3748",
  },
  expandIcon: {
    fontSize: "20px",
    color: "#718096",
  },
  moduleContent: {
    paddingTop: "16px",
    paddingLeft: "40px",
  },
  moduleDescription: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#4a5568",
    marginBottom: "16px",
  },
  topicsTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "8px",
  },
  topicsList: {
    marginLeft: "20px",
    marginBottom: "16px",
  },
  topicItem: {
    fontSize: "14px",
    color: "#4a5568",
    lineHeight: "1.6",
    marginBottom: "8px",
  },
  moduleActions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
    secondaryButton: {
      padding: "10px 16px",
      backgroundColor: "white",
      color: "#7b61ff",
      border: "1px solid #7b61ff",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      ":hover": {
        backgroundColor: "#7b61ff",
        color: "white",
        borderColor: "#7b61ff"
      }
    },
    tertiaryButton: {
      padding: "10px 16px",
      backgroundColor: "white",
      color: "#48bb78",
      border: "1px solid #48bb78",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      ":hover": {
        backgroundColor: "#48bb78",
        color: "white",
        borderColor: "#48bb78"
      }
    },
  aiSupportSection: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  supportSectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "24px",
    color: "#2d3748",
    textAlign: "center",
  },
  supportGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  supportCard: {
    padding: "24px",
    borderRadius: "12px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
    '&:hover': {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
    }
  },
  supportIcon: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  },
  supportTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#2d3748",
    textAlign: "center",
  },
  supportDescription: {
    fontSize: "14px",
    color: "#4a5568",
    lineHeight: "1.6",
    marginBottom: "16px",
    textAlign: "center",
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
};

export default CourseDetails;