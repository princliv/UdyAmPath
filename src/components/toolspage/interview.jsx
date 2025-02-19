import React from "react";
import successGif from "../../assets/toolpage/success.gif";
import interviewImg from "../../assets/toolpage/interview.png";

const Interview = () => {
  const interviewData = [
    { title: "Software Developer", desc: "Get interview questions", img: interviewImg },
    { title: "Software Developer", desc: "Get interview questions", img: interviewImg },
    { title: "Software Developer", desc: "Get interview questions", img: interviewImg },
    { title: "Software Developer", desc: "Get interview questions", img: interviewImg },
  ];

  return (
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "flex-end",
        maxWidth: "1500px", // Increased width
        margin: "auto",
        background: "#fff",
      }}
    >
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
        Cracking the Code: Your Ultimate Tech Interview Prep
        <img src={successGif} alt="Success Icon" style={{ width: "60px", height: "60px" }} />
      </h2>

      {/* Interview Boxes */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {interviewData.map((item, index) => (
          <div
            key={index}
            style={{
              width: "220px", // Slightly increased card width
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img src={item.img} alt={item.title} style={{ width: "100%", borderRadius: "5px" }} />
            <h3 style={{ fontSize: "16px", margin: "10px 0 5px", fontWeight: "bold" }}>{item.title}</h3>
            <p style={{ fontSize: "14px", margin: "0 0 10px" }}>{item.desc}</p>
            <a href="#" style={{ fontSize: "14px", color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>
              View more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interview;
