import React, { useState } from 'react';

const Notes = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      unit: "Unit 1: Introduction to OS",
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleDelete = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.container}>
      {/* Heading Section */}
      <h1 style={styles.heading}>
        Transform Your Notes <br /> <span style={styles.highlight}>into Diagrams ✨</span>
      </h1>
      <p style={styles.subheading}>Get a Flowchart or Mind Map Instantly!</p>

      <div style={styles.content}>
        {/* Diagram Section */}
        <div style={styles.diagramContainer}>
          <img src="/diagram-example.png" alt="Flowchart Example" style={styles.diagramImage} />
          <button style={styles.exploreButton}>Explore</button>
        </div>

        {/* Upload Section */}
        <div style={styles.uploadContainer}>
          <h3 style={styles.uploadTitle}>Get your notes</h3>
          <label style={styles.uploadBox}>
            <input type="file" multiple onChange={handleFileUpload} style={{ display: 'none' }} />
            <button style={styles.browseButton}>📂 Browse files</button>
            <p>or drag and drop it here</p>
          </label>
        </div>
      </div>

      {/* How-To Steps */}
      <div style={styles.stepsContainer}>
        <h3>How to get your notes Convert into Flowchart</h3>
        <ol style={styles.stepsList}>
          <li><strong>Upload your notes</strong></li>
          <li>Select your diagram</li>
          <li>Preview the diagram</li>
          <li>Download</li>
        </ol>
      </div>

      {/* Uploaded Notes List */}
      <div style={styles.notesList}>
        {uploadedFiles.map((file, index) => (
          <div key={index} style={styles.noteItem}>
            <div>
              <strong>{file.name}</strong>
              <p style={styles.unitText}>{file.unit}</p>
            </div>
            <div style={styles.actions}>
              <button style={styles.viewButton}>View</button>
              <button style={styles.deleteButton} onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '900px',
    margin: 'auto',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlight: {
    color: '#007bff',
  },
  subheading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diagramContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  diagramImage: {
    width: '250px',
    borderRadius: '8px',
  },
  exploreButton: {
    marginTop: '10px',
    padding: '8px 15px',
    backgroundColor: '#ffcc00',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  uploadContainer: {
    border: '1px dashed #007bff',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    width: '300px',
    backgroundColor: '#f9f9f9',
  },
  uploadTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  browseButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '5px',
  },
  stepsContainer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  stepsList: {
    paddingLeft: '20px',
  },
  notesList: {
    marginTop: '20px',
  },
  noteItem: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  unitText: {
    fontSize: '0.9rem',
    color: '#666',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  viewButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Notes;
