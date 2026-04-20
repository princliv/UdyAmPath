import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import AnimatedSection from '../shared/AnimatedSection';

const MyLearningsPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const location = useLocation();

  // Load enrolled courses from localStorage on component mount
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    setEnrolledCourses(savedCourses);
  }, []);

  // Check for new course enrollment from location state
  useEffect(() => {
    if (location.state?.course) {
      const newCourse = location.state.course;
      setEnrolledCourses(prevCourses => {
        // Check if course already exists
        const exists = prevCourses.some(c => c.id === newCourse.id);
        if (!exists) {
          const updatedCourses = [
            ...prevCourses,
            {
              ...newCourse,
              progress: 0,
              lastAccessed: new Date().toISOString()
            }
          ];
          localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
          return updatedCourses;
        }
        return prevCourses;
      });
    }
  }, [location.state]);

  const updateProgress = (courseId, newProgress) => {
    setEnrolledCourses(prevCourses => {
      const updatedCourses = prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, progress: Math.min(100, Math.max(0, newProgress)) }
          : course
      );
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
      return updatedCourses;
    });
  };

  const removeCourse = (courseId) => {
    setEnrolledCourses(prevCourses => {
      const updatedCourses = prevCourses.filter(course => course.id !== courseId);
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
      return updatedCourses;
    });
  };

  return (
    <div style={{ 
      padding: "20px", 
      maxWidth: "1200px", 
      margin: "0 auto",
      fontFamily: "var(--font-primary)"
    }}>
      <h2 style={{ 
        color: "var(--course-primary)", 
        marginBottom: "30px",
        fontSize: "28px",
        fontWeight: "700"
      }}>
        My Learning Dashboard
      </h2>
      
      {enrolledCourses.length === 0 ? (
        <GlassCard style={{ 
          background: "rgba(255,255,255,0.55)", 
          padding: "40px", 
          borderRadius: "12px",
          border: "1px solid rgba(124, 107, 255, 0.18)",
          textAlign: "center"
        }}>
          <div style={{ 
            fontSize: "72px",
            marginBottom: "20px",
            color: "#e0e0e0"
          }}>📚</div>
          <h3 style={{ 
            fontSize: "20px",
            color: "#333",
            marginBottom: "10px"
          }}>
            Your learning journey starts here
          </h3>
          <p style={{ 
            color: "#666",
            marginBottom: "20px",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            Courses you enroll in will appear here with your progress tracking.
          </p>
        </GlassCard>
      ) : (
        <AnimatedSection>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "20px"
            }}
          >
          {enrolledCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
            <GlassCard style={{
              background: "rgba(255,255,255,0.58)",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid rgba(124, 107, 255, 0.18)",
              height: "100%",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "15px"
              }}>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#333",
                  margin: "0"
                }}>
                  {course.title}
                </h3>
                <button 
                  onClick={() => removeCourse(course.id)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#999",
                    cursor: "pointer",
                    fontSize: "14px",
                    ":hover": {
                      color: "#ff4444"
                    }
                  }}
                >
                  Remove
                </button>
              </div>
              
              <div style={{ marginBottom: "15px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  fontSize: "14px",
                  color: "#666"
                }}>
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div style={{
                  height: "8px",
                  backgroundColor: "rgba(124, 107, 255, 0.18)",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      backgroundColor: "var(--course-primary)",
                      borderRadius: "4px",
                    }}
                  ></motion.div>
                </div>
              </div>
              
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{
                  fontSize: "13px",
                  color: "#888"
                }}>
                  Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                </span>
                <div>
                  <button 
                    onClick={() => updateProgress(course.id, course.progress - 10)}
                    disabled={course.progress <= 0}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#f0f0f0",
                      border: "none",
                      borderRadius: "4px",
                      marginRight: "8px",
                      cursor: "pointer",
                      ":disabled": {
                        opacity: 0.5,
                        cursor: "not-allowed"
                      }
                    }}
                  >
                    -
                  </button>
                  <button 
                    onClick={() => updateProgress(course.id, course.progress + 10)}
                    disabled={course.progress >= 100}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#f0f0f0",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      ":disabled": {
                        opacity: 0.5,
                        cursor: "not-allowed"
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "15px",
                  backgroundColor: "var(--course-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  ":hover": {
                    backgroundColor: "#003b8e"
                  }
                }}
              >
                {course.progress === 0 ? "Start Learning" : 
                 course.progress === 100 ? "Completed! Review Course" : "Continue Learning"}
              </button>
            </GlassCard>
            </motion.div>
          ))}
          </motion.div>
        </AnimatedSection>
      )}
    </div>
  );
};

export default MyLearningsPage;