import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop, FaArrowRight, FaStar } from "react-icons/fa";

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
  const [stars, setStars] = useState(0);
  const [level, setLevel] = useState("Beginner Speaker");
  const [isListening, setIsListening] = useState(false);
  const [showStarAnimation, setShowStarAnimation] = useState(false);
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
    recognitionRef.current.interimResults = true;

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

  const updateLevel = (newStars) => {
    if (newStars >= 25) setLevel("Pro Communicator");
    else if (newStars >= 15) setLevel("Confident Speaker");
    else setLevel("Beginner Speaker");
  };

  const nextQuestion = () => {
    if (answer.trim() !== "") {
      const newStars = stars + 5;
      setStars(newStars);
      updateLevel(newStars);

      // Trigger animation
      setShowStarAnimation(true);
      setTimeout(() => setShowStarAnimation(false), 1000);
    }

    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setAnswer("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🗣️ Communication Practice</h2>

      {/* Instructions Section */}
      <div style={{ background: "#f0f4f8", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
        <p style={{ fontWeight: "bold" }}>How it works:</p>
        <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
          <li>Click "Speak" and start talking.</li>
          <li>Your answer will appear in the box below.</li>
          <li>Once you're done, click "Stop" to end the speech recognition.</li>
          <li>You'll earn stars based on your response, which helps you improve your communication skills.</li>
        </ul>
      </div>

      {/* Stars & Level Display */}
      <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
        {stars} <FaStar style={{ color: "gold" }} /> | Level: {level}
      </p>

      {/* Star Animation */}
      {showStarAnimation && (
        <div style={{
          fontSize: "20px",
          color: "gold",
          animation: "fadeUp 1s",
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}>
          +5✨
        </div>
      )}

      {/* Question Box */}
      <div style={{ border: "1px solid #eee", padding: "15px", borderRadius: "10px", marginBottom: "10px", background: "#fafafa" }}>
        <strong>Question:</strong> {questions[currentQuestion]}
      </div>

      {/* Answer Box */}
      <div style={{ width: "100%", minHeight: "100px", border: "1px solid #eee", padding: "15px", borderRadius: "10px", marginBottom: "15px", backgroundColor: "#fff" }}>
        {answer || "Your answer will appear here..."}
      </div>

      {/* Control Buttons */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={startListening} disabled={isListening} style={buttonStyle}>
          <FaMicrophone /> {isListening ? " Listening..." : " Speak"}
        </button>
        <button onClick={stopListening} disabled={!isListening} style={stopButtonStyle}>
          <FaStop /> Stop
        </button>
      </div>

      {/* Next Question Button */}
      <button onClick={nextQuestion} style={{ ...buttonStyle, marginTop: "20px" }}>
        Next Question <FaArrowRight style={{ marginLeft: "5px" }} />
      </button>

      {/* Micro Animation Keyframes */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          50% { opacity: 1; transform: translate(-50%, -10px); }
          100% { opacity: 0; transform: translate(-50%, -30px); }
        }

        button:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

// Button styles
const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  color: "#000",
  cursor: "pointer",
  fontWeight: "bold",
};

const stopButtonStyle = {
  ...buttonStyle,
  border: "1px solid #ff4d4f",
  color: "#ff4d4f",
};

export default CommunicationPractice;
