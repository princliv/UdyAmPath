import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const navigate = useNavigate();

  const course = {
    title: "Full Stack Web Development",
    company: "Coursera",
    duration: "6 months",
    image: "https://via.placeholder.com/150",
    pathway: [
      "HTML & CSS Basics",
      "JavaScript Fundamentals",
      "React & Redux",
      "Backend with Node.js",
      "Databases & APIs"
    ]
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <button 
        onClick={() => navigate("/coursedetail", { state: { course } })}
        style={{
          padding: "12px 20px",
          background: "#004aad",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => e.target.style.background = "#002d6b"}
        onMouseOut={(e) => e.target.style.background = "#004aad"}
      >
        View Course Details
      </button>
    </div>
  );
};

export default CourseList;
