import React, { useState } from "react";
import createProfileGif from "../../assets/img1.gif";
import discoverCoursesGif from "../../assets/img2.gif";
import jobSimulatorGif from "../../assets/img3.gif";
import perfectJobGif from "../../assets/img4.gif";

const steps = [
  {
    gif: createProfileGif,
    title: "Create Profile",
    description: "Get started by building your personal profile.",
  },
  {
    gif: discoverCoursesGif,
    title: "Discover Hybrid Courses",
    description: "Find courses that match your skills and goals.",
  },
  {
    gif: jobSimulatorGif,
    title: "Unlock Job Simulator",
    description: "Experience real-world job scenarios and build confidence.",
  },
  {
    gif: perfectJobGif,
    title: "Find Your Perfect Job",
    description: "Land your dream job based on city-wise living expenses!",
  },
];

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>How It Works</h2>
      <div style={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              ...styles.step,
              transform: hoveredIndex === index ? "translateY(-10px)" : "translateY(0)",
              transition: "all 0.3s ease",
              boxShadow: hoveredIndex === index
                ? "0 8px 20px rgba(0, 0, 0, 0.2)"
                : "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={step.gif}
              alt={step.title}
              style={{
                ...styles.image,
                filter: hoveredIndex === index ? "none" : "grayscale(80%)",
              }}
            />
            <h3 style={styles.stepTitle}>{step.title}</h3>
            <p style={styles.stepDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "60px 20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "36px",
    marginBottom: "40px",
    fontWeight: "bold",
    color: "#333",
  },
  stepsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "40px",
  },
  step: {
    flex: "1 1 250px",
    maxWidth: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
    borderRadius: "20px",
    padding: "30px 20px",
    cursor: "pointer",
  },
  image: {
    width: "150px",
    height: "150px",
    marginBottom: "20px",
    objectFit: "cover",
    borderRadius: "15px",
  },
  stepTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  stepDescription: {
    fontSize: "14px",
    color: "#666",
  },
};

export default HowItWorks;
