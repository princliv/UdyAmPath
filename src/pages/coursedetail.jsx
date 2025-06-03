import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
        <div style={styles.courseImageContainer}>
          <img src={course.image} alt={course.title} style={styles.courseImage} />
        </div>
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
            <div style={styles.modulesHeader}>
              <h3 style={styles.sectionTitle}>Course Modules</h3>
              <span style={styles.modulesCount}>{course.pathway?.length} modules</span>
            </div>
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
                    <div>
                      <span style={styles.moduleTitleText}>{step.title}</span>
                      {expandedIndex !== index && (
                        <p style={styles.modulePreviewText}>
                          {step.details.split("\n")[0].substring(0, 60)}...
                        </p>
                      )}
                    </div>
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
                  onClick={() => index === 0 && navigate('/ai-mentor')}
                >
                  <div style={styles.supportIcon}>
                    {index === 0 && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="#7b61ff">
                        <path d="M12,3A9,9 0 0,1 21,12A9,9 0 0,1 12,21A9,9 0 0,1 3,12A9,9 0 0,1 12,3M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="#7b61ff">
                        <path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M12,9A2,2 0 0,0 10,11A2,2 0 0,0 12,13A2,2 0 0,0 14,11A2,2 0 0,0 12,9Z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="#7b61ff">
                        <path d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7L16,11.2V18H14V14H10V18H8V11.2L12,7.7Z" />
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
    fontWeight: "600",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 6px rgba(123, 97, 255, 0.25)",
    ":hover": {
      backgroundColor: "#6a50e8",
      transform: "translateY(-1px)",
      boxShadow: "0 6px 8px rgba(123, 97, 255, 0.3)"
    }
  },
  courseHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "40px",
    marginBottom: "40px",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
  },
  courseImageContainer: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    flexShrink: 0,
  },
  courseImage: {
    width: "240px",
    height: "240px",
    objectFit: "cover",
    display: "block",
  },
  courseMeta: {
    flex: 1,
  },
  courseType: {
    display: "inline-block",
    backgroundColor: "#f0ebff",
    color: "#7b61ff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  courseTitle: {
    fontSize: "36px",
    fontWeight: "800",
    margin: "0 0 16px 0",
    lineHeight: "1.2",
    color: "#1a202c",
  },
  courseStats: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
    marginTop: "24px",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "15px",
    color: "#4a5568",
    fontWeight: "500",
  },
  statIcon: {
    width: "18px",
    height: "18px",
    color: "#7b61ff",
  },
  courseContent: {
    display: "flex",
    gap: "30px",
    marginTop: "20px",
  },
  mainContent: {
    flex: 2,
  },
  sidebar: {
    flex: 1,
  },
  descriptionCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
    marginBottom: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#1a202c",
    position: "relative",
    paddingBottom: "8px",
    ":after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "50px",
      height: "3px",
      backgroundColor: "#7b61ff",
      borderRadius: "3px",
    }
  },
  courseDescription: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#4a5568",
    marginBottom: "24px",
  },
  activityStats: {
    display: "flex",
    gap: "24px",
    marginBottom: "24px",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "15px",
    color: "#4a5568",
    fontWeight: "500",
  },
  activityIcon: {
    width: "18px",
    height: "18px",
    color: "#7b61ff",
  },
  primaryButton: {
    padding: "14px 24px",
    backgroundColor: "#7b61ff",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    width: "100%",
    marginTop: "16px",
    boxShadow: "0 4px 6px rgba(123, 97, 255, 0.25)",
    ":hover": {
      backgroundColor: "#6a50e8",
      transform: "translateY(-1px)",
      boxShadow: "0 6px 8px rgba(123, 97, 255, 0.3)"
    }
  },
  skillsCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
    marginBottom: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  skill: {
    backgroundColor: "#f0ebff",
    color: "#7b61ff",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#e0d6ff",
      transform: "translateY(-1px)"
    }
  },
  modulesCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  modulesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  modulesCount: {
    fontSize: "14px",
    color: "#718096",
    fontWeight: "500",
    backgroundColor: "#f8f9fa",
    padding: "6px 12px",
    borderRadius: "20px",
  },
  moduleItem: {
    borderBottom: "1px solid #edf2f7",
    padding: "20px 0",
    transition: "all 0.2s ease",
  },
  moduleHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "8px 0",
  },
  moduleTitleContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  moduleNumber: {
    width: "32px",
    height: "32px",
    backgroundColor: "#f0ebff",
    color: "#7b61ff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    flexShrink: 0,
    marginTop: "2px",
  },
  moduleTitleText: {
    fontSize: "17px",
    fontWeight: "600",
    color: "#2d3748",
  },
  modulePreviewText: {
    fontSize: "14px",
    color: "#718096",
    marginTop: "6px",
    lineHeight: "1.5",
  },
  expandIcon: {
    fontSize: "20px",
    color: "#718096",
    fontWeight: "bold",
  },
  moduleContent: {
    paddingTop: "16px",
    paddingLeft: "48px",
  },
  moduleDescription: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#4a5568",
    marginBottom: "16px",
  },
  topicsTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "12px",
  },
  topicsList: {
    marginLeft: "20px",
    marginBottom: "20px",
  },
  topicItem: {
    fontSize: "14px",
    color: "#4a5568",
    lineHeight: "1.7",
    marginBottom: "8px",
    position: "relative",
    paddingLeft: "16px",
    ":before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "8px",
      width: "6px",
      height: "6px",
      backgroundColor: "#7b61ff",
      borderRadius: "50%",
    }
  },
  moduleActions: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
  },
  secondaryButton: {
    padding: "12px 20px",
    backgroundColor: "white",
    color: "#7b61ff",
    border: "1px solid #7b61ff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    ":hover": {
      backgroundColor: "#f0ebff",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 6px rgba(123, 97, 255, 0.1)"
    }
  },
  tertiaryButton: {
    padding: "12px 20px",
    backgroundColor: "white",
    color: "#48bb78",
    border: "1px solid #48bb78",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    ":hover": {
      backgroundColor: "#f0fff4",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 6px rgba(72, 187, 120, 0.1)"
    }
  },
  aiSupportSection: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    position: "sticky",
    top: "20px",
  },
  supportSectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#1a202c",
    textAlign: "center",
    position: "relative",
    paddingBottom: "12px",
    ":after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "60px",
      height: "3px",
      backgroundColor: "#7b61ff",
      borderRadius: "3px",
    }
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
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    }
  },
  supportIcon: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  supportTitle: {
    fontSize: "18px",
    fontWeight: "700",
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
    fontWeight: "600",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    color: "#4a5568",
  },
};

export default CourseDetails;