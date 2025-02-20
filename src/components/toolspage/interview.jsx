import React from "react";
import successGif from "../../assets/toolpage/success.gif";
import interviewImg from "../../assets/toolpage/interview.png";
import hrInterview from "../../assets/toolpage/hrinterview.png";
import groupDiscussion from "../../assets/toolpage/groupDicussion.png";
import placement from "../../assets/toolpage/placement.png";
import SoftSkill from "../toolspage/softSkill";
import Project from "./project";


const Interview = () => {
  const interviewData = [
    { title: "Technical Interview", desc: "Prepare with technical questions", img: interviewImg, link: "/techInterview" },
    { title: "HR Interview", desc: "Practice common HR questions", img: hrInterview, link: "/hrInterview" },
    { title: "Group Discussion", desc: "Enhance your discussion skills", img: groupDiscussion, link: "/groupdiscussion" },
    { title: "Placement Papers", desc: "Access previous exam papers", img: placement, link: "/placement-papers" },
  ];

  return (
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        maxWidth: "1500px",
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
        <img src={successGif} alt="Success Icon" style={{ width: "74px", height: "74px" }} />
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
              width: "220px",
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            {/* Fixed Image Size */}
            <img 
              src={item.img} 
              alt={item.title} 
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }} 
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0 5px", fontWeight: "bold" }}>{item.title}</h3>
            <p style={{ fontSize: "14px", margin: "0 0 10px" }}>{item.desc}</p>
            <a 
              href={item.link} 
              style={{ fontSize: "14px", color: "#007bff", textDecoration: "none", fontWeight: "bold" }}
            >
              View
            </a>
          </div>
        ))}
      </div>
      <SoftSkill />
      <Project />
    </div>
  );
};

export default Interview;
