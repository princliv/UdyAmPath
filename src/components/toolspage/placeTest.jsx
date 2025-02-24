import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const PlaceTest = () => {
  const { testTitle } = useParams();
  const location = useLocation();
  const { title, description } = location.state || {}; // Ensure fallback

  const [testData, setTestData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch("/practiceData.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedTest = data[testTitle];
        if (selectedTest) {
          setTestData(selectedTest);
        } else {
          console.error("Test not found in JSON:", testTitle);
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, [testTitle]);

  const handleOptionChange = (questionIndex, option) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: option });
  };

  const handleSubmit = () => {
    if (!testData) return;

    let correctCount = 0;
    testData.questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        correctCount++;
      }
    });

    const percentage = (correctCount / testData.questions.length) * 100;
    setScore(percentage);
  };

  return (
    <div className="test-container">
      <h2>{title || "Loading Test..."}</h2>
      <p>{description || "Fetching test details..."}</p>

      {testData ? (
        <div className="question-section">
          {testData.questions.map((q, index) => (
            <div key={index} className="question-box">
              <div className="question">{q.question}</div>
              <div className="options">
                {q.options.map((option, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleOptionChange(index, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading test questions...</p>
      )}

      {testData && <button onClick={handleSubmit}>Submit</button>}
      {score !== null && (
        <h3>{score >= 70 ? "Pass ✅" : "Fail ❌"} (Score: {score.toFixed(2)}%)</h3>
      )}
    </div>
  );
};

export default PlaceTest;
