import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ideaGif from "../../assets/toolpage/idea.gif"; // Ensure ideaGif is imported locally
import project1 from "../../assets/toolpage/project1.png";
import project2 from "../../assets/toolpage/project2.png";
import project3 from "../../assets/toolpage/project3.png";

// Map keys in JSON to locally imported images
const imageMapping = {
  image1: project1,
  image2: project2,
  image3: project3,
};

const Project = () => {
  const [projectsData, setProjectsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch("/project.json")
      .then((res) => res.json())
      .then((data) => setProjectsData(data))
      .catch((error) => console.error("Error fetching projects data:", error));
  }, []);

  // Handle project click to navigate to ProjectModal page
  const handleProjectClick = (project) => {
    navigate("/projectModal", { state: project });
  };

  // Handle "More" button click to navigate to a new page or show more projects
  const handleMoreClick = () => {
    navigate("/Pdetails"); // This could be a route where all projects are displayed
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      {/* Heading with GIF */}
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        Top Project Picks: Must-Have Ideas for Your Portfolio
        <img src={ideaGif} alt="Idea Gif" style={{ width: "74px", height: "74px" }} />
      </h2>

      {/* Project Boxes */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {projectsData.slice(0, 3).map((project, index) => (
          <div
            key={index}
            onClick={() => handleProjectClick(project)}
            style={{
              width: "280px",
              padding: "15px",
              background: "#fff",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, background 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.background = "#333";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#000";
            }}
          >
            <img
              src={imageMapping[project.image]}
              alt={project.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0 5px", fontWeight: "bold" }}>
              {project.title}
            </h3>
            <p style={{ fontSize: "14px", margin: "0" }}>{project.description}</p>
          </div>
        ))}
      </div>

      {/* "More" Button */}
      <div style={{ marginTop: "30px", marginRight: "30px" ,textAlign: "right" }}>
        <button
          onClick={handleMoreClick}
          style={{
            padding: "10px 20px",
            fontSize: "12px",
            color: "#fff",
            backgroundColor: "#004aad",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00376d")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#004aad")}
        >
          View More
        </button>
      </div>

    </div>
  );
};

export default Project;
