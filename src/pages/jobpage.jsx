import React, { useState, useEffect } from "react";
import Details from "../components/jobpage/details";
import headerBg from "../assets/jobpage/headerbg.png";
import applyGif from "../assets/jobpage/apply.gif";
import { useNavigate } from "react-router-dom";

const JobPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState(""); 

  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ background: "#131346", color: "white", padding: "20px", borderRadius: "10px", width: "250px", textAlign: "center" }}>
          <h2>Know the Cost of Living Around You</h2>
          <button 
            style={{ marginTop: "10px", padding: "10px 15px", background: "white", color: "#131346", border: "none", borderRadius: "5px", cursor: "pointer" }} 
            onClick={() => navigate("/base")}
          >
            Learn More
          </button>
        </div>

        <div style={{ 
          backgroundImage: `url(${headerBg})`, backgroundSize: "cover", 
          backgroundPosition: "center", backgroundRepeat: "no-repeat",
          padding: "20px", borderRadius: "10px", flex: 1 
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "28px" }}>
              Get Recommendations based on the <span style={{ color: "#004aad" }}>Salary</span> with<br /> 
              respect to <span style={{ color: "#004aad" }}>Expense</span>
            </h2>
            <input
              type="text"
              placeholder="Enter city name (e.g., New York)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "300px" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <button 
              style={{ padding: "10px 15px", background: "#004aad", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Pass City Name to Details Component */}
      <Details city={city} />

      {/* Modal */}
      {showModal && (
        <>
          {/* Modal Overlay */}
          <div style={{
            position: "fixed",
            top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0, 0, 0, 0.5)", zIndex: 999
          }} />
          
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
            <p>We recommended jobs that are best for you</p>
            <img src={applyGif} alt="Apply GIF" style={{ width: "80px", margin: "10px 0" }} />
            <p>Click <b>'View Details'</b> to explore insights</p>
          </div>
        </>
      )}
    </div>
  );
};

export default JobPage;
