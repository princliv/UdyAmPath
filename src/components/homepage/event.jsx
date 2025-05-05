import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.jpg";
import event3 from "../../assets/event3.png";

const originalEvents = [
  { img: event1, date: "20.02.2025", location: "Pune, Maharashtra" },
  { img: event2, date: "15.03.2025", location: "Mumbai, Maharashtra" },
  { img: event3, date: "10.04.2025", location: "Bangalore, Karnataka" },
];

const Event = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // start from first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const total = originalEvents.length;
  const events = [originalEvents[total - 1], ...originalEvents, originalEvents[0]]; // clone ends

  const updateIndex = (index) => {
    setCurrentIndex(index);
    setIsTransitioning(true);
  };

  const nextSlide = () => updateIndex(currentIndex + 1);
  const prevSlide = () => updateIndex(currentIndex - 1);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalRef.current);
  });

  const handleTransitionEnd = () => {
    if (currentIndex === events.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1); // jump to first real
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(events.length - 2); // jump to last real
    }
  };

  const handleTouchStart = (e) => (sliderRef.current.startX = e.touches[0].clientX);
  const handleTouchMove = (e) => (sliderRef.current.endX = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (!sliderRef.current.startX || !sliderRef.current.endX) return;
    const delta = sliderRef.current.startX - sliderRef.current.endX;
    if (delta > 50) nextSlide();
    else if (delta < -50) prevSlide();
  };

  return (
    <div className="event-container">
      <button onClick={prevSlide} className="arrow left-arrow">
        <FaArrowLeft size={20} />
      </button>

      <div
        className="event-slider-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="event-slider"
          ref={sliderRef}
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
            width: `${(events.length * 100) / 3}%`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {events.map((event, index) => (
            <div className="event-card" key={index}>
              <img src={event.img} alt="Event" className="event-image" />
              <div className="event-details">
                <p className="event-date">Applied by: {event.date}</p>
                <div className="event-footer">
                  <p className="event-location">Location: {event.location}</p>
                  <button className="event-button">See More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={nextSlide} className="arrow right-arrow">
        <FaArrowRight size={20} />
      </button>

      <div className="pagination-dots">
        {originalEvents.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index + 1 ? "active" : ""}`}
            onClick={() => updateIndex(index + 1)}
          />
        ))}
      </div>

      <style>{`
        .event-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #f0f4ff;
          padding: 40px;
          max-width: 100%;
        }

        .event-slider-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .event-slider {
          display: flex;
        }

        .event-card {
          flex: 0 0 33.3333%;
          padding: 10px;
          margin: 0 10px;
          box-sizing: border-box;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .event-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
        }

        .event-details {
          text-align: center;
          padding: 10px;
        }

        .event-date {
          font-size: 14px;
          color: gray;
        }

        .event-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          flex-wrap: wrap;
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
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: none;
          padding: 8px;
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          z-index: 1;
        }

        .left-arrow {
          left: 20px;
        }

        .right-arrow {
          right: 20px;
        }

        .pagination-dots {
          margin-top: 20px;
        }

        .dot {
          height: 10px;
          width: 10px;
          margin: 0 5px;
          background-color: #bbb;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
        }

        .dot.active {
          background-color: #2563eb;
        }

        @media (max-width: 768px) {
          .event-card {
            flex: 0 0 100%;
          }

          .event-slider {
            width: ${events.length * 100}%;
            transform: translateX(-${currentIndex * 100}%);
          }
        }
      `}</style>
    </div>
  );
};

export default Event;
