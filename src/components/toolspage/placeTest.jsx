import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import correctGif from "../../assets/toolpage/correct.gif";
import wrongGif from "../../assets/toolpage/wrong.gif";

const PlaceTest = () => {
  const location = useLocation();
  const { title, description } = location.state || {};
  const [testData, setTestData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/practiceData.json")
      .then((response) => response.json())
      .then((data) => {
        // Flatten categories and find the matching test by title
        const allTests = Object.values(data).flat();
        const selectedTest = allTests.find((test) => test.title === title);
        if (selectedTest) {
          setTestData(selectedTest);
        } else {
          console.error("Test not found in JSON:", title);
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, [title]);

  const handleOptionChange = (option) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: option });
  };

  const handleNext = () => {
    if (!testData) return;

    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If it's the last question, submit the test
      handleSubmit();
    }
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
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Optionally, reset test state if you want to allow re-taking the test
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(null);
  };

  const resultGif = score !== null && score >= 70 ? correctGif : wrongGif;
  const resultText =
    score !== null && score >= 70
      ? "Yeah! You have successfully passed!"
      : "Oops, need more practice!";

  if (!testData) {
    return <div>Loading test data...</div>;
  }

  const currentQuestion = testData.questions[currentQuestionIndex];

  return (
    <div style={{ padding: "20px" }}>
      {/* Title and Description */}
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}

      {/* Display the current question */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Question {currentQuestionIndex + 1}
        </div>
        <div style={{ marginBottom: "20px" }}>{currentQuestion.question}</div>

        {/* Options for the current question */}
        {currentQuestion.options.map((option, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={userAnswers[currentQuestionIndex] === option}
                onChange={() => handleOptionChange(option)}
                style={{ marginRight: "8px" }}
              />
              {option}
            </label>
          </div>
        ))}

        {/* Next / Submit Button */}
        <button
          onClick={handleNext}
          style={{
            marginTop: "20px",
            background: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {currentQuestionIndex < testData.questions.length - 1
            ? "Next"
            : "Submit"}
        </button>
      </div>

      {/* Modal for score display */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <img
              src={resultGif}
              alt="Result GIF"
              style={{ width: "150px", marginBottom: "20px" }}
            />
            <h3 style={{ marginBottom: "10px" }}>{resultText}</h3>
            {score !== null && (
              <p>
                Your Score: {score.toFixed(2)}%
                <br />
                {score >= 70 ? "Pass ✅" : "Fail ❌"}
              </p>
            )}
            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                background: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceTest;
