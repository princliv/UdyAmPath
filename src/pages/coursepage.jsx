import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentView from "../components/coursepage/recentView";
import SpecializationContent from "../components/coursepage/SpecializationPage";
import MyLearningsContent from "../components/coursepage/MyLearningsPage";
import headerBg from '../assets/coursepage/headerbg.png';

const CoursePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("Course");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchTerm);
  };

  // Knowledge Navigator data
  const knowledgePaths = [
    {
      name: "Tech Explorer",
      icon: "💻",
      color: "#4e79a7",
      description: "Discover emerging technologies"
    },
    {
      name: "Skill Builder",
      icon: "🛠️",
      color: "#f28e2b",
      description: "Enhance your core competencies"
    },
    {
      name: "Career Accelerator",
      icon: "🚀",
      color: "#e15759",
      description: "Fast-track your professional growth"
    },
    {
      name: "Concept Master",
      icon: "🧠",
      color: "#76b7b2",
      description: "Deep dive into complex topics"
    }
  ];

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px", 
      padding: "20px",
      overflowX: "hidden"
    }}>
      {/* Top Section (unchanged) */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ 
          background: "#e4deff", 
          color: "black", 
          padding: "20px", 
          borderRadius: "10px", 
          width: "250px", 
          textAlign: "left" 
        }}>
          <h2>Customized Path to Reduce the Duration of the Specialization</h2>
          <button 
            style={{ 
              marginTop: "10px", 
              padding: "10px 15px", 
              background: "white", 
              color: "#131346", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer" 
            }}
            aria-label="Learn more about specialization"
          >
            Learn More
          </button>
        </div>

        <div style={{ 
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px", 
          borderRadius: "10px", 
          flex: 1, 
          marginLeft: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "30px" }}>
              Get <span style={{ color: "#004aad" }}>Customized</span> Specialization<br /> 
              based on your <span style={{ color: "#004aad" }}>Knowledge</span>
            </h2>
            <input
              type="text"
              placeholder="Search Specialization"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "300px"}}
              aria-label="Search for specialization"
            />
          </div>
          <button 
            style={{ 
              marginTop: "10px", 
              padding: "10px 15px", 
              background: "#004aad", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer", 
              width: "100px", 
              float: "right" 
            }}
            onClick={handleSearchSubmit}
            aria-label="Find specialization"
          >
            Find
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left Sidebar - Knowledge Navigator */}
        <div style={{ 
          width: "270px", 
          background: "linear-gradient(to bottom, #f8f9ff, #e4deff)", 
          padding: "15px", 
          borderRadius: "12px", 
          height: "fit-content",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          <h3 style={{ 
            fontSize: "18px", 
            fontWeight: "bold", 
            marginBottom: "15px",
            color: "#004aad",
            textAlign: "center",
            paddingBottom: "10px",
            borderBottom: "2px solid rgba(0,74,173,0.2)"
          }}>
            Knowledge Navigator
          </h3>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "12px",
            marginBottom: "20px"
          }}>
            {knowledgePaths.map((path, index) => (
              <div 
                key={index}
                onClick={() => console.log(`Navigating to ${path.name} path`)}
                style={{ 
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "15px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  ":hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.1)"
                  }
                }}
              >
                <div style={{
                  fontSize: "24px",
                  marginBottom: "8px",
                  color: path.color
                }}>
                  {path.icon}
                </div>
                <h4 style={{ 
                  margin: "0 0 5px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333"
                }}>
                  {path.name}
                </h4>
                <p style={{ 
                  margin: 0,
                  fontSize: "12px",
                  color: "#666"
                }}>
                  {path.description}
                </p>
              </div>
            ))}
          </div>

          {/* Learning Spotlight */}
          <div style={{ 
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: "10px",
            padding: "15px",
            border: "1px solid rgba(0,74,173,0.1)",
            marginBottom: "15px"
          }}>
            <h4 style={{ 
              fontSize: "15px", 
              fontWeight: "600", 
              marginBottom: "10px",
              color: "#004aad",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span>🌟</span> Today's Spotlight
            </h4>
            <p style={{ 
              fontSize: "13px", 
              color: "#555",
              marginBottom: "10px"
            }}>
              "The best way to predict the future is to create it." - Alan Kay
            </p>
            <button 
              onClick={() => navigate("/spotlight")}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "rgba(0,74,173,0.1)",
                color: "#004aad",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "500",
                transition: "all 0.2s",
                ":hover": {
                  backgroundColor: "rgba(0,74,173,0.2)"
                }
              }}
            >
              Explore Today's Focus
            </button>
          </div>

          {/* Visual Notes Promotion (unchanged) */}
          <div style={{ 
            background: "rgba(0,74,173,0.05)", 
            padding: "15px", 
            borderRadius: "10px", 
            textAlign: "center",
            border: "1px dashed rgba(0,74,173,0.2)"
          }}>
            <h4 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "5px" }}>Notes Hard to Read?</h4>
            <p style={{ fontSize: "13px", marginBottom: "10px" }}>Discover Visual Diagrams!</p>
            <button 
              onClick={() => navigate("/notespage")} 
              style={{ 
                padding: "8px 12px", 
                background: "#004aad", 
                color: "white", 
                border: "none", 
                borderRadius: "6px", 
                cursor: "pointer",
                fontSize: "12px",
                width: "100%"
              }}
            >
              Explore Visual Notes
            </button>
          </div>
        </div>

        {/* Right Content Area (unchanged) */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "20px",
            background: "white",
            padding: "10px",
            borderRadius: "10px"
          }}>
            <div>
              {['Course', 'Specialization', 'My Learnings'].map(tab => (
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

          {selectedTab === "Course" && <RecentView />}
          {selectedTab === "Specialization" && <SpecializationContent />}
          {selectedTab === "My Learnings" && <MyLearningsContent />}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;