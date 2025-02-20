import React from "react";
import ideaGif from "../../assets/toolpage/idea.gif";
import project1 from "../../assets/toolpage/project1.png";
import project2 from "../../assets/toolpage/project2.png";
import project3 from "../../assets/toolpage/project3.png";

const projects = [
  {
    title: "SmartHealth Monitoring System",
    description: "Real-time health tracking with IoT and data analytics.",
    image: project1,
    link: "#",
  },
  {
    title: "AI-Powered Job Recommendation System",
    description: "AI-based job recommendations using NLP and sentiment analysis.",
    image: project2,
    link: "#",
  },
  {
    title: "E-Commerce Chatbot with NLP",
    description: "NLP-powered chatbot for personalized e-commerce shopping experience.",
    image: project3,
    link: "#",
  },
];

const Project = () => {
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
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            style={{
              width: "280px",
              padding: "15px",
              background: "#fff",
              borderRadius: "10px",
              textAlign: "center",
              textDecoration: "none",
              color: "#000",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, background 0.3s ease",
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
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0 5px", fontWeight: "bold" }}>{project.title}</h3>
            <p style={{ fontSize: "14px", margin: "0 0 10px" }}>{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Project;