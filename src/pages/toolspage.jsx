import React from "react";
import headerBg from '../assets/jobpage/headerbg.png';
import Interview from "../components/toolspage/interview";
import { useNavigate } from "react-router-dom";

const JobPage = () => {
  const navigate = useNavigate(); // 

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      {/* Top Section with Two Cards */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Rectangle */}
        <div style={{ 
          background: "#131346", 
          color: "white", 
          padding: "20px", 
          borderRadius: "10px", 
          width: "250px", 
          textAlign: "center" 
        }}>
          <h2>Chat with your perfect Buddy</h2>
          <button 
            style={{ 
              marginTop: "10px", 
              padding: "10px 15px", 
              background: "#fac832", 
              color: "#131346", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer" 
            }} 
            onClick={() => navigate("")} // 
          >
            Mentora
          </button>
        </div>

        {/* Right Rectangle */}
        <div style={{ 
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px", 
          borderRadius: "10px", 
          flex: 1, 
          marginLeft: "20px" 
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "30px" }}>
              Get your dream job with<span style={{ color: "#004aad" }}> Interview Prep</span> and<br /> 
             <span style={{ color: "#004aad" }}>projects </span>
            </h2>
            <input
              type="text"
              placeholder="Enter"
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "300px" }}
            />
          </div>
          <button style={{ 
            marginTop: "10px", 
            padding: "10px 15px", 
            background: "#004aad", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
            width: "100px", 
            float: "right" 
          }}>
            Search
          </button>
        </div>
      </div>
     <Interview /> 
    </div>
  );
};

export default JobPage;
