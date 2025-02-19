import React from "react";
import { useLocation } from "react-router-dom";

const CourseDetail = () => {
  const location = useLocation();
  const course = location.state?.course;

  if (!course) {
    return <h2 style={{ textAlign: "center", marginTop: "20px", color: "#ff4d4d" }}>Course not found!</h2>;
  }

  return (
    <div style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      
      {/* Course Info Section */}
      <div style={{ display: "flex", gap: "20px", width: "80%", alignItems: "center", background: "#e4deff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        {/* Course Image */}
        <img 
          src={course.image} 
          alt={course.title} 
          style={{ width: "200px", height: "150px", borderRadius: "10px", objectFit: "cover" }} 
        />

        {/* Course Details */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#004aad", fontSize: "24px", marginBottom: "10px" }}>{course.title}</h2>
          <p style={{ fontSize: "16px", color: "#555" }}><b>Company:</b> {course.company}</p>
          <p style={{ fontSize: "16px", color: "#555" }}><b>Duration:</b> {course.duration}</p>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>{course.description}</p>
        </div>
      </div>

      {/* Course Pathway Section */}
      <div style={{ width: "80%", background: "#f0f0f0", padding: "20px", borderRadius: "10px", textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h3 style={{ color: "#004aad", marginBottom: "15px" }}>Learning Pathway</h3>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {course.pathway?.map((step, index) => (
            <div key={index} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#004aad", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold", margin: "0 auto" }}>
                {index + 1}
              </div>
              <p style={{ fontSize: "14px", marginTop: "5px", color: "#333" }}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
