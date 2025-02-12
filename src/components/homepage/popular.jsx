import React from "react";
import { Link } from "react-router-dom";
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
    width: "100%",
    flexWrap: "wrap",
  },
  headingContainer: {
    flex: 1,
    minWidth: "280px",
    textAlign: "left",
    marginBottom: "20px",
  },
  heading: {
    fontWeight: 900,
    fontSize: "3rem",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  arrowIcon: {
    width: "80px",
    marginLeft: "5px",
  },
  subHeading: {
    fontWeight: 400,
    fontSize: "1rem",
    maxWidth: "300px",
  },
  courseContainer: {
    display: "flex",
    gap: "20px",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  courseBox: {
    padding: "20px",
    borderRadius: "20px",
    width: "300px",
    height: "300px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "transform 0.3s ease",
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
    fontSize: "1.2rem",
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
    width: "100%",
    maxWidth: "300px",
    height: "300px",
  },
  courseImage: {
    width: "100%",
    height: "100%",
    borderRadius: "34px",
    objectFit: "cover",
  },

  // Responsive Styles
  "@media (max-width: 1024px)": {
    container: {
      flexWrap: "wrap",
      justifyContent: "center",
    },
    heading: {
      fontSize: "2rem",
      textAlign: "center",
    },
    subHeading: {
      textAlign: "center",
      margin: "auto",
    },
    courseContainer: {
      justifyContent: "center",
    },
  },
  "@media (max-width: 768px)": {
    container: {
      flexDirection: "column",
      textAlign: "center",
      padding: "20px",
    },
    heading: {
      fontSize: "1.8rem",
    },
    subHeading: {
      fontSize: "0.9rem",
    },
    courseBox: {
      width: "100%",
      height: "auto",
      padding: "15px",
    },
    startLearning: {
      fontSize: "0.9rem",
    },
  },
};

export default Popular;
