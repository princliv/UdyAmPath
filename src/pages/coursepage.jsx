import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecentView from "../components/coursepage/recentView";
import SpecializationContent from "../components/coursepage/SpecializationPage";
import MyLearningsContent from "../components/coursepage/MyLearningsPage";
import headerBg from '../assets/coursepage/headerbg.png';

const CoursePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("Course");
  const [selectedPath, setSelectedPath] = useState(null);
  const [activeContent, setActiveContent] = useState("initial");
  const [showModal, setShowModal] = useState(false);
  const [showLearningModal, setShowLearningModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const learningTopics = [
    { 
      id: 1, 
      title: "React Hooks Deep Dive", 
      content: "React Hooks revolutionized functional components by providing state and lifecycle capabilities. Core hooks: useState (state management), useEffect (side effects), useContext (context API). Advanced hooks: useReducer (complex state logic), useCallback (memoized functions), useMemo (memoized values). Custom hooks enable logic reuse across components. Rules: Only call hooks at the top level, not conditionally. Common patterns: useFetch for API calls, useLocalStorage for persistence. Performance considerations: dependency arrays in useEffect, when to use useCallback/useMemo. The hooks ecosystem includes community hooks like useSWR for data fetching and react-use collection." 
    },
    { 
      id: 2, 
      title: "JavaScript Closures & Scope", 
      content: "Closures occur when a function remembers its lexical scope even when executed outside it. Key concepts: lexical scoping, execution context, scope chain. Practical uses: module pattern (private variables), currying (partial application), memoization (caching). Event handlers and callbacks heavily rely on closures. The 'this' keyword behaves differently in closures. Common pitfalls: loops with closures creating reference issues. Advanced patterns: factory functions, IIFEs with closures. Modern JavaScript uses closures in promises, async/await. Memory considerations: closures maintain references which can cause memory leaks if not handled properly." 
    },
    { 
      id: 3, 
      title: "CSS Flexbox & Grid", 
      content: "Flexbox (1D) and Grid (2D) revolutionized CSS layouts. Flexbox properties: flex-direction, justify-content, align-items, flex-wrap, gap. Item properties: flex (grow/shrink/basis), order, align-self. Grid introduces template areas, explicit rows/columns. Fractional units (fr) enable responsive layouts. Alignment works similarly in both. When to use: Flexbox for components, Grid for page layout. Advanced techniques: nested grids, subgrid, masonry layouts. Performance considerations: minimize reflows, prefer transform/opacity for animations. Browser support is excellent, with fallbacks for legacy browsers. CSS comparison: Flexbox vs Float, Grid vs Tables." 
    },
    { 
      id: 4, 
      title: "REST API Design", 
      content: "REST principles: statelessness, cacheability, layered system, uniform interface. Resource naming conventions: nouns not verbs, pluralization. HTTP methods: GET (safe/idempotent), POST (create), PUT (replace), PATCH (partial update), DELETE. Status codes: 2xx (success), 3xx (redirection), 4xx (client errors), 5xx (server errors). Headers: Content-Type, Accept, Authorization. Versioning strategies: URI path, headers, media types. Documentation: OpenAPI/Swagger, RAML. Security: HTTPS, CORS, authentication (JWT, OAuth), rate limiting. Performance: pagination, filtering, field selection, compression. HATEOAS enables discoverability. GraphQL comparison: when to use REST vs GraphQL." 
    },
    { 
      id: 5, 
      title: "Modern JavaScript Arrays", 
      content: "Array methods: map (transformation), filter (selection), reduce (accumulation). Search methods: find, findIndex, includes, some, every. Manipulation: slice (copy), splice (mutate), concat. ES6+: spread operator, Array.from(), Array.of(). Typed Arrays for binary data. Performance: methods vs loops, memory considerations. Functional programming: pure functions, immutability patterns. Common patterns: flattening arrays, removing duplicates, grouping. Advanced: array buffers, shared memory. Iteration protocols: Symbol.iterator, generators with arrays. Browser APIs using arrays: FileList, NodeList. Recent additions: flat, flatMap, at methods. Array-like objects conversion techniques." 
    },
    { 
      id: 6, 
      title: "React Performance Optimization", 
      content: "Key optimization techniques: React.memo (memoization), useMemo/useCallback (value/function caching). Profiling with React DevTools. Common pitfalls: unnecessary re-renders, large component trees. Code splitting: React.lazy, Suspense. Virtualization for large lists (react-window). State management: proper state lifting, context optimization. Server-side rendering considerations. Bundle analysis: webpack-bundle-analyzer. Performance metrics: TTI, FCP, LCP. Memoization tradeoffs: memory vs computation. Production builds: minification, dead code elimination. Concurrent Mode features: startTransition, useDeferredValue. Best practices: component composition, controlled vs uncontrolled components." 
    },
    { 
      id: 7, 
      title: "JavaScript Event Loop", 
      content: "The event loop enables JavaScript's concurrency model. Components: call stack, callback queue, microtask queue. Execution phases: synchronous code, microtasks (promises), macrotasks (setTimeout). Async patterns: callbacks, promises, async/await. Common misconceptions: 'non-blocking' doesn't mean parallel. Browser APIs: setTimeout, setInterval, requestAnimationFrame. Node.js differences: process.nextTick, setImmediate. Performance implications: long tasks, task splitting. Web Workers for true parallelism. Debugging async code: stack traces, async console. Recent additions: top-level await, promise combinators (allSettled, any). Event loop visualization tools and diagrams." 
    },
    { 
      id: 8, 
      title: "CSS Architecture (BEM, SMACSS)", 
      content: "Scalable CSS methodologies: BEM (Block-Element-Modifier), SMACSS (Categories), ITCSS (Inverted Triangle). BEM naming convention: block__element--modifier. Benefits: specificity management, component isolation. Tooling: CSS preprocessors (Sass), post-processors (PostCSS). CSS-in-JS comparison: styled-components, Emotion. Design systems implementation. Performance: critical CSS, atomic CSS. Modern features: CSS variables, cascade layers, container queries. Utility-first frameworks: Tailwind CSS. Organization strategies: component folders, design tokens. Documentation: Storybook, Styleguidist. Transition strategies from legacy CSS. Cross-team collaboration patterns." 
    },
    { 
      id: 9, 
      title: "Authentication Strategies", 
      content: "Authentication methods: session-based, token-based (JWT), OAuth, SSO. Security considerations: hashing (bcrypt), salting, pepper. JWT structure: header, payload, signature. Storage strategies: cookies (HttpOnly, Secure), localStorage, sessionStorage. Common attacks: XSS, CSRF, credential stuffing. Mitigations: CORS, CSP, rate limiting. Passwordless auth: magic links, biometrics. Multi-factor authentication (MFA) options. OAuth flows: authorization code, implicit, PKCE. OpenID Connect extension. Backend implementation: middleware, token refresh. Frontend patterns: protected routes, auth context. Recent developments: WebAuthn, Passkeys. Security headers and best practices." 
    },
    { 
      id: 10, 
      title: "TypeScript Fundamentals", 
      content: "TypeScript adds static typing to JavaScript. Key features: interfaces, types, generics. Type inference and explicit annotations. Advanced types: union, intersection, conditional, mapped. Utility types: Partial, Pick, Omit. Decorators and experimental features. Configuration: tsconfig.json options. Integration with React: FC type, props interfaces. Common patterns: type guards, discriminated unions. Declaration files for JavaScript libraries. Tooling: VS Code integration, tsc compiler. Performance considerations: type complexity. Migration strategies from JavaScript. Testing typed code. Comparison with Flow. Recent additions: satisfies operator, template literal types." 
    },
    { 
      id: 11, 
      title: "Webpack Configuration", 
      content: "Webpack is a module bundler for modern JavaScript. Core concepts: entry, output, loaders, plugins. Common loaders: babel (transpilation), css/style, file. Plugins: HtmlWebpackPlugin, MiniCssExtract. Development setup: devServer, HMR. Production optimization: minification, chunk splitting. Code splitting strategies: dynamic imports. Performance budgets. Asset management: images, fonts. Environment variables. Advanced techniques: module federation, custom loaders. Configuration composition. Alternatives: Rollup, Parcel, Vite. Debugging: stats analysis, profiling. Tree shaking implementation. Legacy browser support. Integration with frameworks: React, Vue presets." 
    },
    { 
      id: 12, 
      title: "React State Management", 
      content: "State management solutions: Context API, Redux, Zustand, Jotai. When to use each: local vs global state. Redux concepts: store, actions, reducers, middleware. Modern Redux: Redux Toolkit (RTK), createSlice. Context API patterns: provider composition, performance considerations. Server state management: React Query, SWR. Derived state vs persisted state. State normalization techniques. Immutability patterns: spread, immer. Debugging: Redux DevTools, time travel. State persistence strategies. Common pitfalls: over-normalization, unnecessary context. Recent trends: atomic state, signals. Comparison of libraries: complexity vs features." 
    },
    { 
      id: 13, 
      title: "Node.js Fundamentals", 
      content: "Node.js runtime characteristics: event-driven, non-blocking I/O. Core modules: fs, path, http, events. CommonJS vs ES modules. NPM ecosystem: package.json, versioning. Error handling patterns: try/catch, error-first callbacks. Streams: readable, writable, transform. Buffers and binary data. Child processes and clustering. Event loop differences from browser. Debugging: inspector, logging. Security best practices. Performance: profiling, load testing. Web frameworks: Express, Fastify. Database connections: connection pooling. Configuration management. Deployment strategies: containers, serverless. Recent features: worker threads, ES module support." 
    },
    { 
      id: 14, 
      title: "Responsive Design Principles", 
      content: "Core principles: mobile-first, progressive enhancement. Viewport meta tag. CSS techniques: media queries, container queries, clamp(). Layout systems: Flexbox, Grid. Relative units: em, rem, vh/vw. Responsive images: srcset, sizes, picture element. Typography scaling. Breakpoint strategies: content-based vs device-based. Performance considerations: resource loading. Tooling: browser devtools, cross-browser testing. Accessibility implications. Dark mode implementation. Modern CSS features: aspect-ratio, gap. Component-based responsive patterns. Design handoff collaboration. Testing strategies: device labs, emulators." 
    },
    { 
      id: 15, 
      title: "Git Advanced Techniques", 
      content: "Branching strategies: Git Flow, GitHub Flow. Interactive rebasing. Commit message conventions. Stashing techniques. Bisecting for bugs. Submodules and subtrees. Hooks for automation. Reflog recovery. Cherry-picking changes. Worktree for multiple branches. Advanced merging strategies. Conflict resolution. Partial staging (--patch). Filtering history. GPG signing. GitHub-specific: PR workflows, actions. CI/CD integration. Security: vulnerability scanning. Large repository management (LFS). Alternative tools: GitLab, Bitbucket. Team collaboration patterns. Code review best practices." 
    }
  ];

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

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px", 
      padding: "20px",
      overflowX: "hidden",
      position: "relative"
    }}>
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

      {/* Rest of the component remains exactly the same */}
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

          {/* Daily Challenge Section (replaces Today's Spotlight) */}
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
                Algorithm Challenge:
              </p>
              <p style={{ 
                fontSize: "13px", 
                color: "#555",
                marginBottom: "10px"
              }}>
                Implement a function to reverse a linked list
              </p>
            </div>
            <div style={{
              display: "flex",
              gap: "10px"
            }}>
              <button 
                onClick={() => navigate("/daily-challenge")}
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
                onClick={() => alert("Challenge started!")}
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