import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const challenges = {
  Coding: [
    {
      question: "Write a function to reverse a string.",
      hint: "Use split(), reverse(), join().",
      starterCode: {
        JavaScript: `function reverseString(str) {\n  return str.split('').reverse().join('');\n}`,
        Python: `def reverse_string(s):\n    return s[::-1]`,
        Cpp: `#include<iostream>\nusing namespace std;\nstring reverseString(string str) {\n    reverse(str.begin(), str.end());\n    return str;\n}`
      }
    },
    {
      question: "Find the maximum number in an array.",
      hint: "Use Math.max and spread operator.",
      starterCode: {
        JavaScript: `function findMax(arr) {\n  return Math.max(...arr);\n}`,
        Python: `def find_max(arr):\n    return max(arr)`,
        Cpp: `#include<iostream>\n#include<vector>\nusing namespace std;\nint findMax(vector<int> arr) {\n    return *max_element(arr.begin(), arr.end());\n}`
      }
    }
  ],
  Logic: [
    {
      question: "You have 8 balls. One is slightly heavier. Find it in the fewest weighings.",
      hint: "Use a balance scale and divide the balls."
    },
    {
      question: "A farmer needs to cross a river with a wolf, a goat, and cabbage. How does he do it?",
      hint: "Take them in a specific order to avoid the goat eating the cabbage."
    }
  ],
  Productivity: [
    {
      question: "Your day is filled with meetings and urgent emails. How do you prioritize tasks?",
      hint: "Use Eisenhower Matrix: Urgent vs. Important."
    },
    {
      question: "You feel overwhelmed by a large project. What's a good approach?",
      hint: "Break it into small tasks and set deadlines."
    }
  ]
};

const TimeManagement = () => {
  const [challengeType, setChallengeType] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showHint, setShowHint] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [userResponse, setUserResponse] = useState("");

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, timerRunning]);

  const startChallenge = (type) => {
    const tasks = challenges[type];
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    setChallengeType(type);
    setChallenge(randomTask);
    setTimeLeft(60);
    setShowHint(false);
    setTimerRunning(true);
    setOutput("");
    setUserResponse("");

    if (type === "Coding") {
      setCode(randomTask.starterCode[selectedLanguage]);
    }
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    if (challengeType === "Coding" && challenge) {
      setCode(challenge.starterCode[newLanguage]);
    }
  };

  const runCode = () => {
    if (selectedLanguage === "JavaScript") {
      try {
        const result = new Blob(
          [`console.log("Output:", (() => { ${code} })())`],
          { type: "application/javascript" }
        );
        const scriptURL = URL.createObjectURL(result);
        const script = document.createElement("script");
        script.src = scriptURL;
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.warn("Run functionality only available for JavaScript.");
    }
  };
  
  

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Time Management & Challenges</h2>

      {/* Challenge Selection */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "15px", marginBottom: "20px" }}>
        {Object.keys(challenges).map((type) => (
          <div
            key={type}
            onClick={() => startChallenge(type)}
            style={{
              flex: 1,
              padding: "20px",
              textAlign: "center",
              backgroundColor: challengeType === type ? "#007bff" : "#f0f0f0",
              color: challengeType === type ? "white" : "black",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            {type}
          </div>
        ))}
      </div>

      {/* Challenge Content */}
      {challenge && (
        <div style={{ padding: "15px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", transition: "all 0.3s ease" }}>
          <h3 style={{ color: "#333" }}>Challenge:</h3>
          <p style={{ fontSize: "14px", color: "#555" }}>{challenge.question}</p>
          <p style={{ fontWeight: "bold", color: "#d9534f" }}>Time Left: {timeLeft}s</p>

          {/* Hint Section */}
          <button
            onClick={() => setShowHint(true)}
            style={{ marginTop: "10px", padding: "8px 12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Get Hint
          </button>
          {showHint && <p style={{ marginTop: "10px", color: "#2d6a4f" }}><strong>Hint:</strong> {challenge.hint}</p>}

          {/* Coding Challenge */}
          {challengeType === "Coding" && (
            <>
              <div style={{ marginTop: "15px" }}>
                <label style={{ fontWeight: "bold", marginRight: "10px" }}>Select Language:</label>
                <select value={selectedLanguage} onChange={handleLanguageChange} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Cpp">C++</option>
                </select>
              </div>

              <Editor height="200px" theme="light" defaultLanguage={selectedLanguage.toLowerCase()} value={code} onChange={(value) => setCode(value)} />

              <button onClick={runCode} style={{ marginTop: "10px", padding: "8px 12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Run Code
              </button>

              {output && <p style={{ marginTop: "10px", background: "#e9ecef", padding: "10px", borderRadius: "5px" }}><strong>Output:</strong> {output}</p>}
            </>
          )}

          {/* Logic & Productivity Challenges */}
          {challengeType !== "Coding" && (
            <textarea placeholder="Write your answer here..." value={userResponse} onChange={(e) => setUserResponse(e.target.value)} />
          )}
        </div>
      )}
    </div>
  );
};

export default TimeManagement;
