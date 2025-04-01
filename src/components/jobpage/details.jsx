import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsModal from "../jobpage/detailsModal"; 
import amazonLogo from "../../assets/jobpage/amazon.png";
import googleLogo from "../../assets/jobpage/google.png";
import appleLogo from "../../assets/jobpage/apple.png";
import doneImg from "../../assets/jobpage/done.png";
import CityDetailsModal from "../jobpage/CityDetailsModal"

const logoMap = {
  "Amazon": amazonLogo,
  "Google": googleLogo,
  "Apple": appleLogo,
};

const Details = () => {
  const [jobs, setJobs] = useState([]);
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
      .catch((error) => console.error("Error loading job data:", error));
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // Filter jobs based on selected type and level
  const filteredJobs = jobs.filter((job) => {
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
  <div style={{ width: "270px", border: "1px solid #ccc", borderRadius: "10px", padding: "15px", backgroundColor: "#f9f9f9" }}>
    <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Filters</h3>
    <div style={{ height: "5px", backgroundColor: "#ccc", marginBottom: "10px", borderRadius: "5px" }}></div>

    {/* Type Filter */}
    <label><b>Type:</b></label>
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
      {["On-Site", "Part Time"].map((type) => (
        <label key={type}>
          <input
            type="checkbox"
            value={type}
            checked={typeFilter.includes(type)}
            onChange={() =>
              setTypeFilter((prev) =>
                prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
              )
            }
          />
          {type}
        </label>
      ))}
    </div>

    {/* Level Filter */}
    <label><b>Level:</b></label>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {["Senior Level", "Junior Level"].map((level) => (
        <label key={level}>
          <input
            type="radio"
            name="level"
            value={level}
            checked={levelFilter === level}
            onChange={(e) => setLevelFilter(e.target.value)}
          />
          {level}
        </label>
      ))}
    </div>
  </div>

  {/* Right Section */}
  <div style={{ flex: 1 }}>
    {/* Toggle Buttons */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
      <div>
        {["Job", "Internship"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={{
              backgroundColor: selectedTab === tab ? "#3f92c3" : "#ccc",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer",
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
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
      gap: "20px" 
    }}>
      {filteredJobs.map((job, index) => (
        <div 
          key={index} 
          style={{ 
            backgroundColor: "#fff", 
            borderRadius: "15px", 
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
            padding: "15px", 
            position: "relative", 
            width: "100%", 
            maxWidth: "280px",
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-between"
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: job.color, height: "80px", borderRadius: "15px 15px 0 0", position: "relative", display: "flex", alignItems: "center", padding: "10px" }}>
            <span style={{ backgroundColor: "#fff", color: "#333", padding: "3px 8px", borderRadius: "5px", fontSize: "12px", position: "absolute", top: "10px", left: "10px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}>
              {job.type}
            </span>
            {job.logo && (
              <img 
                src={job.logo} 
                alt="Company Logo" 
                style={{ 
                  width: "50px", 
                  height: "50px", 
                  borderRadius: "10px", 
                  position: "absolute", 
                  right: "10px", 
                  top: "50%", 
                  transform: "translateY(-50%)", 
                  backgroundColor: "#fff", 
                  padding: "5px", 
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" 
                }} 
              />
            )}
          </div>

          {/* Job Details */}
          <div style={{ padding: "15px", textAlign: "left" }}>
            <h4 style={{ color: "#0073b1", margin: "5px 0" }}>{job.title}</h4>
            <p style={{ color: "#555", fontSize: "14px", marginBottom: "10px" }}>{job.company}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "14px", color: "#777" }}>
              <span>⏳ {job.daysLeft} days left</span>
            </div>

            {/* Level and Details Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
              <span style={{ backgroundColor: "#eef3f8", padding: "5px 10px", borderRadius: "5px", fontSize: "12px", color: "#333" }}>
                {job.level}
              </span>
              <button 
                style={{ backgroundColor: "#0073b1", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "50%", cursor: "pointer" }} 
                onClick={() => openModal(job)} 
              >
                ➜ 
              </button>
            </div>
          </div>

          {/* "Done" Image with View Details Button */}
          {job.isAffordable && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px", backgroundColor: "yellow", padding: "10px", borderRadius: "5px", minHeight: "50px" }}>
            <img src={doneImg} alt="Done" style={{ width: "30px", marginRight: "10px" }} />
            <button 
              onClick={() => setIsCityModalOpen(true)} 
              style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontWeight: "bold" }}
            >
              View Details
            </button>
          </div>
          
          )}
        </div>
      ))}
    </div>

    {/* Details Modal */}
    {isModalOpen && <DetailsModal job={selectedJob} onClose={closeModal} />}
    {isCityModalOpen && <CityDetailsModal cityInfo={cityInfo} onClose={() => setIsCityModalOpen(false)} />}

  </div>
</div>
  );
};

export default Details;
