import React, { useState } from "react";
import courses from "../components/coursepage/CourseList"; // Adjust path if needed

const CourseDetail = ({ courseId = 1 }) => {
  // Find the selected course by ID
  const course = courses.find(course => course.id === courseId) || courses[0]; // Default to first course if not found

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "stretch", gap: "20px" }}>
        {/* Left Rectangle - Customized Path */}
        <div style={{ 
          background: "#e4deff", 
          color: "black", 
          padding: "20px", 
          borderRadius: "10px", 
          width: "30%", 
          textAlign: "left", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center" 
        }}>
          <h2>Customized Path to reduce the duration of the Specialization</h2>
          <button style={{ 
            marginTop: "10px", 
            padding: "10px 15px", 
            background: "#131346", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
          }}>
            Learn More
          </button>
        </div>

        {/* Right Rectangle - Course Info */}
        <div style={{ 
          display: "flex", 
          gap: "20px", 
          width: "70%", 
          alignItems: "center", 
          background: "#e4deff", 
          padding: "20px", 
          borderRadius: "10px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" 
        }}>
          {/* Course Image */}
          <img 
            src={course.image} 
            alt={course.title} 
            style={{ width: "150px", height: "100px", borderRadius: "10px", objectFit: "cover" }} 
          />

          {/* Course Details */}
          <div>
            <h2 style={{ color: "#004aad", fontSize: "20px", marginBottom: "5px" }}>{course.title}</h2>
            <p style={{ fontSize: "14px", color: "#555" }}><b>Company:</b> {course.company}</p>
            <p style={{ fontSize: "14px", color: "#555" }}><b>Duration:</b> {course.duration}</p>
          </div>
        </div>
      </div>

      {/* Learning Pathway Section */}
      <div style={{ 
        width: "66%",  
        background: "#f0f0f0", 
        padding: "20px", 
        borderRadius: "10px", 
        textAlign: "center", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
        margin: "auto"  
      }}>
        <h3 style={{ color: "#004aad", marginBottom: "15px" }}>Learning Pathway</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {course.pathway.map((step, index) => (
            <div 
              key={index} 
              style={{ 
                background: "#fff", 
                padding: "15px", 
                borderRadius: "10px", 
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
                cursor: "pointer", 
                position: "relative", 
                transition: "background 0.3s" 
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: 0, color: "#004aad" }}>{step.title}</h4>
                <span style={{ fontSize: "20px", cursor: "pointer" }}>▼</span>
              </div>
              {hoveredIndex === index && (
                <div style={{ 
                  marginTop: "10px", 
                  padding: "10px", 
                  background: "#e4deff", 
                  borderRadius: "5px", 
                  fontSize: "14px" 
                }}>
                  {step.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
