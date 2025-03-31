import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import homeSection2 from "../../assets/homeSection2.jpeg";
import homeSection3 from "../../assets/notes.png";
import homeSection4 from "../../assets/course.jpg";

const NewFeature = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      style={styles.container}
    >
      <h2 style={styles.heading}>What's New for You</h2>

      <div style={styles.cardContainer}>
        {cardData.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }} 
            transition={{ type: "spring", stiffness: 300 }}
            style={styles.card}
          >
            <img src={item.image} alt={item.title} style={styles.image} />
            <div style={styles.textContainer}>
              <h3 style={styles.cardHeading}>{item.title}</h3>
              <p style={styles.subHeading}>{item.description}</p>
              <motion.div 
                whileHover={{ x: 5 }} 
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link to={item.link} style={styles.learnMore}>Learn More →</Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const cardData = [
  {
    image: homeSection3,
    title: "Notes Hard to Read? Discover Visual Diagrams!",
    description: "Transform your lengthy notes into easy-to-understand diagrams in seconds.",
    link: "#"
  },
  {
    image: homeSection2,
    title: "Know the Cost of Living Around You",
    description: "Get real-time reports tailored to your location and make informed decisions.",
    link: "#"
  },
  {
    image: homeSection4,
    title: "Skip What You Know, Learn What You Don’t",
    description: "Start a course customized to your knowledge level—no repetition, just growth.",
    link: "#"
  }
];

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
    cursor: "pointer",
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

export default NewFeature;
