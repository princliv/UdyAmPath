import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../shared/GlassCard";
import homeSection2 from "../../assets/homeSection2.jpeg";
import homeSection3 from "../../assets/notes.png";
import homeSection4 from "../../assets/course.jpg";

const NewFeature = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div 
      style={styles.container}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2 style={styles.heading} variants={itemVariants}>
        What's New for You
      </motion.h2>

      <motion.div 
        style={styles.cardContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {cardData.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link to={item.link} style={{ textDecoration: "none" }}>
              <GlassCard style={styles.cardWrapper} delay={index * 0.1}>
                <div style={styles.imageWrapper}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={styles.image}
                  />
                </div>
                <div style={styles.textContainer}>
                  <h3 style={styles.cardHeading}>{item.title}</h3>
                  <p style={styles.subHeading}>{item.description}</p>
                  <motion.div 
                    whileHover={{ x: 5 }} 
                    transition={{ type: "spring", stiffness: 200 }}
                    style={styles.learnMoreWrapper}
                  >
                    <span style={styles.learnMore}>Learn More →</span>
                  </motion.div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const cardData = [
  {
    image: homeSection3,
    title: "Notes Hard to Read? Discover Visual Diagrams!",
    description: "Transform your lengthy notes into easy-to-understand diagrams in seconds.",
    link: "/notes"
  },
  {
    image: homeSection2,
    title: "Know the Cost of Living Around You",
    description: "Get real-time reports tailored to your location and make informed decisions.",
    link: "/base"
  },
  {
    image: homeSection4,
    title: "Skip What You Know, Learn What You Don't",
    description: "Start a course customized to your knowledge level—no repetition, just growth.",
    link: "/coursepage"
  }
];

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: "60px 40px",
    maxWidth: "100%",
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: "36px",
    fontWeight: 800,
    marginBottom: "40px",
    color: "#333333",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  cardWrapper: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100%",
  },
  imageWrapper: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    borderRadius: "var(--radius-lg)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease-out",
  },
  textContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cardHeading: {
    fontSize: "18px",
    fontWeight: 700,
    margin: "0",
    color: "#333333",
    lineHeight: "1.3",
  },
  subHeading: {
    fontSize: "14px",
    fontWeight: 400,
    margin: "0",
    color: "#666666",
    lineHeight: "1.5",
  },
  learnMoreWrapper: {
    marginTop: "10px",
  },
  learnMore: {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--home-primary)",
    transition: "color var(--transition-base)",
  },
};

export default NewFeature;
