import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import genAiImage from "../../assets/coursepage/gen_ai.jpg";
import cyberImage from "../../assets/coursepage/cybersecurity.jpg";
import devopsImage from "../../assets/coursepage/dev_ops.png";
import uiImage from "../../assets/coursepage/ui_ux.jpg";
import courseraLogo from "../../assets/coursepage/cera.png";
import udemyLogo from "../../assets/coursepage/Udemy.png";
import skillshareLogo from "../../assets/coursepage/Skillshare.png";
import linkedInLearninglogo from "../../assets/coursepage/LinkedInLearning.png";

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
      })
      .catch((error) => console.error("Error loading course data:", error));
  }, []);

  const openCourseDetail = (course) => {
    navigate("/coursedetail", { state: { course } });
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ width: "100%", backgroundColor: "#ffffff", padding: "20px" }}>
        {/* Heading */}
        <div style={{ marginBottom: "10px", fontSize: "25px", fontWeight: "bold", color: "#333" }}>
          New On UdyamPath
        </div>

        {/* Course Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr 1fr 1fr", 
          gap: "20px", 
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
              {/* Course Image */}
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

              {/* Course Details */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#555" }}>
                  <span>{course.company}</span>
                  <span>{course.duration}</span>
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0", color: "#333" }}>
                  {course.title}
                </h4>
              </div>

              {/* Details Button */}
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
          
          {/* View More Button */}
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

export default New;
