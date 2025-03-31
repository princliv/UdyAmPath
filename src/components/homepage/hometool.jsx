import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon4 from "../../assets/icon4.png";

const HomeTool = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boxStyle = (isHovered) => ({
    flex: 1,
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    position: "relative",
    height: "250px",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
    transform: isHovered ? "translateY(-10px)" : "translateY(0)",
    backgroundColor: isHovered ? "#f0f8ff" : "white",
    boxShadow: isHovered ? "0 5px 15px rgba(0, 0, 0, 0.2)" : "none"
  });

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
    transition: "bottom 0.3s ease-in-out"
  });

  // Function to handle the modal open
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle the modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ fontWeight: 900, marginBottom: "20px" }}>
        Ace Interviews, Build Projects & Crush Goals!
      </h2>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
        {[
          {
            icon: icon1,
            title: "Interview Practice",
            desc: "Master company-specific problems and crack interviews with confidence.",
            footer: "100+ Questions",
            link: "/techInterview"
          },
          {
            icon: icon2,
            title: "Project Listings",
            desc: "Build your portfolio by exploring and working on impactful projects.",
            footer: "10+ Projects",
            link: "/projectModal"
          },
          {
            icon: icon2,
            title: "Mentora",
            desc: "Chat with Mentora for guidance, tips, and a quick morale boost during your preparation.",
            footer: "4 Chatbots",
            action: handleOpenModal // This will trigger the modal
          },
          {
            icon: icon4,
            title: "Supportive Tools",
            desc: "Leverage cutting-edge tools to simplify your coding and assessment experience.",
            footer: "5+ Tools",
            link: "/toolspage"
          }
        ].map((item, index) => (
          <div
            key={index}
            style={boxStyle(hoveredIndex === index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img src={item.icon} alt={item.title} style={{ width: "50px", height: "50px", marginBottom: "10px" }} />
            <h3 style={{ fontWeight: 700, marginBottom: "10px" }}>{item.title}</h3>
            <p>{item.desc}</p>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>{item.footer}</p>

            {item.link ? (
              <Link to={item.link} style={{ textDecoration: "none", color: "#fff" }}>
                <div style={hoverOverlayStyle(hoveredIndex === index)}>Start Now →</div>
              </Link>
            ) : (
              <button
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#fff" }}
                onClick={item.action}
              >
                <div style={hoverOverlayStyle(hoveredIndex === index)}>Start Now →</div>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* MODAL COMPONENT */}
      {isModalOpen && (
        <>
          {/* MODAL OVERLAY */}
          <div
            onClick={handleCloseModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              zIndex: 999
            }}
          />

          {/* MODAL CONTENT */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              width: "350px",
              textAlign: "center",
              zIndex: 1000,
              animation: "fadeIn 0.3s ease-in-out"
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#888"
              }}
            >
              ✕
            </button>

            {/* Modal Header */}
            <h2 style={{ fontWeight: "bold", color: "#1181c8", marginBottom: "10px" }}>
              Upgrade to Plus! 🚀
            </h2>

            {/* Description */}
            <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
              Get premium access to exclusive mentorship, tools, and career-boosting resources.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => alert("Redirecting to purchase page...")} // Replace with actual link
              style={{
                backgroundColor: "#1181c8",
                color: "#fff",
                padding: "10px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.3s ease",
                width: "100%",
                fontWeight: "bold"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0e6ba8")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1181c8")}
            >
              Get Plus Now →
            </button>
          </div>
        </>
      )}


      {/* BACKDROP FOR MODAL */}
      {isModalOpen && (
        <div
          onClick={handleCloseModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999
          }}
        />
      )}
    </div>
  );
};

export default HomeTool;
