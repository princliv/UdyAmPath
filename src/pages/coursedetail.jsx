import { useLocation } from "react-router-dom";

const CourseDetails = () => {
  const location = useLocation();
  const course = location.state?.course; // Getting course data from navigation state

  if (!course) {
    return <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>No course data available.</p>;
  }

  return (
    <div style={styles.container}>
      {/* Course Info Box */}
      <div style={styles.courseBox}>
        <img src={course.image} alt={course.title} style={styles.image} />
        <div style={styles.details}>
          <h2 style={styles.title}>{course.title}</h2>
          <div style={styles.detailGrid}>
            <div>
              <p><strong>Company:</strong> {course.instructor}</p>
              <p><strong>Category:</strong> {course.category}</p>
            </div>
            <div>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Level:</strong> {course.level}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div style={styles.descriptionBox}>
        <h3>Description</h3>
        <p>{course.description}</p>
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
    width: "80%",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
  },
  courseBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
  },
  image: {
    width: "220px",
    height: "180px",
    borderRadius: "10px",
    marginRight: "20px",
    objectFit: "cover",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  title: {
    margin: "0 0 10px",
    color: "#1A237E",
    fontSize: "22px",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  descriptionBox: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
    border: "1px solid #ddd",
  },
  pathwayBox: {
    backgroundColor: "#E3F2FD",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
    border: "1px solid #ddd",
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
