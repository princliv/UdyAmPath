import React, { useState } from "react";
import Details from "../components/jobpage/details";
import headerBg from "../assets/jobpage/headerbg.png";
import applyGif from "../assets/jobpage/apply.gif";
import { useNavigate } from "react-router-dom";

const JobPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState(""); // Store the city name

  const handleApplyClick = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      {/* Top Section with Two Cards */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ background: "#131346", color: "white", padding: "20px", borderRadius: "10px", width: "250px", textAlign: "center" }}>
          <h2>Know the Cost of Living Around You</h2>
          <button 
            style={{ marginTop: "10px", padding: "10px 15px", background: "white", color: "#131346", border: "none", borderRadius: "5px", cursor: "pointer" }} 
            onClick={() => navigate("/base")}
          >
            Learn More
          </button>
        </div>

        <div style={{ backgroundImage: `url(${headerBg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", padding: "20px", borderRadius: "10px", flex: 1, marginLeft: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "30px" }}>
              Get Recommendation based on the <span style={{ color: "#004aad" }}>Salary</span> with<br /> 
              respect to <span style={{ color: "#004aad" }}>Expense</span>
            </h2>
            <input
              type="text"
              placeholder="Enter Living City"
              value={city}
              onChange={(e) => setCity(e.target.value)} // Update state
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "300px" }}
            />
          </div>
          <button 
            style={{ marginTop: "10px", padding: "10px 15px", background: "#004aad", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "100px", float: "right" }}
            onClick={handleApplyClick}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Pass City Name to Details */}
      <Details city={city} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          width: "300px",
          zIndex: 1000
        }}>
          <h2>Yayy! 😊</h2>
          <p>We recommended jobs that's best for you</p>
          <img src={applyGif} alt="Apply GIF" style={{ width: "80px", margin: "10px 0" }} />
          <p>Click <b>'View Details'</b> to explore insights</p>
        </div>
      )}
    </div>
  );
};

export default JobPage;
