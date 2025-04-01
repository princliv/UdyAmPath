import React, { useState } from 'react';

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the currently open answer
    } else {
      setOpenIndex(index); // Open the clicked answer
    }
  };

  const faqData = [
    {
      question: 'How can I get job recommendations?',
      answer: 'To receive job recommendations, simply search for your desired city, and you will be presented with job listings tailored to your salary preferences and location.'
    },
    {
      question: 'How can I find the cost of living in different cities?',
      answer: 'Visit the "Cost of Living Around You" page, input your city name, and access detailed information regarding the living expenses specific to that location.'
    },
    {
      question: 'How can I customize my course?',
      answer: 'If you are already familiar with a specific module, you can take a test. If you pass, you will have the option to skip that module and continue with the remaining content.'
    },
    {
      question: 'How can I convert my notes?',
      answer: 'Head over to the Notes page, upload your PDF file, choose your desired diagram type, and your notes will be converted accordingly.'
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#3F92C3' }}>Frequently Asked Questions</h1>

      {faqData.map((faq, index) => (
        <div key={index} style={{ marginTop: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f4f4f4',
              padding: '15px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '100%', // Ensures the width takes up the full container
              maxWidth: '600px', // Set a maximum width to keep the box from stretching too wide
              margin: '0 auto', // Centers the box horizontally
            }}
            onClick={() => toggleAnswer(index)}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '20px',
                color: openIndex === index ? '#196795' : '#000', // Change color to blue when open
              }}
            >
              {faq.question}
            </h2>
            <span style={{ fontSize: '20px' }}>
              {openIndex === index ? '-' : '+'}
            </span>
          </div>
          {openIndex === index && (
            <p style={{
              padding: '15px',
              backgroundColor: '#e9ecef',
              borderRadius: '8px',
              marginTop: '10px',
              width: '100%', // Ensures the answer box is the same width
              maxWidth: '600px', // Match the max width of the question box
              margin: '10px auto', // Centers the answer box
            }}>
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqPage;
