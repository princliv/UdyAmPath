import React from "react";

const CityDetailsModal = ({ cityInfo, onClose }) => {
  if (!cityInfo) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%", 
      backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "420px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", textAlign: "center"
      }}>
        <h2 style={{ color: "#196795", fontSize: "22px", marginBottom: "15px" }}>
          {cityInfo.city} - Expenses
        </h2>
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
            marginTop: "15px", backgroundColor: "#d9534f", color: "white",
            padding: "8px 15px", border: "none", borderRadius: "6px", cursor: "pointer",
            fontSize: "16px", fontWeight: "bold"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CityDetailsModal;
