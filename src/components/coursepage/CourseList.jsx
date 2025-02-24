import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "React for Beginners",
    instructor: "Udemy", // Changed from 'company' to 'instructor' to match CourseDetails.jsx
    duration: "4 weeks",
    level: "Beginner",
    category: "Web Development",
    description: "This course covers React fundamentals, JSX, state management, and hooks.",
    image: "https://via.placeholder.com/250",
    pathway: [
      "Introduction to React - Learn about React basics and setup.",
      "JSX and Components - Understand JSX and how to build components.",
      "State & Props - Learn how state and props work in React."
    ]
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    instructor: "Coursera",
    duration: "6 weeks",
    level: "Intermediate",
    category: "Web Development",
    description: "A comprehensive guide to frontend, backend, and deployment.",
    image: "https://via.placeholder.com/250",
    pathway: [
      "Frontend Basics - Learn HTML, CSS, and JavaScript.",
      "Backend Development - Understand Node.js, Express, and databases.",
      "Deploying Applications - Learn about cloud deployment and hosting."
    ]
  }
];

const CourseList = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Available Courses</h1>
      <div style={styles.grid}>
        {courses.map((course) => (
          <div key={course.id} style={styles.courseCard}>
            <img src={course.image} alt={course.title} style={styles.image} />
            <h3>{course.title}</h3>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <Link 
              to={`/course/${course.id}`} 
              state={{ course }} 
              style={styles.viewButton}
            >
              View Details
            </Link>
          </div>
        ))}
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
    textAlign: "center"
  },
  heading: {
    color: "#1A237E",
    marginBottom: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  courseCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: "160px",
    borderRadius: "8px",
    objectFit: "cover",
    marginBottom: "10px"
  },
  viewButton: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#1A237E",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold"
  }
};

export default CourseList;
