import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import rentIcon from "../../assets/jobpage/rent.png";
import foodIcon from "../../assets/jobpage/food.png";
import transportIcon from "../../assets/jobpage/tranport.png";
import utilitiesIcon from "../../assets/jobpage/Utilities.png";
import miscIcon from "../../assets/jobpage/miscellaneous.png";
import otherIcon from "../../assets/jobpage/other.png";

const BaseDetails = ({ cityData }) => {
  // Calculate total expense
  const totalExpense = [
    cityData?.monthly_rent,
    cityData?.food_expense,
    cityData?.transport,
    cityData?.utilities,
    cityData?.miscellaneous,
    cityData?.other
  ].reduce((total, expense) => total + (expense || 0), 0);

  const monthlyTrendData = [
    { month: "Jan", expense: totalExpense - 3000 },
    { month: "Feb", expense: totalExpense - 2000 },
    { month: "Mar", expense: totalExpense - 1000 },
    { month: "Apr", expense: totalExpense },
    { month: "May", expense: totalExpense + 2000 },
    { month: "Jun", expense: totalExpense + 1000 },
    { month: "Jul", expense: totalExpense + 3000 },
    { month: "Aug", expense: totalExpense + 2000 },
    { month: "Sep", expense: totalExpense - 1500 },
    { month: "Oct", expense: totalExpense },
    { month: "Nov", expense: totalExpense + 1500 },
    { month: "Dec", expense: totalExpense + 2500 },
  ];

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

      {/* Line Chart for Monthly Variations */}
      
      {monthlyTrendData.length > 0 && (
  <div
    style={{
      marginTop: "30px",
      width: "80%", // Reduced width for more balance
      margin: "0 auto",
      padding: "15px", // Slightly reduced padding
      background: "linear-gradient(135deg, #e0eafc, #f9f9f9)", // Soft gradient background
      borderRadius: "12px", // Smaller rounded corners for a sleeker look
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Slightly softer and more subtle shadow
      textAlign: "center",
    }}
  >
    <h3
      style={{
        color: "#2c3e50",
        marginBottom: "20px",
        fontSize: "22px", // Slightly smaller title for better proportions
        fontWeight: "bold",
      }}
    >
      Monthly Expense Variations
    </h3>

    <ResponsiveContainer width="100%" height={250}> {/* Reduced height for a compact feel */}
      <LineChart data={monthlyTrendData}>
        <CartesianGrid
          strokeDasharray="5 5"
          stroke="#ddd"
        />
        <XAxis
          dataKey="month"
          tick={{ fill: "#7f8c8d", fontSize: 12 }} // Smaller tick labels
          axisLine={{ stroke: "#ddd" }}
        />
        <YAxis
          tick={{ fill: "#7f8c8d", fontSize: 12 }} // Smaller tick labels
          axisLine={{ stroke: "#ddd" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
            fontSize: "14px",
          }}
          labelStyle={{
            color: "#2c3e50",
            fontWeight: "bold",
          }}
          itemStyle={{
            color: "#2c3e50",
            fontSize: "16px",
          }}
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="url(#gradientStroke)" // Gradient stroke for more appeal
          strokeWidth={3} // Thinner line for a smoother look
          dot={{
            stroke: "#2c3e50",
            strokeWidth: 2,
            r: 6,
            fill: "#fff",
          }}
          activeDot={{
            r: 9, // Slightly smaller active dot
            stroke: "#f39c12",
            strokeWidth: 3,
            fill: "#fff",
          }}
        />
        <defs>
          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4bcf91" />
            <stop offset="100%" stopColor="#4f85e6" />
          </linearGradient>
        </defs>
      </LineChart>
    </ResponsiveContainer>
  </div>
)}


      
    </div>
  );
};

export default BaseDetails;
