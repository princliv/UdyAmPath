import React, { useState } from "react";
import { FaMicrophone, FaStop, FaArrowRight } from "react-icons/fa";

const questions = [
  "What are the key elements of effective communication?",
  "How do you handle a disagreement in a conversation?",
  "Describe a time when you had to explain something complex to someone.",
  "What makes a good listener?",
  "How can non-verbal communication improve a conversation?",
];

const tips = {
  10: "Great start! Try adding more examples.",
  20: "Good job! Use clear and concise language.",
  30: "Keep going! Avoid filler words.",
  40: "Well done! Maintain a confident tone.",
  50: "Excellent! Make sure to pause and articulate.",
  60: "Fantastic! Use gestures to emphasize points.",
  70: "Awesome! Relate to real-life experiences.",
  80: "Superb! Try engaging storytelling.",
  90: "Outstanding! Maintain good pacing.",
  100: "You're a pro! Adapt to your audience."
};

const CommunicationPractice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      setShowScore(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript);
      evaluateAnswer(transcript);
    };

    recognition.start();
  };

  const evaluateAnswer = (userAnswer) => {
    const words = userAnswer.split(" ").length;
    if (words > 5) {
      setScore((prev) => prev + Math.min(words, 10)); // Reward longer answers
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setAnswer("");
    setShowScore(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Communication Practice</h2>
      {showScore && <p><strong>Score:</strong> {score}</p>}
      {tips[score] && showScore && <p style={{ fontStyle: "italic", color: "#196795" }}>{tips[score]}</p>}

      <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", marginBottom: "10px" }}>
        <strong>Question:</strong> {questions[currentQuestion]}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: "100%",
            minHeight: "80px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          {answer || "Your answer will appear here..."}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {!isListening ? (
            <button
              onClick={startListening}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#3F92C3",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                width: "50px",
                height: "50px",
                justifyContent: "center"
              }}
            >
              <FaMicrophone />
            </button>
          ) : (
            <button
              onClick={() => setIsListening(false)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#D9534F",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                width: "50px",
                height: "50px",
                justifyContent: "center"
              }}
            >
              <FaStop />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={nextQuestion}
        style={{
          marginTop: "15px",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#196795",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        Next Question <FaArrowRight style={{ marginLeft: "5px" }} />
      </button>
    </div>
  );
};

export default CommunicationPractice;