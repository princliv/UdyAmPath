import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import all images from your assets folder
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
const specializationImages = {
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

const SpecializationPage = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await fetch('/specializations.json');
        const data = await response.json();
        setSpecializations(data.specializations);
        setLoading(false);
      } catch (error) {
        console.error("Error loading specializations:", error);
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  const filteredSpecializations = specializations.filter(spec =>
    spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spec.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openSpecializationDetail = (specialization) => {
    navigate(`/specialization/${specialization.id}`, { state: { specialization } });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading specializations...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '24px', color: '#004aad' }}> Specializations </h2>
        <input
          type="text"
          placeholder="Search specializations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            width: '300px'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '10px'
      }}>
        {filteredSpecializations.map((specialization) => (
          <div 
            key={specialization.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s',
              cursor: 'pointer',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}
            onClick={() => openSpecializationDetail(specialization)}
          >
            <div style={{
              height: '160px',
              background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${specializationImages[specialization.name]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                color: 'white',
                textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
              }}>
                <h3 style={{ fontSize: '20px', margin: 0 }}>{specialization.name}</h3>
                <p style={{ margin: '5px 0 0', fontSize: '14px' }}>{specialization.duration}</p>
              </div>
            </div>
            <div style={{ padding: '15px' }}>
              <p style={{ color: '#555', marginBottom: '15px' }}>{specialization.description}</p>
              
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ fontSize: '16px', margin: '0 0 8px', color: '#333' }}>Key Courses:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {specialization.courses.slice(0, 3).map((course, index) => (
                    <span 
                      key={index}
                      style={{
                        backgroundColor: '#e4deff',
                        padding: '3px 8px',
                        borderRadius: '10px',
                        fontSize: '12px'
                      }}
                    >
                      {course.name}
                    </span>
                  ))}
                  {specialization.courses.length > 3 && (
                    <span style={{
                      backgroundColor: '#d1c4ff',
                      padding: '3px 8px',
                      borderRadius: '10px',
                      fontSize: '12px'
                    }}>
                      +{specialization.courses.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', margin: '0 0 8px', color: '#333' }}>Top Employers:</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {specialization.companies.slice(0, 3).map((company, index) => (
                    <div key={index} style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {company.charAt(0)}
                    </div>
                  ))}
                  {specialization.companies.length > 3 && (
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      +{specialization.companies.length - 3} companies
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecializationPage;