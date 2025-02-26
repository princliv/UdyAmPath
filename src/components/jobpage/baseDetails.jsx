import React from "react";
import rentIcon from "../../assets/jobpage/rent.png";
import foodIcon from "../../assets/jobpage/food.png";
import transportIcon from "../../assets/jobpage/tranport.png";
import utilitiesIcon from "../../assets/jobpage/Utilities.png";
import miscIcon from "../../assets/jobpage/miscellaneous.png";
import otherIcon from "../../assets/jobpage/other.png";

const BaseDetails = ({ cityData }) => {
  const expenseDetails = [
    { label: "Monthly Rent", key: "monthly_rent", icon: rentIcon },
    { label: "Food Expense", key: "food_expense", icon: foodIcon },
    { label: "Transport", key: "transport", icon: transportIcon },
    { label: "Utilities", key: "utilities", icon: utilitiesIcon },
    { label: "Miscellaneous", key: "miscellaneous", icon: miscIcon },
    { label: "Other", key: "other", icon: otherIcon },
  ];

  const heading = cityData ? "Here are the details" : "What will you know?";

  const colors = ["#E6E6FA", "#FFDEE9", "#D6EAF8", "#FADADD", "#C5E1A5", "#FFDAB9"];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#004369", marginBottom: "20px" }}>
        {heading}
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {expenseDetails.map((item, index) => (
          <div
            key={index}
            style={{
              background: colors[index % colors.length], 
              color: "#004aad",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, background 0.3s ease",
              width: "180px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.background = "#A9A9A9";
              e.currentTarget.querySelector("img").style.transform = "translateY(-20px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = colors[index % colors.length];
              e.currentTarget.querySelector("img").style.transform = "translateY(0)";
            }}
          >
            <img
              src={item.icon}
              alt={item.label}
              style={{
                width: "200px",
                height: "100px",
                marginBottom: "10px",
                transition: "transform 0.3s ease",
              }}
            />
            <p style={{ fontSize: "18px", margin: "5px 0" }}>{item.label}</p>
            {cityData && (
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                ₹{cityData[item.key]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseDetails;
