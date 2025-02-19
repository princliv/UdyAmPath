import React, { useState } from "react";
import softGif from "../../assets/toolpage/soft.gif";
import communicationImg from "../../assets/toolpage/communication.jpg";
import timeImg from "../../assets/toolpage/time.jpg";
import adaptabilityImg from "../../assets/toolpage/adaptability.jpeg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  { src: communicationImg, alt: "Communication", link: "#" },
  { src: adaptabilityImg, alt: "Adaptability", link: "#" },
  { src: timeImg, alt: "Time Management", link: "#" },
];

const SoftSkill = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 2 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= images.length - 2 ? 0 : prev + 1));
  };

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      {/* Heading with GIF */}
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        Essential Soft Skills for Success
        <img src={softGif} alt="Soft Skills GIF" style={{ width: "74px", height: "74px" }} />
      </h2>

      {/* Image Slider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          position: "relative",
        }}
      >
        <FaChevronLeft
          onClick={prevSlide}
          style={{ cursor: "pointer", fontSize: "24px", color: "#333", marginRight: "10px" }}
        />

        {/* Display Two Images */}
        <div style={{ display: "flex", gap: "10px" }}>
          {[0, 1].map((offset) => {
            const index = (currentIndex + offset) % images.length;
            return (
              <a key={index} href={images[index].link} target="_blank" rel="noopener noreferrer">
                <img
                  src={images[index].src}
                  alt={images[index].alt}
                  style={{
                    width: "250px",
                    height: "160px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </a>
            );
          })}
        </div>

        <FaChevronRight
          onClick={nextSlide}
          style={{ cursor: "pointer", fontSize: "24px", color: "#333", marginLeft: "10px" }}
        />
      </div>
    </div>
  );
};

export default SoftSkill;
