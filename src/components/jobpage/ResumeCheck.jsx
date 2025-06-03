import React, { useState, useRef, useEffect } from "react";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { FaFileUpload, FaCheckCircle, FaTimesCircle, FaRobot, FaClipboardList, FaChartPie, FaArrowRight, FaLightbulb, FaSearch } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ResumeCheck = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [matched, setMatched] = useState([]);
  const [missing, setMissing] = useState([]);
  const [resumeName, setResumeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef(null);

  const keywordsMap = {
    "Frontend Developer": ["JavaScript", "React", "CSS", "HTML", "UI Design", "ES6", "TypeScript", "Redux", "SASS", "Webpack"],
    "Backend Developer": ["Node.js", "MongoDB", "REST API", "Express", "Docker", "SQL", "Java", "Python", "Ruby", "PHP"],
    "Full-Stack Developer": ["JavaScript", "Node.js", "React", "MongoDB", "Express", "CSS", "HTML", "REST API", "GraphQL", "Redux"],
    "Android Developer": ["Java", "Kotlin", "Android Studio", "SDK", "Android Jetpack", "Firebase", "UI Design", "Material Design"],
    "iOS Developer": ["Swift", "Objective-C", "Xcode", "Cocoa Touch", "UIKit", "CoreData", "CoreAnimation", "Firebase"],
    "DevOps Engineer": ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "CI/CD", "Linux", "Shell Scripting"],
    "Data Scientist": ["Python", "R", "SQL", "Machine Learning", "Deep Learning", "AI", "TensorFlow", "PyTorch"],
    "UX/UI Designer": ["UX Research", "Wireframing", "Prototyping", "Figma", "Sketch", "Adobe XD", "UI Design", "User Testing"],
    "Product Manager": ["Agile", "Scrum", "Product Roadmap", "User Stories", "Product Strategy", "Market Research", "Product Lifecycle"],
    "Cloud Architect": ["AWS", "Azure", "GCP", "Cloud Infrastructure", "Cloud Security", "Cloud Architecture", "DevOps", "Microservices"],
  };

  const extractTextFromPDF = async (file) => {
    setIsLoading(true);
    setProgress(30);
    
    try {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let text = "";
        for (let i = 0; i < pdf.numPages; i++) {
          const page = await pdf.getPage(i + 1);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ") + " ";
          setProgress(30 + Math.floor((i / pdf.numPages) * 70));
        }
        setResumeText(text);
        setIsLoading(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      setIsLoading(false);
      alert("Error processing PDF file. Please try another file.");
    }
  };

  const extractTextFromDocx = (file) => {
    setIsLoading(true);
    setProgress(50);
    
    const reader = new FileReader();
    reader.onload = async function () {
      try {
        const result = await mammoth.extractRawText({ arrayBuffer: this.result });
        setResumeText(result.value);
        setIsLoading(false);
        setProgress(100);
      } catch (error) {
        console.error("Error extracting text from DOCX:", error);
        setIsLoading(false);
        alert("Error processing DOCX file. Please try another file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResumeName(file.name);
    
    if (file.type === "application/pdf") {
      extractTextFromPDF(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractTextFromDocx(file);
    } else {
      alert("⚠️ Please upload a valid PDF or DOCX file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf" || 
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setResumeName(file.name);
        fileInputRef.current.files = e.dataTransfer.files;
        handleResumeUpload({ target: { files: [file] } });
      } else {
        alert("⚠️ Please upload a valid PDF or DOCX file.");
      }
    }
  };

  const calculateScore = () => {
    if (!jobTitle) return 0;
    const totalKeywords = keywordsMap[jobTitle].length;
    if (totalKeywords === 0) return 0;
    return Math.round((matched.length / totalKeywords) * 100);
  };

  const handleCheck = () => {
    if (!resumeText) return alert("📂 Please upload your resume first.");
    if (!jobTitle) return alert("🎯 Please select a job role to continue.");
    
    const jobKeywords = keywordsMap[jobTitle] || [];
    const resumeLower = resumeText.toLowerCase().replace(/\s+/g, " ").trim();
    
    const found = jobKeywords.filter((kw) => 
      resumeLower.includes(kw.toLowerCase().replace(/\./g, ""))
    );
    const missing = jobKeywords.filter((kw) => 
      !resumeLower.includes(kw.toLowerCase().replace(/\./g, ""))
    );
    
    const score = Math.round((found.length / jobKeywords.length) * 100);
    
    const tips = [
      found.length > 0
        ? "💡 Great job! Your resume includes many relevant keywords."
        : "🧩 Consider adding more keywords from the job description.",
      missing.length > 0
        ? `📌 You're missing some important keywords: ${missing.slice(0, 3).join(", ")}`
        : "✅ Excellent! You've covered all the important keywords.",
      "📈 Tip: Use quantifiable achievements to strengthen your experience section.",
      score > 80 
        ? "🌟 Your resume is well-optimized for this position!" 
        : "🛠️ You can improve your resume by adding missing keywords.",
    ];
    
    setMatched(found);
    setMissing(missing);
    setFeedback(tips);
  };

  const copyToClipboard = () => {
    const feedbackText = feedback.join('\n');
    navigator.clipboard.writeText(feedbackText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const resetForm = () => {
    setResumeText("");
    setJobTitle("");
    setFeedback([]);
    setMatched([]);
    setMissing([]);
    setResumeName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const score = calculateScore();
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>ResumeCheck Pro</h1>
        <p style={styles.subtitle}>Optimize your resume for any job with AI-powered analysis</p>
      </div>

      <div style={styles.content}>
        <div style={styles.leftPanel}>
          <div 
            style={styles.uploadCard}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div style={styles.uploadIcon}>
              <FaFileUpload size={48} color="#4f46e5" />
            </div>
            <h3 style={styles.uploadTitle}>Upload Your Resume</h3>
            <p style={styles.uploadText}>Drag & drop your PDF or DOCX file here</p>
            <p style={styles.uploadOr}>or</p>
            <label style={styles.fileLabel}>
              Browse Files
              <input 
                type="file" 
                onChange={handleResumeUpload} 
                accept=".pdf,.docx" 
                hidden 
                ref={fileInputRef}
              />
            </label>
            {resumeName && (
              <div style={styles.fileInfo}>
                <div style={styles.fileName}>{resumeName}</div>
                <button style={styles.removeButton} onClick={() => {
                  setResumeName("");
                  setResumeText("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}>
                  Remove
                </button>
              </div>
            )}
            
            {isLoading && (
              <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                  <div 
                    style={{...styles.progressFill, width: `${progress}%`}} 
                  ></div>
                </div>
                <div style={styles.progressText}>Processing... {progress}%</div>
              </div>
            )}
          </div>
          
          <div style={styles.jobSelector}>
            <h3 style={styles.sectionTitle}>
              <FaSearch style={styles.sectionIcon} /> Select Target Position
            </h3>
            <select 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              style={styles.dropdown}
            >
              <option value="">Choose a job position...</option>
              {Object.keys(keywordsMap).map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            
            <div style={styles.actions}>
              <button 
                onClick={handleCheck} 
                style={styles.analyzeButton}
                disabled={!resumeText || !jobTitle}
              >
                Analyze Resume <FaArrowRight style={{ marginLeft: 8 }} />
              </button>
              
              <button 
                onClick={resetForm} 
                style={styles.resetButton}
              >
                <FiRefreshCw /> Reset
              </button>
            </div>
          </div>
        </div>
        
        <div style={styles.rightPanel}>
          {feedback.length > 0 ? (
            <div style={styles.resultsCard}>
              <div style={styles.scoreCard}>
                <div style={styles.scoreHeader}>
                  <FaChartPie size={24} color="#4f46e5" />
                  <h3>Resume Match Score</h3>
                </div>
                <div 
                  style={{
                    ...styles.scoreCircle,
                    background: `conic-gradient(#4f46e5 0%, #4f46e5 ${score * 3.6}deg, #e0e7ff ${score * 3.6}deg, #e0e7ff 360deg)`
                  }}
                >
                  <div style={styles.scoreValue}>{score}%</div>
                  <div style={styles.scoreLabel}>Match Rate</div>
                </div>
                <div style={styles.scoreDescription}>
                  {score > 80 
                    ? "Excellent match! Your resume is well optimized." 
                    : score > 60 
                      ? "Good match, but could be improved." 
                      : "Needs significant improvement to match job requirements."}
                </div>
              </div>
              
              <div style={styles.feedbackSection}>
                <div style={styles.feedbackHeader}>
                  <FaRobot size={24} color="#4f46e5" />
                  <h3>AI-Powered Feedback</h3>
                  <button 
                    onClick={copyToClipboard} 
                    style={styles.copyButton}
                  >
                    <FaClipboardList /> {isCopied ? "Copied!" : "Copy Feedback"}
                  </button>
                </div>
                
                <div style={styles.feedbackList}>
                  {feedback.map((point, idx) => (
                    <div key={idx} style={styles.feedbackItem}>
                      <div style={styles.bullet}></div>
                      <div style={styles.feedbackText}>{point}</div>
                    </div>
                  ))}
                </div>
                
                <div style={styles.keywordsContainer}>
                  <div style={styles.keywordsColumn}>
                    <h4 style={styles.keywordTitle}>
                      <FaCheckCircle color="#10b981" /> Matched Keywords ({matched.length})
                    </h4>
                    <div style={styles.keywordList}>
                      {matched.map((kw) => (
                        <span key={kw} style={styles.matchedKeyword}>{kw}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={styles.keywordsColumn}>
                    <h4 style={styles.keywordTitle}>
                      <FaTimesCircle color="#ef4444" /> Missing Keywords ({missing.length})
                    </h4>
                    <div style={styles.keywordList}>
                      {missing.map((kw) => (
                        <span key={kw} style={styles.missingKeyword}>{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.previewCard}>
              <div style={styles.previewHeader}>
                <FaLightbulb size={24} color="#f59e0b" />
                <h3>Resume Optimization Tips</h3>
              </div>
              <ul style={styles.tipList}>
                <li style={styles.tipItem}>
                  <div style={styles.tipBullet}>1</div>
                  <div>
                    <strong>Keyword Optimization:</strong> Include relevant keywords from the job description.
                  </div>
                </li>
                <li style={styles.tipItem}>
                  <div style={styles.tipBullet}>2</div>
                  <div>
                    <strong>Quantifiable Achievements:</strong> Use numbers to showcase your impact.
                  </div>
                </li>
                <li style={styles.tipItem}>
                  <div style={styles.tipBullet}>3</div>
                  <div>
                    <strong>Clear Formatting:</strong> Use consistent headings and bullet points.
                  </div>
                </li>
                <li style={styles.tipItem}>
                  <div style={styles.tipBullet}>4</div>
                  <div>
                    <strong>ATS Compatibility:</strong> Avoid complex layouts that confuse ATS systems.
                  </div>
                </li>
              </ul>
              
              <div style={styles.exampleSection}>
                <h4 style={styles.exampleTitle}>Example Optimization</h4>
                <div style={styles.exampleContainer}>
                  <div style={styles.exampleBad}>
                    <h5>Before</h5>
                    <p>Responsible for developing web applications</p>
                  </div>
                  <div style={styles.exampleGood}>
                    <h5>After</h5>
                    <p>Developed 15+ React web applications used by 10K+ monthly users</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div style={styles.footer}>
        <p>© 2023 ResumeCheck Pro | AI-Powered Resume Optimization</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#1f2937',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '1.1rem',
    fontWeight: '400',
    opacity: '0.9',
    margin: '0.5rem 0 0',
  },
  content: {
    display: 'flex',
    maxWidth: '1400px',
    margin: '2rem auto',
    padding: '0 2rem',
    gap: '2rem',
    flex: '1',
  },
  leftPanel: {
    flex: '1',
    minWidth: '350px',
  },
  rightPanel: {
    flex: '1.5',
    minWidth: '500px',
  },
  uploadCard: {
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    border: '2px dashed #d1d5db',
    transition: 'all 0.3s ease',
    marginBottom: '1.5rem',
  },
  uploadIcon: {
    marginBottom: '1rem',
  },
  uploadTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 0.5rem',
    color: '#1f2937',
  },
  uploadText: {
    color: '#6b7280',
    margin: '0 0 1rem',
    fontSize: '0.95rem',
  },
  uploadOr: {
    color: '#6b7280',
    margin: '0.5rem 0',
    fontWeight: '500',
  },
  fileLabel: {
    display: 'inline-block',
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    margin: '0.5rem 0',
    fontSize: '1rem',
  },
  fileInfo: {
    marginTop: '1.5rem',
    backgroundColor: '#edf2ff',
    borderRadius: '8px',
    padding: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileName: {
    fontWeight: '500',
    fontSize: '0.9rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: '1',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontWeight: '500',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    marginLeft: '0.5rem',
    fontSize: '0.85rem',
  },
  progressContainer: {
    marginTop: '1.5rem',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    transition: 'width 0.3s ease',
  },
  progressText: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  jobSelector: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.03)',
    border: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: '0 0 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#1f2937',
  },
  sectionIcon: {
    color: '#4f46e5',
  },
  dropdown: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#1f2937',
    marginBottom: '1.5rem',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
  },
  analyzeButton: {
    flex: '1',
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '0.85rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
  },
  resetButton: {
    backgroundColor: 'transparent',
    color: '#6b7280',
    padding: '0.85rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s',
  },
  resultsCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.03)',
    border: '1px solid #e5e7eb',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  previewCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.03)',
    border: '1px solid #e5e7eb',
    height: '100%',
  },
  scoreCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: '10px',
    padding: '1.5rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    border: '1px solid #dbeafe',
  },
  scoreHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    color: '#1e40af',
  },
  scoreCircle: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scoreValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e40af',
  },
  scoreLabel: {
    fontSize: '0.9rem',
    color: '#4b5563',
  },
  scoreDescription: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#4b5563',
    fontWeight: '500',
  },
  feedbackSection: {
    flex: '1',
  },
  feedbackHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    position: 'relative',
  },
  copyButton: {
    position: 'absolute',
    right: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#eef2ff',
    color: '#4f46e5',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  feedbackList: {
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    padding: '1.25rem',
    marginBottom: '1.5rem',
    border: '1px solid #e5e7eb',
  },
  feedbackItem: {
    display: 'flex',
    gap: '1rem',
    padding: '0.75rem 0',
    borderBottom: '1px solid #e5e7eb',
  },
  bullet: {
    minWidth: '8px',
    height: '8px',
    backgroundColor: '#4f46e5',
    borderRadius: '50%',
    marginTop: '0.5rem',
  },
  feedbackText: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  keywordsContainer: {
    display: 'flex',
    gap: '1rem',
    flex: '1',
  },
  keywordsColumn: {
    flex: '1',
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    padding: '1.25rem',
    border: '1px solid #e5e7eb',
  },
  keywordTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0 0 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  keywordList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  matchedKeyword: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  missingKeyword: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  tipList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  tipItem: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid #e5e7eb',
  },
  tipBullet: {
    minWidth: '28px',
    height: '28px',
    backgroundColor: '#e0e7ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    color: '#4f46e5',
  },
  exampleSection: {
    marginTop: '1.5rem',
  },
  exampleTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0 0 1rem',
    color: '#1f2937',
  },
  exampleContainer: {
    display: 'flex',
    gap: '1rem',
  },
  exampleBad: {
    flex: '1',
    backgroundColor: '#fef2f2',
    borderRadius: '8px',
    padding: '1rem',
    borderLeft: '4px solid #ef4444',
  },
  exampleGood: {
    flex: '1',
    backgroundColor: '#f0fdf4',
    borderRadius: '8px',
    padding: '1rem',
    borderLeft: '4px solid #22c55e',
  },
  footer: {
    textAlign: 'center',
    padding: '1.5rem',
    color: '#6b7280',
    fontSize: '0.9rem',
    borderTop: '1px solid #e5e7eb',
    marginTop: 'auto',
  },
};

export default ResumeCheck;