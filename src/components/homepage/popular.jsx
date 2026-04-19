import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import homeArrow from "../../assets/homearrow.png";
import homePopular from "../../assets/homepopular.png";

const courseData = [
  {
    title: "UI/UX Design",
    description: "Learn user research, wireframing, and modern interaction patterns.",
    link: "/courses/uiux",
    level: "Beginner",
    duration: "6 Weeks",
    accent: "#a5b4fc",
  },
  {
    title: "Full Stack Development",
    description: "Build real-world apps with frontend, backend, APIs, and deployment.",
    link: "/courses/fullstack",
    level: "Intermediate",
    duration: "10 Weeks",
    accent: "#7dd3fc",
  },
  {
    title: "Data Science",
    description: "Master Python, analytics, machine learning, and data storytelling.",
    link: "/courses/datascience",
    level: "Intermediate",
    duration: "8 Weeks",
    accent: "#6ee7b7",
  },
  {
    title: "Cybersecurity Essentials",
    description: "Understand threats, secure systems, and protect modern applications.",
    link: "/courses/cybersecurity",
    level: "Beginner",
    duration: "7 Weeks",
    accent: "#fca5a5",
  },
  {
    title: "Digital Marketing",
    description: "Run SEO, social, and paid campaigns with measurable growth.",
    link: "/courses/marketing",
    level: "All Levels",
    duration: "5 Weeks",
    accent: "#fcd34d",
  },
  {
    title: "Cloud Computing",
    description: "Deploy scalable services using AWS, Azure, and cloud architecture.",
    link: "/courses/cloud",
    level: "Advanced",
    duration: "9 Weeks",
    accent: "#93c5fd",
  },
];

const Popular = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1100 });

  const visibleCount = isMobile ? 1 : isTablet ? 2 : 3;
  const totalCourses = courseData.length;
  const baseIndex = totalCourses;

  const [currentIndex, setCurrentIndex] = useState(baseIndex);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const infiniteSlides = useMemo(
    () => [...courseData, ...courseData, ...courseData],
    []
  );

  useEffect(() => {
    setIsAnimating(false);
    setCurrentIndex(baseIndex);
  }, [visibleCount, baseIndex]);

  useEffect(() => {
    if (isAnimating) return;
    const frame = requestAnimationFrame(() => {
      setIsAnimating(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [isAnimating]);

  useEffect(() => {
    if (isPaused) return undefined;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goNext = () => setCurrentIndex((prev) => prev + 1);
  const goPrev = () => setCurrentIndex((prev) => prev - 1);

  const handleTransitionEnd = () => {
    if (currentIndex >= baseIndex + totalCourses) {
      setIsAnimating(false);
      setCurrentIndex(baseIndex);
    }
    if (currentIndex < baseIndex) {
      setIsAnimating(false);
      setCurrentIndex(baseIndex + totalCourses - 1);
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.headerBlock}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 style={styles.heading}>
            Most Popular Courses
            <img src={homeArrow} alt="arrow" style={styles.arrowIcon} />
          </h2>
          <p style={styles.subHeading}>
            Curated programs learners keep coming back to. Explore practical,
            career-ready courses designed to help you level up faster.
          </p>
        </motion.div>
      </div>

      <div
        style={styles.carouselShell}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          type="button"
          aria-label="Previous courses"
          style={{ ...styles.navButton, ...styles.leftButton }}
          onClick={goPrev}
        >
          <FaChevronLeft />
        </button>

        <div style={styles.viewport}>
          <div
            style={{
              ...styles.track,
              width: `${(infiniteSlides.length * 100) / visibleCount}%`,
              transform: `translateX(-${(currentIndex * 100) / infiniteSlides.length}%)`,
              transition: isAnimating ? "transform 620ms cubic-bezier(0.22, 0.61, 0.36, 1)" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {infiniteSlides.map((course, index) => (
              <div
                key={`${course.title}-${index}`}
                style={{
                  ...styles.slide,
                  width: `${100 / infiniteSlides.length}%`,
                  padding: isMobile ? "0 8px" : "0 12px",
                }}
              >
                <motion.article
                  style={styles.card}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  <div style={styles.imageWrap}>
                    <img src={homePopular} alt={course.title} style={styles.cardImage} />
                    <div
                      style={{
                        ...styles.imageOverlay,
                        background: `linear-gradient(155deg, ${course.accent}40 0%, rgba(10, 30, 68, 0.78) 78%)`,
                      }}
                    />
                    <div style={{ ...styles.levelChip, borderColor: `${course.accent}aa` }}>
                      {course.level}
                    </div>
                  </div>

                  <div style={styles.content}>
                    <div>
                      <h3 style={styles.cardTitle}>{course.title}</h3>
                      <p style={styles.cardDesc}>{course.description}</p>
                    </div>

                    <div style={styles.footerRow}>
                      <span style={styles.duration}>{course.duration}</span>
                      <Link to={course.link} style={styles.cardButton}>
                        Start Learning
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Next courses"
          style={{ ...styles.navButton, ...styles.rightButton }}
          onClick={goNext}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

const styles = {
  section: {
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
    padding: "56px 0",
    background: "linear-gradient(to right, #4b2b7f, #003057)",
    color: "#ffffff",
    overflow: "hidden",
  },
  headerBlock: {
    width: "100%",
    maxWidth: "1240px",
    margin: "0 auto 26px",
    padding: "0 24px",
    boxSizing: "border-box",
  },
  heading: {
    margin: 0,
    fontSize: "clamp(1.9rem, 4vw, 3rem)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1.15,
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
  },
  arrowIcon: {
    width: "36px",
    height: "36px",
    objectFit: "contain",
  },
  subHeading: {
    margin: "14px 0 0",
    fontSize: "1rem",
    color: "rgba(236, 244, 255, 0.9)",
    maxWidth: "700px",
    lineHeight: 1.7,
  },
  carouselShell: {
    width: "100%",
    maxWidth: "1240px",
    margin: "0 auto",
    position: "relative",
    padding: "0 44px",
  },
  viewport: {
    width: "100%",
    overflow: "hidden",
  },
  track: {
    display: "flex",
    alignItems: "stretch",
    willChange: "transform",
  },
  slide: {
    flexShrink: 0,
    boxSizing: "border-box",
  },
  card: {
    height: "100%",
    borderRadius: "22px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 18px 50px rgba(0, 0, 0, 0.28)",
    display: "flex",
    flexDirection: "column",
  },
  imageWrap: {
    position: "relative",
    height: "172px",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.9,
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
  },
  levelChip: {
    position: "absolute",
    top: "12px",
    left: "12px",
    padding: "6px 11px",
    borderRadius: "999px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    background: "rgba(8, 21, 55, 0.55)",
    color: "#ffffff",
    fontSize: "0.76rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  content: {
    padding: "18px 18px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "14px",
    minHeight: "170px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.15rem",
    fontWeight: 700,
    lineHeight: 1.35,
  },
  cardDesc: {
    margin: "8px 0 0",
    fontSize: "0.92rem",
    lineHeight: 1.55,
    color: "rgba(233, 241, 255, 0.9)",
  },
  footerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
  duration: {
    fontSize: "0.82rem",
    color: "rgba(230, 240, 255, 0.85)",
    letterSpacing: "0.02em",
  },
  cardButton: {
    textDecoration: "none",
    padding: "9px 14px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #60a5fa 0%, #4f46e5 100%)",
    color: "#ffffff",
    fontSize: "0.84rem",
    fontWeight: 700,
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    background: "rgba(12, 26, 59, 0.7)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 5,
  },
  leftButton: {
    left: "0",
  },
  rightButton: {
    right: "0",
  },
};

export default Popular;
