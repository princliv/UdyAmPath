import React from "react";
import { Link } from "react-router-dom";
import homeSection1 from "../../assets/homeSection1.jpg";
import homeSection2 from "../../assets/homeSection2.jpeg";

const NewFeature = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>What's New for You</h2>
      <div style={styles.cardContainer}>
        {/* Card 1 */}
        <div style={styles.card}>
          <img src={homeSection1} alt="Visual Diagrams" style={styles.image} />
          <div style={styles.textContainer}>
            <h3 style={styles.cardHeading}>
              Notes Hard to Read? <br /> Discover Visual Diagrams!
            </h3>
            <p style={styles.subHeading}>
              Transform your lengthy notes into easy-to-understand diagrams in seconds.
            </p>
            <Link to="#" style={styles.learnMore}>Learn More</Link>
          </div>
        </div>

        {/* Card 2 */}
        <div style={styles.card}>
          <img src={homeSection2} alt="Cost of Living" style={styles.image} />
          <div style={styles.textContainer}>
            <h3 style={styles.cardHeading}>
              Know the Cost of Living <br /> Around You
            </h3>
            <p style={styles.subHeading}>
              Get real-time reports tailored to your location and make informed decisions.
            </p>
            <Link to="#" style={styles.learnMore}>Learn More</Link>
          </div>
        </div>

        {/* Card 3 */}
        <div style={styles.card}>
          <img src={homeSection2} alt="Customized Learning" style={styles.image} />
          <div style={styles.textContainer}>
            <h3 style={styles.cardHeading}>
              Skip What You Know, <br /> Learn What You Don’t
            </h3>
            <p style={styles.subHeading}>
              Start a course customized to your knowledge level—no repetition, just growth.
            </p>
            <Link to="#" style={styles.learnMore}>Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: 900,
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    width: "300px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  cardHover: {
    transform: "translateY(-10px)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  textContainer: {
    padding: "15px",
  },
  cardHeading: {
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "14px",
    fontWeight: 400,
    marginBottom: "10px",
  },
  learnMore: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#007bff",
    textDecoration: "none",
  },
};

// Add hover effect using CSS-in-JS
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("[style*='cursor: pointer']");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
});

export default NewFeature;
