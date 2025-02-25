import React, { useState, useEffect } from 'react';

const TechInterview = () => {
  const categories = [
    { name: "Python", subheading: "Mastering Python Basics" },
    { name: "React", subheading: "Building UI with React" },
    { name: ".NET", subheading: "Enterprise Development" },
    { name: "Data Structure", subheading: "Optimizing Algorithms" },
    { name: "Java Programming", subheading: "OOP Concepts in Java" }
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/techdata.json')
      .then(response => response.json())
      .then(data => {
        setQuestions(data.interview_questions[selectedCategory] || []);
      })
      .catch(error => console.error('Error loading data:', error));
  }, [selectedCategory]);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '900px',
      margin: 'auto',
      padding: '30px',
      backgroundColor: '#FAFAFC',
      borderRadius: '12px',
      boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.08)',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#333', fontSize: '26px', marginBottom: '20px' }}>Tech Interview Questions</h2>
      
      {/* Category Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '30px' }}>
        {categories.map(category => (
          <button 
            key={category.name} 
            onClick={() => setSelectedCategory(category.name)}
            style={{
              padding: '12px 20px',
              border: 'none',
              cursor: 'pointer',
              background: selectedCategory === category.name 
                ? 'linear-gradient(135deg, #8EC5FC, #E0C3FC)' 
                : '#e6e6e6',
              color: '#333',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: selectedCategory === category.name 
                ? '0px 4px 8px rgba(142, 197, 252, 0.5)' 
                : 'none'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Subheading */}
      <h3 style={{ color: '#666', fontSize: '20px', marginBottom: '10px' }}>
        {categories.find(cat => cat.name === selectedCategory)?.subheading}
      </h3>

      {/* Question Box */}
      <div style={{
        background: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 8px rgba(0,0,0,0.1)',
        textAlign: 'left',
        transition: 'opacity 0.5s ease-in-out',
        animation: 'fadeIn 0.5s'
      }}>
        <h3 style={{ color: '#6A5ACD', fontSize: '20px' }}>{selectedCategory} Questions</h3>
        <ul style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.6' }}>
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <li key={index} style={{ marginBottom: '15px', opacity: '0', animation: 'fadeInUp 0.5s forwards', animationDelay: `${index * 0.1}s` }}>
                <strong>Q{index + 1}: {q.question}</strong>
                <p style={{ marginTop: '5px', color: '#555' }}>{q.answer}</p>
              </li>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </ul>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default TechInterview;
