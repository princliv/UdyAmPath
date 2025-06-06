// src/components/coursepage/mostPopular.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import reactImage from "../../assets/coursepage/react.png";
import androidImage from "../../assets/coursepage/android.png.webp";
import mlImage from "../../assets/coursepage/machine-learning.png.webp";
import ethicalHackingImage from "../../assets/coursepage/ethical_hacking.png";
import metaLogo from "../../assets/coursepage/meta-logo.png";
import googleLogo from "../../assets/coursepage/google.png";
import ibmLogo from "../../assets/coursepage/IBM.png";

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
      })
      .catch((error) => console.error("Error loading course data:", error));
  }, []);

  const openCourseDetail = (course) => {
    navigate("/coursedetail", { state: { course } });
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ width: "100%", backgroundColor: "#e4deff", padding: "20px" }}>
        <div style={{ marginBottom: "10px", fontSize: "25px", fontWeight: "bold", color: "#333" }}>
          Most Popular Courses
        </div>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr 1fr 1fr", 
          gap: "20px", 
          backgroundColor: "#e4deff", 
          padding: "20px", 
          borderRadius: "10px" 
        }}>
          {courses.map((course, index) => (
            <div
              key={index}
              style={{
                backgroundColor: course.color,
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                height: "auto",
                maxWidth: "250px",
              }}
            >
              <div style={{ flex: 1 }}>
                <img
                  src={course.image}
                  alt="course-related"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#555" }}>
                  <span>{course.company}</span>
                  <span>{course.duration}</span>
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0", color: "#333" }}>
                  {course.title}
                </h4>
              </div>
              <button
                onClick={() => openCourseDetail(course)}
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                Details
              </button>
            </div>
          ))}
          <div style={{ gridColumn: "span 4", textAlign: "left" }}>
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "white",
                color: "#004aad",
                border: "3px solid #004aad",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "12px",
              }}
              onClick={() => console.log("View More clicked")}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPopular;