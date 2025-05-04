import React, { useState, useEffect } from 'react';
import headerBg from '../../assets/toolpage/headerbgtools.png'; // Adjust the path to your actual image
import { AiOutlineEye } from 'react-icons/ai';

// Explicitly import each image
import image1 from '../../assets/toolpage/project1.png';
import image2 from '../../assets/toolpage/project2.png';
import image3 from '../../assets/toolpage/project3.png';
import image4 from '../../assets/toolpage/project4.png';
import image5 from '../../assets/toolpage/project5.png';
import image6 from '../../assets/toolpage/project6.png';
import image7 from '../../assets/toolpage/project7.png';
// Add more image imports as needed

const imageMap = {
  image1: image1,
  image2: image2,
  image3: image3,
  image4: image4,
  image5: image5,
  image6: image6,
  image7: image7,
  // Add more mappings for additional images
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch('/project.json')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error loading projects:', err));
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? project.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
      {/* Top Section */}
      <div style={{ display: "flex", marginBottom: "40px", flexWrap: 'wrap', gap: '20px' }}>
        {/* Left Rectangle */}
        <div style={{
          background: "#88aefe",
          color: "black",
          padding: "20px",
          borderRadius: "10px",
          width: "250px",
        }}>
          <h2 style={{ fontSize: '16px' }}>Mastering the Art of Crafting an Outstanding Portfolio</h2>
          <button
            style={{
              marginTop: "10px",
              padding: "10px 15px",
              background: "white",
              color: "#131346",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            aria-label="Learn more about specialization"
          >
            Learn More
          </button>
        </div>

        {/* Right Rectangle (Search + Filter inside) */}
        <div style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
          borderRadius: "10px",
          flex: 1,
          minWidth: '300px',
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "50px", flexWrap: "wrap", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "30px" }}>
              Build Your <span style={{ color: "#004aad" }}>Portfolio</span> by Exploring & Working <br />
              on Impactful <span style={{ color: "#004aad" }}>Projects</span>
            </h2>

            {/* Wrapper for search + dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '400px' }}>
              <input
                type="text"
                placeholder="Search Projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  marginTop: "20px",
                  padding: '10px',
                  borderRadius: '5px',
                  border: 'none',
                }}
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: 'none',
                }}
              >
                <option value="">All Categories</option>
                <option value="Health">Health</option>
                <option value="AI">AI</option>
                <option value="E-Commerce">E-Commerce</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          maxWidth: '1200px',
          margin: 'auto',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          gap: '20px',
          height: 'calc(100vh - 220px)',
          boxSizing: 'border-box',
        }}

      >

        {/* Left: Project Cards */}
        <div style={{ flex: 2, overflowY: 'auto', paddingRight: '20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredProjects.map((project, index) => {
              const gradientStyles = [
                'linear-gradient(135deg, #fff7f1 0%, #fde5dc 100%)',
                'linear-gradient(135deg, #efffe6 0%, #dcf8df 100%)',
                'linear-gradient(135deg, #ebf3ff 0%, #e7f7fd 100%)',
                'linear-gradient(135deg, #fef3fb 0%, #eaefff 100%)',
                'linear-gradient(135deg, #fff3eb 0%, #fef6d8 100%)',
                'linear-gradient(135deg, #ffeef0 0%, #fff3fa 100%)',
              ];

              const bg = gradientStyles[index % gradientStyles.length];

              return (
                <div
                  key={index}
                  style={{
                    background: bg,
                    padding: '20px',
                    borderRadius: '15px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  {/* Dynamically load images using the map */}
                  <img
                    src={imageMap[project.image] || image1} // Use fallback if image not found
                    alt={project.title}
                    style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                  />
                  <h3 style={{ marginTop: '15px', color: '#333' }}>{project.title}</h3>
                  <p style={{ color: '#555' }}>{project.description}</p>
                  <ul style={{ listStyleType: 'none', padding: 0, color: '#444' }}>
                    <li><strong>Frontend:</strong> {project.frontend}</li>
                    <li><strong>Backend:</strong> {project.backend}</li>
                    <li><strong>Database:</strong> {project.database}</li>
                    <li><strong>Category:</strong> {project.category}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Project Details */}
        <div
          style={{
            flex: 2,
            background: '#ffffff',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
            overflowY: 'auto',
            transition: 'all 0.3s ease',
          }}
        >
          {selectedProject ? (
            <>
              <h2 style={{ color: '#003366' }}>{selectedProject.title}</h2>
              <p style={{ color: '#444' }}><strong>Description:</strong> {selectedProject.description}</p>
              <p><strong>Frontend:</strong> {selectedProject.frontend}</p>
              <p><strong>Backend:</strong> {selectedProject.backend}</p>
              <p><strong>Database:</strong> {selectedProject.database}</p>
              <p><strong>Category:</strong> {selectedProject.category}</p>
              <p><strong>Pathway:</strong></p>
              <ul>
                {selectedProject.pathway.split('->').map((step, idx) => (
                  <li key={idx}>{idx + 1}. {step.trim()}</li>
                ))}
              </ul>
              <p style={{ marginTop: '10px' }}><strong>Details:</strong> {selectedProject.details}</p>
            </>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#888',
              fontStyle: 'italic',
              textAlign: 'center',
              padding: '20px'
            }}>
              <AiOutlineEye size={40} style={{ marginBottom: '10px', color: '#aaa' }} />
              <div>Select a project to view details.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
