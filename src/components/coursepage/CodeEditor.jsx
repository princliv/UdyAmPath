import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CodeEditor = ({ challenge }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [testCases, setTestCases] = useState([]);

  // Use the passed challenge prop or a default if none
  const currentChallenge = challenge || {
    id: 1,
    title: "Default Challenge",
    difficulty: "Medium",
    category: "Data Structures",
    description: "Implement a function to solve the problem",
    problemStatement: "Given a problem, write a solution.",
    example: "Input: example\nOutput: result",
    constraints: ["Constraint 1", "Constraint 2"],
    solutionApproach: "Use the optimal approach",
    tags: ["Array", "Sorting"]
  };

  // Generate test cases based on challenge difficulty
  useEffect(() => {
    const generateTestCases = () => {
      const baseCases = [
        { input: "Test case 1 input", expected: "Test case 1 expected output", passed: false },
        { input: "Test case 2 input", expected: "Test case 2 expected output", passed: false }
      ];
      
      if (currentChallenge.difficulty === "Hard") {
        baseCases.push(
          { input: "Edge case 1", expected: "Edge case 1 expected", passed: false },
          { input: "Edge case 2", expected: "Edge case 2 expected", passed: false }
        );
      }
      
      setTestCases(baseCases);
    };

    generateTestCases();
  }, [currentChallenge]);

  // Default code template based on challenge category
  useEffect(() => {
    let template = '';
    switch(currentChallenge.category) {
      case 'Data Structures':
        template = `function solution(input) {
  // Your code here
  return input;
}`;
        break;
      case 'Algorithms':
        template = `function algorithm(input) {
  // Implement your algorithm
  return result;
}`;
        break;
      case 'Strings':
        template = `function stringOperation(str) {
  // Process the string
  return modifiedStr;
}`;
      default:
        template = `function ${currentChallenge.title.toLowerCase().replace(/\s+/g, '_')}(input) {
  // Implement your solution
  return output;
}`;
    }
    setCode(template);
  }, [currentChallenge]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running your code...');
    
    // Simulate code execution
    setTimeout(() => {
      const randomSuccess = Math.random() > 0.3;
      
      if (randomSuccess) {
        const updatedCases = testCases.map((testCase, index) => ({
          ...testCase,
          passed: index < 2 // First two pass for demo
        }));
        setTestCases(updatedCases);
        
        setOutput('Code executed successfully!\n' + 
          `Test cases passed: ${updatedCases.filter(tc => tc.passed).length}/${testCases.length}`);
      } else {
        setOutput('Error in your code:\nSyntaxError: Unexpected token');
      }
      
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsRunning(true);
    
    // Simulate evaluation
    setTimeout(() => {
      const passedCount = testCases.filter(tc => tc.passed).length;
      const totalCases = testCases.length;
      
      let feedbackMessage = '';
      if (passedCount === totalCases) {
        feedbackMessage = `🎉 Excellent! All ${totalCases} test cases passed!\n` +
          `Your solution is optimal for ${currentChallenge.difficulty} difficulty.`;
      } else if (passedCount >= totalCases / 2) {
        feedbackMessage = `👍 Good effort! ${passedCount}/${totalCases} test cases passed.\n` +
          `Review edge cases for ${currentChallenge.difficulty} problems.`;
      } else {
        feedbackMessage = `🔧 Keep trying! ${passedCount}/${totalCases} test cases passed.\n` +
          `Consider revisiting the problem approach.`;
      }
      
      setFeedback(feedbackMessage);
      setIsRunning(false);
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#f5f7fa',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '5px',
            color: '#004aad'
          }}>
            {currentChallenge.title}
          </h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#e6f0ff',
              color: '#004aad',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {currentChallenge.category}
            </span>
            <span style={{
              padding: '4px 12px',
              backgroundColor: currentChallenge.difficulty === 'Easy' ? '#e6ffe6' : 
                            currentChallenge.difficulty === 'Medium' ? '#fff9e6' : '#ffe6e6',
              color: currentChallenge.difficulty === 'Easy' ? '#00a300' : 
                    currentChallenge.difficulty === 'Medium' ? '#cc9900' : '#cc0000',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {currentChallenge.difficulty}
            </span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{
            padding: '8px 15px',
            backgroundColor: '#f0f7ff',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#004aad'
          }}>
            ⏱️ {formatTime(timeSpent)}
          </div>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '8px 15px',
              backgroundColor: '#f0f0f0',
              color: '#333',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            ← Exit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        gap: '20px',
        height: 'calc(100% - 80px)'
      }}>
        {/* Problem Statement */}
        <div style={{
          flex: '0 0 35%',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          overflowY: 'auto'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '15px',
            color: '#333',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '10px'
          }}>
            Problem Statement
          </h2>
          <p style={{
            whiteSpace: 'pre-line',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            {currentChallenge.problemStatement}
          </p>

          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '10px',
            color: '#333'
          }}>
            Example
          </h3>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-line'
          }}>
            {currentChallenge.example}
          </div>

          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '10px',
            color: '#333'
          }}>
            Constraints
          </h3>
          <ul style={{
            paddingLeft: '20px',
            marginBottom: '20px'
          }}>
            {currentChallenge.constraints.map((constraint, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {constraint}
              </li>
            ))}
          </ul>

          {!showSolution ? (
            <button 
              onClick={() => setShowSolution(true)}
              style={{
                padding: '10px 15px',
                backgroundColor: '#f0f7ff',
                color: '#004aad',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '20px'
              }}
            >
              Need Help? Show Solution Approach
            </button>
          ) : (
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '10px',
                color: '#333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                Solution Approach
                <button 
                  onClick={() => setShowSolution(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Hide
                </button>
              </h3>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                {currentChallenge.solutionApproach}
              </div>
            </div>
          )}
        </div>

        {/* Code Editor */}
        <div style={{
          flex: '0 0 65%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '10px 15px',
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5f56'
                }} />
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ffbd2e'
                }} />
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#27c93f'
                }} />
              </div>
              <span style={{
                fontSize: '14px',
                color: '#666'
              }}>
                solution.js
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                flex: 1,
                padding: '15px',
                fontFamily: "'Fira Code', monospace",
                fontSize: '14px',
                lineHeight: '1.5',
                border: 'none',
                outline: 'none',
                resize: 'none',
                backgroundColor: '#fafafa'
              }}
              spellCheck="false"
            />
          </div>

          {/* Output/Test Cases */}
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '10px 15px',
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #eee',
              display: 'flex',
              gap: '20px'
            }}>
              <button 
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Console
              </button>
              <button 
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Test Cases
              </button>
            </div>
            <div style={{
              flex: 1,
              padding: '15px',
              overflowY: 'auto'
            }}>
              {isSubmitted ? (
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '15px',
                    color: '#333'
                  }}>
                    Submission Results
                  </h3>
                  <div style={{
                    padding: '15px',
                    backgroundColor: feedback.includes('Excellent') ? '#e6ffe6' : 
                                    feedback.includes('Good') ? '#fff9e6' : '#ffe6e6',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.6'
                  }}>
                    {feedback}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px'
                  }}>
                    {testCases.map((testCase, index) => (
                      <div key={index} style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: testCase.passed ? '#e6ffe6' : '#ffe6e6',
                        borderRadius: '6px',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '12px',
                          marginBottom: '5px',
                          color: '#666'
                        }}>
                          Test Case {index + 1}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: testCase.passed ? '#00a300' : '#cc0000'
                        }}>
                          {testCase.passed ? '✓ Passed' : '✗ Failed'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    style={{
                      padding: '10px 15px',
                      backgroundColor: '#004aad',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '15px',
                    color: '#333'
                  }}>
                    Test Cases
                  </h3>
                  <div style={{
                    marginBottom: '20px'
                  }}>
                    {testCases.map((testCase, index) => (
                      <div key={index} style={{
                        padding: '10px',
                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                        borderRadius: '6px',
                        marginBottom: '10px'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px'
                        }}>
                          <span style={{
                            fontWeight: '500'
                          }}>
                            Case {index + 1}
                          </span>
                          {testCase.passed !== undefined && (
                            <span style={{
                              color: testCase.passed ? '#00a300' : '#cc0000',
                              fontWeight: '600'
                            }}>
                              {testCase.passed ? '✓ Passed' : '✗ Failed'}
                            </span>
                          )}
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '15px',
                          fontSize: '14px'
                        }}>
                          <div>
                            <div style={{
                              color: '#666',
                              fontSize: '12px'
                            }}>
                              Input
                            </div>
                            <div style={{
                              fontFamily: 'monospace'
                            }}>
                              {testCase.input}
                            </div>
                          </div>
                          <div>
                            <div style={{
                              color: '#666',
                              fontSize: '12px'
                            }}>
                              Expected
                            </div>
                            <div style={{
                              fontFamily: 'monospace'
                            }}>
                              {testCase.expected}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    whiteSpace: 'pre-line',
                    fontFamily: 'monospace',
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    minHeight: '80px'
                  }}>
                    {output || 'Run your code to see output here...'}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '15px',
            padding: '10px 0'
          }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRunCode}
              disabled={isRunning}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isRunning ? 'Running...' : 'Run Code'}
              <span>▶️</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isRunning || isSubmitted}
              style={{
                padding: '10px 20px',
                backgroundColor: '#004aad',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isRunning ? 'Submitting...' : 'Submit Solution'}
              <span>📩</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;