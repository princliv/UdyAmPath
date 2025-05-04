import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import background from "../../assets/bghometool.png";

const HomeTool = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardStyle = (bgColor) => ({
    background: `linear-gradient(145deg, ${bgColor}, #ffffff)`,
    boxShadow: `
      5px 5px 15px rgba(0, 0, 0, 0.2),
      -5px -5px 15px rgba(255, 255, 255, 0.6),
      inset -2px -2px 5px rgba(255, 255, 255, 0.8),
      inset 2px 2px 5px rgba(0, 0, 0, 0.05)
    `,
    padding: "20px",
    borderRadius: "16px",
    minHeight: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    wordWrap: "break-word",
    boxSizing: "border-box"
  });

  const footerButton = (color) => ({
    backgroundColor: color,
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "8px",
    marginTop: "12px",
    fontWeight: "bold",
    fontSize: "14px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background 0.3s ease",
    textDecoration: "none"
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const items = [
    {
      icon: icon1,
      title: "Interview Practice",
      desc: "Master company-specific problems and crack interviews with confidence.",
      footer: "100+ Questions",
      link: "/techInterview",
      color: "#E3F2FD",
      hoverColor: "#1976d2"
    },
    {
      icon: icon2,
      title: "Project Listings",
      desc: "Build your portfolio by exploring and working on impactful projects.",
      footer: "10+ Projects",
      link: "/Pdetails",
      color: "#F1F8E9",
      hoverColor: "#388e3c"
    },
    {
      icon: icon3,
      title: "Mentora",
      desc: "Chat with Mentora for guidance, tips, and a quick morale boost during your preparation.",
      footer: "4 Chatbots",
      action: handleOpenModal,
      color: "#FFF3E0",
      hoverColor: "#f57c00"
    },
    {
      icon: icon4,
      title: "Supportive Tools",
      desc: "Leverage cutting-edge tools to simplify your coding and assessment experience.",
      footer: "5+ Tools",
      link: "/toolspage",
      color: "#FCE4EC",
      hoverColor: "#c2185b"
    }
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", gap: "20px", width: "80%", margin: "0 auto" }}>
        {/* LEFT COLUMN */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "2rem",
              fontWeight: "bold",
              marginTop: "40px",
              marginBottom: "40px",
              textAlign: "left"
            }}
          >
            Ace Interviews, Build Projects & Crush Goals!
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            {items.map((item, index) => (
              <div key={index} style={cardStyle(item.color)}>
                <div>
                  <img
                    src={item.icon}
                    alt={item.title}
                    style={{ width: "50px", height: "50px", marginBottom: "10px" }}
                  />
                  <h3 style={{ fontWeight: 700, marginBottom: "10px" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.4em" }}>{item.desc}</p>
                  <p style={{ marginTop: "10px", fontWeight: "bold", fontSize: "13px" }}>
                    {item.footer}
                  </p>
                </div>
                {item.link ? (
                  <Link to={item.link} style={footerButton(item.hoverColor)}>
                    Start Now →
                  </Link>
                ) : (
                  <div
                    onClick={item.action}
                    style={footerButton(item.hoverColor)}
                  >
                    Start Now →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "40px"
          }}
        >
          <img
            src={require("../../assets/HomeTool.png")}
            alt="Home Tool"
            style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: "12px" }}
          />
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <>
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
              zIndex: 1000
            }}
          >
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
            <h2 style={{ fontWeight: "bold", color: "#1181c8", marginBottom: "10px" }}>
              Upgrade to Plus! 🚀
            </h2>
            <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
              Get premium access to exclusive mentorship, tools, and career-boosting resources.
            </p>
            <button
              onClick={() => alert("Redirecting to purchase page...")}
              style={{
                backgroundColor: "#1181c8",
                color: "#fff",
                padding: "10px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
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
    </div>
  );
};

export default HomeTool;
