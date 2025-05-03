import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import homeArrow from "../../assets/homearrow.png";
import homePopular from "../../assets/homepopular.png";

const Popular = () => {
  const [startIndex, setStartIndex] = useState(0);

  const coursesToShow = 3; // Show only 3 courses at a time
  const totalCourses = courseData.length;

  const nextSlide = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % totalCourses); // Move forward cyclically
  }, [totalCourses]);

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + totalCourses) % totalCourses); // Move backward cyclically
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Auto move every 3 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Create a visible array for the current courses
  const visibleCourses = [];
  for (let i = 0; i < coursesToShow; i++) {
    visibleCourses.push(courseData[(startIndex + i) % totalCourses]);
  }

  return (
    <div style={styles.container}>
      {/* Heading Section */}
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

      {/* Carousel */}
      <div style={styles.carouselWrapper}>
        <FaChevronLeft
          style={{ ...styles.arrow, ...styles["left-arrow"] }}
          onClick={prevSlide} // Click for previous slide
        />
        <div style={styles.courseWrapper}>
          <div
            style={{
              ...styles.courseScroll,
              transform: `translateX(-${(startIndex % totalCourses) * (100 / coursesToShow)}%)`, // Move 100% per 3 items
              transition: "transform 0.6s ease", // Smooth transition
            }}
          >
            {courseData.map((course, index) => (
              <div key={index} style={styles.card}>
                <img src={homePopular} alt="Course" style={styles.cardImage} />
                <h3 style={styles.cardTitle}>{course.title}</h3>
                <p style={styles.cardDesc}>{course.description}</p>
                <Link to={course.link} style={styles.cardButton}>
                  Start Learning
                </Link>
              </div>
            ))}
          </div>
        </div>
        <FaChevronRight
          style={{ ...styles.arrow, ...styles["right-arrow"] }}
          onClick={nextSlide} // Click for next slide
        />
      </div>
    </div>
  );
};

const courseData = [
  {
    title: "UI/UX Design",
    description: "Learn the fundamentals of user experience and interface design",
    link: "/courses/uiux",
  },
  {
    title: "Full Stack Development",
    description: "Become proficient in both front end and back-end technologies",
    link: "/courses/fullstack",
  },
  {
    title: "Data Science",
    description: "Explore data analysis, machine learning, and statistical modeling",
    link: "/courses/datascience",
  },
  {
    title: "Cybersecurity Essentials",
    description: "Understand key concepts of securing systems and data",
    link: "/courses/cybersecurity",
  },
  {
    title: "Digital Marketing",
    description: "Master SEO, social media, and campaign strategies",
    link: "/courses/marketing",
  },
  {
    title: "Cloud Computing",
    description: "Get started with AWS, Azure and cloud-based architectures",
    link: "/courses/cloud",
  },
];

const styles = {
  container: {
    display: "flex",
    flex:1,
    padding: "40px",
    background: "linear-gradient(to right, #4b2b7f, #003057)",
    color: "#fff",
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: "100%", // Make sure it does not expand beyond the screen width
    overflow: "hidden", // Prevent overflow
  },
  headingContainer: {
    marginBottom: "30px",
    textAlign: "left",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  arrowIcon: {
    width: "40px",
    height: "40px",
  },
  subHeading: {
    fontSize: "1.1rem",
    color: "#ccc",
    marginTop: "10px",
    maxWidth: "500px",
  },
  carouselWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden", // Hide extra items beyond the visible section
    width: "80%", // Ensure it takes the full width of the container
  },
  courseWrapper: {
    display: "flex",
    transition: "transform 0.6s ease", // Smooth transition with ease-out cubic bezier curve
  },
  courseScroll: {
    display: "flex",
    gap: "20px", // Space between the courses
    flexShrink: 0,
    minWidth: "100%", // This ensures the carousel doesn't expand the section width
  },
  card: {
    minWidth: "300px", // Keep a fixed width for each box
    maxWidth: "300px", // Fixed width
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    padding: "20px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    flexShrink: 0,
  },
  cardImage: {
    width: "100%",
    height: "160px",
    borderRadius: "12px",
    objectFit: "cover",
    marginBottom: "15px",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardDesc: {
    fontSize: "0.95rem",
    color: "#ddd",
    marginBottom: "15px",
  },
  cardButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#223fa0",
    color: "#fff",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  arrow: {
    fontSize: "2rem",
    color: "#aaa",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    zIndex: 10, // Ensure the arrows are above other elements
  },
  "left-arrow": {
    left: "10px",
  },
  "right-arrow": {
    right: "10px",
  },
};

export default Popular;
