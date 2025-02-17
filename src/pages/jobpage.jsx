import React from "react";
import Details from "../components/jobpage/details";
import headerBg from '../assets/jobpage/headerbg.png';

const JobPage = () => {
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
          <h2>Know the Cost of Living Around You</h2>
          <button style={{ 
            marginTop: "10px", 
            padding: "10px 15px", 
            background: "white", 
            color: "#131346", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
          }}>
            Learn More
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
              Get Recommendation based on the <span style={{ color: "#004aad" }}>Salary</span> with<br /> 
              respect to <span style={{ color: "#004aad" }}>Expense</span>
            </h2>
            <input
              type="text"
              placeholder="Enter Living City"
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
            Apply
          </button>
        </div>
      </div>

      {/* Details Section Below */}
      <Details />
    </div>
  );
};

export default JobPage;
