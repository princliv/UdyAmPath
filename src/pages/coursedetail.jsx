// src/pages/coursedetail.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const CourseDetail = () => {
  const location = useLocation();
  const { course } = location.state;  // Access passed course data

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.company}</p>
      <p>{course.duration}</p>
      <img src={course.image} alt={course.title} style={{ width: '100%' }} />
      <p>{course.description}</p> {/* Add more details as necessary */}
    </div>
  );
};

export default CourseDetail;
