import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import AI from '../../assets/specializationpage/AI.jpg';
import Cloud from '../../assets/specializationpage/cloud.jpg';
import Cyber from '../../assets/specializationpage/cyber.jpg';
import Data from '../../assets/specializationpage/data.jpg';
import IOT from '../../assets/specializationpage/iot.jpg';
import Blockchain from '../../assets/specializationpage/blockchain.jpg';
import Robotics from '../../assets/specializationpage/robotics.jpg';
import Quantum from '../../assets/specializationpage/quantum.jpg';
import ARVR from '../../assets/specializationpage/ar-vr.jpg';
import Autonomous from '../../assets/specializationpage/autonomous.jpg';
import Bioinformatics from '../../assets/specializationpage/bioinformatics.jpg';
import Embedded from '../../assets/specializationpage/embedded.jpg';
import Networks from '../../assets/specializationpage/networks.jpg';
import GameDev from '../../assets/specializationpage/game-dev.jpg';
import Graphics from '../../assets/specializationpage/graphics.jpg';
import DevOps from '../../assets/specializationpage/devops.jpg';

// Create a mapping between specialization names and their images
const imageMap = {
  "Artificial Intelligence": AI,
  "Cloud Computing": Cloud,
  "Cybersecurity": Cyber,
  "Data Science": Data,
  "Internet of Things": IOT,
  "Blockchain Development": Blockchain,
  "Robotics Engineering": Robotics,
  "Quantum Computing": Quantum,
  "Augmented Reality/Virtual Reality": ARVR,
  "Autonomous Systems": Autonomous,
  "Bioinformatics": Bioinformatics,
  "Embedded Systems": Embedded,
  "Computer Networks": Networks,
  "Game Development": GameDev,
  "Computer Graphics": Graphics,
  "DevOps Engineering": DevOps
};

const sectionHeaderStyle = {
  color: '#004aad',
  fontSize: '1.8rem',
  borderBottom: '2px solid #e4deff',
  paddingBottom: '10px',
  marginBottom: '25px'
};

const SpecializationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialization = async () => {
      try {
        const response = await fetch('/specializations.json');
        const data = await response.json();
        console.log("Loaded data:", data); // Debugging log
        const foundSpec = data.specializations.find(spec => spec.id === parseInt(id));
        
        if (foundSpec) {
          console.log("Found specialization:", foundSpec); // Debugging log
          setSpecialization(foundSpec);
        } else {
          navigate('/specializations', { replace: true });
        }
      } catch (error) {
        console.error("Error loading specialization:", error);
        navigate('/specializations', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialization();
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading specialization details...</div>
      </div>
    );
  }

  if (!specialization) {
    return null;
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#004aad',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '30px',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>←</span> Back to Specializations
      </button>

      {/* Header Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '100%',
          height: '350px',
          background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url(${imageMap[specialization.name]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          marginBottom: '25px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(0, 74, 173, 0.8)',
            padding: '20px 40px',
            borderRadius: '8px',
            maxWidth: '800px'
          }}>
            <h1 style={{ 
              color: 'white', 
              fontSize: '2.5rem', 
              margin: '0 0 10px 0',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
            }}>
              {specialization.name}
            </h1>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: '#004aad',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'inline-block',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {specialization.duration} Program
            </div>
          </div>
        </div>
        
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#555', 
          maxWidth: '800px',
          lineHeight: '1.6'
        }}>
          {specialization.description}
        </p>
      </div>

      {/* Courses Section */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={sectionHeaderStyle}>
          Courses in This Specialization
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {specialization.courses?.map((course, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.12)'
              }
            }}>
              <h3 style={{ 
                color: '#333', 
                margin: '0 0 12px 0',
                fontSize: '1.2rem'
              }}>
                {course.name || course}
              </h3>
              
              {typeof course === 'object' && (
                <>
                  <div style={{
                    backgroundColor: '#f0f0f0',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    display: 'inline-block',
                    fontSize: '0.8rem',
                    marginBottom: '12px',
                    color: '#555'
                  }}>
                    {course.duration}
                  </div>
                  <p style={{ 
                    color: '#666', 
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {course.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

{/* Learning Pathway Section*/}
<section style={{ marginBottom: '50px' }}>
  <h2 style={sectionHeaderStyle}>Learning Pathway</h2>
  
  {specialization.pathway && Array.isArray(specialization.pathway) ? (
    <div style={{ position: 'relative' }}>
      {/* Timeline line */}
      <div style={{
        position: 'absolute',
        left: '25px',
        top: 0,
        bottom: 0,
        width: '3px',
        backgroundColor: '#e4deff',
        zIndex: 0
      }}></div>
      
      {specialization.pathway.map((phase, index) => (
        <div 
          key={index} 
          style={{
            display: 'flex',
            marginBottom: '30px',
            position: 'relative',
            zIndex: 1,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            ':hover': {
              transform: 'translateX(5px)'
            }
          }}
          onClick={() => navigate(`/specialization/${id}/pathway/${index}`, { 
            state: { 
              phase,
              specializationName: specialization.name 
            } 
          })}
        >
          {/* Phase number indicator */}
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#004aad',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '30px',
            flexShrink: 0,
            fontWeight: 'bold',
            fontSize: '1.2rem',
            border: '3px solid white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            {index + 1}
          </div>
          
          {/* Phase content */}
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '25px',
            flex: 1,
            boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <h3 style={{ 
                margin: 0,
                color: '#333',
                fontSize: '1.3rem'
              }}>
                {phase.phase}
              </h3>
              
              <span style={{
                backgroundColor: '#e4deff',
                padding: '5px 12px',
                borderRadius: '15px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                color: '#004aad'
              }}>
                {phase.duration}
              </span>
            </div>
            
            {phase.topics && phase.topics.length > 0 && (
              <div style={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '15px'
              }}>
                {phase.topics.map((topic, i) => (
                  <span key={i} style={{
                    backgroundColor: '#f5f5f5',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '0.85rem',
                    color: '#555'
                  }}>
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p style={{ color: '#666', textAlign: 'center' }}>
      No learning pathway information available for this specialization.
    </p>
  )}
</section>

{/* Career Paths Section - Fixed */}
<section style={{ marginBottom: '50px' }}>
  <h2 style={sectionHeaderStyle}>Career Opportunities</h2>
  
  {specialization.careerPaths && Array.isArray(specialization.careerPaths) ? (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px'
    }}>
      {specialization.careerPaths.map((path, index) => (
        <div key={index} style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
          borderTop: '4px solid #004aad',
          transition: 'transform 0.2s',
          ':hover': {
            transform: 'translateY(-5px)'
          }
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0',
            color: '#333',
            fontSize: '1.2rem'
          }}>
            {path}
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#004aad',
              borderRadius: '50%'
            }}></span>
            <span style={{
              color: '#666',
              fontSize: '0.9rem'
            }}>
              {specialization.name} Specialist
            </span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p style={{ color: '#666', textAlign: 'center' }}>
      No career information available for this specialization.
    </p>
  )}
</section>
      {/* Top Employers */}
      <section>
        <h2 style={sectionHeaderStyle}>
          Top Employers Hiring {specialization.name} Specialists
        </h2>
        
        {specialization.companies?.length > 0 ? (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center'
          }}>
            {specialization.companies.map((company, index) => (
              <div key={index} style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                padding: '15px',
                textAlign: 'center',
                wordBreak: 'break-word',
                border: '2px solid #e4deff'
              }}>
                {company}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#666', textAlign: 'center' }}>
            No employer information available for this specialization.
          </p>
        )}
      </section>
    </div>
  );
};

export default SpecializationDetail;