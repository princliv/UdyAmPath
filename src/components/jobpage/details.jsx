import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsModal from "../jobpage/detailsModal"; 
import amazonLogo from "../../assets/jobpage/amazon.png";
import googleLogo from "../../assets/jobpage/google.png";
import appleLogo from "../../assets/jobpage/apple.png";
import doneImg from "../../assets/jobpage/done.png";

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
  
  const [typeFilter, setTypeFilter] = useState(""); // Store selected type
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
      (typeFilter === "" || job.type === typeFilter) &&
      (levelFilter === "" || job.level === levelFilter)
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
      {/* Left Filter Sidebar */}
      <div style={{ width: "270px", border: "1px solid #ccc", borderRadius: "10px", padding: "15px", backgroundColor: "#f9f9f9" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Filters</h3>
      <div style={{ height: "5px", backgroundColor: "#ccc", marginBottom: "10px", borderRadius: "5px" }}></div>

      {/* Type Filter - Checkboxes */}
      <label><b>Type:</b></label>
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
        <label>
          <input
            type="checkbox"
            value="On-Site"
            checked={typeFilter === "On-Site"}
            onChange={() => setTypeFilter(typeFilter === "On-Site" ? "" : "On-Site")}
          />
          On-Site
        </label>
        <label>
          <input
            type="checkbox"
            value="Part Time"
            checked={typeFilter === "Part Time"}
            onChange={() => setTypeFilter(typeFilter === "Part Time" ? "" : "Part Time")}
          />
          Part Time
        </label>
      </div>

      {/* Level Filter - Radio Buttons */}
      <label><b>Level:</b></label>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>
          <input
            type="radio"
            name="level"
            value="Senior Level"
            checked={levelFilter === "Senior Level"}
            onChange={(e) => setLevelFilter(e.target.value)}
          />
          Senior Level
        </label>
        <label>
          <input
            type="radio"
            name="level"
            value="Junior Level"
            checked={levelFilter === "Junior Level"}
            onChange={(e) => setLevelFilter(e.target.value)}
          />
          Junior Level
        </label>
      </div>
    </div>

      {/* Right Main Section */}
      <div style={{ flex: 1 }}>
        {/* Top Bar with Job/Internship Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <button
              onClick={() => setSelectedTab("Job")}
              style={{
                backgroundColor: selectedTab === "Job" ? "#3f92c3" : "#ccc",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Job
            </button>
            <button
              onClick={() => setSelectedTab("Internship")}
              style={{
                backgroundColor: selectedTab === "Internship" ? "#3f92c3" : "#ccc",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Internship
            </button>
          </div>
          <span style={{ fontSize: "20px", cursor: "pointer" }}>🔖</span>
        </div>

        {/* Job Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
      {filteredJobs.map((job, index) => (
        <div key={index} style={{ backgroundColor: "#fff", borderRadius: "15px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", padding: "15px", position: "relative", width: "100%", maxWidth: "280px" }}>
          
          {/* Background Color Bar */}
          <div style={{ backgroundColor: job.color, height: "80px", borderRadius: "15px 15px 0 0", position: "relative", display: "flex", alignItems: "center", padding: "10px" }}>
            <span style={{ backgroundColor: "#fff", color: "#333", padding: "3px 8px", borderRadius: "5px", fontSize: "12px", position: "absolute", top: "10px", left: "10px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}>
              {job.type}
            </span>
            {job.logo && (
              <img src={job.logo} alt="Company Logo" style={{ width: "50px", height: "50px", borderRadius: "10px", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", backgroundColor: "#fff", padding: "5px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }} />
            )}
          </div>

          {/* Job Details */}
          <div style={{ padding: "15px", textAlign: "left" }}>
            <h4 style={{ color: "#0073b1", margin: "5px 0" }}>{job.title}</h4>
            <p style={{ color: "#555", fontSize: "14px", marginBottom: "10px" }}>{job.company}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "14px", color: "#777" }}>
              <span>👀 {job.views} Views</span>
              <span>⏳ {job.daysLeft} days left</span>
            </div>

            {/* Level and Detail Button */}
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

            {/* If job is affordable, show 'done.png' */} 
            {job.isAffordable && (
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <img src={doneImg} alt="Done" style={{ width: "50px" }} />
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && <DetailsModal job={selectedJob} onClose={closeModal} />}
    </div>
  );
};

export default Details;
