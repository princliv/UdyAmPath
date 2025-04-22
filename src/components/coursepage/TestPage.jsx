import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as faceapi from "face-api.js";

const TestPage = () => {
  const location = useLocation();
  const courseTitle = location.state?.courseTitle || "Unknown Course";
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showTest, setShowTest] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      startVideo();
    };
    loadModels();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopVideo();
      } else {
        startVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopVideo();
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const detectFace = async () => {
    if (videoRef.current) {
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );
      setFaceDetected(detections.length > 0);
    }
  };

  useEffect(() => {
    const interval = setInterval(detectFace, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadTestData = async () => {
    try {
      const response = await fetch("/coursedata.json");
      const data = await response.json();
      const courseData = data.find((course) => course.title === courseTitle);
      if (courseData?.Test) {
        setQuestions(courseData.Test);
        setShowTest(true);
      } else {
        alert("No test available for this course.");
      }
    } catch (error) {
      console.error("Error loading test data:", error);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Test completed! Your score: ${score + 1}/${questions.length}`);
      setShowTest(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{courseTitle} - Test</h1>

      {!showTest ? (
        <>
          <div style={styles.videoContainer}>
            <video ref={videoRef} autoPlay muted style={styles.video} />
          </div>
          <p style={styles.status}>
            {faceDetected ? "✅ Face Detected" : "❌ No Face Detected"}
          </p>
          <button
            style={styles.startTestButton}
            disabled={!faceDetected}
            onClick={loadTestData}
          >
            Start Test
          </button>
        </>
      ) : (
        <div style={styles.testContainer}>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <ul style={styles.optionsList}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerSelect(option)}
                style={{
                  ...styles.optionItem,
                  backgroundColor:
                    selectedAnswer === option ? "#007bff" : "#fff",
                  color: selectedAnswer === option ? "#fff" : "#333",
                }}
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            style={styles.nextButton}
            disabled={!selectedAnswer}
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex + 1 === questions.length
              ? "Finish Test"
              : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  videoContainer: {
    width: "320px",
    height: "240px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    border: "2px solid #007bff",
    backgroundColor: "#fff",
    padding: "5px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  video: {
    width: "100%",
    borderRadius: "8px",
  },
  status: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
    marginTop: "15px",
  },
  startTestButton: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
    marginLeft: "10px",
    transition: "background 0.3s",
  },
  testContainer: {
    width: "400px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  optionsList: {
    listStyle: "none",
    padding: "0",
  },
  optionItem: {
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #007bff",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  nextButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
  },
};

export default TestPage;
