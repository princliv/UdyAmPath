import React from "react";
import { Link } from "react-router-dom";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import NewFeature from "../components/homepage/newFeature";

const Homepage = () => {
  return (
    <div style={styles.container}>
      {/* Content Wrapper */}
      <div style={styles.contentWrapper}>
        {/* Left Section */}
        <div style={styles.leftSection}>
          <p style={styles.description}>
            A complete solution for learning, time management, mental wellness, and career growth.
          </p>
          <div style={styles.buttonContainer}>
            <button style={styles.seeMoreBtn}>See More</button>
            <button style={styles.exploreBtn}>Explore</button>
          </div>
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          <Link to="/jobpage" style={{ ...styles.box, backgroundColor: "#9be6c1" }}>
            <div style={styles.textContainer}>
              <h3 style={styles.heading}>Jobs and Internships</h3>
              <p style={styles.subHeading}>Explore and Achieve</p>
            </div>
            <img src={home1} alt="Jobs and Internships" style={styles.image} />
          </Link>

          <Link to="/coursepage" style={{ ...styles.box, backgroundColor: "#c8bbff" }}>
            <div style={styles.textContainer}>
              <h3 style={styles.heading}>Courses</h3>
              <p style={styles.subHeading}>Refine Your Knowledge</p>
            </div>
            <img src={home2} alt="Courses" style={styles.image} />
          </Link>

          <Link to="/toolspage" style={{ ...styles.box, backgroundColor: "#fbc5ff" }}>
            <div style={styles.textContainer}>
              <h3 style={styles.heading}>Productivity Tools</h3>
              <p style={styles.subHeading}>Enjoy and Explore</p>
            </div>
            <img src={home3} alt="Productivity Tools" style={styles.image} />
          </Link>
        </div>
      </div>

      {/* NewFeature Section BELOW */}
      <NewFeature />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Ensures content stacks vertically
    alignItems: "center",
    padding: "40px",
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%", 
  },
  leftSection: {
    flex: 1,
  },
  description: {
    fontSize: "22px",
    fontWeight: 100,
    lineHeight: "1.5",
    maxWidth: "500px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  seeMoreBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "2px solid black",
    background: "white",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "10px",
  },
  exploreBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#1181c8",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "black",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: "14px",
    marginTop: "5px",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
  },
};

export default Homepage;
