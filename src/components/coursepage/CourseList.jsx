import React from "react";

const CourseList = () => {
  const courses = [
    {
      title: "Web Design for Everybody: Basics of Web Development & Coding",
      instructor: "The University of Michigan",
      category: "Web Development",
      duration: "3 - 6 Months",
      level: "Beginner",
      description: "Learn the basics of web design and development.",
      skillsGained: [
        "Wireframing",
        "Responsive Web Design",
        "HTML and CSS",
        "Web Development",
      ],
      logo: "https://example.com/logo1.png",
      image: "https://example.com/course-image1.jpg",
      pathway: ["Introduction", "HTML Basics", "CSS Basics", "Final Project"],
    },
    {
      title: "Code Yourself! An Introduction to Programming",
      instructor: "University of California, Santa Cruz",
      category: "Programming",
      duration: "1 - 3 Months",
      level: "Beginner",
      description: "An introduction to programming concepts and practices.",
      skillsGained: [
        "Program Development",
        "Software Engineering",
        "Debugging",
        "Algorithms",
      ],
      logo: "https://example.com/logo2.png",
      image: "https://example.com/course-image2.jpg",
      pathway: ["Introduction to Programming", "Basic Syntax", "Control Structures", "Final Project"],
    },
    {
      title: "Microsoft Back-End Developer",
      instructor: "Microsoft",
      category: "Software Development",
      duration: "3 - 6 Months",
      level: "Beginner",
      description: "Learn back-end development using Microsoft technologies.",
      skillsGained: [
        "Database Management",
        "C# Programming",
        "ASP.NET",
        "Debugging",
      ],
      logo: "https://example.com/logo3.png",
      image: "https://example.com/course-image3.jpg",
      pathway: ["Introduction to Back-End", "C# Basics", "Database Design", "Final Project"],
    },
    {
      title: "Microsoft Python Development",
      instructor: "Microsoft",
      category: "Programming",
      duration: "3 - 6 Months",
      level: "Beginner",
      description: "Learn Python programming for software development.",
      skillsGained: [
        "Data Structures",
        "Web Development",
        "Debugging",
        "APIs",
      ],
      logo: "https://example.com/logo4.png",
      image: "https://example.com/course-image4.jpg",
      pathway: ["Introduction to Python", "Data Types", "Web Development Basics", "Final Project"],
    },
  ];

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <h3>{course.title}</h3>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Level:</strong> {course.level}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Skills Gained:</strong> {course.skillsGained.join(", ")}</p>
            <img src={course.image} alt={course.title} style={{ width: "100px", height: "auto" }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;