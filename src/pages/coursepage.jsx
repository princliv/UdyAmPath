import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecentView from "../components/coursepage/recentView";
import SpecializationContent from "../components/coursepage/SpecializationPage";
import MyLearningsContent from "../components/coursepage/MyLearningsPage";
import headerBg from '../assets/coursepage/headerbg.png';
import CodeEditor from '../components/coursepage/CodeEditor';

const CoursePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("Course");
  const [selectedPath, setSelectedPath] = useState(null);
  const [activeContent, setActiveContent] = useState("initial");
  const [showModal, setShowModal] = useState(false);
  const [showLearningModal, setShowLearningModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const navigate = useNavigate();

  // Daily challenges data
  const dailyChallenges = [
    {
      id: 1,
      title: "Reverse a Linked List",
      difficulty: "Medium",
      category: "Data Structures",
      description: "Implement a function to reverse a singly linked list in-place.",
      problemStatement: "Given the head of a singly linked list, reverse the list and return the new head.",
      example: "Input: 1->2->3->4->5->NULL\nOutput: 5->4->3->2->1->NULL",
      constraints: [
        "The number of nodes in the list is in the range [0, 5000].",
        "-5000 <= Node.val <= 5000"
      ],
      solutionApproach: "Iterate through the list, changing the next pointer of each node to point to the previous node instead.",
      tags: ["Linked List", "Recursion", "Two Pointers"]
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Algorithms",
      description: "Determine if a string containing just parentheses is valid.",
      problemStatement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      example: "Input: s = \"()[]{}\"\nOutput: true",
      constraints: [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only '()[]{}'."
      ],
      solutionApproach: "Use a stack to keep track of opening brackets. When encountering a closing bracket, check if it matches the top of the stack.",
      tags: ["Stack", "String"]
    },
    {
      id: 3,
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      category: "Trees",
      description: "Return the level order traversal of a binary tree's nodes.",
      problemStatement: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
      example: "Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]",
      constraints: [
        "The number of nodes in the tree is in the range [0, 2000].",
        "-1000 <= Node.val <= 1000"
      ],
      solutionApproach: "Use a queue to implement BFS, processing nodes level by level.",
      tags: ["Tree", "BFS", "Binary Tree"]
    },
    {
      id: 4,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      category: "Strings",
      description: "Find the length of the longest substring without repeating characters.",
      problemStatement: "Given a string s, find the length of the longest substring without repeating characters.",
      example: "Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.",
      constraints: [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces."
      ],
      solutionApproach: "Use a sliding window approach with a hash set to track characters in the current window.",
      tags: ["Hash Table", "Sliding Window", "String"]
    },
    {
      id: 5,
      title: "Merge Intervals",
      difficulty: "Medium",
      category: "Arrays",
      description: "Merge all overlapping intervals in a collection.",
      problemStatement: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      example: "Input: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]",
      constraints: [
        "1 <= intervals.length <= 10^4",
        "intervals[i].length == 2",
        "0 <= starti <= endi <= 10^4"
      ],
      solutionApproach: "Sort the intervals by start time, then merge adjacent intervals if they overlap.",
      tags: ["Array", "Sorting"]
    }
  ];

  const learningTopics = [
    { 
      id: 1, 
      title: "React Hooks Deep Dive", 
      content: "React Hooks revolutionized functional components by providing state and lifecycle capabilities. Core hooks: useState (state management), useEffect (side effects), useContext (context API). Advanced hooks: useReducer (complex state logic), useCallback (memoized functions), useMemo (memoized values). Custom hooks enable logic reuse across components. Rules: Only call hooks at the top level, not conditionally. Common patterns: useFetch for API calls, useLocalStorage for persistence. Performance considerations: dependency arrays in useEffect, when to use useCallback/useMemo. The hooks ecosystem includes community hooks like useSWR for data fetching and react-use collection." 
    },
    { 
      id: 2, 
      title: "TypeScript Fundamentals", 
      content: "TypeScript brings static typing to JavaScript, catching errors during development. Key concepts: interfaces (shape of objects), types (type aliases), generics (reusable components). Advanced features: decorators (metadata programming), utility types (Partial, Pick, Omit), and type guards. Configuration via tsconfig.json controls strictness and compilation. Best practices: gradual adoption, proper any usage, and declaration files. Integration with React: FC type for components, typing hooks and props. TypeScript with Node.js involves typing modules and Express middleware. The ecosystem includes DefinitelyTyped for library type definitions." 
    },
    { 
      id: 3, 
      title: "Node.js Performance Optimization", 
      content: "Optimizing Node.js involves understanding the event loop and non-blocking I/O. Techniques: clustering (multi-core utilization), worker threads for CPU tasks, and proper error handling. Memory management: identifying leaks with heap snapshots, optimizing V8 garbage collection. Performance tools: Node's built-in profiler, clinic.js, and flame graphs. Database optimizations: connection pooling, query optimization, and caching strategies. Load balancing with Nginx or PM2. Security considerations: rate limiting, input validation, and dependency auditing. Real-world patterns: circuit breakers for failures, backpressure handling in streams." 
    },
    { 
      id: 4, 
      title: "CSS-in-JS Solutions Comparison", 
      content: "CSS-in-JS libraries solve scoping and dynamic styling challenges in components. Popular options: styled-components (template literals), Emotion (performance focused), JSS (framework agnostic). Features: theming support, SSR compatibility, and atomic CSS generation. Performance considerations: runtime vs compile-time solutions, critical CSS extraction. Advanced patterns: component variants, responsive props, and animation integration. Comparison with utility-first CSS like Tailwind. Tooling: Babel plugins, TypeScript support, and DevTools integration. Best practices: when to use CSS variables, extracting global styles, and testing strategies." 
    },
    { 
      id: 5, 
      title: "GraphQL API Design Principles", 
      content: "GraphQL enables declarative data fetching with a type system. Schema design: object types, interfaces, unions, and enums. Query patterns: pagination (connections/edges), filtering, and mutations. Performance: N+1 problem solutions (dataloaders), query complexity analysis. Security: depth limiting, persisted queries, and rate limiting. Federation: microservices architecture with Apollo Federation. Tooling: GraphiQL/Playground, schema stitching, and code generation. Best practices: versioning through evolution, documentation with SDL, and error handling. Real-world considerations: caching strategies and monitoring field usage." 
    },
    { 
      id: 6, 
      title: "Webpack 5 Modern Configuration", 
      content: "Webpack 5 offers improved build performance and module federation. Core concepts: entry points, output configuration, and loaders (file transformation). Plugins: HtmlWebpackPlugin, MiniCssExtractPlugin, and CleanWebpackPlugin. Optimization: code splitting (dynamic imports), tree shaking, and runtime chunk. Asset modules: replacing file/url loaders with built-in handling. Advanced features: module federation for microfrontends, persistent caching. Performance tuning: profiling build times, parallel thread loading. Configuration patterns: environment-specific files, composing configs with merge." 
    },
    { 
      id: 7, 
      title: "State Management in 2023", 
      content: "Modern state management balances client needs with developer experience. Options: Redux (predictable), Zustand (simplified), Jotai (atomic), and XState (FSM). Context API limitations and when to upgrade. Patterns: normalized state, derived state, and undo/redo implementations. Middleware: logging, persistence, and async handling. Server state management: React Query, SWR, and Apollo Client cache. Performance: selective component updates, memoization techniques. Developer tools: time travel debugging, state inspection. Emerging trends: colocation, compiler-assisted state management." 
    },
    { 
      id: 8, 
      title: "Microfrontends Architecture", 
      content: "Microfrontends extend microservices principles to the frontend. Implementation approaches: build-time (npm packages), run-time (module federation), iframes. Frameworks: Single SPA, Luigi, or custom solutions. Routing strategies: host-controlled vs federated. Shared dependencies: versioning strategies, externals configuration. Design systems: cross-team component libraries with documentation. Testing: integration strategies for independent teams. Performance: shared bundle optimization, lazy loading. Operational concerns: independent deployments, monitoring, and error tracking." 
    },
    { 
      id: 9, 
      title: "Progressive Web App Techniques", 
      content: "PWAs combine web and native app capabilities through service workers. Core components: manifest file (install prompt), service worker (offline caching), and app shell. Caching strategies: cache-first, network-first, and stale-while-revalidate. Background sync for deferred actions and push notifications. Performance: precaching critical assets, lazy loading routes. Testing: Lighthouse audits, offline scenarios, and storage quotas. Security: HTTPS requirement and content security policy. Advanced features: periodic sync, Web Share API, and file system access." 
    },
    { 
      id: 10, 
      title: "WebAssembly for Frontend Developers", 
      content: "WebAssembly enables near-native performance in the browser. Compilation targets: Rust, C/C++, and AssemblyScript. Integration: loading WASM modules in JavaScript, memory management. Use cases: image processing, physics simulations, and cryptography. Tooling: wasm-pack, Emscripten, and WebAssembly Studio. Performance considerations: startup overhead vs sustained throughput. Debugging: source maps and browser DevTools support. Future features: threads, SIMD, and exception handling. Real-world examples: FFmpeg in browser, AutoCAD Web, and Figma's performance optimizations." 
    }
];

  // Set the current challenge on component mount
  useEffect(() => {
    // For demo purposes, we'll cycle through challenges based on day of the month
    const today = new Date().getDate();
    const challengeIndex = today % dailyChallenges.length;
    setCurrentChallenge(dailyChallenges[challengeIndex]);
  }, []);

  useEffect(() => {
    if (selectedTopic && isTimerRunning) {
      setDisplayedContent("");
      setCurrentIndex(0);
    }
  }, [selectedTopic, isTimerRunning]);

  useEffect(() => {
    if (selectedTopic && isTimerRunning && currentIndex < selectedTopic.content.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(prev => prev + selectedTopic.content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 22); // Adjust typing speed here

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, selectedTopic, isTimerRunning]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchTerm);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const startLearning = (topic) => {
    setSelectedTopic(topic);
    setTimeLeft(60);
    setIsTimerRunning(true);
    setCurrentIndex(0);
    setDisplayedContent("");
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startChallenge = () => {
    setShowChallengeModal(false);
    setShowCodeEditor(true);
  };

  const closeCodeEditor = () => {
    setShowCodeEditor(false);
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px", 
      padding: "20px",
      overflowX: "hidden",
      position: "relative"
    }}>
      {/* Code Editor Overlay */}
      {showCodeEditor && currentChallenge && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "white",
          zIndex: 2000,
          overflow: "auto"
        }}>
          <CodeEditor 
            challenge={currentChallenge} 
            onClose={closeCodeEditor}
          />
        </div>
      )}
      {/* Modal for Learn More */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "linear-gradient(145deg, #ffffff, #f8f9ff)",
            borderRadius: "16px",
            width: "450px",
            maxWidth: "90%",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            position: "relative",
            animation: "fadeIn 0.3s ease-out"
          }}>
            <button 
              onClick={toggleModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#666",
                ":hover": {
                  color: "#004aad"
                }
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 5px 15px rgba(0,74,173,0.3)"
              }}>
                <span style={{ fontSize: "36px", color: "white" }}>🚀</span>
              </div>
              
              <h2 style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#004aad",
                textAlign: "center",
                margin: 0
              }}>
                Customized Learning Path
              </h2>
              
              <div style={{
                backgroundColor: "#f5f9ff",
                borderRadius: "12px",
                padding: "20px",
                margin: "10px 0"
              }}>
                <p style={{
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "#333",
                  marginBottom: "15px"
                }}>
                  Our system analyzes your existing knowledge and skills to create a personalized specialization path that eliminates redundant learning.
                </p>
                
                <ul style={{
                  paddingLeft: "20px",
                  margin: "15px 0",
                  listStyleType: "none"
                }}>
                  <li style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start" }}>
                    <span style={{ color: "#004aad", marginRight: "10px" }}>✓</span>
                    <span style={{ fontSize: "14px" }}>Skip topics you already know by giving the Test</span>
                  </li>
                  <li style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start" }}>
                    <span style={{ color: "#004aad", marginRight: "10px" }}>✓</span>
                    <span style={{ fontSize: "14px" }}>Focus on areas needing improvement</span>
                  </li>
                  <li style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start" }}>
                    <span style={{ color: "#004aad", marginRight: "10px" }}>✓</span>
                    <span style={{ fontSize: "14px" }}>Reduce specialization completion time by up to 40%</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start" }}>
                    <span style={{ color: "#004aad", marginRight: "10px" }}>✓</span>
                    <span style={{ fontSize: "14px" }}>Get personalized recommendations</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={toggleModal}
                style={{
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "500",
                  width: "100%",
                  maxWidth: "200px",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 10px rgba(0,74,173,0.3)",
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 15px rgba(0,74,173,0.4)"
                  }
                }}
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Challenge Modal */}
      {showChallengeModal && currentChallenge && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          backdropFilter: "blur(8px)"
        }}>
          <div style={{
            background: "white",
            borderRadius: "16px",
            width: "700px",
            maxWidth: "90%",
            maxHeight: "90vh",
            padding: "30px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            position: "relative",
            overflow: "hidden"
          }}>
            <button 
              onClick={() => setShowChallengeModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(0,74,173,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  background: "rgba(0,74,173,0.2)"
                }
              }}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "20px",
                flexShrink: 0
              }}>
                <span style={{ fontSize: "28px", color: "white" }}>🏆</span>
              </div>
              <div>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#004aad",
                  margin: "0 0 5px 0"
                }}>
                  {currentChallenge.title}
                </h2>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px"
                }}>
                  <span style={{
                    padding: "4px 12px",
                    background: "#e6f0ff",
                    color: "#004aad",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}>
                    {currentChallenge.category}
                  </span>
                  <span style={{
                    padding: "4px 12px",
                    background: currentChallenge.difficulty === "Easy" ? "#e6ffe6" : 
                                currentChallenge.difficulty === "Medium" ? "#fff9e6" : "#ffe6e6",
                    color: currentChallenge.difficulty === "Easy" ? "#00a300" : 
                          currentChallenge.difficulty === "Medium" ? "#cc9900" : "#cc0000",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}>
                    {currentChallenge.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              marginBottom: "25px",
              paddingBottom: "20px",
              borderBottom: "1px solid #eee"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "10px"
              }}>
                Problem Statement
              </h3>
              <p style={{
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#555",
                whiteSpace: "pre-line",
                marginBottom: "15px"
              }}>
                {currentChallenge.problemStatement}
              </p>
              
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "10px"
              }}>
                Example
              </h3>
              <div style={{
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}>
                <p style={{
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "#333",
                  whiteSpace: "pre-line",
                  margin: 0,
                  fontFamily: "monospace"
                }}>
                  {currentChallenge.example}
                </p>
              </div>
              
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "10px"
              }}>
                Constraints
              </h3>
              <ul style={{
                paddingLeft: "20px",
                margin: "0 0 15px 0"
              }}>
                {currentChallenge.constraints.map((constraint, index) => (
                  <li key={index} style={{
                    fontSize: "15px",
                    color: "#555",
                    marginBottom: "8px",
                    lineHeight: "1.5"
                  }}>
                    {constraint}
                  </li>
                ))}
              </ul>
              
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "10px"
              }}>
                Approach
              </h3>
              <p style={{
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#555",
                marginBottom: "0"
              }}>
                {currentChallenge.solutionApproach}
              </p>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px"
            }}>
              <button 
                onClick={() => setShowChallengeModal(false)}
                style={{
                  flex: 1,
                  padding: "15px",
                  background: "white",
                  color: "#004aad",
                  border: "1px solid #004aad",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  ":hover": {
                    background: "#f5f9ff"
                  }
                }}
              >
                Close
              </button>
              <button 
                onClick={startChallenge}
                style={{
                  flex: 1,
                  padding: "15px",
                  background: "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(0,74,173,0.3)",
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,74,173,0.4)"
                  }
                }}
              >
                Start Challenge
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 60 Seconds Learning Modal */}
      {showLearningModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          backdropFilter: "blur(8px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
          <div style={{
            background: "linear-gradient(to bottom, #ffffff, #f8faff)",
            borderRadius: "20px",
            width: "700px",
            maxWidth: "95%",
            maxHeight: "90vh",
            padding: "40px",
            boxShadow: "0 25px 50px -12px rgba(0, 74, 173, 0.25)",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(0,74,173,0.1)",
            animation: "modalEnter 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transformOrigin: "center center"
          }}>
            {/* Decorative elements */}
            <div style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "120px",
              height: "120px",
              background: "radial-gradient(circle, rgba(0,74,173,0.1) 0%, rgba(0,74,173,0) 70%)",
              borderRadius: "50%",
              transform: "translate(50%, -50%)"
            }} />
            
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "200px",
              height: "200px",
              background: "radial-gradient(circle, rgba(63,146,195,0.1) 0%, rgba(63,146,195,0) 70%)",
              borderRadius: "50%",
              transform: "translate(-50%, 50%)"
            }} />

            {/* Close button */}
            <button 
              onClick={() => {
                setShowLearningModal(false);
                setSelectedTopic(null);
                setIsTimerRunning(false);
              }}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(0,74,173,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                zIndex: 10,
                ":hover": {
                  background: "rgba(0,74,173,0.2)",
                  transform: "rotate(90deg) scale(1.1)"
                }
              }}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#004aad" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            {!selectedTopic ? (
              /* Topic Selection View */
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  padding: "0 20px"
                }}>
                  <div style={{
                    width: "100px",
                    height: "100px",
                    background: "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    boxShadow: "0 10px 25px rgba(0,74,173,0.3)",
                    animation: "pulse 2s infinite"
                  }}>
                    <span style={{ fontSize: "48px", color: "white" }}>⏱️</span>
                  </div>
                  <h2 style={{
                    fontSize: "28px",
                    fontWeight: "800",
                    color: "#004aad",
                    marginBottom: "12px",
                    letterSpacing: "-0.5px"
                  }}>
                    Quick Knowledge Boost
                  </h2>
                  <p style={{
                    fontSize: "16px",
                    color: "#666",
                    maxWidth: "80%",
                    margin: "0 auto",
                    lineHeight: "1.6"
                  }}>
                    Select a topic to learn its essentials in just one minute
                  </p>
                </div>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "20px",
                  maxHeight: "50vh",
                  overflowY: "auto",
                  padding: "10px 5px 20px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#004aad transparent"
                }}>
                  {learningTopics.map(topic => (
                    <div 
                      key={topic.id}
                      onClick={() => startLearning(topic)}
                      style={{
                        background: "white",
                        borderRadius: "16px",
                        padding: "25px",
                        cursor: "pointer",
                        border: "1px solid rgba(0,74,173,0.15)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                        position: "relative",
                        overflow: "hidden",
                        ":hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 15px 30px rgba(0,74,173,0.15)",
                          borderColor: "rgba(0,74,173,0.3)"
                        },
                        ":after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          background: "linear-gradient(90deg, #004aad 0%, #3f92c3 100%)",
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                          transition: "transform 0.3s ease"
                        },
                        ":hover:after": {
                          transform: "scaleX(1)"
                        }
                      }}
                    >
                      <div style={{
                        width: "60px",
                        height: "60px",
                        background: "rgba(0,74,173,0.1)",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                        color: "#004aad",
                        fontSize: "24px",
                        fontWeight: "bold",
                        transition: "all 0.3s ease"
                      }}>
                        {topic.id}
                      </div>
                      <h3 style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#004aad",
                        marginBottom: "12px",
                        lineHeight: "1.3"
                      }}>
                        {topic.title}
                      </h3>
                      <p style={{
                        fontSize: "15px",
                        color: "#666",
                        lineHeight: "1.5",
                        marginBottom: "15px"
                      }}>
                        Learn the essentials in just 60 seconds
                      </p>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#3f92c3",
                        fontSize: "14px",
                        fontWeight: "600"
                      }}>
                        Start Learning
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "8px" }}>
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Content View */
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "30px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid rgba(0,74,173,0.1)"
                }}>
                  <h2 style={{
                    fontSize: "26px",
                    fontWeight: "800",
                    color: "#004aad",
                    margin: 0,
                    letterSpacing: "-0.5px",
                    lineHeight: "1.3"
                  }}>
                    {selectedTopic.title}
                  </h2>
                  <div style={{
                    background: isTimerRunning ? "linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)" : "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)",
                    color: "white",
                    padding: "10px 24px",
                    borderRadius: "50px",
                    fontWeight: "700",
                    fontSize: "18px",
                    transition: "all 0.3s ease",
                    boxShadow: isTimerRunning 
                      ? "0 5px 20px rgba(255,107,107,0.4)" 
                      : "0 5px 20px rgba(0,74,173,0.4)",
                    animation: isTimerRunning ? "pulse 1.5s infinite" : "none"
                  }}>
                    {timeLeft}s
                  </div>
                </div>
                
                <div style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "30px",
                  marginBottom: "30px",
                  border: "1px solid rgba(0,74,173,0.1)",
                  minHeight: "250px",
                  maxHeight: "50vh",
                  overflowY: "auto",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  position: "relative"
                }}>
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "rgba(0,74,173,0.05)",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#004aad"
                  }}>
                    {Math.floor((currentIndex / selectedTopic.content.length) * 100)}% complete
                  </div>
                  
                  <p style={{
                    fontSize: "17px",
                    lineHeight: "1.8",
                    color: "#333",
                    margin: 0
                  }}>
                    {displayedContent}
                    {isTimerRunning && currentIndex < selectedTopic.content.length && (
                      <span style={{
                        display: "inline-block",
                        width: "10px",
                        height: "24px",
                        background: "linear-gradient(to bottom, #004aad, #3f92c3)",
                        verticalAlign: "middle",
                        marginLeft: "8px",
                        animation: "blink 0.7s infinite, float 1.5s infinite ease-in-out",
                        borderRadius: "3px",
                        transform: "translateY(2px)"
                      }} />
                    )}
                  </p>
                </div>
                
                {!isTimerRunning && (
                  <div style={{
                    display: "flex",
                    gap: "20px"
                  }}>
                    <button 
                      onClick={() => {
                        setSelectedTopic(null);
                        setTimeLeft(60);
                      }}
                      style={{
                        flex: 1,
                        padding: "18px",
                        background: "white",
                        color: "#004aad",
                        border: "1px solid rgba(0,74,173,0.3)",
                        borderRadius: "14px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "600",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ":hover": {
                          background: "rgba(0,74,173,0.05)",
                          transform: "translateY(-3px)",
                          boxShadow: "0 10px 25px rgba(0,74,173,0.1)"
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#004aad" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      All Topics
                    </button>
                    <button 
                      onClick={() => startLearning(selectedTopic)}
                      style={{
                        flex: 1,
                        padding: "18px",
                        background: "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "14px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "600",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 5px 20px rgba(0,74,173,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ":hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 12px 25px rgba(0,74,173,0.4)",
                          background: "linear-gradient(135deg, #004aad 0%, #3f92c3 80%)"
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                        <path d="M16 7V3M8 7V3M4 11H20M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ 
          background: "#e4deff", 
          color: "black", 
          padding: "20px", 
          borderRadius: "10px", 
          width: "250px", 
          textAlign: "left" 
        }}>
          <h2>Customized Path to Reduce the Duration of the Specialization</h2>
          <button 
            onClick={toggleModal}
            style={{ 
              marginTop: "10px", 
              padding: "10px 15px", 
              background: "white", 
              color: "#131346", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer",
              transition: "all 0.2s",
              ":hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }
            }}
            aria-label="Learn more about specialization"
          >
            Learn More
          </button>
        </div>

        <div style={{ 
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px", 
          borderRadius: "10px", 
          flex: 1, 
          marginLeft: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "30px" }}>
              Learn Something New in <span style={{ color: "#004aad" }}>60 Seconds</span><br /> 
              Quick <span style={{ color: "#004aad" }}>Knowledge Boost</span>
            </h2>
            <button
              onClick={() => setShowLearningModal(true)}
              style={{ 
                padding: "12px 24px", 
                background: "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)", 
                color: "white", 
                border: "none", 
                borderRadius: "30px", 
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                transition: "all 0.2s",
                boxShadow: "0 4px 10px rgba(0,74,173,0.3)",
                ":hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 15px rgba(0,74,173,0.4)"
                }
              }}
              aria-label="Start 60 seconds learning"
            >
              Start 60-Second Learning
            </button>
          </div>
          <p style={{ 
            marginTop: "10px", 
            color: "#555", 
            fontSize: "16px",
            maxWidth: "70%"
          }}>
            Select a topic and learn its essentials in just one minute. Perfect for quick knowledge boosts!
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left Sidebar - Now with single Job Simulator card */}
        <div style={{ 
          width: "270px", 
          background: "linear-gradient(to bottom, #f8f9ff, #e4deff)", 
          padding: "15px", 
          borderRadius: "12px", 
          height: "fit-content",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          {/* Job Simulator Card */}
          <div 
            onClick={() => navigate("/job-simulator")}
            style={{
              background: "linear-gradient(145deg, #6a7cea 0%, #8a4db3 100%)",
              borderRadius: "12px",
              padding: "20px",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
              position: "relative",
              overflow: "hidden",
              ":hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 28px rgba(102, 126, 234, 0.6)"
              }
            }}
          >
            {/* Glow effect */}
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)",
              transform: "translate(30%, 30%)",
              opacity: 0,
              transition: "opacity 0.4s ease",
              ":hover": {
                opacity: 1
              }
            }} />

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "15px",
              position: "relative",
              zIndex: 1
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: 0,
                letterSpacing: "-0.2px",
                textShadow: "0 1px 3px rgba(0,0,0,0.2)"
              }}>
                Job Simulator
              </h3>
              <div style={{
                width: "40px",
                height: "40px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                <span style={{ 
                  fontSize: "24px",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
                }}>💼</span>
              </div>
            </div>

            <p style={{
              fontSize: "14px",
              marginBottom: "20px",
              opacity: 0.95,
              lineHeight: "1.5",
              position: "relative",
              zIndex: 1,
              textShadow: "0 1px 1px rgba(0,0,0,0.1)"
            }}>
              Practice real interview scenarios and get feedback on your performance
            </p>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 1
            }}>
              {["Tech", "System", "Behavioral"].map((type, index) => (
                <div key={index} style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  fontWeight: "600",
                  backdropFilter: "blur(4px)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  {index === 0 && "👨‍💻"}
                  {index === 1 && "🏗️"}
                  {index === 2 && "💬"}
                  {type}
                </div>
              ))}
            </div>
          </div>

          {/* Daily Challenge Section */}
          <div style={{ 
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: "10px",
            padding: "15px",
            border: "1px solid rgba(0,74,173,0.1)",
            marginBottom: "15px"
          }}>
            <h4 style={{ 
              fontSize: "15px", 
              fontWeight: "600", 
              marginBottom: "10px",
              color: "#004aad",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span>🏆</span> Daily Challenge
            </h4>
            {currentChallenge && (
              <>
                <div style={{
                  backgroundColor: "#f0f7ff",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px"
                }}>
                  <p style={{ 
                    fontSize: "13px", 
                    fontWeight: "500",
                    color: "#004aad",
                    marginBottom: "5px"
                  }}>
                    {currentChallenge.category} Challenge:
                  </p>
                  <p style={{ 
                    fontSize: "13px", 
                    color: "#555",
                    marginBottom: "10px"
                  }}>
                    {currentChallenge.description}
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "8px"
                  }}>
                    <span style={{
                      padding: "2px 8px",
                      background: currentChallenge.difficulty === "Easy" ? "#e6ffe6" : 
                                  currentChallenge.difficulty === "Medium" ? "#fff9e6" : "#ffe6e6",
                      color: currentChallenge.difficulty === "Easy" ? "#00a300" : 
                            currentChallenge.difficulty === "Medium" ? "#cc9900" : "#cc0000",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "600"
                    }}>
                      {currentChallenge.difficulty}
                    </span>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11px",
                      color: "#666"
                    }}>
                      {currentChallenge.tags.slice(0, 2).map((tag, index) => (
                        <span key={index}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{
                  display: "flex",
                  gap: "10px"
                }}>
                  <button 
                    onClick={() => setShowChallengeModal(true)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      backgroundColor: "rgba(0,74,173,0.1)",
                      color: "#004aad",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                      ":hover": {
                        backgroundColor: "rgba(0,74,173,0.2)"
                      }
                    }}
                  >
                    View Details
                  </button>
                  <button 
                    onClick={startChallenge}
                    style={{
                      flex: 1,
                      padding: "8px",
                      backgroundColor: "#004aad",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                      ":hover": {
                        backgroundColor: "#003d8f"
                      }
                    }}
                  >
                    Start Now
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Enhanced Visual Notes Promotion */}
          <div 
            onClick={() => navigate("/notespage")}
            style={{
              background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
              borderRadius: "12px",
              padding: "20px",
              cursor: "pointer",
              border: "1px solid rgba(0,74,173,0.1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              ":hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 8px 20px rgba(0,74,173,0.15)"
              }
            }}
          >
            <div style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "80px",
              height: "80px",
              background: "rgba(0,74,173,0.05)",
              borderRadius: "50%",
              zIndex: 0
            }} />
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              zIndex: 1
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
                boxShadow: "0 4px 8px rgba(0,74,173,0.2)"
              }}>
                <span style={{ fontSize: "28px", color: "white" }}>📊</span>
              </div>
              <h4 style={{ 
                fontSize: "16px", 
                fontWeight: "600", 
                marginBottom: "8px",
                color: "#004aad",
                textAlign: "center"
              }}>
                Visual Learning Boost
              </h4>
              <p style={{ 
                fontSize: "13px", 
                color: "#555",
                marginBottom: "15px",
                textAlign: "center",
                lineHeight: "1.4"
              }}>
                Transform complex notes into interactive diagrams for better retention
              </p>
              <div style={{
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #004aad 0%, rgba(0,74,173,0.2) 100%)",
                borderRadius: "2px",
                marginBottom: "15px",
                opacity: 0.6
              }} />
              <button 
                style={{ 
                  padding: "8px 16px", 
                  background: "linear-gradient(135deg, #004aad 0%, #3f92c3 100%)", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "20px", 
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  width: "100%",
                  maxWidth: "180px",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(0,74,173,0.3)",
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,74,173,0.4)"
                  }
                }}
              >
                Explore Visual Notes
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "20px",
            background: "white",
            padding: "10px",
            borderRadius: "10px"
          }}>
            <div>
              {['Course', 'Specialization', 'My Learnings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  style={{
                    backgroundColor: selectedTab === tab ? "#3f92c3" : "#ccc",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span style={{ fontSize: "20px", cursor: "pointer" }}>🔖</span>
          </div>

          {selectedTab === "Course" && <RecentView />}
          {selectedTab === "Specialization" && <SpecializationContent />}
          {selectedTab === "My Learnings" && <MyLearningsContent />}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;