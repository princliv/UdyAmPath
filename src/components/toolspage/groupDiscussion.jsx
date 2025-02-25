import React, { useEffect, useState } from "react";
import discussionGif from "../../assets/toolpage/discussion.gif"; 

const GroupDiscussion = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const topics = [
    {
      topic: "Artificial Intelligence: Boon or Bane?",
      forPoints: [
        "Enhances efficiency and automation",
        "Reduces human errors",
        "Helps in medical advancements",
      ],
      againstPoints: [
        "Job displacement due to automation",
        "Ethical concerns regarding AI decision-making",
        "Security risks and misuse potential",
      ],
    },
    {
      topic: "Remote Work vs. Office Work",
      forPoints: [
        "Flexibility improves work-life balance",
        "Saves commuting time and costs",
        "Boosts productivity for self-disciplined employees",
      ],
      againstPoints: [
        "Lack of team collaboration and bonding",
        "Distractions at home reduce efficiency",
        "Difficulties in monitoring performance",
      ],
    },
    {
      topic: "Climate Change: Is Enough Being Done?",
      forPoints: [
        "Global awareness and initiatives are increasing",
        "Advancements in renewable energy sources",
        "Companies adopting sustainable practices",
      ],
      againstPoints: [
        "Policies are not strict enough",
        "Developing countries still rely on fossil fuels",
        "Consumerism and waste are at an all-time high",
      ],
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        background: "linear-gradient(135deg, #ffffff, #f3f8ff)",
        borderRadius: "15px",
        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 1s ease-out, transform 1s ease-out",
      }}
    >
      <h2 style={{ color: "#222", fontSize: "30px", marginBottom: "15px" }}>
        🗣️ Enhance Your Group Discussion Skills
      </h2>
      
      <img
        src={discussionGif}
        alt="Group Discussion"
        style={{
          width: "90%",
          maxWidth: "350px",
          borderRadius: "12px",
          marginBottom: "15px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          animation: "glow 2s infinite alternate",
        }}
      />
      
      <ul style={{ textAlign: "left", color: "#333", fontSize: "16px", paddingLeft: "20px" }}>
        <li>✔️ Stay confident and maintain eye contact.</li>
        <li>✔️ Listen actively and respect others’ opinions.</li>
        <li>✔️ Use facts and examples to support your points.</li>
        <li>✔️ Keep your points clear and concise.</li>
        <li>✔️ Encourage participation and avoid dominating the discussion.</li>
      </ul>

      <h2 style={{ color: "#222", fontSize: "26px", marginTop: "30px" }}>
        🔥 Popular Discussion Topics
      </h2>

      {topics.map((item, index) => (
        <div
          key={index}
          style={{
            background: "linear-gradient(135deg, #ffffff, #eef2ff)",
            padding: "18px",
            borderRadius: "10px",
            marginBottom: "15px",
            boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3
            style={{
              color: "#007BFF",
              fontSize: "20px",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.color = "#0056b3")}
            onMouseOut={(e) => (e.target.style.color = "#007BFF")}
          >
            {item.topic}
          </h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <div style={{ width: "45%", textAlign: "left", borderRight: "2px solid #ddd", paddingRight: "10px" }}>
              <h4 style={{ color: "green" }}>✅ For</h4>
              <ul>
                {item.forPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
            <div style={{ width: "45%", textAlign: "left", paddingLeft: "10px" }}>
              <h4 style={{ color: "red" }}>❌ Against</h4>
              <ul>
                {item.againstPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupDiscussion;
