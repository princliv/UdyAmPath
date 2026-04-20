import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import financeImage from "../../assets/coursepage/finance.jpeg";
import fedImage from "../../assets/coursepage/fed.png.webp";
import hrImage from "../../assets/coursepage/hr.jpg";
import ethicalHackingImage from "../../assets/coursepage/ethical_hacking.png";
import googleLogo from "../../assets/coursepage/google.png";
import financeLogo from "../../assets/coursepage/finance.png";
import techLogo from "../../assets/coursepage/tech_uni.png";
import metaLogo from "../../assets/coursepage/meta-logo.png";
import GlassCard from "../shared/GlassCard";
import AnimatedSection from "../shared/AnimatedSection";
import SkeletonCard from "../shared/SkeletonCard";
import { courseCardStyles, getSectionPanelStyle } from "./courseCardStyles";


const logoMap = {
  "Google": googleLogo,
  "Finance Academy": financeLogo,
  "Tech University": techLogo,
  "Meta": metaLogo,
};
const courseImageMap = {
  "Financial Marketing": financeImage,
  "Front End Development": fedImage,
  "Human Resource Management": hrImage,
  "Ethical Hacking": ethicalHackingImage,
};

const Recommended = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/coursedata.json")
      .then((response) => response.json())
      .then((data) => {
        const updatedCourses = data.filter(course => 
          ["Financial Marketing", "Front End Development", "Human Resource Management", "Ethical Hacking"].includes(course.title)
        ).map(course => ({
          ...course,
          logo: logoMap[course.company] || null,
          image: courseImageMap[course.title] || null,
        }));
        setCourses(updatedCourses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading course data:", error);
        setLoading(false);
      });
  }, []);

  const openCourseDetail = (course) => {
    navigate("/coursedetail", { state: { course } });
  };

  return (
    <AnimatedSection>
      <div style={courseCardStyles.sectionWrap}>
        <div style={getSectionPanelStyle("#ffffff")}>
        <div style={{ marginBottom: "10px", fontSize: "25px", fontWeight: "bold", color: "#2f225b" }}>
          Recommended Courses
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            padding: "12px 0",
            borderRadius: "10px",
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={`recommended-skeleton-${index}`}>
                  <SkeletonCard
                    height={260}
                    borderRadius={16}
                    baseColor="#ede9fe"
                    highlightColor="#c8bbff"
                  />
                </div>
              ))
            : courses.map((course, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <GlassCard
                    style={{
                      background: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(124,107,255,0.25)",
                      padding: "14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      height: "100%",
                      minHeight: "260px",
                    }}
                  >
                    <div style={{ flex: 1, overflow: "hidden", borderRadius: "12px" }}>
                      <motion.img
                        src={course.image}
                        alt="course-related"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#51456f" }}>
                        <span>{course.company}</span>
                        <span>{course.duration}</span>
                      </div>
                      <h4 style={{ fontSize: "18px", fontWeight: "700", margin: "10px 0", color: "#2f225b" }}>
                        {course.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => openCourseDetail(course)}
                      style={{
                        backgroundColor: "var(--course-primary)",
                        color: "white",
                        border: "none",
                        padding: "7px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        alignSelf: "flex-start",
                        fontWeight: "600",
                      }}
                    >
                      Details
                    </button>
                  </GlassCard>
                </motion.div>
              ))}

          {!loading && (
            <div style={{ gridColumn: "1 / -1", textAlign: "left" }}>
              <button
                style={{
                  padding: "7px 12px",
                  backgroundColor: "white",
                  color: "var(--course-primary)",
                  border: "2px solid var(--course-primary)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
                onClick={() => console.log("View More clicked")}
              >
                View More
              </button>
            </div>
          )}
        </motion.div>
          </div>
        </div>
    </AnimatedSection>
  );
};

export default Recommended;
