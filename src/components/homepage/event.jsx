import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import event1 from "../../assets/event1.png";
import event2 from "../../assets/event1.png";
import event3 from "../../assets/event1.png";

const events = [
  { img: event1, date: "20.02.2025", location: "Pune, Maharashtra" },
  { img: event2, date: "15.03.2025", location: "Mumbai, Maharashtra" },
  { img: event3, date: "10.04.2025", location: "Bangalore, Karnataka" },
];

const Event = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? events.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === events.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="event-container">
      {/* Left Arrow */}
      <button onClick={prevSlide} className="arrow left-arrow">
        <FaArrowLeft size={20} />
      </button>

      {/* Event Content */}
      <div className="event-card">
        <img src={events[currentIndex].img} alt="Event" className="event-image" />
        <div className="event-details">
          <p className="event-date">Applied by: {events[currentIndex].date}</p>
          <div className="event-footer">
            <p className="event-location">Location: {events[currentIndex].location}</p>
            <button className="event-button">See More</button>
          </div>
        </div>
      </div>

      {/* Right Arrow */}
      <button onClick={nextSlide} className="arrow right-arrow">
        <FaArrowRight size={20} />
      </button>

      {/* Responsive CSS */}
      <style>{`
        .event-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          background-color: white;
          position: relative;
          padding: 20px;
          width: 100%;
        }

        .event-card {
          width: 90%;
          max-width: 600px;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .event-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .event-details {
          padding: 15px;
          text-align: center;
        }

        .event-date {
          font-size: 14px;
          color: gray;
        }

        .event-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .event-location {
          font-size: 16px;
          font-weight: bold;
        }

        .event-button {
          background: #2563eb;
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: 0.3s;
        }

        .event-button:hover {
          background: #1d4ed8;
        }

        .arrow {
          position: absolute;
          background: white;
          border: none;
          padding: 8px 12px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arrow:hover {
          transform: scale(1.1);
        }

        .left-arrow {
          left: 10px;
        }

        .right-arrow {
          right: 10px;
        }

        @media (max-width: 768px) {
          .event-container {
            flex-direction: column;
          }

          .event-card {
            width: 100%;
          }

          .event-footer {
            flex-direction: column;
            text-align: center;
          }

          .arrow {
            position: static;
            margin: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Event;
