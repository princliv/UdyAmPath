import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ModulePage = () => {
    const location = useLocation();
    const [moduleData, setModuleData] = useState(null);
    const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
    const [completedModules, setCompletedModules] = useState([]);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/coursedata.json");
                const data = await response.json();
                const selectedModule = data.find(
                    (mod) => mod.id === location.state?.module?.id
                );
                setModuleData(selectedModule);
            } catch (error) {
                console.error("Error loading module data:", error);
            }
        };

        fetchData();
    }, [location.state]);

    if (!moduleData || !moduleData.pathway) {
        return <p style={styles.errorText}>No module data available.</p>;
    }

    const handleModuleClick = (index) => {
        setSelectedModuleIndex(index);
    };

    const handleNext = () => {
        if (selectedModuleIndex < moduleData.pathway.length - 1) {
            setCompletedModules([...new Set([...completedModules, selectedModuleIndex])]);
            setSelectedModuleIndex(selectedModuleIndex + 1);
        } else {
            setShowCompletionModal(true);
        }
    };

    const handlePrevious = () => {
        if (selectedModuleIndex > 0) {
            setSelectedModuleIndex(selectedModuleIndex - 1);
        }
    };

    const handleStartQuiz = () => {
        setShowCompletionModal(false);
        setShowQuizModal(true);
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Modules</h2>
                {moduleData.pathway.map((step, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.moduleItem,
                            backgroundColor: selectedModuleIndex === index ? "#c7b3ff" : "#ece6ff",
                            boxShadow: selectedModuleIndex === index ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
                        }}
                        onClick={() => handleModuleClick(index)}
                    >
                        {step.title} {completedModules.includes(index) && "✔️"}
                    </div>
                ))}
            </div>
            <div style={styles.content}>
                <div style={styles.navButtons}>
                    <button style={{ ...styles.navButton, marginRight: "10px" }} onClick={handlePrevious} disabled={selectedModuleIndex === 0}>
                        Previous
                    </button>
                    <button style={styles.navButton} onClick={handleNext}>
                        Next
                    </button>
                </div>
                <h2 style={styles.moduleTitle}>{moduleData.pathway[selectedModuleIndex].title}</h2>
                <p style={styles.moduleDetails}>{moduleData.pathway[selectedModuleIndex].details}</p>
                <div style={styles.moduleContent}>{renderModuleContent(moduleData.pathway[selectedModuleIndex].data)}</div>
            </div>

            {showCompletionModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Course Completed!</h2>
                        <p>You have completed the course. Are you ready for the assessment?</p>
                        <div>
                            <button style={styles.modalButton} onClick={handleStartQuiz}>Yes</button>
                            <button style={styles.modalButton} onClick={() => setShowCompletionModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {showQuizModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Quiz Time!</h2>
                        <p>Here would be the quiz questions...</p>
                        <button style={styles.modalButton} onClick={() => setShowQuizModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const renderModuleContent = (data) => {
    if (!data) return <p style={styles.errorText}>No content available.</p>;

    switch (data.type) {
        case "text":
            return <div style={styles.textContent} dangerouslySetInnerHTML={{ __html: data.content }} />;
        case "video":
            return <iframe style={styles.videoPlayer} src={data.content} title="Video Content" allowFullScreen />;
        case "pdf":
            return <iframe style={styles.pdfViewer} src={`https://docs.google.com/gview?url=${encodeURIComponent(data.content)}&embedded=true`} title="PDF Document" />;
        case "image":
            return <img style={styles.media} src={data.content} alt="Module Content" />;
        default:
            return <p style={styles.errorText}>Unsupported content type.</p>;
    }
};

const styles = {
    container: {
        display: "flex",
        padding: "20px",
        gap: "20px",
        background: "linear-gradient(to bottom, #faf9ff, #eae6ff)",
        minHeight: "100vh",
    },
    sidebar: {
        width: "270px",
        background: "#fff",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    sidebarTitle: {
        fontSize: "22px",
        fontWeight: "bold",
        color: "#5a3ec8",
        textAlign: "center",
    },
    moduleItem: {
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "8px",
        textAlign: "center",
        transition: "all 0.3s ease-in-out",
    },
    content: {
        flex: 1,
        background: "#ffffff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    },
    navButtons: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "15px",
    },
    navButton: {
        padding: "12px 18px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        background: "linear-gradient(to right, #7b61ff, #5a3ec8)",
        color: "#fff",
        fontSize: "16px",
    },
    moduleTitle: {
        fontSize: "26px",
        fontWeight: "bold",
        marginBottom: "12px",
        color: "#5a3ec8",
    },
    moduleDetails: {
        fontSize: "18px",
        marginBottom: "20px",
        lineHeight: "1.5",
        color: "#555",
    },
    moduleContent: {
        marginTop: "20px",
    },
    media: {
        width: "100%",
        height: "auto",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    },
    videoPlayer: {
        width: "100%",
        height: "500px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    },
    textContent: {
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#333",
    },
    errorText: {
        textAlign: "center",
        fontSize: "18px",
        color: "#555",
    },
    pdfViewer: {
        width: "100%",
        height: "600px",
        border: "none",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        background: "linear-gradient(to bottom, #ffffff, #f3f0ff)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
    },
    modalButton: {
        margin: "10px",
        padding: "10px 15px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        background: "#7b61ff",
        color: "#fff",
        fontSize: "16px",
    },
};

export default ModulePage;
