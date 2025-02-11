import React, { useState } from "react";
import event1 from "../../assets/event1.png";
import arrowLeft from "../../assets/arrowLeft.png";
import arrowRight from "../../assets/arrowRight.png";

const Event = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Event Container with Arrows Positioned */}
      <div className="relative flex items-center justify-center w-[90%] max-w-3xl">
        {/* Left Arrow */}
        <img
          src={arrowLeft}
          alt="Previous"
          className="absolute left-[-40px] cursor-pointer w-8 h-8"
        />

        {/* Event Box */}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full">
          {/* Event Image */}
          <img src={event1} alt="Event" className="w-full md:w-3/5 object-cover" />

          {/* Event Details */}
          <div className="p-4 flex flex-col justify-between w-full md:w-2/5">
            <p className="text-sm text-gray-600">Applied by: 20.02.2025</p>
            <p className="text-md font-semibold">Location: Pune, Maharashtra</p>
            <button
              className="text-blue-500 text-sm font-medium mt-2 cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              See More
            </button>
          </div>
        </div>

        {/* Right Arrow */}
        <img
          src={arrowRight}
          alt="Next"
          className="absolute right-[-40px] cursor-pointer w-8 h-8"
        />
      </div>

      
    </div>
  );
};

// Custom Modal Component

export default Event;
