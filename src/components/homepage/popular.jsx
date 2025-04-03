import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import homeArrow from "../../assets/homearrow.png";
import homePopular from "../../assets/homepopular.png"; // Imported image

const Popular = () => {
  return (
    <div style={styles.container}>
      {/* Left Section - Heading */}
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

      {/* Right Section - Scrolling Courses */}
      <div style={styles.courseWrapper}>
      <motion.div
        style={styles.courseContainer}
        initial={{ x: "100%" }} // Start off-screen
        animate={{
          x: ["100%", "100%", "0%", "-100%"], // Add a pause at the start
        }}
        transition={{
          repeat: Infinity, // Keep looping
          duration: 20, // Slower animation
          ease: "linear", // Smooth scrolling
          times: [0, 0.1, 0.5, 1], // Pause briefly before moving
        }}
      >

          {courseData.map((course, index) => (
            <React.Fragment key={index}>
              <div
                style={{
                  ...styles.courseBox,
                  backgroundColor: course.bgColor,
                }}
              >
                <h3 style={styles.courseTitle}>{course.title}</h3>
                <p>{course.description}</p>
                <p>
                  <strong>{course.label}</strong> {course.tools}
                </p>
                <Link to={course.link} style={styles.startLearning}>
                  Start Learning
                </Link>
              </div>

              {/* Add image after every two courses */}
              {(index + 1) % 2 === 0 && (
                <img src={homePopular} alt="Popular Course" style={styles.courseImage} />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

// Course Data
const courseData = [
  {
    title: "UI/UX Designer",
    description: "Become an expert in UI/UX",
    label: "Tools:",
    tools: "Canva, Figma",
    link: "/courses/uiux",
    bgColor: "#fabec0",
  },
  {
    title: "Full Stack Developer",
    description: "Become a full stack developer",
    label: "Modules:",
    tools: "HTML, CSS, JS, React, Node.js",
    link: "/courses/fullstack",
    bgColor: "#5f98f1",
  },
  {
    title: "Data Science",
    description: "Learn Data Science & AI",
    label: "Skills:",
    tools: "Python, Pandas, ML",
    link: "/courses/datascience",
    bgColor: "#fabec0",
  },
  {
    title: "Cyber Security",
    description: "Secure Networks & Systems",
    label: "Focus:",
    tools: "Ethical Hacking, Cyber Defense",
    link: "/courses/cybersecurity",
    bgColor: "#5f98f1",
  },
  {
    title: "Cloud Computing",
    description: "Master Cloud Technologies",
    label: "Platforms:",
    tools: "AWS, Azure, GCP",
    link: "/courses/cloud",
    bgColor: "#fabec0",
  },
  {
    title: "AI & Machine Learning",
    description: "Build AI-powered Apps",
    label: "Tech:",
    tools: "TensorFlow, PyTorch",
    link: "/courses/ai",
    bgColor: "#5f98f1",
  },
  {
    title: "Cloud Computing",
    description: "Master Cloud Technologies",
    label: "Platforms:",
    tools: "AWS, Azure, GCP",
    link: "/courses/cloud",
    bgColor: "#fabec0",
  },
  {
    title: "AI & Machine Learning",
    description: "Build AI-powered Apps",
    label: "Tech:",
    tools: "TensorFlow, PyTorch",
    link: "/courses/ai",
    bgColor: "#5f98f1",
  },
  {
    title: "UI/UX Designer",
    description: "Become an expert in UI/UX",
    label: "Tools:",
    tools: "Canva, Figma",
    link: "/courses/uiux",
    bgColor: "#fabec0",
  },
  {
    title: "Full Stack Developer",
    description: "Become a full stack developer",
    label: "Modules:",
    tools: "HTML, CSS, JS, React, Node.js",
    link: "/courses/fullstack",
    bgColor: "#5f98f1",
  },
];

// Styles
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d2e4fc",
    padding: "40px",
    width: "100%",
    overflow: "hidden", // Prevents horizontal scrollbars
    flexWrap: "wrap",
  },
  headingContainer: {
    flex: 1,
    minWidth: "280px",
    textAlign: "left",
  },
  heading: {
    fontWeight: 900,
    fontSize: "3rem",
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    width: "80px",
    marginLeft: "5px",
  },
  subHeading: {
    fontWeight: 400,
    fontSize: "1rem",
    maxWidth: "400px",
  },
  courseWrapper: {
    flex: 2,
    overflow: "hidden",
    width: "100%",
  },
  courseContainer: {
    display: "flex",
    gap: "20px",
    width: "200%", // Ensures enough space for smooth scrolling
    alignItems: "center",
  },
  courseBox: {
    padding: "20px",
    borderRadius: "20px",
    width: "250px",
    height: "250px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderTopRightRadius: "84px",
    borderBottomLeftRadius: "84px",
    borderTopLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    flexShrink: 0, // Prevents shrinking
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
  courseImage: {
    width: "250px",
    height: "250px",
    objectFit: "cover",
    borderRadius: "20px",
    flexShrink: 0,
  },
};

export default Popular;
