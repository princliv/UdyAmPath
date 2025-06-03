import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Confetti from 'react-confetti';

const PathwayPhaseDetail = () => {
  const { state } = useLocation();
  const { id, phaseIndex } = useParams();
  const navigate = useNavigate();
  const { phase, specializationName } = state || {};
  const [allPhases, setAllPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testScore, setTestScore] = useState(null);
  const [activeTab, setActiveTab] = useState('content');

  React.useEffect(() => {
    const fetchSpecialization = async () => {
      try {
        const response = await fetch('/specializations.json');
        const data = await response.json();
        const foundSpec = data.specializations.find(spec => spec.id === parseInt(id));
        
        if (foundSpec && foundSpec.pathway) {
          setAllPhases(foundSpec.pathway);
        }
      } catch (error) {
        console.error("Error loading specialization:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialization();
  }, [id]);

  const markAsComplete = () => {
    const currentIndex = parseInt(phaseIndex);
    const newCompletedPhases = [...completedPhases, currentIndex];
    setCompletedPhases(newCompletedPhases);

    if (currentIndex === allPhases.length - 1) {
      setShowTestModal(true);
    } else {
      navigate(`/specialization/${id}/pathway/${currentIndex + 1}`, {
        state: {
          phase: allPhases[currentIndex + 1],
          specializationName
        }
      });
    }
  };

  const handleTestSubmit = (passed) => {
    setTestScore(passed ? 100 : 0);
    setShowTestModal(false);
    if (passed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  if (!phase) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>No pathway phase data available</div>
      </div>
    );
  }

  // Sample content data for each phase type
  const getPhaseContent = (phaseTitle) => {
    const contentMap = {
      'Foundation': {
        objectives: [
          "Understand the fundamental concepts of the specialization",
          "Learn about the course structure and expectations",
          "Get familiar with the learning resources available"
        ],
        videos: [
          {
            title: "Introduction to the Course",
            url: "https://www.youtube.com/embed/example1",
            duration: "15 min",
            description: "Overview of what you'll learn in this specialization"
          },
          {
            title: "Getting Started Guide",
            url: "https://www.youtube.com/embed/example2",
            duration: "10 min",
            description: "How to navigate through the learning materials"
          }
        ],
        pdfs: [
          {
            title: "Course Syllabus",
            url: "/pdfs/syllabus.pdf",
            pages: 5,
            description: "Detailed breakdown of the curriculum"
          },
          {
            title: "Study Guide",
            url: "/pdfs/study_guide.pdf",
            pages: 12,
            description: "Tips for effective learning"
          }
        ],
        exercises: [
          {
            title: "Self-Assessment Quiz",
            url: "/exercises/quiz1",
            duration: "20 min",
            description: "Test your current knowledge level"
          }
        ],
        content: (
          <div>
            <h3>Welcome to {specializationName}</h3>
            <p>
              This specialization is designed to take you from foundational concepts to advanced 
              applications. In this introductory phase, we'll cover:
            </p>
            <ul>
              <li>Key terminology and concepts</li>
              <li>The learning methodology we'll be using</li>
              <li>How to make the most of the course materials</li>
            </ul>
          </div>
        )
      },
      'Core ML': {
        objectives: [
          "Master the fundamental building blocks of the subject",
          "Understand key theories and principles",
          "Apply concepts through practical examples"
        ],
        videos: [
          {
            title: "Machine Learning Basics",
            url: "https://www.youtube.com/embed/ml-basics",
            duration: "25 min",
            description: "Introduction to supervised and unsupervised learning"
          },
          {
            title: "Model Evaluation Techniques",
            url: "https://www.youtube.com/embed/model-eval",
            duration: "20 min",
            description: "How to assess your ML models"
          }
        ],
        pdfs: [
          {
            title: "ML Algorithms Handbook",
            url: "/pdfs/ml_algorithms.pdf",
            pages: 30,
            description: "Comprehensive guide to common algorithms"
          }
        ],
        exercises: [
          {
            title: "Linear Regression Exercise",
            url: "/exercises/linreg",
            duration: "45 min",
            description: "Implement a simple regression model"
          },
          {
            title: "Classification Challenge",
            url: "/exercises/classification",
            duration: "1 hour",
            description: "Build a classifier for sample data"
          }
        ],
        content: (
          <div>
            <h3>Core Concepts Overview</h3>
            <p>
              In this phase, we'll explore the essential building blocks that form the foundation 
              of {specializationName}. These concepts are critical for understanding more advanced 
              topics later in the specialization.
            </p>
            
            <h4>Key Topics Covered:</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '15px',
              margin: '20px 0'
            }}>
              {phase.topics?.map((topic, index) => (
                <div key={index} style={{
                  backgroundColor: '#f5f9ff',
                  padding: '15px',
                  borderRadius: '8px',
                  borderLeft: '3px solid #004aad'
                }}>
                  <h5 style={{ margin: '0 0 10px 0' }}>Concept {index + 1}</h5>
                  <p style={{ margin: 0 }}>{topic}</p>
                </div>
              ))}
            </div>
          </div>
        )
      },
      'Deep Learning': {
        objectives: [
          "Explore complex applications of core concepts",
          "Develop problem-solving skills for advanced scenarios",
          "Analyze case studies and real-world implementations"
        ],
        videos: [
          {
            title: "Neural Networks Explained",
            url: "https://www.youtube.com/embed/nn-explained",
            duration: "30 min",
            description: "How neural networks work from the ground up"
          },
          {
            title: "CNN Architectures",
            url: "https://www.youtube.com/embed/cnn-arch",
            duration: "25 min",
            description: "Deep dive into convolutional neural networks"
          }
        ],
        pdfs: [
          {
            title: "Deep Learning Papers",
            url: "/pdfs/dl_papers.pdf",
            pages: 45,
            description: "Collection of seminal papers in deep learning"
          }
        ],
        exercises: [
          {
            title: "MNIST Classifier",
            url: "/exercises/mnist",
            duration: "2 hours",
            description: "Build a digit classifier using neural networks"
          }
        ],
        content: (
          <div>
            <h3>Advanced Topics Exploration</h3>
            <p>
              Now that you've mastered the fundamentals, we'll dive deeper into more complex 
              aspects of {specializationName}. This phase will challenge you to:
            </p>
            <ul>
              <li>Apply concepts in innovative ways</li>
              <li>Solve non-trivial problems</li>
              <li>Analyze sophisticated implementations</li>
            </ul>
          </div>
        )
      },
      'Specialization': {
        objectives: [
          "Synthesize all learned concepts into a comprehensive project",
          "Demonstrate mastery through practical application",
          "Receive feedback on your implementation"
        ],
        videos: [
          {
            title: "Project Guidelines",
            url: "https://www.youtube.com/embed/project-guide",
            duration: "20 min",
            description: "How to approach your final project"
          }
        ],
        pdfs: [
          {
            title: "Project Rubric",
            url: "/pdfs/project_rubric.pdf",
            pages: 8,
            description: "How your project will be evaluated"
          }
        ],
        exercises: [
          {
            title: "Final Project",
            url: "/exercises/final_project",
            duration: "10 hours",
            description: "Capstone project for the specialization"
          }
        ],
        content: (
          <div>
            <h3>Final Project Phase</h3>
            <p>
              Congratulations on reaching the final phase! Here you'll demonstrate everything 
              you've learned by completing a comprehensive project that showcases your skills 
              in {specializationName}.
            </p>
            
            <h4>Project Requirements:</h4>
            <ul>
              <li>Incorporate all major concepts covered in the specialization</li>
              <li>Demonstrate practical application of knowledge</li>
              <li>Show creativity and problem-solving ability</li>
            </ul>
          </div>
        )
      }
    };

    return contentMap[phaseTitle] || {
      objectives: ["Learn the key concepts of this phase"],
      videos: [],
      pdfs: [],
      exercises: [],
      content: (
        <div>
          <h3>Phase Content</h3>
          <p>
            This phase covers important concepts in {specializationName}. You'll learn through:
          </p>
          <ul>
            <li>Interactive video lectures</li>
            <li>Comprehensive reading materials</li>
            <li>Practical exercises</li>
          </ul>
        </div>
      )
    };
  };

  const phaseContent = getPhaseContent(phase.phase);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return (
          <div style={{
            lineHeight: '1.7',
            color: '#333',
            fontSize: '1.1rem'
          }}>
            {phaseContent.content}
          </div>
        );
      case 'videos':
        return (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {phaseContent.videos.length > 0 ? (
              phaseContent.videos.map((video, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8f9ff',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    height: 0,
                    overflow: 'hidden',
                    marginBottom: '15px'
                  }}>
                    <iframe
                      src={video.url}
                      title={video.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: '5px'
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#004aad' }}>{video.title}</h3>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>{video.description}</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>Duration: {video.duration}</p>
                </div>
              ))
            ) : (
              <p>No videos available for this phase.</p>
            )}
          </div>
        );
      case 'pdfs':
        return (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {phaseContent.pdfs.length > 0 ? (
              phaseContent.pdfs.map((pdf, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8f9ff',
                  borderRadius: '8px',
                  padding: '20px',
                  borderLeft: '4px solid #004aad',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{ 
                    margin: '0 0 10px 0',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    📄 {pdf.title}
                  </h3>
                  <p style={{ 
                    color: '#666',
                    fontSize: '0.9rem',
                    margin: '0 0 15px 0',
                    flexGrow: 1
                  }}>
                    {pdf.description}
                    {pdf.pages && ` • ${pdf.pages} pages`}
                  </p>
                  <a 
                    href={pdf.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#004aad',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      ':hover': {
                        backgroundColor: '#003d8f'
                      }
                    }}
                  >
                    View PDF
                  </a>
                </div>
              ))
            ) : (
              <p>No PDFs available for this phase.</p>
            )}
          </div>
        );
      case 'exercises':
        return (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {phaseContent.exercises.length > 0 ? (
              phaseContent.exercises.map((exercise, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8f9ff',
                  borderRadius: '8px',
                  padding: '20px',
                  borderLeft: '4px solid #004aad'
                }}>
                  <h3 style={{ 
                    margin: '0 0 10px 0',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    ✍️ {exercise.title}
                  </h3>
                  <p style={{ 
                    color: '#666',
                    fontSize: '0.9rem',
                    margin: '0 0 15px 0'
                  }}>
                    {exercise.description}
                    {exercise.duration && ` • ${exercise.duration}`}
                  </p>
                  <a 
                    href={exercise.url}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#004aad',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      ':hover': {
                        backgroundColor: '#003d8f'
                      }
                    }}
                  >
                    Start Exercise
                  </a>
                </div>
              ))
            ) : (
              <p>No exercises available for this phase.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '30px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Test Modal */}
      {showTestModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            width: '500px',
            maxWidth: '90%',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#004aad', marginBottom: '20px' }}>
              Final Assessment
            </h2>
            <p style={{ marginBottom: '30px' }}>
              This is your final test for the {specializationName} specialization. 
              You need to score at least 80% to complete the specialization.
            </p>
            
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '30px'
            }}>
              <p>Sample test questions would appear here</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button 
                onClick={() => handleTestSubmit(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Pass Test
              </button>
              <button 
                onClick={() => handleTestSubmit(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Fail Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Celebration Modal */}
      {testScore !== null && testScore >= 80 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '40px',
            width: '500px',
            maxWidth: '90%',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#4CAF50', marginBottom: '20px', fontSize: '2rem' }}>
              🎉 Congratulations! 🎉
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
              You've successfully completed the {specializationName} specialization!
            </p>
            <p style={{ marginBottom: '30px' }}>
              Your final score: {testScore}%
            </p>
            <button 
              onClick={() => {
                setTestScore(null);
                navigate(`/specialization/${id}`);
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#004aad',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Return to Specialization
            </button>
          </div>
        </div>
      )}

      {/* Sidebar with all pathway phases */}
      <div style={{
        backgroundColor: '#f8f9ff',
        borderRadius: '12px',
        padding: '20px',
        height: 'fit-content',
        position: 'sticky',
        top: '20px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{
          color: '#004aad',
          fontSize: '1.3rem',
          margin: '0 0 20px 0',
          paddingBottom: '10px',
          borderBottom: '2px solid #e4deff'
        }}>
          Learning Pathway
        </h3>
        
        {loading ? (
          <div>Loading pathway...</div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {allPhases.map((p, index) => (
              <div 
                key={index}
                onClick={() => navigate(`/specialization/${id}/pathway/${index}`, { 
                  state: { 
                    phase: p,
                    specializationName 
                  } 
                })}
                style={{
                  backgroundColor: phase.phase === p.phase ? '#e4deff' : 'white',
                  borderRadius: '8px',
                  padding: '15px',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${phase.phase === p.phase ? '#004aad' : '#e4deff'}`,
                  transition: 'all 0.2s',
                  position: 'relative',
                  ':hover': {
                    backgroundColor: '#e4deff'
                  }
                }}
              >
                {completedPhases.includes(index) && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}>
                    ✓
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '25px',
                    height: '25px',
                    backgroundColor: phase.phase === p.phase ? '#004aad' : 
                                    completedPhases.includes(index) ? '#4CAF50' : '#e4deff',
                    color: phase.phase === p.phase ? 'white' : 
                          completedPhases.includes(index) ? 'white' : '#004aad',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.8rem'
                  }}>
                    {index + 1}
                  </div>
                  <h4 style={{
                    margin: 0,
                    color: '#333',
                    fontSize: '1rem'
                  }}>
                    {p.phase}
                  </h4>
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#666',
                  marginLeft: '35px'
                }}>
                  {p.duration}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div>
        {/* Header Section */}
        <div style={{
          backgroundColor: '#004aad',
          color: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <h1 style={{ 
            fontSize: '2.2rem', 
            margin: '0 0 10px 0',
          }}>
            {phase.phase}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            {specializationName} • {phase.duration}
          </p>
        </div>

        {/* Content Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          borderBottom: '2px solid #e4deff',
          paddingBottom: '10px'
        }}>
          <button
            onClick={() => setActiveTab('content')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'content' ? '#004aad' : '#f5f5f5',
              color: activeTab === 'content' ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px 5px 0 0',
              cursor: 'pointer',
              fontWeight: activeTab === 'content' ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            Content Overview
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'videos' ? '#004aad' : '#f5f5f5',
              color: activeTab === 'videos' ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px 5px 0 0',
              cursor: 'pointer',
              fontWeight: activeTab === 'videos' ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('pdfs')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'pdfs' ? '#004aad' : '#f5f5f5',
              color: activeTab === 'pdfs' ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px 5px 0 0',
              cursor: 'pointer',
              fontWeight: activeTab === 'pdfs' ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            PDFs & Readings
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'exercises' ? '#004aad' : '#f5f5f5',
              color: activeTab === 'exercises' ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px 5px 0 0',
              cursor: 'pointer',
              fontWeight: activeTab === 'exercises' ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            Exercises
          </button>
        </div>

        {/* Content Sections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '30px'
        }}>
          {/* Learning Objectives */}
          <section style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              color: '#004aad',
              fontSize: '1.5rem',
              marginBottom: '20px',
              borderBottom: '2px solid #e4deff',
              paddingBottom: '10px'
            }}>
              Learning Objectives
            </h2>
            <ul style={{
              paddingLeft: '20px',
              lineHeight: '1.6',
              color: '#444'
            }}>
              {phaseContent.objectives.map((objective, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  {objective}
                </li>
              ))}
            </ul>
          </section>

          {/* Tab Content */}
          <section style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
          }}>
            {renderTabContent()}
          </section>

          {/* Completion Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button 
              onClick={markAsComplete}
              style={{
                padding: '12px 24px',
                backgroundColor: '#004aad',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                ':hover': {
                  backgroundColor: '#003d8f'
                }
              }}
            >
              {parseInt(phaseIndex) === allPhases.length - 1 ? 
                'Take Final Assessment' : 
                'Mark as Complete & Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwayPhaseDetail;