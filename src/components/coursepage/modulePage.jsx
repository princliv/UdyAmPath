import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ModulePage = () => {
    const location = useLocation();
    const [moduleData, setModuleData] = useState(null);
    const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
    const [completedModules, setCompletedModules] = useState([]);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/coursedata.json");
                const data = await response.json();
                const selectedModule = data.find(
                    (mod) => mod.id === location.state?.module?.id
                );
                setModuleData(selectedModule);
            } catch (error) {
                console.error("Error loading module data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [location.state]);

    if (isLoading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loader}></div>
                <p style={styles.loadingText}>Loading course content...</p>
            </div>
        );
    }

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
                <div style={styles.sidebarHeader}>
                    <h2 style={styles.sidebarTitle}>{moduleData.title}</h2>
                    <div style={styles.progressContainer}>
                        <div style={styles.progressBar}>
                            <div 
                                style={{
                                    ...styles.progressFill,
                                    width: `${(completedModules.length / moduleData.pathway.length) * 100}%`
                                }}
                            ></div>
                        </div>
                        <span style={styles.progressText}>
                            {Math.round((completedModules.length / moduleData.pathway.length) * 100)}% Complete
                        </span>
                    </div>
                </div>
                <div style={styles.moduleList}>
                    {moduleData.pathway.map((step, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.moduleItem,
                                backgroundColor: selectedModuleIndex === index ? "#f0ebff" : "#fff",
                                borderLeft: selectedModuleIndex === index ? "4px solid #7b61ff" : "4px solid transparent",
                            }}
                            onClick={() => handleModuleClick(index)}
                        >
                            <div style={styles.moduleItemContent}>
                                <span style={styles.moduleItemIndex}>{index + 1}</span>
                                <span style={styles.moduleItemTitle}>{step.title}</span>
                                {completedModules.includes(index) && (
                                    <span style={styles.completedBadge}>✓</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.content}>
                <div style={styles.navButtons}>
                    <button 
                        style={{ 
                            ...styles.navButton, 
                            ...(selectedModuleIndex === 0 && styles.disabledButton) 
                        }} 
                        onClick={handlePrevious} 
                        disabled={selectedModuleIndex === 0}
                    >
                        ← Previous
                    </button>
                    <button 
                        style={styles.navButton} 
                        onClick={handleNext}
                    >
                        {selectedModuleIndex === moduleData.pathway.length - 1 ? 'Finish' : 'Next →'}
                    </button>
                </div>
                <div style={styles.contentCard}>
                    <h2 style={styles.moduleTitle}>{moduleData.pathway[selectedModuleIndex].title}</h2>
                    <p style={styles.moduleDetails}>{moduleData.pathway[selectedModuleIndex].details}</p>
                    <div style={styles.moduleContent}>
                        {renderModuleContent(moduleData.pathway[selectedModuleIndex].data)}
                    </div>
                </div>
            </div>

            {showCompletionModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalIcon}>🎉</div>
                        <h2 style={styles.modalTitle}>Course Completed!</h2>
                        <p style={styles.modalText}>Congratulations! You've completed all the modules. Ready to test your knowledge with a quick assessment?</p>
                        <div style={styles.modalButtons}>
                            <button style={styles.primaryButton} onClick={handleStartQuiz}>
                                Start Assessment
                            </button>
                            <button 
                                style={styles.secondaryButton} 
                                onClick={() => setShowCompletionModal(false)}
                            >
                                Review Again
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showQuizModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalIcon}>📝</div>
                        <h2 style={styles.modalTitle}>Assessment Time!</h2>
                        <p style={styles.modalText}>This quiz will test your understanding of the course material.</p>
                        <div style={styles.quizContent}>
                            {/* Quiz questions would go here */}
                            <div style={styles.quizPlaceholder}>
                                <p>Quiz content would appear here</p>
                            </div>
                        </div>
                        <button 
                            style={styles.primaryButton} 
                            onClick={() => setShowQuizModal(false)}
                        >
                            Submit Answers
                        </button>
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
            return (
                <div style={styles.videoContainer}>
                    <iframe 
                        style={styles.videoPlayer} 
                        src={data.content} 
                        title="Video Content" 
                        allowFullScreen 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    />
                </div>
            );
        case "pdf":
            return (
                <div style={styles.pdfContainer}>
                    <iframe 
                        style={styles.pdfViewer} 
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(data.content)}&embedded=true`} 
                        title="PDF Document" 
                    />
                </div>
            );
        case "image":
            return (
                <div style={styles.imageContainer}>
                    <img 
                        style={styles.media} 
                        src={data.content} 
                        alt="Module Content" 
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://via.placeholder.com/800x450?text=Image+Not+Available";
                        }}
                    />
                </div>
            );
        default:
            return <p style={styles.errorText}>Unsupported content type.</p>;
    }
};

const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Inter', sans-serif",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
    },
    loader: {
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #7b61ff",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        animation: "spin 1s linear infinite",
        marginBottom: "20px",
    },
    loadingText: {
        fontSize: "16px",
        color: "#555",
    },
    sidebar: {
        width: "320px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        padding: "0",
        display: "flex",
        flexDirection: "column",
    },
    sidebarHeader: {
        padding: "24px",
        borderBottom: "1px solid #f0f0f0",
    },
    sidebarTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#2d3748",
        marginBottom: "16px",
    },
    progressContainer: {
        marginTop: "16px",
    },
    progressBar: {
        height: "6px",
        backgroundColor: "#edf2f7",
        borderRadius: "3px",
        overflow: "hidden",
        marginBottom: "8px",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#7b61ff",
        transition: "width 0.3s ease",
    },
    progressText: {
        fontSize: "12px",
        color: "#718096",
        display: "block",
        textAlign: "right",
    },
    moduleList: {
        flex: 1,
        overflowY: "auto",
        padding: "8px 0",
    },
    moduleItem: {
        padding: "12px 24px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        borderBottom: "1px solid #f0f0f0",
    },
    moduleItemContent: {
        display: "flex",
        alignItems: "center",
    },
    moduleItemIndex: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: "#f0ebff",
        color: "#7b61ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "600",
        marginRight: "12px",
    },
    moduleItemTitle: {
        fontSize: "14px",
        color: "#4a5568",
        flex: 1,
    },
    completedBadge: {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#48bb78",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
    },
    content: {
        flex: 1,
        padding: "32px",
        backgroundColor: "#f8f9fa",
        overflowY: "auto",
    },
    contentCard: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 15px rgba(0, 0, 0, 0.03)",
        padding: "32px",
        marginTop: "16px",
    },
    navButtons: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
    },
    navButton: {
        padding: "12px 24px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        backgroundColor: "#7b61ff",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 5px rgba(123, 97, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    disabledButton: {
        backgroundColor: "#e2e8f0",
        color: "#a0aec0",
        cursor: "not-allowed",
        boxShadow: "none",
    },
    moduleTitle: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#2d3748",
        marginBottom: "16px",
    },
    moduleDetails: {
        fontSize: "16px",
        color: "#4a5568",
        lineHeight: "1.6",
        marginBottom: "24px",
    },
    moduleContent: {
        marginTop: "24px",
    },
    textContent: {
        fontSize: "16px",
        lineHeight: "1.8",
        color: "#4a5568",
    },
    videoContainer: {
        position: "relative",
        paddingBottom: "56.25%",
        height: "0",
        overflow: "hidden",
        borderRadius: "8px",
        margin: "16px 0",
    },
    videoPlayer: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        border: "none",
    },
    pdfContainer: {
        height: "600px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        margin: "16px 0",
    },
    pdfViewer: {
        width: "100%",
        height: "100%",
        border: "none",
    },
    imageContainer: {
        borderRadius: "8px",
        overflow: "hidden",
        margin: "16px 0",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    media: {
        width: "100%",
        height: "auto",
        display: "block",
    },
    errorText: {
        color: "#e53e3e",
        textAlign: "center",
        padding: "24px",
        fontSize: "16px",
    },
    modalOverlay: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
        backdropFilter: "blur(4px)",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        width: "500px",
        maxWidth: "90%",
        padding: "32px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    },
    modalIcon: {
        fontSize: "48px",
        marginBottom: "16px",
    },
    modalTitle: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#2d3748",
        marginBottom: "16px",
    },
    modalText: {
        fontSize: "16px",
        color: "#4a5568",
        lineHeight: "1.6",
        marginBottom: "24px",
    },
    modalButtons: {
        display: "flex",
        justifyContent: "center",
        gap: "16px",
    },
    primaryButton: {
        padding: "12px 24px",
        backgroundColor: "#7b61ff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 5px rgba(123, 97, 255, 0.2)",
    },
    secondaryButton: {
        padding: "12px 24px",
        backgroundColor: "transparent",
        color: "#7b61ff",
        border: "1px solid #7b61ff",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    quizContent: {
        margin: "24px 0",
        padding: "16px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
    },
    quizPlaceholder: {
        padding: "32px",
        backgroundColor: "#edf2f7",
        borderRadius: "4px",
        color: "#718096",
    },
};

export default ModulePage;