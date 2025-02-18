import React from "react";
import confusedGif from "../../assets/jobpage/confused.gif"; // Animated icon
import headerBg from "../../assets/jobpage/headerbg.png"; // Background image for search section
import BaseDetails from "../jobpage/baseDetails";

const BasePage = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      {/* Title Section */}
      <div>
        <h2 style={{ color: "#004369", fontSize: "24px", fontWeight: "bold" }}>
          Confused About Your Favorite City’s Budget 
          <img 
            src={confusedGif} 
            alt="Confused Icon" 
            style={{ width: "70px", height: "70px", verticalAlign: "middle", marginLeft: "10px" }} 
            />

        </h2>
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
          Uncover the Costs Now!
        </h1>
      </div>

      {/* Search Section */}
      <div style={{ 
        backgroundImage: `url(${headerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px", 
        borderRadius: "10px", 
        width: "60%", 
        margin: "30px auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "22px", textAlign: "left" }}>
            Get Recommendation based on the <span style={{ color: "#004aad" }}>Salary</span> with<br /> 
            respect to <span style={{ color: "#004aad" }}>Expense</span>
          </h2>
          <input
            type="text"
            placeholder="Enter Living City"
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "250px" }}
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
      <BaseDetails />
    </div>
  );
};

export default BasePage;
