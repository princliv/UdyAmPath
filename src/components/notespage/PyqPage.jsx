import React, { useState } from "react";
import { FaFilePdf, FaFilter } from "react-icons/fa";
import { FiDownload, FiEye, FiGrid, FiList, FiSearch, FiX } from "react-icons/fi";

const PyqPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Exam categories
  const examCategories = [
    "All",
    "AMCAT",
    "GATE",
    "TCS NQT",
    "Aptitude",
    "Reasoning",
    "Cocubes",
    "Infosys",
    "Wipro",
    "Capgemini",
    "Accenture",
    "HCL",
    "Deloitte"
  ];

  // PYQ data with PDF paths
  const pyqs = [
    {
      id: 1,
      title: "AMCAT Quantitative Ability 2023",
      year: "2023",
      exam: "AMCAT",
      category: "Quantitative",
      pages: 15,
      size: "3.2 MB",
      url: "/pyq/amcat-quant-2023.pdf"
    },
    {
      id: 2,
      title: "AMCAT English Comprehension 2023",
      year: "2023",
      exam: "AMCAT",
      category: "Verbal",
      pages: 12,
      size: "2.8 MB",
      url: "/pyq/amcat-eng-compre-2023.pdf"
    },
    {
      id: 3,
      title: "AMCAT Logical Ability 2022",
      year: "2022",
      exam: "AMCAT",
      category: "Logical",
      pages: 18,
      size: "3.7 MB",
      url: "/pyq/amcat-logical-2022.pdf"
    },
    {
      id: 4,
      title: "AMCAT Computer Programming 2022",
      year: "2022",
      exam: "AMCAT",
      category: "Programming",
      pages: 20,
      size: "4.1 MB",
      url: "/pyq/amcat-programming-2022.pdf"
    },
    {
      id: 5,
      title: "AMCAT Automata Fix 2021",
      year: "2021",
      exam: "AMCAT",
      category: "Automata",
      pages: 14,
      size: "3.0 MB",
      url: "/pyq/amcat-automata-2021.pdf"
    },

    // GATE Papers
    {
      id: 6,
      title: "GATE Computer Science 2023",
      year: "2023",
      exam: "GATE",
      category: "Computer Science",
      pages: 22,
      size: "4.5 MB",
      url: "/pyq/gate-cs-2023.pdf"
    },
    {
      id: 7,
      title: "GATE Information Technology 2023",
      year: "2023",
      exam: "GATE",
      category: "IT",
      pages: 20,
      size: "4.2 MB",
      url: "/pyq/gate-it-2023.pdf"
    },
    {
      id: 9,
      title: "GATE Data Science 2022",
      year: "2022",
      exam: "GATE",
      category: "Data Science",
      pages: 19,
      size: "4.0 MB",
      url: "/pyq/gate-ds-2022.pdf"
    },

    // TCS NQT Papers
    {
      id: 10,
      title: "TCS NQT Verbal Ability 2023",
      year: "2023",
      exam: "TCS NQT",
      category: "Verbal",
      pages: 12,
      size: "2.8 MB",
      url: "/pyq/tcs-nqt-verbal-2023.pdf"
    },
    {
      id: 11,
      title: "TCS NQT Numerical Ability 2023",
      year: "2023",
      exam: "TCS NQT",
      category: "Numerical",
      pages: 14,
      size: "3.0 MB",
      url: "/pyq/tcs-nqt-numerical-2023.pdf"
    },
    {
      id: 12,
      title: "TCS NQT Programming 2022",
      year: "2022",
      exam: "TCS NQT",
      category: "Programming",
      pages: 16,
      size: "3.4 MB",
      url: "/pyq/tcs-nqt-programming-2022.pdf"
    },

    // Aptitude Papers
    {
      id: 13,
      title: "Aptitude Logical Reasoning 2023",
      year: "2023",
      exam: "Aptitude",
      category: "Logical",
      pages: 18,
      size: "3.7 MB",
      url: "/pyq/aptitude-logical-2023.pdf"
    },
    {
      id: 14,
      title: "Aptitude Quantitative 2022",
      year: "2022",
      exam: "Aptitude",
      category: "Quantitative",
      pages: 20,
      size: "4.1 MB",
      url: "/pyq/aptitude-quant-2022.pdf"
    },

    // Cocubes Papers
    {
      id: 15,
      title: "Cocubes English 2023",
      year: "2023",
      exam: "Cocubes",
      category: "English",
      pages: 12,
      size: "2.8 MB",
      url: "/pyq/cocubes-english-2023.pdf"
    },
    {
      id: 16,
      title: "Cocubes Analytical 2022",
      year: "2022",
      exam: "Cocubes",
      category: "Analytical",
      pages: 15,
      size: "3.2 MB",
      url: "/pyq/cocubes-analytical-2022.pdf"
    },

    // Other company papers
    {
      id: 17,
      title: "Infosys Pseudocode 2023",
      year: "2023",
      exam: "Infosys",
      category: "Pseudocode",
      pages: 10,
      size: "2.2 MB",
      url: "/pyq/infosys-pseudo-2023.pdf"
    },
    {
      id: 18,
      title: "Wipro Technical 2023",
      year: "2023",
      exam: "Wipro",
      category: "Technical",
      pages: 16,
      size: "3.4 MB",
      url: "/pyq/wipro-tech-2023.pdf"
    },
    {
      id: 19,
      title: "Capgemini Game Aptitude 2023",
      year: "2023",
      exam: "Capgemini",
      category: "Game",
      pages: 20,
      size: "4.1 MB",
      url: "/pyq/capgemini-game-2023.pdf"
    },
    {
      id: 20,
      title: "Accenture Cognitive 2022",
      year: "2022",
      exam: "Accenture",
      category: "Cognitive",
      pages: 18,
      size: "3.7 MB",
      url: "/pyq/accenture-cognitive-2022.pdf"
    },
    {
      id: 21,
      title: "HCL Technical 2022",
      year: "2022",
      exam: "HCL",
      category: "Technical",
      pages: 14,
      size: "3.0 MB",
      url: "/pyq/hcl-tech-2022.pdf"
    },
    {
      id: 22,
      title: "Deloitte Case Study 2021",
      year: "2021",
      exam: "Deloitte",
      category: "Case Study",
      pages: 22,
      size: "4.5 MB",
      url: "/pyq/deloitte-case-2021.pdf"
    }
  ];

  const filteredPyqs = pyqs.filter(pyq => {
    const matchesSearch = 
      pyq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pyq.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pyq.year.includes(searchQuery);
    
    const matchesExam = selectedExam === "All" || pyq.exam === selectedExam;
    
    return matchesSearch && matchesExam;
  });


  const openPdfInNewTab = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  const downloadPdf = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Previous Year Questions</h1>
        <p style={styles.subtitle}>Access PYQs for various competitive exams and recruitment tests</p>
        
        <div style={styles.controlsContainer}>
          <div style={styles.searchContainer}>
            <FiSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search PYQs by title, category or year..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              style={styles.filterButton}
              onClick={toggleFilters}
            >
              <FaFilter size={16} />
              <span style={{ marginLeft: "5px" }}>Filters</span>
            </button>
          </div>
          
          <div style={styles.viewModeContainer}>
            <button 
              style={{
                ...styles.viewModeButton,
                ...(viewMode === "grid" ? styles.activeViewMode : {})
              }} 
              onClick={() => setViewMode("grid")}
            >
              <FiGrid size={18} />
            </button>
            <button 
              style={{
                ...styles.viewModeButton,
                ...(viewMode === "list" ? styles.activeViewMode : {})
              }}
              onClick={() => setViewMode("list")}
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div style={styles.filterPanel}>
            <div style={styles.filterHeader}>
              <h3>Filter by Exam</h3>
              <button 
                style={styles.closeFilterButton}
                onClick={toggleFilters}
              >
                <FiX size={18} />
              </button>
            </div>
            <div style={styles.examCategories}>
              {examCategories.map((exam) => (
                <button
                  key={exam}
                  style={{
                    ...styles.examButton,
                    ...(selectedExam === exam ? styles.activeExamButton : {})
                  }}
                  onClick={() => {
                    setSelectedExam(exam);
                    setShowFilters(false);
                  }}
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "40px" }}></div>

      <div style={styles.content}>
        {filteredPyqs.length === 0 ? (
          <div style={styles.emptyState}>
            <img 
              src="/empty-state.svg" 
              alt="No PYQs found" 
              style={styles.emptyStateImage}
            />
            <h3 style={styles.emptyStateTitle}>No PYQs found</h3>
            <p style={styles.emptyStateText}>
              {searchQuery || selectedExam !== "All" 
                ? "Try adjusting your search or filters"
                : "No PYQs available for the selected criteria"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div style={styles.gridContainer}>
            {filteredPyqs.map((pyq) => (
              <div key={pyq.id} style={styles.gridItem}>
                <div style={styles.fileBadge}>{pyq.exam}</div>
                <div style={styles.fileIcon}>
                  <FaFilePdf size={48} color="#E53E3E" />
                </div>
                <h3 style={styles.fileTitle}>{pyq.title}</h3>
                <div style={styles.fileMeta}>
                  <span>{pyq.year} • {pyq.category}</span>
                  <span>{pyq.size}</span>
                </div>
                <div style={styles.fileActions}>
                  <button 
                    style={styles.actionButton}
                    onClick={() => openPdfInNewTab(pyq.url)}
                  >
                    <FiEye size={16} /> View
                  </button>
                  <button 
                    style={styles.actionButton}
                    onClick={() => downloadPdf(pyq.url, pyq.title)}
                  >
                    <FiDownload size={16} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.listContainer}>
            <div style={styles.listHeader}>
              <div style={{ flex: 3 }}>Title</div>
              <div style={{ flex: 1 }}>Exam</div>
              <div style={{ flex: 1 }}>Category</div>
              <div style={{ flex: 1 }}>Year</div>
              <div style={{ flex: 1 }}>Size</div>
              <div style={{ flex: 1 }}>Actions</div>
            </div>
            {filteredPyqs.map((pyq) => (
              <div key={pyq.id} style={styles.listItem}>
                <div style={{ flex: 3, display: 'flex', alignItems: 'center' }}>
                  <FaFilePdf size={20} color="#E53E3E" style={{ marginRight: 10 }} />
                  {pyq.title}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={styles.examTag}>{pyq.exam}</span>
                </div>
                <div style={{ flex: 1 }}>{pyq.category}</div>
                <div style={{ flex: 1 }}>{pyq.year}</div>
                <div style={{ flex: 1 }}>{pyq.size}</div>
                <div style={{ flex: 1, display: 'flex', gap: '10px' }}>
                  <button 
                    style={styles.smallActionButton}
                    onClick={() => openPdfInNewTab(pyq.url)}
                  >
                    <FiEye size={14} />
                  </button>
                  <button 
                    style={styles.smallActionButton}
                    onClick={() => downloadPdf(pyq.url, pyq.title)}
                  >
                    <FiDownload size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "32px 24px",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "32px",
    position: "relative",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "8px",
    textAlign: "center",
    background: "linear-gradient(90deg, #3182ce, #805ad5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "18px",
    color: "#718096",
    textAlign: "center",
    marginBottom: "32px",
  },
  controlsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "12px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    flex: 1,
    minWidth: "300px",
    position: "relative",
  },
  searchIcon: {
    color: "#a0aec0",
    marginRight: "12px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    padding: "8px 0",
    "::placeholder": {
      color: "#a0aec0",
    },
  },
  filterButton: {
    display: "flex",
    alignItems: "center",
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "10px 16px",
    cursor: "pointer",
    color: "#4a5568",
    fontSize: "14px",
    fontWeight: "500",
    marginLeft: "12px",
    transition: "all 0.2s",
    ":hover": {
      borderColor: "#cbd5e0",
      backgroundColor: "#f7fafc",
    },
  },
  viewModeContainer: {
    display: "flex",
    gap: "8px",
  },
  viewModeButton: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "10px 12px",
    cursor: "pointer",
    color: "#4a5568",
    transition: "all 0.2s",
    ":hover": {
      borderColor: "#cbd5e0",
      backgroundColor: "#f7fafc",
    },
  },
  activeViewMode: {
    backgroundColor: "#ebf8ff",
    borderColor: "#90cdf4",
    color: "#3182ce",
  },
  filterPanel: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  closeFilterButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#718096",
    padding: "4px",
  },
  examCategories: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  examButton: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    background: "white",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
    ":hover": {
      borderColor: "#cbd5e0",
      backgroundColor: "#f7fafc",
    },
  },
  activeExamButton: {
    backgroundColor: "#ebf8ff",
    borderColor: "#90cdf4",
    color: "#3182ce",
    fontWeight: "500",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  gridItem: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    border: "1px solid #edf2f7",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px -3px rgba(0,0,0,0.1)",
      borderColor: "#bee3f8",
    },
  },
  fileBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "#ebf8ff",
    color: "#3182ce",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "500",
  },
  fileIcon: {
    marginBottom: "16px",
    marginTop: "8px",
  },
  fileTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#2d3748",
    lineHeight: "1.4",
  },
  fileMeta: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: "16px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  fileActions: {
    display: "flex",
    gap: "12px",
    width: "100%",
  },
  actionButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#edf2f7",
    },
  },
  listContainer: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  listHeader: {
    display: "flex",
    padding: "16px 24px",
    borderBottom: "1px solid #e2e8f0",
    fontWeight: "600",
    color: "#4a5568",
    fontSize: "14px",
    backgroundColor: "#f7fafc",
  },
  listItem: {
    display: "flex",
    padding: "16px 24px",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "14px",
    color: "#4a5568",
    alignItems: "center",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#f8fafc",
    },
  },
  examTag: {
    backgroundColor: "#ebf8ff",
    color: "#3182ce",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "500",
  },
  smallActionButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#4a5568",
    padding: "8px",
    borderRadius: "8px",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#edf2f7",
      color: "#3182ce",
    },
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 40px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginTop: "24px",
  },
  emptyStateImage: {
    width: "200px",
    height: "200px",
    marginBottom: "24px",
    opacity: "0.6",
  },
  emptyStateTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "12px",
  },
  emptyStateText: {
    fontSize: "16px",
    color: "#718096",
    maxWidth: "400px",
    margin: "0 auto",
  },
};

export default PyqPage;