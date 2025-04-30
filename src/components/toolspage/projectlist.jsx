import React, { useState, useEffect } from 'react';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch the project data from public folder
  useEffect(() => {
    fetch('/project.json')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error loading projects:', error));
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? project.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f8f8' }}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          borderRadius: '5px',
          width: '100%',
          maxWidth: '300px',
          marginRight: '10px',
          display: 'inline-block',
        }}
      />

      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          borderRadius: '5px',
          width: '100%',
          maxWidth: '300px',
          marginRight: '10px',
          display: 'inline-block',
        }}
      >
        <option value="">All Categories</option>
        <option value="Health">Health</option>
        <option value="AI">AI</option>
        <option value="E-Commerce">E-Commerce</option>
      </select>

      {/* Project Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <img
              src={`/assets/${project.image}.png`}
              alt={project.title}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><strong>Frontend:</strong> {project.frontend}</li>
              <li><strong>Backend:</strong> {project.backend}</li>
              <li><strong>Database:</strong> {project.database}</li>
              <li><strong>Category:</strong> {project.category}</li>
            </ul>
            <button
              onClick={() => handleOpenModal(project)}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#3F92C3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '80%',
              maxWidth: '600px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2>{selectedProject.title}</h2>
            <p><strong>Description:</strong> {selectedProject.description}</p>
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
            <p><strong>Details:</strong> {selectedProject.details}</p>
            <button
              onClick={handleCloseModal}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff4c4c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
