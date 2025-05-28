import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JobSimulator = () => {
  const navigate = useNavigate();
  const [completedCourses, setCompletedCourses] = useState([]);
  const [completedSpecializations, setCompletedSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API fetch with loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockCompletedCourses = ["Python", "React", "SQL"];
      const mockCompletedSpecializations = [1, 4, 16];
      setCompletedCourses(mockCompletedCourses);
      setCompletedSpecializations(mockCompletedSpecializations);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const courses = [
    "Java", "Python", "R Language", "SQL", "React", "Android", 
    "Machine Learning", "Ethical Hacking", "Generative AI Fundamentals", 
    "Cybersecurity for Everyone", "UI/UX", "DevOps", "Financial Marketing", 
    "Front End Development", "Human Resource Management"
  ];

  const specializations = [
    { id: 1, name: "Artificial Intelligence", icon: "🤖" },
    { id: 2, name: "Cloud Computing", icon: "☁️" },
    { id: 3, name: "Cybersecurity", icon: "🔐" },
    { id: 4, name: "Data Science", icon: "📊" },
    { id: 5, name: "Internet of Things", icon: "🌐" },
    { id: 6, name: "Blockchain Development", icon: "⛓️" },
    { id: 7, name: "Robotics Engineering", icon: "🤖" },
    { id: 8, name: "Quantum Computing", icon: "⚛️" },
    { id: 9, name: "Augmented Reality/Virtual Reality", icon: "👓" },
    { id: 10, name: "Autonomous Systems", icon: "🚗" },
    { id: 11, name: "Bioinformatics", icon: "🧬" },
    { id: 12, name: "Embedded Systems", icon: "💾" },
    { id: 13, name: "Computer Networks", icon: "🖥️" },
    { id: 14, name: "Game Development", icon: "🎮" },
    { id: 15, name: "Computer Graphics", icon: "🖌️" },
    { id: 16, name: "DevOps Engineering", icon: "🔄" }
  ];

  const isCourseCompleted = (courseName) => completedCourses.includes(courseName);
  const isSpecializationCompleted = (specId) => completedSpecializations.includes(specId);

  const handleStartPractice = (type, name) => {
    // navigate(`/job-simulator/${type.toLowerCase()}/${name.toLowerCase().replace(/\s+/g, '-')}`);
    alert(`Launching ${type} simulator for ${name}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardHover = {
    scale: 1.03,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  };

  const cardTap = {
    scale: 0.98
  };

  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f8f9ff 0%, #e4deff 100%)"
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "5px solid #004aad",
            borderTopColor: "transparent"
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
        background: "linear-gradient(135deg, #f8f9ff 0%, #e4deff 100%)",
        minHeight: "100vh"
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px"
          }}
        >
          <div>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #004aad 0%, #3f92c3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
              lineHeight: 1.2
            }}>
              Job Simulator
            </h1>
            <p style={{
              fontSize: "1.1rem",
              color: "#555",
              marginTop: "10px",
              maxWidth: "600px"
            }}>
              Practice real interview scenarios tailored to your completed courses and specializations.
            </p>
          </div>
          <motion.button
            whileHover={{ backgroundColor: "#e0e0e0" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f0f0f0",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "1rem",
              fontWeight: "500"
            }}
          >
            <span>←</span> Back to Dashboard
          </motion.button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          variants={itemVariants}
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "40px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px"
          }}>
            <h3 style={{ fontSize: "1.2rem", margin: 0 }}>Your Progress</h3>
            <span style={{ fontWeight: "600" }}>
              {completedCourses.length}/{courses.length} Courses · {completedSpecializations.length}/{specializations.length} Specializations
            </span>
          </div>
          <div style={{
            height: "10px",
            width: "100%",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            overflow: "hidden"
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((completedCourses.length + completedSpecializations.length) / (courses.length + specializations.length)) * 100}%` }}
              transition={{ duration: 1 }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #004aad 0%, #3f92c3 100%)",
                borderRadius: "5px"
              }}
            />
          </div>
        </motion.div>

        {/* Course Simulators */}
        <motion.div variants={itemVariants}>
          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#004aad",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{ fontSize: "1.5rem" }}>📚</span>
            Course Simulators
          </h2>
          <motion.div
            variants={containerVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "25px",
              marginBottom: "50px"
            }}
          >
            {courses.map((course, index) => {
              const isCompleted = isCourseCompleted(course);
              return (
                <motion.div
                  key={`course-${index}`}
                  variants={itemVariants}
                  whileHover={isCompleted ? cardHover : {}}
                  whileTap={isCompleted ? cardTap : {}}
                  onClick={isCompleted ? () => handleStartPractice("course", course) : null}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "25px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    cursor: isCompleted ? "pointer" : "default",
                    position: "relative",
                    overflow: "hidden",
                    border: isCompleted ? "2px solid #6a4c93" : "2px solid #f0f0f0"
                  }}
                >
                  {!isCompleted && (
                    <div style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      borderRadius: "20px",
                      padding: "4px 12px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      zIndex: 2
                    }}>
                      LOCKED
                    </div>
                  )}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "5px",
                    background: isCompleted ? "linear-gradient(90deg, #6a4c93 0%, #9b72cf 100%)" : "#e0e0e0"
                  }} />
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                  }}>
                    <div style={{
                      fontSize: "2.5rem",
                      marginBottom: "20px",
                      color: isCompleted ? "#6a4c93" : "#d0d0d0",
                      textAlign: "center"
                    }}>
                      {isCompleted ? "💼" : "🔒"}
                    </div>
                    <h3 style={{
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      marginBottom: "15px",
                      color: "#333",
                      textAlign: "center"
                    }}>
                      {course}
                    </h3>
                    <p style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      marginBottom: "25px",
                      textAlign: "center",
                      flexGrow: 1
                    }}>
                      {isCompleted 
                        ? "Practice interview questions specific to this course material"
                        : "Complete the course to unlock this simulator"}
                    </p>
                    <div style={{
                      display: "flex",
                      justifyContent: "center"
                    }}>
                      <motion.div
                        whileHover={isCompleted ? { scale: 1.05 } : {}}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: isCompleted ? "#6a4c93" : "#e0e0e0",
                          color: isCompleted ? "white" : "#999",
                          borderRadius: "30px",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        {isCompleted ? (
                          <>
                            <span>Start Practice</span>
                            <span>→</span>
                          </>
                        ) : "Locked"}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Specialization Simulators */}
        <motion.div variants={itemVariants}>
          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#004aad",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{ fontSize: "1.5rem" }}>🏆</span>
            Specialization Simulators
          </h2>
          <motion.div
            variants={containerVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "25px",
              marginBottom: "50px"
            }}
          >
            {specializations.map((spec) => {
              const isCompleted = isSpecializationCompleted(spec.id);
              return (
                <motion.div
                  key={`spec-${spec.id}`}
                  variants={itemVariants}
                  whileHover={isCompleted ? cardHover : {}}
                  whileTap={isCompleted ? cardTap : {}}
                  onClick={isCompleted ? () => handleStartPractice("specialization", spec.name) : null}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "25px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    cursor: isCompleted ? "pointer" : "default",
                    position: "relative",
                    overflow: "hidden",
                    border: isCompleted ? "2px solid #e67e22" : "2px solid #f0f0f0"
                  }}
                >
                  {!isCompleted && (
                    <div style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      borderRadius: "20px",
                      padding: "4px 12px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      zIndex: 2
                    }}>
                      LOCKED
                    </div>
                  )}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "5px",
                    background: isCompleted ? "linear-gradient(90deg, #e67e22 0%, #f39c12 100%)" : "#e0e0e0"
                  }} />
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                  }}>
                    <div style={{
                      fontSize: "2.5rem",
                      marginBottom: "15px",
                      color: isCompleted ? "#e67e22" : "#d0d0d0",
                      textAlign: "center"
                    }}>
                      {isCompleted ? spec.icon : "🔒"}
                    </div>
                    <h3 style={{
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      marginBottom: "15px",
                      color: "#333",
                      textAlign: "center"
                    }}>
                      {spec.name}
                    </h3>
                    <p style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      marginBottom: "25px",
                      textAlign: "center",
                      flexGrow: 1
                    }}>
                      {isCompleted 
                        ? "Advanced scenarios and case studies for this specialization"
                        : "Complete the specialization to unlock this simulator"}
                    </p>
                    <div style={{
                      display: "flex",
                      justifyContent: "center"
                    }}>
                      <motion.div
                        whileHover={isCompleted ? { scale: 1.05 } : {}}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: isCompleted ? "#e67e22" : "#e0e0e0",
                          color: isCompleted ? "white" : "#999",
                          borderRadius: "30px",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        {isCompleted ? (
                          <>
                            <span>Start Practice</span>
                            <span>→</span>
                          </>
                        ) : "Locked"}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          variants={itemVariants}
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
            marginBottom: "30px"
          }}
        >
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "25px",
            color: "#004aad",
            textAlign: "center"
          }}>
            How Our Job Simulators Work
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "30px"
          }}>
            {[
              {
                title: "1. Complete Learning Content",
                description: "Finish courses and specializations to unlock their simulators",
                icon: "✅"
              },
              {
                title: "2. Realistic Interview Practice",
                description: "Experience timed coding challenges, system design whiteboarding, and behavioral questions",
                icon: "⏱️"
              },
              {
                title: "3. Personalized Feedback",
                description: "Get detailed evaluations on your technical and communication skills",
                icon: "📝"
              },
              {
                title: "4. Track Your Progress",
                description: "Monitor your improvement across different skill areas over time",
                icon: "📈"
              }
            ].map((item, index) => (
              <motion.div
                key={`howto-${index}`}
                whileHover={{ y: -5 }}
                style={{
                  backgroundColor: "#f8f9ff",
                  borderRadius: "12px",
                  padding: "25px",
                  textAlign: "center"
                }}
              >
                <div style={{
                  fontSize: "2rem",
                  marginBottom: "15px"
                }}>
                  {item.icon}
                </div>
                <h4 style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "10px",
                  color: "#004aad"
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: "0.95rem",
                  color: "#666",
                  lineHeight: "1.6"
                }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default JobSimulator;