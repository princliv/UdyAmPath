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
    <div>
      {/* Main Content Area without Left Sidebar */}
      <div style={{ width: "100%", padding: "20px" }}>
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
  );
};

export default Details;