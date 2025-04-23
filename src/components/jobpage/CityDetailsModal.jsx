import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

const CityDetailsModal = ({ cityInfo, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!cityInfo) return null;

  const data = [
    { name: "Monthly Rent", value: cityInfo.monthly_rent },
    { name: "Food", value: cityInfo.food_expense },
    { name: "Transport", value: cityInfo.transport },
    { name: "Utilities", value: cityInfo.utilities },
    { name: "Miscellaneous", value: cityInfo.miscellaneous },
    { name: "Other", value: cityInfo.other },
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "420px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#196795", fontSize: "22px", marginBottom: "15px" }}>
          {cityInfo.city} - Expenses
        </h2>

        {/* Graph */}
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={30}
              fill="#8884d8"
              activeIndex={activeIndex}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              isAnimationActive={true}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={activeIndex === index ? "#000" : "#fff"}
                  strokeWidth={activeIndex === index ? 2 : 1}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`₹${value}`, "Expense"]} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>

        {/* Expense Details */}
        <div style={{ textAlign: "left", fontSize: "16px", lineHeight: "1.6" }}>
          <p><b>Monthly Rent:</b> ₹{cityInfo.monthly_rent}</p>
          <p><b>Food Expense:</b> ₹{cityInfo.food_expense}</p>
          <p><b>Transport:</b> ₹{cityInfo.transport}</p>
          <p><b>Utilities:</b> ₹{cityInfo.utilities}</p>
          <p><b>Miscellaneous:</b> ₹{cityInfo.miscellaneous}</p>
          <p><b>Other:</b> ₹{cityInfo.other}</p>
          <hr style={{ margin: "10px 0", border: "0.5px solid #ccc" }} />
          <p style={{ fontWeight: "bold", fontSize: "18px", color: "#3F92C3" }}>
            Total Expense: ₹{cityInfo.total_expense}
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "15px",
            backgroundColor: "#d9534f",
            color: "white",
            padding: "8px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CityDetailsModal;
