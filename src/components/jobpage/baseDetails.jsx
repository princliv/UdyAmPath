import React, { useState } from "react";
import rentImg from "../../assets/jobpage/rent.png";
import foodImg from "../../assets/jobpage/food.png";

const BaseDetails = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const data = [
    { title: "Your Monthly Rent", desc: "See how much you'll be paying and what it covers!", img: rentImg },
    { title: "Food Expenses", desc: "Find out how much you're spending on meals each month!", img: foodImg },
    { title: "Your Transport Costs", desc: "Find out how much you'll be spending on getting around!", img: rentImg },
    { title: "Your Miscellaneous Expenses", desc: "Glimpse into those unexpected costs", img: rentImg },
    { title: "Your Utilities", desc: "You'll know what's included in your monthly utility bills!", img: rentImg },
    { title: "Your Transport Costs", desc: "Find out how much you'll be spending on getting around!", img: rentImg },
  ];

  const hoverColors = ["#fff6f1", "#e7ddcd", "#e7edeb"];

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>What You’ll Discover</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", justifyContent: "center" }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              background: hoverIndex === index ? hoverColors[index % hoverColors.length] : "#fff",
              padding: "20px",
              borderRadius: "10px",
              transition: "background 0.3s ease-in-out",
              cursor: "pointer",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={{ flex: 1, textAlign: "left" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 5px 0" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", margin: 0 }}>{item.desc}</p>
            </div>
            <img src={item.img} alt={item.title} style={{ width: "80px", height: "80px", borderRadius: "5px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseDetails;
