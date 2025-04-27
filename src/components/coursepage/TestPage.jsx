import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import * as faceapi from "face-api.js";
import { FaCamera, FaMicrophone, FaCheck, FaExpand } from "react-icons/fa";
// These icons are imported for potential future use
// eslint-disable-next-line no-unused-vars
import { FaInfoCircle, FaTimes, FaCompress } from "react-icons/fa";

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
  const [showInstructions, setShowInstructions] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [blockLeave, setBlockLeave] = useState(false);

  // Block leaving the test page
  useEffect(() => {
    if (blockLeave) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your progress will be lost.';
        return e.returnValue;
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [blockLeave]);

  // Load face detection models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        console.log("Face detection models loaded");
      } catch (error) {
        console.error("Error loading face detection models:", error);
      }
    };
    loadModels();
  }, []);

  // Handle camera stream
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" },
        audio: false
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setCameraEnabled(true);
      console.log("Camera started successfully");
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraEnabled(false);
    }
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setCameraEnabled(false);
    }
  };

  // Face detection
  const detectFace = useCallback(async () => {
    if (videoRef.current && cameraEnabled) {
      try {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );
        setFaceDetected(detections.length > 0);
      } catch (error) {
        console.error("Face detection error:", error);
      }
    }
  }, [cameraEnabled]);

  useEffect(() => {
    const interval = setInterval(detectFace, 1000);
    return () => clearInterval(interval);
  }, [detectFace]);

  // Fullscreen handling
  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setFullscreenMode(true);
      console.log("Entered fullscreen mode");
    } catch (error) {
      console.error("Error entering fullscreen:", error);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreenMode(false);
    }
  };

  // Load test data and start test
  const loadTestData = async () => {
    try {
      const response = await fetch("/coursedata.json");
      const data = await response.json();
      const courseData = data.find(course => course.title === courseTitle);
      
      if (courseData?.Test) {
        setQuestions(courseData.Test);
        setShowTest(true);
        setTestStarted(true);
        setBlockLeave(true);
        await enterFullscreen();
      } else {
        alert("No test available for this course.");
      }
    } catch (error) {
      console.error("Error loading test data:", error);
    }
  };

  // Test navigation
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
      setBlockLeave(false);
      exitFullscreen();
      alert(`Test completed! Your score: ${score + 1}/${questions.length}`);
      setShowTest(false);
      setTestStarted(false);
    }
  };

  // Camera toggle
  const toggleCamera = async () => {
    if (cameraEnabled) {
      stopVideo();
    } else {
      await startVideo();
    }
  };

  // Microphone toggle (visual only in this implementation)
  const toggleMicrophone = () => {
    setMicrophoneEnabled(!microphoneEnabled);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{courseTitle} - Test</h1>

      {showInstructions && !testStarted && (
        <div style={styles.instructionsContainer}>
          <div style={styles.instructionsHeader}>
            <h2 style={styles.instructionsTitle}>Test Instructions</h2>
          </div>
          
          <div style={styles.instructionsContent}>
            <div style={styles.instructionItem}>
              <div style={styles.instructionIcon}>
                <FaCamera size={20} />
              </div>
              <div>
                <h3 style={styles.instructionTitle}>Camera Requirements</h3>
                <p>Your face must be clearly visible throughout the test</p>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionIcon}>
                <FaCheck size={20} color="#4CAF50" />
              </div>
              <div>
                <h3 style={styles.instructionTitle}>Test Rules</h3>
                <ul style={styles.instructionList}>
                  <li>You cannot leave the test until completion</li>
                  <li>No switching tabs or applications</li>
                  <li>No external help or resources</li>
                  <li>Answer all questions to complete</li>
                </ul>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionIcon}>
                <FaExpand size={20} />
              </div>
              <div>
                <h3 style={styles.instructionTitle}>Fullscreen Mode</h3>
                <p>The test will automatically go fullscreen when started</p>
              </div>
            </div>
          </div>
          
          <button 
            style={styles.continueButton}
            onClick={() => setShowInstructions(false)}
          >
            I Understand, Continue
          </button>
        </div>
      )}

      {!showTest && !showInstructions && (
        <div style={styles.verificationArea}>
          <div style={styles.cameraControls}>
            <button 
              style={{
                ...styles.controlButton,
                backgroundColor: cameraEnabled ? '#4CAF50' : '#f44336'
              }}
              onClick={toggleCamera}
            >
              <FaCamera style={{ marginRight: '8px' }} />
              {cameraEnabled ? 'Camera On' : 'Enable Camera'}
            </button>
            
            <button 
              style={{
                ...styles.controlButton,
                backgroundColor: microphoneEnabled ? '#4CAF50' : '#f44336'
              }}
              onClick={toggleMicrophone}
            >
              <FaMicrophone style={{ marginRight: '8px' }} />
              {microphoneEnabled ? 'Microphone On' : 'Enable Microphone'}
            </button>
          </div>
          
          <div style={styles.videoContainer}>
            {cameraEnabled ? (
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline
                style={styles.video}
              />
            ) : (
              <div style={styles.cameraPlaceholder}>
                <FaCamera size={48} color="#ccc" />
                <p>Camera is disabled</p>
              </div>
            )}
            <div style={styles.faceStatus}>
              <div style={{
                ...styles.statusIndicator,
                backgroundColor: faceDetected ? '#4CAF50' : '#f44336'
              }} />
              <span>{faceDetected ? 'Face Detected' : 'No Face Detected'}</span>
            </div>
          </div>
          
          <button
            style={{
              ...styles.startTestButton,
              opacity: faceDetected ? 1 : 0.6,
              cursor: faceDetected ? 'pointer' : 'not-allowed'
            }}
            disabled={!faceDetected}
            onClick={loadTestData}
          >
            Start Test
          </button>
        </div>
      )}

      {showTest && (
        <div style={styles.testContainer}>
          <div style={styles.testHeader}>
            <div style={styles.progressContainer}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    backgroundColor: '#4CAF50',
                    height: '100%',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
              <span style={styles.progressText}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            
            <div style={styles.cameraPreview}>
              {cameraEnabled && (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline
                  style={styles.smallVideo}
                />
              )}
              <div style={styles.faceStatusSmall}>
                <div style={{
                  ...styles.statusIndicatorSmall,
                  backgroundColor: faceDetected ? '#4CAF50' : '#f44336'
                }} />
              </div>
            </div>
          </div>

          <div style={styles.questionArea}>
            <h3 style={styles.questionText}>
              {questions[currentQuestionIndex].question}
            </h3>
            
            <div style={styles.optionsGrid}>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: selectedAnswer === option ? '#4CAF50' : '#f5f5f5',
                    color: selectedAnswer === option ? 'white' : '#333',
                    borderColor: selectedAnswer === option ? '#4CAF50' : '#ddd',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.navigationButtons}>
            <button
              style={{
                ...styles.nextButton,
                opacity: selectedAnswer ? 1 : 0.6,
                cursor: selectedAnswer ? 'pointer' : 'not-allowed'
              }}
              disabled={!selectedAnswer}
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex + 1 === questions.length ? 'Submit Test' : 'Next Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '24px',
    textAlign: 'center'
  },
  instructionsContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    marginBottom: '24px',
    borderLeft: '5px solid #4CAF50'
  },
  instructionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  instructionsTitle: {
    fontSize: '22px',
    color: '#2c3e50',
    margin: 0
  },
  instructionsContent: {
    marginBottom: '20px'
  },
  instructionItem: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    alignItems: 'flex-start'
  },
  instructionIcon: {
    backgroundColor: '#f0f4f8',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  instructionTitle: {
    fontSize: '18px',
    color: '#2c3e50',
    margin: '0 0 8px 0'
  },
  instructionList: {
    paddingLeft: '20px',
    margin: '8px 0 0 0',
    li: {
      marginBottom: '6px'
    }
  },
  continueButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#3e8e41'
    }
  },
  verificationArea: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  cameraControls: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  controlButton: {
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    transition: 'all 0.2s',
    ':hover': {
      opacity: 0.9
    }
  },
  videoContainer: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto 20px',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000'
  },
  video: {
    width: '100%',
    display: 'block'
  },
  smallVideo: {
    width: '120px',
    height: '90px',
    borderRadius: '4px',
    objectFit: 'cover'
  },
  cameraPlaceholder: {
    padding: '40px',
    backgroundColor: '#f0f3f6',
    color: '#95a5a6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px'
  },
  faceStatus: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    gap: '8px'
  },
  faceStatusSmall: {
    position: 'absolute',
    bottom: '5px',
    right: '5px'
  },
  statusIndicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%'
  },
  statusIndicatorSmall: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  startTestButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#3e8e41'
    }
  },
  testContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  testHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  progressContainer: {
    flex: 1
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#ecf0f1',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  progressText: {
    fontSize: '14px',
    color: '#7f8c8d'
  },
  cameraPreview: {
    position: 'relative',
    marginLeft: '20px'
  },
  questionArea: {
    marginBottom: '24px'
  },
  questionText: {
    fontSize: '20px',
    color: '#2c3e50',
    marginBottom: '24px',
    lineHeight: '1.4'
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr'
    }
  },
  optionButton: {
    padding: '16px',
    borderRadius: '6px',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
    fontSize: '16px',
    ':hover': {
      backgroundColor: '#e8f5e9'
    }
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  nextButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#3e8e41'
    }
  }
};

export default TestPage;