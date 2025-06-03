import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JobSimulator = () => {
  const navigate = useNavigate();
  const [completedCourses, setCompletedCourses] = useState([]);
  const [completedSpecializations, setCompletedSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [simulationType, setSimulationType] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [codeAnswer, setCodeAnswer] = useState("");
  const [systemDesignAnswer, setSystemDesignAnswer] = useState("");
  const [behavioralAnswer, setBehavioralAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const jobRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Machine Learning Engineer",
    "Cybersecurity Analyst",
    "UI/UX Designer",
    "Mobile App Developer",
    "Cloud Architect"
  ];

  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (2-5 years)",
    "Senior Level (5+ years)",
    "Lead/Architect Level"
  ];

  const codingQuestions = {
    "Frontend Developer": "Implement a responsive navigation bar that collapses into a hamburger menu on mobile devices.",
    "Backend Developer": "Write a function to validate and sanitize user input for a REST API endpoint.",
    "Full Stack Developer": "Create a simple CRUD application with React frontend and Node.js backend.",
    "Data Scientist": "Write Python code to clean a dataset with missing values and outliers.",
    "DevOps Engineer": "Write a Dockerfile for a Node.js application with proper layer caching.",
    "Machine Learning Engineer": "Implement a function to calculate evaluation metrics for a classification model.",
    "Cybersecurity Analyst": "Write a script to detect suspicious login attempts from a log file.",
    "UI/UX Designer": "Code a prototype of your design using HTML/CSS that shows hover states.",
    "Mobile App Developer": "Implement a flatlist in React Native that loads more items when scrolling.",
    "Cloud Architect": "Write Terraform configuration to deploy a scalable web application on AWS."
  };

  const systemDesignQuestions = {
    "Frontend Developer": "Design the frontend architecture for a large-scale e-commerce application.",
    "Backend Developer": "Design a microservices architecture for a ride-sharing application.",
    "Full Stack Developer": "Design a real-time collaborative document editing system like Google Docs.",
    "Data Scientist": "Design a data pipeline for processing streaming IoT device data.",
    "DevOps Engineer": "Design a CI/CD pipeline for a containerized microservices application.",
    "Machine Learning Engineer": "Design a recommendation system architecture for an e-commerce platform.",
    "Cybersecurity Analyst": "Design a secure authentication system with proper session management.",
    "UI/UX Designer": "Create a design system architecture for a multi-platform application.",
    "Mobile App Developer": "Design the architecture for an offline-first mobile application.",
    "Cloud Architect": "Design a multi-region deployment strategy for a high-availability application."
  };

  const behavioralQuestions = [
    "Tell me about a time you faced a difficult technical challenge and how you overcame it.",
    "Describe a situation where you had to work with a difficult team member.",
    "Give an example of how you've handled competing priorities with tight deadlines.",
    "Tell me about a time you made a mistake at work and how you handled it.",
    "Describe a situation where you had to learn a new technology quickly.",
    "Give an example of how you've contributed to improving your team's processes.",
    "Tell me about a time you had to explain a complex technical concept to a non-technical person."
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSimulation = () => {
    if (selectedRole && experienceLevel) {
      setSimulationType("started");
    }
  };

  const resetSelection = () => {
    setSimulationType(null);
    setSelectedRole("");
    setExperienceLevel("");
    setActiveSection(null);
    setFeedback("");
  };

  const startSection = (section) => {
    setActiveSection(section);
    setFeedback("");
    setTimer(0);
    setIsTimerRunning(true);
    
    // Reset answers when starting a new section
    if (section === "Technical Screening") {
      setCodeAnswer("");
    } else if (section === "System Design") {
      setSystemDesignAnswer("");
    } else if (section === "Behavioral Interview") {
      setBehavioralAnswer("");
    }
  };

  const submitSection = () => {
    setIsSubmitting(true);
    setIsTimerRunning(false);
    
    // Simulate API call for feedback
    setTimeout(() => {
      let generatedFeedback = "";
      
      if (activeSection === "Technical Screening") {
        generatedFeedback = `Great job on your code solution! For a ${experienceLevel} ${selectedRole}, this demonstrates solid technical skills.`;
        if (codeAnswer.length < 50) {
          generatedFeedback += " Try to provide more complete solutions next time.";
        }
      } else if (activeSection === "System Design") {
        generatedFeedback = `Your system design approach shows good understanding of ${selectedRole} requirements.`;
        if (systemDesignAnswer.length < 100) {
          generatedFeedback += " Consider expanding on scalability and fault tolerance aspects.";
        }
      } else if (activeSection === "Behavioral Interview") {
        generatedFeedback = "Your behavioral response demonstrates strong communication skills.";
        if (behavioralAnswer.length < 50) {
          generatedFeedback += " Try to use the STAR method (Situation, Task, Action, Result) for more structured answers.";
        }
      }
      
      setFeedback(generatedFeedback);
      setIsSubmitting(false);
    }, 1500);
  };

  const exitSection = () => {
    setActiveSection(null);
    setFeedback("");
    setIsTimerRunning(false);
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

  if (!simulationType) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #f8f9ff 0%, #e4deff 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "600px"
          }}
        >
          <motion.div variants={itemVariants}>
            <h1 style={{
              fontSize: "2.2rem",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #004aad 0%, #3f92c3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 10px 0",
              textAlign: "center"
            }}>
              Job Simulation Setup
            </h1>
            <p style={{
              fontSize: "1.1rem",
              color: "#555",
              marginBottom: "30px",
              textAlign: "center"
            }}>
              Configure your personalized job simulation experience
            </p>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginBottom: "25px" }}>
            <label style={{
              display: "block",
              fontSize: "1rem",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#444"
            }}>
              Select Job Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                backgroundColor: "#f9f9f9",
                appearance: "none",
                backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "20px"
              }}
            >
              <option value="">-- Select a job role --</option>
              {jobRoles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginBottom: "35px" }}>
            <label style={{
              display: "block",
              fontSize: "1rem",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#444"
            }}>
              Select Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                backgroundColor: "#f9f9f9",
                appearance: "none",
                backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "20px"
              }}
            >
              <option value="">-- Select experience level --</option>
              {experienceLevels.map((level, index) => (
                <option key={index} value={level}>{level}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={itemVariants} style={{ textAlign: "center" }}>
            <motion.button
              whileHover={cardHover}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartSimulation}
              disabled={!selectedRole || !experienceLevel}
              style={{
                padding: "14px 30px",
                backgroundColor: selectedRole && experienceLevel ? "#004aad" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: selectedRole && experienceLevel ? "pointer" : "not-allowed",
                fontSize: "1rem",
                fontWeight: "600",
                width: "100%",
                maxWidth: "300px",
                margin: "0 auto"
              }}
            >
              Start Simulation
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Active Section Views
  if (activeSection === "Technical Screening") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          padding: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #f8f9ff 0%, #e4deff 100%)",
          minHeight: "100vh"
        }}
      >
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px"
          }}>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "#004aad",
              margin: 0
            }}>
              Technical Screening
            </h2>
            <div style={{
              backgroundColor: "#f0f7ff",
              padding: "8px 15px",
              borderRadius: "20px",
              fontWeight: "500",
              color: "#004aad"
            }}>
              Time: {formatTime(timer)}
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              marginBottom: "15px",
              color: "#333"
            }}>
              Coding Problem:
            </h3>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
              borderLeft: "4px solid #004aad"
            }}>
              <p style={{ margin: 0, lineHeight: "1.6" }}>
                {codingQuestions[selectedRole]}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              marginBottom: "15px",
              color: "#333"
            }}>
              Your Solution:
            </h3>
            <textarea
              value={codeAnswer}
              onChange={(e) => setCodeAnswer(e.target.value)}
              style={{
                width: "100%",
                minHeight: "300px",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontFamily: "monospace",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                backgroundColor: "#f8f9fa"
              }}
              placeholder="Write your code solution here..."
            />
          </div>

          {feedback && (
            <div style={{
              backgroundColor: "#f0f7ff",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "30px",
              borderLeft: "4px solid #3f92c3"
            }}>
              <h4 style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#004aad"
              }}>
                Feedback:
              </h4>
              <p style={{ margin: 0, lineHeight: "1.6" }}>{feedback}</p>
            </div>
          )}

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px"
          }}>
            <motion.button
              whileHover={{ backgroundColor: "#e0e0e0" }}
              whileTap={{ scale: 0.98 }}
              onClick={exitSection}
              style={{
                padding: "12px 25px",
                backgroundColor: "#f0f0f0",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "500"
              }}
            >
              Exit
            </motion.button>
            {!feedback ? (
              <motion.button
                whileHover={{ backgroundColor: "#003d8a" }}
                whileTap={{ scale: 0.98 }}
                onClick={submitSection}
                disabled={isSubmitting}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#004aad",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "500"
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Solution"}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ backgroundColor: "#003d8a" }}
                whileTap={{ scale: 0.98 }}
                onClick={exitSection}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#004aad",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "500"
                }}
              >
                Return to Simulation
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (activeSection === "System Design") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          padding: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #f8f9ff 0%, #e4deff 100%)",
          minHeight: "100vh"
        }}
      >
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px"
          }}>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "#004aad",
              margin: 0
            }}>
              System Design Challenge
            </h2>
            <div style={{
              backgroundColor: "#f0f7ff",
              padding: "8px 15px",
              borderRadius: "20px",
              fontWeight: "500",
              color: "#004aad"
            }}>
              Time: {formatTime(timer)}
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              marginBottom: "15px",
              color: "#333"
            }}>
              Design Problem:
            </h3>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
              borderLeft: "4px solid #004aad"
            }}>
              <p style={{ margin: 0, lineHeight: "1.6" }}>
                {systemDesignQuestions[selectedRole]}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              marginBottom: "15px",
              color: "#333"
            }}>
              Your Design:
            </h3>
            <textarea
              value={systemDesignAnswer}
              onChange={(e) => setSystemDesignAnswer(e.target.value)}
              style={{
                width: "100%",
                minHeight: "300px",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                backgroundColor: "#f8f9fa"
              }}
              placeholder="Describe your system design approach here. Consider components, data flow, scalability, and trade-offs..."
            />
          </div>

          {feedback && (
            <div style={{
              backgroundColor: "#f0f7ff",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "30px",
              borderLeft: "4px solid #3f92c3"
            }}>
              <h4 style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#004aad"
              }}>
                Feedback:
              </h4>
              <p style={{ margin: 0, lineHeight: "1.6" }}>{feedback}</p>
            </div>
          )}

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px"
          }}>
            <motion.button
              whileHover={{ backgroundColor: "#e0e0e0" }}
              whileTap={{ scale: 0.98 }}
              onClick={exitSection}
              style={{
                padding: "12px 25px",
                backgroundColor: "#f0f0f0",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "500"
              }}
            >
              Exit
            </motion.button>
            {!feedback ? (
              <motion.button
                whileHover={{ backgroundColor: "#003d8a" }}
                whileTap={{ scale: 0.98 }}
                onClick={submitSection}
                disabled={isSubmitting}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#004aad",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "500"
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Design"}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ backgroundColor: "#003d8a" }}
                whileTap={{ scale: 0.98 }}
                onClick={exitSection}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#004aad",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "500"
                }}
              >
                Return to Simulation
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (activeSection === "Behavioral Interview") {
    const randomBehavioralQuestion = behavioralQuestions[Math.floor(Math.random() * behavioralQuestions.length)];
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          padding: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #f8f9ff 0%, #e4deff 100%)",
          minHeight: "100vh"
        }}
      >
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px"
          }}>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "#004aad",
              margin: 0
            }}>
              Behavioral Interview
            </h2>
            <div style={{
              backgroundColor: "#f0f7ff",
              padding: "8px 15px",
              borderRadius: "20px",
              fontWeight: "500",
              color: "#004aad"
            }}>
              Time: {formatTime(timer)}
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              marginBottom: "15px",
              color: "#333"
            }}>
              Question:
            </h3>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
              borderLeft: "4px solid #004aad"
            }}>
              <p style={{ margin: 0, lineHeight: "1.6", fontStyle: "italic" }}>
                "{randomBehavioralQuestion}"
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              marginBottom: "15px",
              color: "#333"
            }}>
              Your Response:
            </h3>
            <textarea
              value={behavioralAnswer}
              onChange={(e) => setBehavioralAnswer(e.target.value)}
              style={{
                width: "100%",
                minHeight: "200px",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                backgroundColor: "#f8f9fa"
              }}
              placeholder="Type your response here. Try to use the STAR method (Situation, Task, Action, Result)..."
            />
          </div>

          {feedback && (
            <div style={{
              backgroundColor: "#f0f7ff",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "30px",
              borderLeft: "4px solid #3f92c3"
            }}>
              <h4 style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#004aad"
              }}>
                Feedback:
              </h4>
              <p style={{ margin: 0, lineHeight: "1.6" }}>{feedback}</p>
            </div>
          )}

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px"
          }}>
            <motion.button
              whileHover={{ backgroundColor: "#e0e0e0" }}
              whileTap={{ scale: 0.98 }}
              onClick={exitSection}
              style={{
                padding: "12px 25px",
                backgroundColor: "#f0f0f0",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "500"
              }}
            >
              Exit
            </motion.button>
            {!feedback ? (
              <motion.button
                whileHover={{ backgroundColor: "#003d8a" }}
                whileTap={{ scale: 0.98 }}
                onClick={submitSection}
                disabled={isSubmitting}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#004aad",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "500"
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Response"}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ backgroundColor: "#003d8a" }}
                whileTap={{ scale: 0.98 }}
                onClick={exitSection}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#004aad",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "500"
                }}
              >
                Return to Simulation
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Main Simulation View
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        padding: "20px",
        maxWidth: "1200px",
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
              {selectedRole} Simulation
            </h1>
            <p style={{
              fontSize: "1.1rem",
              color: "#555",
              marginTop: "10px"
            }}>
              {experienceLevel} · Tailored to your skills and experience
            </p>
          </div>
          <motion.button
            whileHover={{ backgroundColor: "#e0e0e0" }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSelection}
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
            <span>←</span> Change Settings
          </motion.button>
        </motion.div>

        {/* Simulation Content */}
        <motion.div
          variants={itemVariants}
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            marginBottom: "30px"
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px"
          }}>
            <div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "20px",
                color: "#004aad"
              }}>
                Simulation Details
              </h3>
              <div style={{ marginBottom: "25px" }}>
                <p style={{ fontWeight: "500", marginBottom: "5px" }}>Job Role:</p>
                <p style={{ fontSize: "1.1rem", color: "#333" }}>{selectedRole}</p>
              </div>
              <div style={{ marginBottom: "25px" }}>
                <p style={{ fontWeight: "500", marginBottom: "5px" }}>Experience Level:</p>
                <p style={{ fontSize: "1.1rem", color: "#333" }}>{experienceLevel}</p>
              </div>
              <div style={{ marginBottom: "25px" }}>
                <p style={{ fontWeight: "500", marginBottom: "5px" }}>Estimated Duration:</p>
                <p style={{ fontSize: "1.1rem", color: "#333" }}>45-60 minutes</p>
              </div>
            </div>
            
            <div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "20px",
                color: "#004aad"
              }}>
                What to Expect
              </h3>
              <ul style={{
                listStyleType: "none",
                padding: 0
              }}>
                {[
                  "Real-world coding challenges",
                  "System design questions",
                  "Behavioral interview scenarios",
                  "Time-limited tasks",
                  "Personalized feedback"
                ].map((item, index) => (
                  <li key={index} style={{
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "flex-start"
                  }}>
                    <span style={{
                      display: "inline-block",
                      marginRight: "10px",
                      color: "#004aad",
                      fontWeight: "bold"
                    }}>✓</span>
                    <span style={{ fontSize: "1.05rem" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Simulation Sections */}
        <motion.div
          variants={containerVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "25px",
            marginBottom: "40px"
          }}
        >
          {[
            {
              title: "Technical Screening",
              description: "Solve coding problems similar to what you'd encounter in a technical phone screen",
              icon: "💻",
              duration: "20 min",
              status: "Not Started"
            },
            {
              title: "System Design",
              description: "Design a scalable system architecture with diagrams and explanations",
              icon: "📐",
              duration: "30 min",
              status: "Not Started"
            },
            {
              title: "Behavioral Interview",
              description: "Answer common behavioral questions with our AI interviewer",
              icon: "🗣️",
              duration: "15 min",
              status: "Not Started"
            }
          ].map((section, index) => (
            <motion.div
              key={`section-${index}`}
              variants={itemVariants}
              whileHover={cardHover}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                border: "1px solid #e0e0e0"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px"
              }}>
                <div style={{
                  fontSize: "2rem",
                  marginRight: "15px"
                }}>
                  {section.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    marginBottom: "5px",
                    color: "#004aad"
                  }}>
                    {section.title}
                  </h3>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "#666"
                  }}>
                    {section.duration} · {section.status}
                  </p>
                </div>
              </div>
              <p style={{
                fontSize: "0.95rem",
                color: "#555",
                marginBottom: "25px",
                lineHeight: "1.6"
              }}>
                {section.description}
              </p>
              <motion.button
                whileHover={{ backgroundColor: "#003d8a" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startSection(section.title)}
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#004aad",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  width: "100%"
                }}
              >
                Start {section.title}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Tips Section */}
        <motion.div
          variants={itemVariants}
          style={{
            backgroundColor: "#f0f7ff",
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
            border: "1px solid #d0e3ff"
          }}
        >
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#004aad",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span>💡</span> Tips for a Successful Simulation
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            {[
              "Treat this like a real interview - find a quiet space",
              "Have paper and pen ready for system design",
              "Think out loud during problem solving",
              "Review the job description beforehand",
              "Dress professionally if doing video responses",
              "Time yourself to practice pacing"
            ].map((tip, index) => (
              <div key={`tip-${index}`} style={{
                display: "flex",
                alignItems: "flex-start"
              }}>
                <span style={{
                  display: "inline-block",
                  marginRight: "10px",
                  color: "#004aad",
                  fontWeight: "bold"
                }}>•</span>
                <span style={{ fontSize: "1rem" }}>{tip}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default JobSimulator;