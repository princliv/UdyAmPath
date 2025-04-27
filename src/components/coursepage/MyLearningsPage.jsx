import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
      fontFamily: "'Inter', sans-serif"
    }}>
      <h2 style={{ 
        color: "#004aad", 
        marginBottom: "30px",
        fontSize: "28px",
        fontWeight: "600"
      }}>
        My Learning Dashboard
      </h2>
      
      {enrolledCourses.length === 0 ? (
        <div style={{ 
          backgroundColor: "white", 
          padding: "40px", 
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
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
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px"
        }}>
          {enrolledCourses.map((course) => (
            <div key={course.id} style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
              ":hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
              }
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
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${course.progress}%`,
                    height: "100%",
                    backgroundColor: "#004aad",
                    borderRadius: "4px",
                    transition: "width 0.3s ease"
                  }}></div>
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
                  backgroundColor: "#004aad",
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearningsPage;