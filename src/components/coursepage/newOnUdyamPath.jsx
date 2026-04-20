import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import genAiImage from "../../assets/coursepage/gen_ai.jpg";
import cyberImage from "../../assets/coursepage/cybersecurity.jpg";
import devopsImage from "../../assets/coursepage/dev_ops.png";
import uiImage from "../../assets/coursepage/ui_ux.jpg";
import courseraLogo from "../../assets/coursepage/cera.png";
import udemyLogo from "../../assets/coursepage/Udemy.png";
import skillshareLogo from "../../assets/coursepage/Skillshare.png";
import linkedInLearninglogo from "../../assets/coursepage/LinkedInLearning.png";
import AnimatedSection from "../shared/AnimatedSection";
import GlassCard from "../shared/GlassCard";
import SkeletonCard from "../shared/SkeletonCard";
import { courseCardStyles, getSectionPanelStyle } from "./courseCardStyles";

const logoMap = {
  "Coursera": courseraLogo,
  "Udemy": udemyLogo,
  "Skillshare": skillshareLogo,
  "LinkedIn Learning": linkedInLearninglogo,
};
const courseImageMap = {
  "Generative AI Fundamentals": genAiImage,
  "Cybersecurity for Everyone": cyberImage,
  "UI/UX": uiImage,
  "DevOps": devopsImage,
};

const New = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/coursedata.json")
      .then((response) => response.json())
      .then((data) => {
        const updatedCourses = data.filter(course => 
          ["Generative AI Fundamentals", "Cybersecurity for Everyone", "UI/UX", "DevOps"].includes(course.title)
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
        <div style={getSectionPanelStyle("rgba(237,233,254,0.72)")}>
          <div style={courseCardStyles.heading}>New On UdyamPath</div>

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
                    key={`new-skeleton-${index}`}
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

export default New;
