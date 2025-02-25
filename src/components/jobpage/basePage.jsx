import React, { useState, useEffect } from "react";
import confusedGif from "../../assets/jobpage/confused.gif"; // Animated icon
import headerBg from "../../assets/jobpage/headerbg.png"; // Background image for search section
import BaseDetails from "../jobpage/baseDetails";

// Import all city images
import BengaloreImg from "../../assets/jobpage/Banglore.png";
import HyderabadImg from "../../assets/jobpage/Hydrabad.png";
import ChennaiImg from "../../assets/jobpage/Chennai.png";
import PuneImg from "../../assets/jobpage/Pune.png";
import GurgaonImg from "../../assets/jobpage/Gurgaon.png";
import NoidaImg from "../../assets/jobpage/Noida.png";
import MumbaiImg from "../../assets/jobpage/Mumbai.png";
import KolkataImg from "../../assets/jobpage/Kolkata.png";
import AhmedabadImg from "../../assets/jobpage/Ahmedabad.png";

// Map city names to images
const cityImages = {
  Bengalore: BengaloreImg,
  Hyderabad: HyderabadImg,
  Chennai: ChennaiImg,
  Pune: PuneImg,
  Gurgaon: GurgaonImg,
  Noida: NoidaImg,
  Mumbai: MumbaiImg,
  Kolkata: KolkataImg,
  Ahmedabad: AhmedabadImg
};

const BasePage = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [inputCity, setInputCity] = useState("");
  const [cityData, setCityData] = useState([]);

  // Fetch city data from the public folder
  useEffect(() => {
    fetch("/citydata.json") // Accessing from public folder
      .then(response => response.json())
      .then(data => setCityData(data))
      .catch(error => console.error("Error loading city data:", error));
  }, []);

  const handleApply = () => {
    const cityInfo = cityData.find(city => city.city.toLowerCase() === inputCity.toLowerCase());
    if (cityInfo) {
      setSelectedCity(cityInfo);
    } else {
      setSelectedCity(null); // Reset if city not found
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {/* Title Section */}
      <div>
        <h2 style={{ color: "#004369", fontSize: "28px", fontWeight: "bold" }}>
          Confused About Your Favorite City’s Budget?
          <img 
            src={confusedGif} 
            alt="Confused Icon" 
            style={{ width: "120px", height: "120px", verticalAlign: "middle", marginLeft: "15px" }} 
          />
        </h2>
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
          Uncover the Costs Now!
        </h1>
      </div>

      {/* Search Section */}
      <div style={{ 
        backgroundImage: `url(${headerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "30px", 
        borderRadius: "15px", 
        width: "70%", 
        margin: "40px auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "24px", textAlign: "left" }}>
            Get Recommendation based on the <span style={{ color: "#004aad" }}>Salary</span> with<br /> 
            respect to <span style={{ color: "#004aad" }}>Expense</span>
          </h2>
          <input
            type="text"
            placeholder="Enter Living City"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "8px", width: "280px", fontSize: "16px" }}
          />
        </div>
        <button 
          onClick={handleApply}
          style={{ 
            marginTop: "15px", 
            padding: "12px 20px", 
            background: "#004aad", 
            color: "white", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer", 
            width: "120px", 
            float: "right", 
            fontSize: "16px" 
          }}
        >
          Apply
        </button>
      </div>

      {/* Selected City Box */}
      {selectedCity && (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          background: "#f0f4f8", 
          padding: "15px", 
          borderRadius: "12px", 
          width: "400px", 
          margin: "30px auto" 
        }}>
          <h3 style={{ margin: "0", fontWeight: "bold", fontSize: "20px" }}>
            Selected City: {selectedCity.city}
          </h3>
          <img 
            src={cityImages[selectedCity.city]} 
            alt={selectedCity.city} 
            style={{ width: "200px", height: "100px", borderRadius: "10px", marginLeft: "15px" }} 
          />
        </div>
      )}

      <BaseDetails />
    </div>
  );
};

export default BasePage;
