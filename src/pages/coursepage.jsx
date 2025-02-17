import React from "react";
import { useNavigate } from "react-router-dom";

const CoursePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Rectangle */}
        <div style={{ 
          background: "#e4deff", 
          color: "black", 
          padding: "20px", 
          borderRadius: "10px", 
          width: "250px", 
          textAlign: "left" 
        }}>
          <h2>Customized Learning Path to reduce the duration of the Specialization</h2>
          <button style={{ 
            marginTop: "10px", 
            padding: "10px 15px", 
            background: "white", 
            color: "#131346", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
          }}>
            Learn More
          </button>
        </div>

        {/* Right Rectangle */}
        <div style={{ 
          background: "#e4deff", 
          padding: "20px", 
          borderRadius: "10px", 
          flex: 1, 
          marginLeft: "20px", 
          paddingTop: "40px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "30px" }}>
              Get <span style={{ color: "#004aad" }}>Customized</span> Specialization<br /> 
              based on your <span style={{ color: "#004aad" }}>Knowledge</span>
            </h2>
            <input
              type="text"
              placeholder="Search Specialization"
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "300px"}}
            />
          </div>
          <button style={{ 
            marginTop: "10px", 
            padding: "10px 15px", 
            background: "#004aad", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
            width: "100px", 
            float: "right" 
          }}>
            Find
          </button>
        </div>
      </div>

      {/* Sidebar Section */}
      <div style={{ width: "250px", background: "#f4f4f4", padding: "15px", borderRadius: "10px", marginTop: "20px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Categories</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <button style={{ background: "#e4deff", padding: "10px", border: "none", borderRadius: "5px", textAlign: "left", cursor: "pointer" }}>Computer Science</button>
          <button style={{ background: "#e4deff", padding: "10px", border: "none", borderRadius: "5px", textAlign: "left", cursor: "pointer" }}>Information Technology</button>
          <button style={{ background: "#e4deff", padding: "10px", border: "none", borderRadius: "5px", textAlign: "left", cursor: "pointer" }}>Data Science</button>
          <button style={{ background: "#e4deff", padding: "10px", border: "none", borderRadius: "5px", textAlign: "left", cursor: "pointer" }}>Language Learning</button>
          <button style={{ background: "#e4deff", padding: "10px", border: "none", borderRadius: "5px", textAlign: "left", cursor: "pointer" }}>Business</button>
          <button style={{ background: "#d1c4ff", padding: "10px", border: "none", borderRadius: "5px", textAlign: "left", cursor: "pointer", marginTop: "5px" }}>More</button>
        </div>
        <div style={{ background: "#e4deff", padding: "10px", borderRadius: "10px", marginTop: "20px", textAlign: "center" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>Notes Hard to Read?</h4>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>Discover Visual Diagrams!</p>
          <p style={{ fontSize: "12px", color: "#333" }}>Transform your lengthy notes into easy-to-understand diagrams & tutorials.</p>
          <button onClick={() => navigate("./src/pages/notespage")} style={{ 
            marginTop: "10px", 
            padding: "8px 12px", 
            background: "#004aad", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
          }}>Explore</button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
