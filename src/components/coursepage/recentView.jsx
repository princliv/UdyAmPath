import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const Details = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedTab, setSelectedTab] = useState("course");

  useEffect(() => {
    fetch("/coursedata.json")
      .then((response) => response.json())
      .then((data) => {
        const updatedCourses = data.filter(course => 
          ["Java", "Python", "R Language", "SQL"].includes(course.title)
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
    <div style={{ display: "flex", gap: "20px", padding: "0px" }}>
      <div style={{ width: "270px", background: "#f4f4f4", padding: "10px", borderRadius: "10px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Categories</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {['Computer Science', 'Information Technology', 'Data Science', 'Language Learning', 'Business'].map(category => (
            <button key={category} style={{ background: "#e4deff", padding: "10px", border: "none", borderRadius: "5px", textAlign: "left", cursor: "pointer" }}>
              {category}
            </button>
          ))}
          <button style={{ background: "#d1c4ff", padding: "10px", border: "none", borderRadius: "5px", textAlign: "left", cursor: "pointer", marginTop: "5px" }}>
            More
          </button>
        </div>
        <div style={{ background: "#e4deff", padding: "10px", borderRadius: "10px", marginTop: "20px", textAlign: "center" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>Notes Hard to Read?</h4>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>Discover Visual Diagrams!</p>
          <p style={{ fontSize: "12px", color: "#333" }}>Transform your lengthy notes into easy-to-understand diagrams & tutorials.</p>
          <button onClick={() => navigate("/notespage")} style={{ marginTop: "10px", padding: "8px 12px", background: "#004aad", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Explore
          </button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            {['Course', 'Specialization', 'My Learnings'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                style={{
                  backgroundColor: selectedTab === tab ? "#3f92c3" : "#ccc",
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <span style={{ fontSize: "20px", cursor: "pointer" }}>🔖</span>
        </div>
        <div style={{ width: "97%", padding: "20px" }}>
          <div style={{ marginBottom: "10px", fontSize: "25px", fontWeight: "bold", color: "#333" }}>
            Recently Viewed Products
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", padding: "20px" }}>
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
                  <img src={course.image} alt="course-related" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }} />
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
                <button onClick={() => openCourseDetail(course)} style={{ backgroundColor: "#f0f0f0", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", alignSelf: "flex-start" }}>
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
        <MostPopular courses={courses.filter(course => course.category === 'Most Popular')} />
        <NewOnUdyam courses={courses.filter(course => course.category === 'New')} />
        <RecommendedCourse courses={courses.filter(course => course.category === 'Recommended')} />
      </div>
    </div>
  );
};

export default Details;