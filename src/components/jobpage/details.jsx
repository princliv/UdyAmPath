import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import amazonLogo from "../../assets/jobpage/amazon.png";
import googleLogo from "../../assets/jobpage/google.png";
import appleLogo from "../../assets/jobpage/apple.png";
import doneImg from "../../assets/jobpage/done.png";
import CityDetailsModal from "../jobpage/CityDetailsModal";

import { useNavigate } from "react-router-dom";
import { CONTENT_TYPES, fetchRecruiterContent } from "../../firebase/recruiterContent";



const logoMap = {
  "Amazon": amazonLogo,
  "Google": googleLogo,
  "Apple": appleLogo,
};

const Details = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [interns, setInterns] = useState([]);
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

    const loadRecruiterJobs = async () => {
      try {
        const recruiterItems = await fetchRecruiterContent(CONTENT_TYPES.JOBS, { onlyPublished: true, includeExpired: false });
        const mappedItems = recruiterItems.map((item) => {
          const applyDate = item.applyBefore ? new Date(item.applyBefore) : null;
          const now = new Date();
          const daysLeft = applyDate
            ? Math.max(0, Math.ceil((applyDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
            : 0;

          return {
            id: item.id,
            title: item.title || item.position || "Untitled Role",
            company: item.company || item.recruiterEmail || "Recruiter Posted",
            type: item.type || "On-Site",
            level: item.level || "Junior Level",
            salary: Number(item.salary) || 0,
            daysLeft,
            mode: item.mode || "",
            qualification: item.qualification || "",
            experience: item.experience || "",
            rounds: item.rounds || "",
            applyBefore: item.applyBefore || "",
            description: item.description || "",
            skills: item.skills || [],
            color: "#d9f0ff",
            logo: null,
            roleType: item.roleType || "Job",
            recruiterId: item.recruiterId || null,
          };
        });
        const recruiterJobs = mappedItems.filter((item) => item.roleType === "Job");
        const recruiterInternships = mappedItems.filter((item) => item.roleType === "Internship");

        setJobs((prev) => {
          const merged = [...prev, ...recruiterJobs];
          const seen = new Set();
          return merged.filter((entry) => {
            const key = `${entry.title}-${entry.company}-${entry.roleType || "Job"}`.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        });
        setInterns((prev) => {
          const merged = [...prev, ...recruiterInternships];
          const seen = new Set();
          return merged.filter((entry) => {
            const key = `${entry.title}-${entry.company}-${entry.roleType || "Internship"}`.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        });
      } catch (error) {
        console.error("Error loading recruiter jobs:", error);
      }
    };

    loadRecruiterJobs();
  }, []);

  
  const currentData = selectedTab === "Job" ? jobs : interns;


  // Filter jobs based on selected type and level
  const filteredJobs = useMemo(() => {
    return currentData.filter((job) => {
      return (
        (typeFilter.length === 0 || typeFilter.includes(job.type)) &&
        (levelFilter === "" || job.level.trim().toLowerCase() === levelFilter.trim().toLowerCase())
      );
    });
  }, [currentData, typeFilter, levelFilter]);
  
  
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

  const total_expense = cityInfo?.total_expense || 0;

  const displayJobs = useMemo(
    () => filteredJobs.map((job) => ({ ...job, isAffordable: Number(job.salary) > Number(total_expense) })),
    [filteredJobs, total_expense]
  );
  
  if (!cityInfo) return <p>Loading city details...</p>;
  

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
  {/* Resume Preview & Feedback */}
<div
  style={{
    marginTop: "24px",
    padding: "24px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #E6F0FA, #F9FBFF)",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
    textAlign: "center",
  }}
>
  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#2B4F81", marginBottom: "12px" }}>
    📄 Resume Preview & Feedback
  </h3>
  <p style={{ fontSize: "14px", color: "#444", marginBottom: "16px", lineHeight: "1.6" }}>
    Upload your resume to receive smart feedback and keyword insights based on the role you're applying for.
  </p>
  <button
    onClick={() => navigate("/resume-check")}
    style={{
      backgroundColor: "#3F92C3",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.3s ease",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#196795")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#3F92C3")}
  >
    Check My Resume
  </button>
</div>

{/* Interview Readiness Checklist */}
<div
  style={{
    marginTop: "20px",
    padding: "24px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #E6F0FA, #F9FBFF)",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
    textAlign: "center",
  }}
>
  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#2B4F81", marginBottom: "12px" }}>
    ✅ Interview Readiness Checklist
  </h3>
  <p style={{ fontSize: "14px", color: "#444", marginBottom: "16px", lineHeight: "1.6" }}>
    Use this simple checklist to stay confident and prepared before applying or interviewing.
  </p>
  <button
    onClick={() => navigate("/interview-checklist")}
    style={{
      backgroundColor: "#3F92C3",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.3s ease",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#196795")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#3F92C3")}
  >
    View Checklist
  </button>
</div>


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
        {displayJobs.map((job, index) => (
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
                    if (selectedTab === "Internship") {
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
