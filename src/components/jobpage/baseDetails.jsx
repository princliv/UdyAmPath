import React from "react";

const BaseDetails = ({ cityData }) => {
  const expenseDetails = [
    { label: "Monthly Rent", key: "monthly_rent", icon: "/assets/rent.png" },
    { label: "Food Expense", key: "food_expense", icon: "/assets/food.png" },
    { label: "Transport", key: "transport", icon: "/assets/transport.png" },
    { label: "Utilities", key: "utilities", icon: "/assets/utilities.png" },
    { label: "Miscellaneous", key: "miscellaneous", icon: "/assets/misc.png" },
    { label: "Other", key: "other", icon: "/assets/other.png" },
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.background = "#A9A9A9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = colors[index % colors.length];
            }}
          >
            <img src={item.icon} alt={item.label} style={{ width: "50px", height: "50px", marginBottom: "10px" }} />
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
