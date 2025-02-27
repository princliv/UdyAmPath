import { useLocation } from "react-router-dom";

const CourseDetails = () => {
  const location = useLocation();
  const course = location.state?.course;

  if (!course) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
        No course data available.
      </p>
    );
  }

  return (
    <div style={styles.container}>
      {/* Course Info Box */}
      <div style={styles.courseBox}>
        <img src={course.image} alt={course.title} style={styles.image} />
        <div style={styles.details}>
          <div style={styles.header}>
            <img src={course.logo} alt={course.title} style={styles.logo} />
            <h1 style={styles.title}>{course.title}</h1>
          </div>
          
          {/* Additional Info Section */}
          <div style={styles.additionalInfo}>
            <div style={styles.infoItem}><strong>Start Date:</strong> {course.date}</div>
            <div style={styles.infoItem}><strong>Type:</strong> {course.type}</div>
            <div style={styles.infoItem}><strong>Level:</strong> {course.level}</div>
            <div style={styles.infoItem}><strong>Duration:</strong> {course.duration}</div>
          </div>
          
          <div style={styles.info}>
            <p style={styles.infoText}>{course.duration} • {course.exercises} coding exercises • {course.projects} projects</p>
            <p style={styles.description}>{course.description}</p>
          </div>
        </div>
      </div>

      {/* Skills Gained Section */}
      <div style={styles.skillsBox}>
        <h3 style={styles.skillsTitle}>Skills you will gain</h3>
        <div style={styles.skillsContainer}>
          {course.skillsGained?.map((skill, index) => (
            <span key={index} style={styles.skill}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Pathway Section */}
      <div style={styles.pathwayBox}>
        <h3>Course Pathway</h3>
        <ul style={styles.pathwayList}>
          {course.pathway?.map((step, index) => (
            <li key={index} style={styles.step}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f2f2f2",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  courseBox: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  image: {
    width: "250px",
    height: "180px",
    borderRadius: "10px",
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
    marginBottom: "10px",
  },
  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  title: {
    margin: "0",
    fontSize: "28px",
    color: "#333",
  },
  additionalInfo: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  infoItem: {
    fontSize: "14px",
    color: "#555",
    backgroundColor: "#e3f2fd",
    padding: "8px 12px",
    borderRadius: "6px",
  },
  info: {
    marginTop: "10px",
    color: "#555",
  },
  infoText: {
    fontSize: "16px",
    fontWeight: "500",
  },
  description: {
    fontSize: "14px",
    marginTop: "10px",
  },
  skillsBox: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
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
    backgroundColor: "#BBDEFB",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    color: "#1A237E",
  },
  pathwayBox: {
    backgroundColor: "#E3F2FD",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  pathwayList: {
    padding: "0",
    margin: "0",
  },
  step: {
    backgroundColor: "#BBDEFB",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "8px",
    listStyle: "none",
    fontSize: "14px",
  },
};

export default CourseDetails;
