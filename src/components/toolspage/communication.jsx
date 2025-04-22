import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop, FaArrowRight } from "react-icons/fa";

const questions = [
  "What are the key elements of effective communication?",
  "How do you handle a disagreement in a conversation?",
  "Describe a time when you had to explain something complex to someone.",
  "What makes a good listener?",
  "How can non-verbal communication improve a conversation?",
];

const CommunicationPractice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true; // Enable interim results for real-time feedback

    
    recognitionRef.current.onstart = () => setIsListening(true);

    recognitionRef.current.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      setAnswer(transcript.trim());
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setAnswer("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Communication Practice</h2>
      <p>Score: {score}</p>

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
            backgroundColor: "#f9f9f9",
          }}
        >
          {answer || "Your answer will appear here..."}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={startListening}
            disabled={isListening}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#3F92C3",
              color: "white",
              cursor: "pointer",
            }}
          >
            <FaMicrophone /> {isListening ? " Listening..." : " Speak"}
          </button>

          <button
            onClick={stopListening}
            disabled={!isListening}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#D9534F",
              color: "white",
              cursor: "pointer",
            }}
          >
            <FaStop /> Stop
          </button>
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
