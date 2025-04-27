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

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px", 
      padding: "20px",
      overflowX: "hidden"
    }}>
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Rectangle */}
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

        {/* Right Rectangle */}
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
        {/* Left Sidebar - Categories and Notes */}
        <div style={{ width: "270px", background: "#f4f4f4", padding: "10px", borderRadius: "10px", height: "fit-content" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Categories</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {['Computer Science', 'Information Technology', 'Data Science', 'Language Learning', 'Business'].map(category => (
              <button 
                key={category} 
                style={{ 
                  background: "#e4deff", 
                  padding: "10px", 
                  border: "none", 
                  borderRadius: "5px", 
                  textAlign: "left", 
                  cursor: "pointer" 
                }}
              >
                {category}
              </button>
            ))}
            <button style={{ 
              background: "#d1c4ff", 
              padding: "10px", 
              border: "none", 
              borderRadius: "5px", 
              textAlign: "left", 
              cursor: "pointer", 
              marginTop: "5px" 
            }}>
              More
            </button>
          </div>
          <div style={{ 
            background: "#e4deff", 
            padding: "10px", 
            borderRadius: "10px", 
            marginTop: "20px", 
            textAlign: "center" 
          }}>
            <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>Notes Hard to Read?</h4>
            <p style={{ fontSize: "14px", marginBottom: "10px" }}>Discover Visual Diagrams!</p>
            <p style={{ fontSize: "12px", color: "#333" }}>Transform your lengthy notes into easy-to-understand diagrams & tutorials.</p>
            <button 
              onClick={() => navigate("/notespage")} 
              style={{ 
                marginTop: "10px", 
                padding: "8px 12px", 
                background: "#004aad", 
                color: "white", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer" 
              }}
            >
              Explore
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div style={{ flex: 1 }}>
          {/* Tab Navigation */}
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

          {/* Content based on selected tab */}
          {selectedTab === "Course" && <RecentView />}
          {selectedTab === "Specialization" && <SpecializationContent />}
          {selectedTab === "My Learnings" && <MyLearningsContent />}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;