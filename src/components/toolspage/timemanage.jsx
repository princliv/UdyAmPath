import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const challenges = {
  Coding: [
    { question: "Write a function to reverse a string.", hint: "Use split(), reverse(), join().", starterCode: `function reverseString(str) {\n  // Your code here\n}` },
    { question: "Find the maximum number in an array.", hint: "Use Math.max and spread operator.", starterCode: `function findMax(arr) {\n  // Your code here\n}` }
  ],
  Logic: [
    { question: "You have 8 balls. One is slightly heavier. Find it in the fewest weighings.", hint: "Use a balance scale and divide the balls." },
    { question: "A farmer needs to cross a river with a wolf, a goat, and cabbage. How does he do it?", hint: "Take them in a specific order to avoid the goat eating the cabbage." }
  ],
  Productivity: [
    { question: "Your day is filled with meetings and urgent emails. How do you prioritize tasks?", hint: "Use Eisenhower Matrix: Urgent vs. Important." },
    { question: "You feel overwhelmed by a large project. What's a good approach?", hint: "Break it into small tasks and set deadlines." }
  ]
};

const TimeManagement = () => {
  const [challengeType, setChallengeType] = useState("Coding");
  const [challenge, setChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showHint, setShowHint] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, timerRunning]);

  const startChallenge = () => {
    const tasks = challenges[challengeType];
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    setChallenge(randomTask);
    setCode(randomTask.starterCode || "");
    setTimeLeft(60);
    setShowHint(false);
    setTimerRunning(true);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Time Management & Challenge</h2>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>Select Challenge Type:</label>
        <select value={challengeType} onChange={(e) => setChallengeType(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}>
          <option value="Coding">Coding</option>
          <option value="Logic">Logic Puzzle</option>
          <option value="Productivity">Productivity Task</option>
        </select>
      </div>

      <button onClick={startChallenge} style={{ display: "block", width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}>Start Challenge</button>

      {challenge && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <h3 style={{ color: "#333" }}>Challenge:</h3>
          <p style={{ fontSize: "14px", color: "#555" }}>{challenge.question}</p>
          <p style={{ fontWeight: "bold", color: "#d9534f" }}>Time Left: {timeLeft}s</p>
          <button onClick={() => setShowHint(true)} style={{ marginTop: "10px", padding: "8px 12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Get Hint</button>
          {showHint && <p style={{ marginTop: "10px", color: "#2d6a4f" }}><strong>Hint:</strong> {challenge.hint}</p>}

          {challengeType === "Coding" && (
            <>
              <div style={{ marginTop: "15px" }}>
                <label style={{ fontWeight: "bold", marginRight: "10px" }}>Select Language:</label>
                <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="C++">C++</option>
                </select>
              </div>

              <div style={{ marginTop: "10px", border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "#f0f0f0" }}>
                <Editor
                  height="200px"
                  theme="light"
                  defaultLanguage={selectedLanguage.toLowerCase()}
                  value={code}
                  onChange={(value) => setCode(value)}
                />
              </div>
              <button style={{ marginTop: "10px", padding: "8px 12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Run Code</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeManagement;
