import React from "react";
import { Link, useNavigate } from "react-router-dom";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import NewFeature from "../components/homepage/newFeature";
import Popular from "../components/homepage/popular";
import HomeTool from "../components/homepage/hometool";
import Event from "../components/homepage/event";
import { useMediaQuery } from "react-responsive";
import FaqPage from "../components/homepage/FaqPage";

const Homepage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
            <button 
              style={styles.exploreBtn} 
              onClick={() => navigate("/recruiter")}
            >
              Hire Talent
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          {/** Jobs Box */}
          <Link to="/jobpage" style={{ ...styles.box, backgroundColor: "#9be6c1" }} className="box">
            <div style={styles.textContainer}>
              <h3 style={styles.heading}>Jobs and Internships</h3>
              <p style={styles.subHeading}>Explore and Achieve</p>
            </div>
            <img src={home1} alt="Jobs and Internships" style={styles.image(isMobile)} />
          </Link>

          {/** Courses Box */}
          <Link to="/coursepage" style={{ ...styles.box, backgroundColor: "#c8bbff" }} className="box">
            <div style={styles.textContainer}>
              <h3 style={styles.heading}>Courses</h3>
              <p style={styles.subHeading}>Refine Your Knowledge</p>
            </div>
            <img src={home2} alt="Courses" style={styles.image(isMobile)} />
          </Link>

          {/** Productivity Tools Box */}
          <Link to="/toolspage" style={{ ...styles.box, backgroundColor: "#fbc5ff" }} className="box">
            <div style={styles.textContainer}>
              <h3 style={styles.heading}>Productivity Tools</h3>
              <p style={styles.subHeading}>Enjoy and Explore</p>
            </div>
            <img src={home3} alt="Productivity Tools" style={styles.image(isMobile)} />
          </Link>
        </div>
      </div>

      {/* Additional Sections */}
      <NewFeature />
      <Popular />
      <HomeTool />
      <Event />
      <FaqPage />

      {/* Adding Hover Animation using CSS */}
      <style>
        {`
          .box {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .box:hover {
            transform: translateY(-10px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
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
    fontSize: "25px",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: "14px",
    marginTop: "5px",
  },
  image: (isMobile) => ({
    width: isMobile ? "90px" : "230px",
    height: isMobile ? "90px" : "120px",
    objectFit: "cover",
  }),
};

export default Homepage;
