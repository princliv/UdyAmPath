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
              {phase.topics?.map((topic, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  {topic}
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
              {['Video Lectures', 'Reading Materials', 'Practice Exercises', 'Quizzes'].map((resource, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8f9ff',
                  borderRadius: '8px',
                  padding: '20px',
                  borderLeft: '4px solid #004aad'
                }}>
                  <h3 style={{ 
                    margin: '0 0 10px 0',
                    color: '#333'
                  }}>
                    {resource}
                  </h3>
                  <p style={{ 
                    color: '#666',
                    fontSize: '0.9rem',
                    margin: 0
                  }}>
                    Comprehensive {resource.toLowerCase()} for {phase.phase.toLowerCase()}
                  </p>
                  <button style={{
                    marginTop: '15px',
                    padding: '8px 16px',
                    backgroundColor: '#004aad',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>
                    Access {resource}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Completion Button - Moved to bottom */}
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