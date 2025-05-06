import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import amazonLogo from "../../assets/jobpage/amazon.png";
import googleLogo from "../../assets/jobpage/google.png";
import appleLogo from "../../assets/jobpage/apple.png";
import doneImg from "../../assets/jobpage/done.png";
import CityDetailsModal from "../jobpage/CityDetailsModal";

import { useNavigate } from "react-router-dom";



const logoMap = {
  "Amazon": amazonLogo,
  "Google": googleLogo,
  "Apple": appleLogo,
};

const Details = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [interns, setInterns] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Job");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState([]); 
  const [levelFilter, setLevelFilter] = useState(""); // Store selected level

  useEffect(() => {
    fetch("/jobdata.json") // Fetch from public folder
      .then((response) => response.json())
      .then((data) => {
        // Assign the correct logo based on the company name
        const updatedJobs = data.map((job) => ({
          ...job,
          logo: logoMap[job.company] || null, // Fallback to null if logo is missing
        }));
        setJobs(updatedJobs);
      })
      fetch("/interndata.json")
      .then((res) => res.json())
      .then((data) => {
        const updated = data.map((intern) => ({
          ...intern,
          logo: logoMap[intern.company] || null
        }));
        setInterns(updated);
      })
      .catch((error) => console.error("Error loading job data:", error));
  }, []);

  
  const currentData = selectedTab === "Job" ? jobs : interns;


  // Filter jobs based on selected type and level
  const filteredJobs = currentData.filter((job) => {
    return (
      (typeFilter.length === 0 || typeFilter.includes(job.type)) && // ✅ Fix type filter check
      (levelFilter === "" || job.level.trim().toLowerCase() === levelFilter.trim().toLowerCase()) // ✅ Case insensitive comparison
    );
  });
  
  
  const { city } = useParams(); // Get city from URL
  const [cityInfo, setCityInfo] = useState(null);

  useEffect(() => {
    fetch(`/citydata.json`) // Replace with your API
      .then((res) => res.json())
      .then((data) => {
        const selectedCity = data.find((c) => c.name === city);
        setCityInfo(selectedCity);
      })
      .catch((error) => console.error("Error fetching city data:", error));
  }, [city]);

  if (!cityInfo) return <p>Loading city details...</p>;
  
  const { total_expense } = cityInfo;

  filteredJobs.forEach((job) => {
    job.isAffordable = job.salary > total_expense;
  });
  

  return (
    <div style={{ display: "flex", gap: "20px", padding: "0px" }}>
  {/* Left Sidebar */}
  <div
  style={{
    width: "242px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    fontFamily: "Segoe UI, sans-serif",
    color: "#333",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "16px",
    }}
  >
    🔍 Filters
  </h2>

  <section style={{ marginBottom: "24px" }}>
    <p style={{ fontWeight: "600", marginBottom: "10px" }}>Type</p>
    {["On-Site", "Part Time"].map((type) => (
      <label
        key={type}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          borderRadius: "10px",
          marginBottom: "8px",
          background: typeFilter.includes(type) ? "#E6F0FA" : "#f5f5f5",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
      >
        <input
          type="checkbox"
          checked={typeFilter.includes(type)}
          onChange={() =>
            setTypeFilter((prev) =>
              prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
            )
          }
          style={{ marginRight: "10px", accentColor: "#3F92C3" }}
        />
        {type}
      </label>
    ))}
  </section>

  <section>
    <p style={{ fontWeight: "600", marginBottom: "10px" }}>Level</p>
    {["Senior Level", "Junior Level"].map((level) => (
      <label
        key={level}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          borderRadius: "10px",
          marginBottom: "8px",
          background: levelFilter === level ? "#E6F0FA" : "#f5f5f5",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
      >
        <input
          type="radio"
          name="level"
          value={level}
          checked={levelFilter === level}
          onChange={(e) => setLevelFilter(e.target.value)}
          style={{ marginRight: "10px", accentColor: "#3F92C3" }}
        />
        {level}
      </label>
    ))}
  </section>
</div>

  {/* Right Section */}
  <div style={{ flex: 1 }}>
      {/* Toggle Buttons */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"
      }}>
        <div>
          {["Job", "Internship"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              style={{
                backgroundColor: selectedTab === tab ? "#3f92c3" : "#e0e0e0",
                color: selectedTab === tab ? "white" : "#333",
                fontWeight: "600",
                padding: "10px 15px",
                border: "none",
                borderRadius: "8px",
                marginRight: "10px",
                cursor: "pointer",
                boxShadow: selectedTab === tab ? "0px 4px 10px rgba(0,0,0,0.15)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <span style={{ fontSize: "20px", cursor: "pointer" }}>🔖</span>
      </div>

    {/* Job Cards Grid */}
    <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "40px",
        paddingBottom: "40px"
      }}>
        {filteredJobs.map((job, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0px 12px 25px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0,0,0,0.05)";
            }}
          >
            {/* Header */}
            <div style={{
              backgroundColor: job.color,
              height: "80px",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              position: "relative"
            }}>
              <span style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "#fff",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#333"
              }}>
                {job.type}
              </span>
              {job.logo && (
                <img
                  src={job.logo}
                  alt="Logo"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                    padding: "5px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  }}
                />
              )}
            </div>
          {/* Job Details */}
          <div style={{ padding: "15px" }}>
              <h4 style={{ color: "#0073b1", margin: "5px 0", fontWeight: "700" }}>{job.title}</h4>
              <p style={{ color: "#555", fontSize: "14px", marginBottom: "10px", fontWeight: "500" }}>{job.company}</p>

              <div style={{ fontSize: "13px", color: "#777", marginBottom: "10px" }}>
                ⏳ {job.daysLeft} days left
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{
                  backgroundColor: "#eef3f8",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  color: "#333",
                  fontWeight: 600
                }}>{job.level}</span>
                <button
                  onClick={() => {
                    if (job.type === "Internship") {
                      navigate("/intern-apply", { state: { job } });
                    } else {
                      navigate("/jobDetails", { state: { job } });;
                    }
                  }}
                  
                  style={{
                    backgroundColor: "#0073b1",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    cursor: "pointer",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
                  }}
                >➜</button>
              </div>
            </div>


          
          {/* Done Image if Affordable */}
          {job.isAffordable && (
              <div style={{
                position: "absolute",
                top: "80px",
                left: "20px",
                backgroundColor: "rgba(255, 255, 0, 0.5)",
                padding: "5px 10px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                zIndex: 1
              }}>
                <img src={doneImg} alt="Done" style={{ width: "20px", marginRight: "5px" }} />
                <button
                  onClick={() => setIsCityModalOpen(true)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    fontWeight: "bold",
                    color: "#333",
                    cursor: "pointer"
                  }}
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>


    {/* Modal styles */}
    {isCityModalOpen && <CityDetailsModal cityInfo={cityInfo} onClose={() => setIsCityModalOpen(false)} style={{ zIndex: 1000 }} />}

  </div>
</div>
  );
};

export default Details;
