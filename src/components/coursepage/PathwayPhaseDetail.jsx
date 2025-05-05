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

    // If this is the last phase, show test modal
    if (currentIndex === allPhases.length - 1) {
      setShowTestModal(true);
    } else {
      // Navigate to next phase
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
      'Introduction': {
        objectives: [
          "Understand the fundamental concepts of the specialization",
          "Learn about the course structure and expectations",
          "Get familiar with the learning resources available"
        ],
        materials: [
          {
            type: "Video Lecture",
            title: "Welcome to the Course",
            description: "Introduction video covering the specialization overview",
            duration: "15 min"
          },
          {
            type: "Reading",
            title: "Course Syllabus",
            description: "Detailed breakdown of what you'll learn in this specialization",
            pages: 5
          },
          {
            type: "Exercise",
            title: "Self-Assessment Quiz",
            description: "Test your current knowledge to personalize your learning path"
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
            <p>
              By the end of this phase, you should have a clear understanding of what to expect 
              and how to navigate through the specialization effectively.
            </p>
          </div>
        )
      },
      'Core Concepts': {
        objectives: [
          "Master the fundamental building blocks of the subject",
          "Understand key theories and principles",
          "Apply concepts through practical examples"
        ],
        materials: [
          {
            type: "Video Lecture",
            title: "Foundational Theories",
            description: "Deep dive into the core concepts of the subject",
            duration: "45 min"
          },
          {
            type: "Reading",
            title: "Core Principles Handbook",
            description: "Comprehensive guide to the fundamental concepts",
            pages: 25
          },
          {
            type: "Exercise",
            title: "Concept Application",
            description: "Practice applying concepts to real-world scenarios"
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
            
            <p>
              Each concept will be explained through multiple learning modalities including 
              video lectures, reading materials, and hands-on exercises to ensure comprehensive 
              understanding.
            </p>
          </div>
        )
      },
      'Advanced Topics': {
        objectives: [
          "Explore complex applications of core concepts",
          "Develop problem-solving skills for advanced scenarios",
          "Analyze case studies and real-world implementations"
        ],
        materials: [
          {
            type: "Video Lecture",
            title: "Advanced Applications",
            description: "Exploring complex use cases and implementations",
            duration: "60 min"
          },
          {
            type: "Reading",
            title: "Case Studies Collection",
            description: "Real-world examples of advanced applications",
            pages: 35
          },
          {
            type: "Exercise",
            title: "Problem-Solving Challenge",
            description: "Tackle complex problems using advanced concepts"
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
            
            <h4>Learning Approach:</h4>
            <p>
              We'll use a combination of theoretical explanations and practical case studies to 
              ensure you can apply these advanced concepts in real-world situations. Each topic 
              will include:
            </p>
            <ul>
              <li>Detailed explanations of the underlying theory</li>
              <li>Walkthroughs of complex examples</li>
              <li>Opportunities to implement solutions yourself</li>
            </ul>
          </div>
        )
      },
      'Final Project': {
        objectives: [
          "Synthesize all learned concepts into a comprehensive project",
          "Demonstrate mastery through practical application",
          "Receive feedback on your implementation"
        ],
        materials: [
          {
            type: "Video Lecture",
            title: "Project Guidelines",
            description: "Detailed instructions for the final project",
            duration: "30 min"
          },
          {
            type: "Template",
            title: "Project Starter Kit",
            description: "Resources to help you begin your project"
          },
          {
            type: "Exercise",
            title: "Project Implementation",
            description: "Build your final project step-by-step"
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
            
            <h4>Support Resources:</h4>
            <p>
              You'll have access to:
            </p>
            <ul>
              <li>Detailed project guidelines</li>
              <li>Example implementations</li>
              <li>Mentor support (if available)</li>
              <li>Peer discussion forums</li>
            </ul>
          </div>
        )
      }
    };

    // Default content if phase title doesn't match
    return contentMap[phaseTitle] || {
      objectives: ["Learn the key concepts of this phase"],
      materials: [
        {
          type: "Video Lecture",
          title: "Phase Overview",
          description: "Introduction to this learning phase",
          duration: "20 min"
        },
        {
          type: "Reading",
          title: "Study Materials",
          description: "Comprehensive reading for this phase",
          pages: 15
        }
      ],
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
            <li>Knowledge checks</li>
          </ul>
          <p>
            The estimated duration for this phase is {phase.duration}. Make sure to complete all 
            materials and exercises to fully grasp the concepts before moving forward.
          </p>
        </div>
      )
    };
  };

  const phaseContent = getPhaseContent(phase.phase);

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
            
            {/* In a real app, this would be an actual test component */}
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

        {/* Content Sections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '30px'
        }}>
          {/* Learning Content Section */}
          <section style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              color: '#004aad',
              fontSize: '1.5rem',
              marginBottom: '20px',
              borderBottom: '2px solid #e4deff',
              paddingBottom: '10px'
            }}>
              Learning Content
            </h2>
            <div style={{
              lineHeight: '1.7',
              color: '#333',
              fontSize: '1.1rem'
            }}>
              {phaseContent.content}
            </div>
          </section>

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

          {/* Study Materials */}
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
              Study Materials
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {phaseContent.materials.map((resource, index) => (
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
                    {resource.type === 'Video Lecture' && '🎥'}
                    {resource.type === 'Reading' && '📖'}
                    {resource.type === 'Exercise' && '✍️'}
                    {resource.type === 'Template' && '📁'}
                    {resource.title}
                  </h3>
                  <p style={{ 
                    color: '#666',
                    fontSize: '0.9rem',
                    margin: '0 0 15px 0'
                  }}>
                    {resource.description}
                    {resource.duration && ` • ${resource.duration}`}
                    {resource.pages && ` • ${resource.pages} pages`}
                  </p>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#004aad',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    ':hover': {
                      backgroundColor: '#003d8f'
                    }
                  }}>
                    Access {resource.type}
                  </button>
                </div>
              ))}
            </div>
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