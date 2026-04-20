import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import AnimatedSection from '../shared/AnimatedSection';
import SkeletonCard from '../shared/SkeletonCard';

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
    return (
      <div style={{ padding: '20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '18px',
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard
              key={`spec-skeleton-${index}`}
              height={330}
              borderRadius={16}
              baseColor="#ede9fe"
              highlightColor="#c8bbff"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        background: 'rgba(124, 107, 255, 0.1)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(124, 107, 255, 0.2)',
        padding: '14px 16px',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <h2 style={{ fontSize: '24px', color: 'var(--course-primary)' }}>Specializations</h2>
        <input
          type="text"
          placeholder="Search specializations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '20px',
            border: '1px solid rgba(124, 107, 255, 0.35)',
            background: 'rgba(255, 255, 255, 0.65)',
            width: '300px',
            outline: 'none',
          }}
        />
      </div>

      <AnimatedSection>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            padding: '10px',
          }}
        >
          {filteredSpecializations.map((specialization) => (
            <motion.div
              key={specialization.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <GlassCard
                onClick={() => openSpecializationDetail(specialization)}
                style={{
                  background: 'rgba(255,255,255,0.58)',
                  border: '1px solid rgba(124,107,255,0.24)',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  height: '160px',
                  background: `linear-gradient(rgba(24, 16, 62, 0.2), rgba(24, 16, 62, 0.5)), url(${specializationImages[specialization.name]})`,
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
                  <p style={{ color: '#4c4466', marginBottom: '15px' }}>{specialization.description}</p>

                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ fontSize: '16px', margin: '0 0 8px', color: '#2c2552' }}>Key Courses:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {specialization.courses.slice(0, 3).map((course, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: 'rgba(124, 107, 255, 0.16)',
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
                          backgroundColor: 'rgba(124, 107, 255, 0.24)',
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
                    <h4 style={{ fontSize: '16px', margin: '0 0 8px', color: '#2c2552' }}>Top Employers:</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {specialization.companies.slice(0, 3).map((company, index) => (
                        <div key={index} style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(124, 107, 255, 0.14)',
                          color: '#2c2552',
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
                        <span style={{ fontSize: '12px', color: '#5d5476' }}>
                          +{specialization.companies.length - 3} companies
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </div>
  );
};

export default SpecializationPage;