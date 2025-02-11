import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal navigation
import homeArrow from "../../assets/homearrow.png";
import homePopular from "../../assets/homepopular.png";

const Popular = () => {
  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.headingContainer}>
        <h2 style={styles.heading}>
          Most Popular <br /> Courses{" "}
          <img src={homeArrow} alt="arrow" style={styles.arrowIcon} />
        </h2>
        <p style={styles.subHeading}>
          Explore top-rated courses loved by learners worldwide. Master skills
          that matter and stay ahead!
        </p>
      </div>

      {/* Right Section - Courses */}
      <div style={styles.courseContainer}>
        {/* UI/UX Course */}
        <div style={{ ...styles.courseBox, ...styles.pinkBox }}>
          <h3 style={styles.courseTitle}>UI/UX Designer</h3>
          <p>Become an expert in UI/UX</p>
          <p>
            <strong>Tools:</strong> Canva, Figma
          </p>
          <Link to="/courses/uiux" style={styles.startLearning}>
            Start Learning
          </Link>
        </div>

        {/* Image */}
        <div style={styles.imageContainer}>
          <img src={homePopular} alt="Popular Course" style={styles.courseImage} />
        </div>

        {/* Full Stack Course */}
        <div style={{ ...styles.courseBox, ...styles.blueBox }}>
          <h3 style={styles.courseTitle}>Full Stack Developer</h3>
          <p>Become a full stack developer</p>
          <p>
            <strong>Modules:</strong> HTML, CSS, JS, React, Node.js
          </p>
          <Link to="/courses/fullstack" style={styles.startLearning}>
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d2e4fc",
    padding: "40px",
  },
  headingContainer: {
    flex: 1,
  },
  heading: {
    fontWeight: 900,
    fontSize: "48px",
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    width: "100px",
    marginLeft: "2px",
  },
  subHeading: {
    fontWeight: 400,
    fontSize: "16px",
    maxWidth: "300px",
  },
  courseContainer: {
    display: "flex",
    gap: "20px",
    flex: 2,
    alignItems: "center", // Ensures all items align properly
  },
  courseBox: {
    padding: "20px",
    borderRadius: "20px",
    width: "250px", // Increased width
    height: "250px", // Ensured same height for all
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  pinkBox: {
    backgroundColor: "#fabec0",
    borderTopRightRadius: "84px",
    borderBottomLeftRadius: "84px",
    borderTopLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  },
  blueBox: {
    backgroundColor: "#5f98f1",
    borderTopRightRadius: "84px",
    borderBottomLeftRadius: "84px",
    borderTopLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  },
  courseTitle: {
    fontSize: "18px",
    fontWeight: 700,
  },
  startLearning: {
    display: "inline-block",
    marginTop: "10px",
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "250px", // Matches box size
    height: "250px", // Matches box size
  },
  courseImage: {
    width: "100%", // Ensures it fills container
    height: "100%", // Ensures it fills container
    borderTopRightRadius: "34px",
    borderBottomLeftRadius: "34px",
    borderTopLeftRadius: "34px",
    borderBottomRightRadius: "34px",
    objectFit: "cover",
  },
};

export default Popular;
