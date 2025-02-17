import React, { useState, useEffect } from "react";
import DetailsModal from "../jobpage/detailsModal"; 
import amazonLogo from "../../assets/jobpage/amazon.png";
import googleLogo from "../../assets/jobpage/google.png";
import appleLogo from "../../assets/jobpage/apple.png";

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

  return (
    <div style={{ display: "flex", gap: "20px", padding: "0px" }}>

      {/* Left Filter Sidebar */}
      <div style={{ width: "270px", border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
        <h3 style={{ textAlign: "center" }}>Filters</h3>
        <div style={{ height: "5px", backgroundColor: "#ccc" }}></div>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
          {jobs.map((job, index) => (
            <div
              key={index}
              style={{
                backgroundColor: job.color,
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#555" }}>{job.date}</span>
              <h3>{job.company}</h3>
              <h4>{job.title}</h4>
              <p style={{ fontSize: "14px", color: "#666" }}>
                <span style={{ backgroundColor: "#fff", padding: "3px 8px", borderRadius: "5px", marginRight: "5px" }}>
                  {job.type}
                </span>
                <span style={{ backgroundColor: "#fff", padding: "3px 8px", borderRadius: "5px" }}>{job.level}</span>
              </p>
              {job.logo && (
                <img src={job.logo} alt="company logo" style={{ width: "30px", alignSelf: "flex-end" }} />
              )}
              <button
                onClick={() => openModal(job)}
                style={{
                  backgroundColor: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                Details
              </button>
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
