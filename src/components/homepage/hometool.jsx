import React, { useState } from "react";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon4 from "../../assets/icon4.png";

const HomeTool = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerStyle = {
    textAlign: "center",
    padding: "20px"
  };

  const headingStyle = {
    fontWeight: 900,
    marginBottom: "20px"
  };

  const boxContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px"
  };

  const boxStyle = {
    flex: 1,
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    position: "relative",
    height: "250px", // Increased height
    overflow: "hidden",
    transition: "0.3s ease-in-out"
  };

  const iconStyle = {
    width: "50px",
    height: "50px",
    marginBottom: "10px"
  };

  const headingBoxStyle = {
    fontWeight: 700,
    marginBottom: "10px"
  };

  const footerStyle = {
    marginTop: "10px",
    fontWeight: "bold"
  };

  const hoverOverlayStyle = (isHovered) => ({
    position: "absolute",
    bottom: isHovered ? "0" : "-100%",
    left: "0",
    width: "100%",
    height: "50px",
    backgroundColor: "#1181c8",
    color: "#fff",
    textAlign: "center",
    lineHeight: "50px",
    fontWeight: "bold",
    transition: "0.3s ease-in-out",
    zIndex: "3",
  });

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Ace Interviews, Build Projects & Crush Goals!</h2>
      <div style={boxContainerStyle}>
        {[{
          icon: icon1,
          title: "Interview Practice",
          desc: "Master company specific problems and crack interviews with confidence.",
          footer: "100+ Questions"
        }, {
          icon: icon2,
          title: "Project Listings",
          desc: "Build your portfolio by exploring and working on impactful projects.",
          footer: "10+ Projects"
        }, {
          icon: icon2,
          title: "Mentora",
          desc: "Chat with Mentora for guidance, tips, and a quick morale boost during your preparation.",
          footer: "4 Chatbots"
        }, {
          icon: icon4,
          title: "Supportive Tools",
          desc: "Leverage cutting-edge tools to simplify your coding and assessment experience.",
          footer: "5+ Tools"
        }].map((item, index) => (
          <div
            key={index}
            style={boxStyle}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img src={item.icon} alt={item.title} style={iconStyle} />
            <h3 style={headingBoxStyle}>{item.title}</h3>
            <p>{item.desc}</p>
            <p style={footerStyle}>{item.footer}</p>
            <a href="#" style={{ textDecoration: "none", color: "#fff" }}>
              <div style={hoverOverlayStyle(hoveredIndex === index)}>Start Now →</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTool;
