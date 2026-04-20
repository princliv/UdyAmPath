import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MostPopular from "../coursepage/mostPopular";
import NewOnUdyam from "../coursepage/newOnUdyamPath";
import RecommendedCourse from "../coursepage/recommendedCourse";
import amazonLogo from "../../assets/coursepage/amazon.png";
import googleLogo from "../../assets/coursepage/google.png";
import appleLogo from "../../assets/coursepage/apple.png";
import javaImage from "../../assets/coursepage/java.png";
import pythonImage from "../../assets/coursepage/python.jpg";
import rLangImage from "../../assets/coursepage/R.jpg";
import sqlImage from "../../assets/coursepage/sql.png";
import AnimatedSection from "../shared/AnimatedSection";
import GlassCard from "../shared/GlassCard";
import SkeletonCard from "../shared/SkeletonCard";
import { courseCardStyles, getSectionPanelStyle } from "./courseCardStyles";

const logoMap = {
  "Amazon": amazonLogo,
  "Google": googleLogo,
  "Apple": appleLogo,
};

const courseImageMap = {
  "Java": javaImage,
  "Python": pythonImage,
  "R Language": rLangImage,
  "SQL": sqlImage,
};

const RECENT_TITLES = ["java", "python", "r language", "sql"];

const Details = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/coursedata.json")
      .then((response) => response.json())
      .then((data) => {
        const normalizedCourses = Array.isArray(data) ? data : [];
        const recentCourses = normalizedCourses.filter((course) =>
          RECENT_TITLES.includes((course.title || "").toLowerCase())
        );

        const sourceCourses = recentCourses.length > 0 ? recentCourses : normalizedCourses.slice(0, 4);

        const updatedCourses = sourceCourses.map((course) => ({
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
    <div>
      {/* Main Content Area without Left Sidebar */}
      <AnimatedSection>
        <div style={courseCardStyles.sectionWrap}>
          <div style={getSectionPanelStyle("rgba(237,233,254,0.72)")}>
            <div style={courseCardStyles.heading}>Recently Viewed Products</div>
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
                      key={`recent-skeleton-${index}`}
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
                        <button onClick={() => openCourseDetail(course)} style={courseCardStyles.detailsButton}>
                          Details
                        </button>
                      </GlassCard>
                    </motion.div>
                  ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
      <MostPopular courses={courses.filter(course => course.category === 'Most Popular')} />
      <NewOnUdyam courses={courses.filter(course => course.category === 'New')} />
      <RecommendedCourse courses={courses.filter(course => course.category === 'Recommended')} />
    </div>
  );
};

export default Details;