import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import images locally
import amazonIcon from "../../assets/jobpage/amazon.png";
import googleIcon from "../../assets/jobpage/google.png";
import microsoftIcon from "../../assets/jobpage/google.png";

// Mapping company names to their icons
const companyIcons = {
  Amazon: amazonIcon,
  Google: googleIcon,
  Microsoft: microsoftIcon,
};

const PlacementPaper = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [practiceData, setPracticeData] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [ setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setCategories(Object.entries(practiceData)); // Convert JSON into array
  }, []);

  const handleClick = (paper) => {
    navigate("/placeTest", { state: { title: paper.title, description: paper.description } });
  };

  // Fetch the JSON data from the public folder
  useEffect(() => {
    fetch("/companies.json")
      .then((res) => res.json())
      .then((data) => {
        setCompaniesData(data);
      })
      .catch((err) => console.error("Error fetching companies.json:", err));

    fetch("/practiceData.json")
      .then((res) => res.json())
      .then((data) => {
        setPracticeData(data);
        const tabs = Object.keys(data);
        if (tabs.length > 0) {
          setActiveTab(tabs[0]);
        }
      })
      .catch((err) => console.error("Error fetching practiceData.json:", err));
  }, []);

  const tabs = Object.keys(practiceData);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Top Company's Placement Sheet */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Top Company's Placement Sheet
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {companiesData.map((company, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              width: "200px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={companyIcons[company.name]}
              alt={company.name}
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
              {company.name}
            </h3>
            <a href={company.pdf} target="_blank" rel="noopener noreferrer">
              <button
                style={{
                  backgroundColor: "#196795",
                  color: "white",
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 10px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 3px 5px rgba(0, 0, 0, 0.2)";
                }}
              >
                View PDF
              </button>
            </a>
          </div>
        ))}
      </div>

      {/* Practice Papers Section with Tabs */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Skill Based Mock Test (Assessments)
      </h2>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>
        Master your concepts with level-wise tests, followed by full-length mock
        exams for 360° preparation!
      </p>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? "#196795" : "#eee",
              color: activeTab === tab ? "#fff" : "#333",
              padding: "10px 20px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontWeight: "bold",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Practice Papers Cards for Active Tab */}
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        padding: "0 20px",
      }}
    >
      {practiceData[activeTab] &&
        practiceData[activeTab].map((paper, index) => (
          <div
            key={index}
            style={{
              width: "220px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              padding: "15px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Example placeholder image */}
            <img
              src="https://via.placeholder.com/220x150.png?text=Mock+Test"
              alt={paper.title}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
              {paper.title}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "15px",
              }}
            >
              {paper.description}
            </p>
            {/* Fancy Start Test Button */}
            <button
              style={{
                background: "linear-gradient(to right, #F6D365, #FDA085)",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 10px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 3px 5px rgba(0, 0, 0, 0.2)";
              }}
              onClick={() => handleClick(paper)}
            >
              Start Test
            </button>
          </div>
        ))}
    </div>   
  </div> 
    
  );
};

export default PlacementPaper;
