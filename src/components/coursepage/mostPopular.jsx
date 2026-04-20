// src/components/coursepage/mostPopular.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import reactImage from "../../assets/coursepage/react.png";
import androidImage from "../../assets/coursepage/android.png.webp";
import mlImage from "../../assets/coursepage/machine-learning.png.webp";
import ethicalHackingImage from "../../assets/coursepage/ethical_hacking.png";
import metaLogo from "../../assets/coursepage/meta-logo.png";
import googleLogo from "../../assets/coursepage/google.png";
import ibmLogo from "../../assets/coursepage/IBM.png";
import AnimatedSection from "../shared/AnimatedSection";
import GlassCard from "../shared/GlassCard";
import SkeletonCard from "../shared/SkeletonCard";
import { courseCardStyles, getSectionPanelStyle } from "./courseCardStyles";

const logoMap = {
  "Meta": metaLogo,
  "Google": googleLogo,
  "IBM": ibmLogo,
};

const courseImageMap = {
  "React": reactImage,
  "Android": androidImage,
  "Machine Learning": mlImage,
  "Ethical Hacking": ethicalHackingImage,
};

const MostPopular = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("/coursedata.json")
      .then((response) => response.json())
      .then((data) => {
        const popularCourses = data.filter(course => 
          ["React", "Android", "Machine Learning", "Ethical Hacking"].includes(course.title)
        ).map(course => ({
          ...course,
          logo: logoMap[course.company] || null,
          image: courseImageMap[course.title] || null,
        }));
        setCourses(popularCourses);
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
          <div style={courseCardStyles.heading}>Most Popular Courses</div>
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
            style={courseCardStyles.grid}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCard
                    key={`popular-skeleton-${index}`}
                    height={260}
                    borderRadius={16}
                    baseColor="#ede9fe"
                    highlightColor="#c8bbff"
                  />
                ))
              : courses.map((course, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <GlassCard style={courseCardStyles.card}>
                      <div style={courseCardStyles.imageWrap}>
                        <motion.img
                          src={course.image}
                          alt="course-related"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          style={courseCardStyles.image}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={courseCardStyles.metaRow}>
                          <span>{course.company}</span>
                          <span>{course.duration}</span>
                        </div>
                        <h4 style={courseCardStyles.title}>{course.title}</h4>
                      </div>
                      <button
                        onClick={() => openCourseDetail(course)}
                        style={courseCardStyles.detailsButton}
                      >
                        Details
                      </button>
                    </GlassCard>
                  </motion.div>
                ))}

            {!loading && (
              <div style={courseCardStyles.viewMoreWrap}>
                <button
                  style={courseCardStyles.viewMoreButton}
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

export default MostPopular;