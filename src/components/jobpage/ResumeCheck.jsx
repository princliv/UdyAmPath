import React, { useState } from "react";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useNavigate } from "react-router-dom";
import { FaFileUpload, FaCheckCircle, FaTimesCircle, FaRobot, FaClipboardList } from "react-icons/fa";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ResumeCheck = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [matched, setMatched] = useState([]);
  const [missing, setMissing] = useState([]);
  const [resumeName, setResumeName] = useState("");
  const navigate = useNavigate();

  const keywordsMap = {
    // Frontend roles
    "Frontend Developer": ["JavaScript", "React", "CSS", "HTML", "UI Design", "ES6", "TypeScript", "Redux", "SASS", "Webpack", "AJAX", "jQuery", "Bootstrap", "Responsive Design", "Cross-Browser Compatibility", "Single Page Applications (SPA)", "Progressive Web Apps (PWA)"],
  
    // Backend roles
    "Backend Developer": ["Node.js", "MongoDB", "REST API", "Express", "Docker", "SQL", "Java", "Python", "Ruby", "PHP", "GraphQL", "API Development", "JWT", "OAuth", "Nginx", "Apache", "Redis", "MySQL", "PostgreSQL", "Linux", "Microservices"],
  
    // Full-Stack roles
    "Full-Stack Developer": ["JavaScript", "Node.js", "React", "MongoDB", "Express", "CSS", "HTML", "REST API", "GraphQL", "Redux", "TypeScript", "SQL", "Docker", "AWS", "Git", "CI/CD", "Agile", "Version Control"],
  
    // Android Developer role
    "Android Developer": ["Java", "Kotlin", "Android Studio", "SDK", "Android Jetpack", "Firebase", "UI Design", "Material Design", "REST API", "SQLite", "Room", "Gradle", "Push Notifications", "Android Architecture Components", "Unit Testing", "JUnit", "MVVM", "Coroutines", "LiveData", "RecyclerView", "Retrofit"],
  
    // iOS Developer role
    "iOS Developer": ["Swift", "Objective-C", "Xcode", "Cocoa Touch", "UIKit", "CoreData", "CoreAnimation", "Firebase", "REST API", "JSON", "Auto Layout", "Unit Testing", "SwiftUI", "Combine", "Push Notifications", "App Store", "Google Firebase", "MVVM", "UI Kit", "CoreLocation", "CocoaPods"],
  
    // Flutter Developer role
    "Flutter Developer": ["Dart", "Flutter", "Android Studio", "Xcode", "Widgets", "State Management", "Firebase", "REST API", "UI Design", "Flutter SDK", "Widgets", "Material Design", "Push Notifications", "Local Storage", "SQLite", "Test Automation", "Unit Testing", "BLoC", "Riverpod", "Provider", "Redux"],
  
    // DevOps roles
    "DevOps Engineer": ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "CI/CD", "Linux", "Shell Scripting", "Ansible", "Git", "Nginx", "Apache", "CloudFormation", "Puppet", "Monitoring", "Prometheus", "Grafana", "Helm", "Infrastructure as Code (IaC)"],
  
    // Data Science roles
    "Data Scientist": ["Python", "R", "SQL", "Machine Learning", "Deep Learning", "AI", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-Learn", "Data Visualization", "Matplotlib", "Seaborn", "Big Data", "Hadoop", "Spark", "Jupyter", "AWS SageMaker", "Data Cleaning", "Feature Engineering", "Time Series Analysis"],
  
    // Data Engineer roles
    "Data Engineer": ["Python", "SQL", "ETL", "AWS", "Big Data", "Apache Kafka", "Hadoop", "Spark", "ETL Pipelines", "NoSQL", "Data Warehousing", "Data Modeling", "Redshift", "PostgreSQL", "Apache Airflow", "CI/CD", "Docker", "Kubernetes", "Data Lakes"],
  
    // Machine Learning Engineer roles
    "Machine Learning Engineer": ["Python", "TensorFlow", "PyTorch", "Keras", "Machine Learning", "Deep Learning", "Neural Networks", "AI", "Data Preprocessing", "Data Science", "NLP", "Computer Vision", "Kubernetes", "Docker", "Scikit-Learn", "AWS SageMaker", "Model Deployment", "Model Optimization", "AutoML"],
  
    // QA Engineer roles
    "QA Engineer": ["Test Automation", "Selenium", "JUnit", "Cypress", "Jest", "Mocha", "TestNG", "Appium", "Git", "Agile", "Jira", "Bug Tracking", "Manual Testing", "API Testing", "Performance Testing", "UI Testing", "CI/CD", "TDD", "BDD", "Postman"],
  
    // UX/UI Designer roles
    "UX/UI Designer": ["UX Research", "Wireframing", "Prototyping", "Figma", "Sketch", "Adobe XD", "UI Design", "User Testing", "User Research", "Adobe Illustrator", "InVision", "Design Systems", "Responsive Design", "Design Thinking", "Storyboarding", "Interaction Design", "High-Fidelity Prototypes"],
  
    // Product Manager roles
    "Product Manager": ["Agile", "Scrum", "Product Roadmap", "User Stories", "Product Strategy", "Market Research", "Product Lifecycle", "Stakeholder Management", "Jira", "Confluence", "Data-Driven Decisions", "A/B Testing", "Customer Feedback", "Go-to-Market Strategy", "Cross-Functional Teams", "KPIs", "Product Vision"],
  
    // Cloud Architect roles
    "Cloud Architect": ["AWS", "Azure", "GCP", "Cloud Infrastructure", "Cloud Security", "Cloud Architecture", "DevOps", "Microservices", "Docker", "Kubernetes", "Terraform", "CI/CD", "API Gateway", "Serverless", "Hybrid Cloud", "VPC", "CloudFormation", "Cloud Security Best Practices"],
  
    // Blockchain Developer roles
    "Blockchain Developer": ["Ethereum", "Solidity", "Smart Contracts", "Blockchain", "Cryptocurrency", "Decentralized Applications", "Web3.js", "Truffle", "IPFS", "Bitcoin", "Node.js", "Python", "Go", "Hyperledger", "Blockchain Security", "Consensus Algorithms", "Distributed Ledger", "Cryptographic Hashing"],
  
    // AI/ML Researcher roles
    "AI/ML Researcher": ["Machine Learning", "Deep Learning", "Artificial Intelligence", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "Reinforcement Learning", "Neural Networks", "Keras", "Python", "Data Science", "Big Data", "GPU Programming", "Cloud Computing", "Model Optimization", "Research Papers"],
  
    // Cybersecurity roles
    "Cybersecurity Specialist": ["Network Security", "Firewalls", "Penetration Testing", "Ethical Hacking", "Cryptography", "Security Audits", "Risk Assessment", "Threat Intelligence", "Malware Analysis", "Incident Response", "SOC", "SIEM", "AWS Security", "Security Policies", "ISO 27001", "CISSP", "CISM", "Zero Trust Architecture"],
  
    // Game Developer roles
    "Game Developer": ["C#", "Unity", "Unreal Engine", "Game Design", "3D Modeling", "Game Physics", "AI Programming", "Multiplayer Games", "Graphics Programming", "OpenGL", "Shader Programming", "VR/AR", "Game Engines", "Game Development Life Cycle", "Game Monetization", "Gameplay Scripting", "Level Design"],
  };
  

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      let text = "";
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + " ";
      }
      setResumeText(text);
    };
    reader.readAsArrayBuffer(file);
  };

  const extractTextFromDocx = (file) => {
    const reader = new FileReader();
    reader.onload = async function () {
      const result = await mammoth.extractRawText({ arrayBuffer: this.result });
      setResumeText(result.value);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResumeName(file.name); // Show the uploaded resume name
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

  const handleCheck = () => {
    if (!resumeText || !jobTitle) return alert("📂 Upload your resume and select a job role to continue.");
    
    const jobKeywords = keywordsMap[jobTitle] || [];
    const resumeLower = resumeText.toLowerCase().replace(/\s+/g, " ").trim();  // Normalize spaces and trim
  
    // Making keyword matching case-insensitive and flexible for variations
    const found = jobKeywords.filter((kw) => resumeLower.includes(kw.toLowerCase().replace(/\./g, "")));
    const missing = jobKeywords.filter((kw) => !resumeLower.includes(kw.toLowerCase().replace(/\./g, "")));
  
    const tips = [
      found.length > 0
        ? "💡 Good job! You've included key terms from the job description."
        : "🧩 Consider adding more relevant terms from the job role.",
      missing.length > 0
        ? `📌 You're missing: ${missing.slice(0, 3).join(", ")}`
        : "✅ Excellent! You've covered all key terms.",
      "📈 Tip: Use quantifiable achievements to enhance your experience section.",
    ];
  
    setMatched(found);
    setMissing(missing);
    setFeedback(tips);
  };
  
  return (
  <div style={styles.container}>
    <h2 style={styles.heading}>Resume Preview & Smart Feedback</h2>
    <p style={styles.subText}>
      Upload your resume and compare it with job-specific keywords to get personalized suggestions. 🚀
    </p>

    <div style={styles.grid}>
      {/* Upload Resume */}
      <div style={styles.card}>
        <h3>📄 Upload Resume</h3>
        <label style={styles.fileLabel}>
          <FaFileUpload /> Upload Resume
          <input type="file" onChange={handleResumeUpload} accept=".pdf,.docx" hidden />
        </label>
        {resumeName && <p style={styles.uploadedResumeName}>{resumeName}</p>}
      </div>

      {/* Select Job Position */}
      <div style={styles.card}>
        <h3>🎯 Select Job Position</h3>
        <select value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} style={styles.dropdown}>
          <option value="">Choose a position...</option>
          {Object.keys(keywordsMap).map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {/* Analysis Preview */}
      <div style={styles.card}>
        <h3>📊 Analysis Preview</h3>
        <ul style={styles.analysisList}>
          <li>• Keyword matching with job requirements</li>
          <li>• Skills alignment assessment</li>
          <li>• Format and structure recommendations</li>
          <li>• ATS compatibility score</li>
        </ul>
        <button onClick={handleCheck} style={styles.checkBtn}>Check My Resume</button>
        <p style={styles.noteText}>Please upload a resume and select a position to continue</p>
      </div>

      {/* Pro Tips */}
      <div style={styles.card}>
        <h3>💡 Pro Tips</h3>
        <ul style={styles.tipList}>
          <li>• Use a clean, professional PDF format</li>
          <li>• Include relevant keywords from the job description</li>
          <li>• Keep your resume to 1-2 pages maximum</li>
          <li>• Use clear section headers and bullet points</li>
        </ul>
      </div>
    </div>

    {/* Feedback Section */}
    {feedback.length > 0 && (
      <div style={styles.resultBox}>
        <h3><FaRobot /> Smart AI Suggestions</h3>
        <ul>
          {feedback.map((point, idx) => (
            <li key={idx} style={styles.feedbackItem}>{point}</li>
          ))}
        </ul>

        <div style={styles.keywordBox}>
          <h4><FaCheckCircle color="#2E7D32" /> Matched Keywords</h4>
          {matched.map((kw) => (
            <span key={kw} style={styles.matched}>{`✔ ${kw}`}</span>
          ))}
        </div>

        <div style={styles.keywordBox}>
          <h4><FaTimesCircle color="#C62828" /> Missing Keywords</h4>
          {missing.map((kw) => (
            <span key={kw} style={styles.missing}>{`✘ ${kw}`}</span>
          ))}
        </div>
      </div>
    )}
  </div>
);

};

const styles = {
  container: {
    backgroundColor: '#f5f6fa',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '10px',
  },
  subText: {
    textAlign: 'center',
    fontSize: '16px',
    marginBottom: '30px',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  fileLabel: {
    display: 'block',
    padding: '15px',
    border: '2px dashed #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '10px',
    color: '#555',
    backgroundColor: '#f9f9f9',
  },
  uploadedResumeName: {
    fontStyle: 'italic',
    color: '#777',
    fontSize: '14px',
    marginTop: '10px',
  },
  dropdown: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    marginTop: '10px',
  },
  checkBtn: {
    backgroundColor: '#4f46e5',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '16px',
    marginTop: '15px',
    width: '100%',
  },
  noteText: {
    marginTop: '10px',
    fontSize: '13px',
    color: '#888',
    textAlign: 'center',
  },
  analysisList: {
    fontSize: '14px',
    lineHeight: '1.8',
    paddingLeft: '15px',
  },
  tipList: {
    fontSize: '14px',
    lineHeight: '1.8',
    paddingLeft: '15px',
  },
  resultBox: {
    marginTop: '30px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  feedbackItem: {
    padding: '8px 0',
    borderBottom: '1px solid #eee',
    color: '#444',
  },
  keywordBox: {
    marginTop: '20px',
  },
  matched: {
    display: 'inline-block',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '6px 10px',
    margin: '5px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  missing: {
    display: 'inline-block',
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '6px 10px',
    margin: '5px',
    borderRadius: '20px',
    fontSize: '14px',
  },
};


export default ResumeCheck;
