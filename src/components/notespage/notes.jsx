import React, { useState } from 'react';
import flowImage from '../../assets/flow.png';

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
      {/* Header Section */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>
            Transform Your Notes <br /> <span style={styles.highlight}>into Diagrams ✨</span>
          </h1>
          <p style={styles.subheading}>Get a Flowchart or Mind Map Instantly!</p>
        </div>

        <div style={styles.uploadContainer}>
          <h3 style={styles.uploadTitle}>Get your notes</h3>
          <label style={styles.uploadBox}>
            <input type="file" multiple onChange={handleFileUpload} style={{ display: 'none' }} />
            <button style={styles.browseButton}>📂 Browse files</button>
            <p style={styles.uploadText}>or drag and drop it here</p>
          </label>
        </div>
      </div>

      {/* Content Section */}
      <div style={styles.content}>
        {/* Diagram Section */}
        <div style={styles.diagramContainer}>
          <div style={styles.overlay}></div>
          <img src={flowImage} alt="Flowchart Example" style={styles.diagramImage} />
          <button style={styles.exploreButton}>Explore</button>
        </div>

        {/* Steps Section */}
        <div style={styles.stepsContainer}>
          <h3 style={{ fontSize: '1.8rem' }}>How to Convert Your Notes into a Flowchart</h3>
          <ol style={styles.stepsList}>
            {/* Step 1 with box */}
            <li style={styles.stepBox}>
              <span style={styles.stepNumber}>1</span>
              <div style={styles.stepContent}>
                <strong style={styles.stepTitle}>Upload your notes</strong>
                <p style={styles.stepSubtitle}>Upload your notes first</p>
              </div>
            </li>

            {/* Steps 2, 3, and 4 */}
            <li style={styles.stepWithoutBox}>
              <span style={styles.stepNumberWithoutBox}>2</span> Select your diagram
            </li>
            <li style={styles.stepWithoutBox}>
              <span style={styles.stepNumberWithoutBox}>3</span> Preview the diagram
            </li>
            <li style={styles.stepWithoutBox}>
              <span style={styles.stepNumberWithoutBox}>4</span> Download
            </li>
          </ol>
        </div>
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
    maxWidth: '1100px',
    margin: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  highlight: {
    color: '#007bff',
  },
  subheading: {
    fontSize: '1.5rem',
    marginBottom: '30px',
  },
  uploadContainer: {
    border: '4px dashed #CCCCCC',
    borderRadius: '20px',
    padding: '20px',
    textAlign: 'center',
    width: '300px',
    backgroundColor: '#f9f9f9',
    marginLeft: '5px',
  },
  uploadTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  uploadText: { 
    color: '#777',
    fontSize: '1.2rem',
    marginTop: '5px',
  },
  browseButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 25px',
    borderRadius: '25px',
    cursor: 'pointer',
    marginBottom: '5px',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
  },
  diagramContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '40px 20px 20px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    border: '3px solid #CCCCCC',
    display: 'inline-block',
    overflow: 'hidden',
    marginTop: '20px',
  },
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.6)',
    zIndex: '1',
  },
  diagramImage: {
    width: '100%',
    maxWidth: '450px',
    borderRadius: '8px',
  },
  exploreButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffcc00',
    color: '#000',
    fontWeight: 'bold',
    padding: '10px 35px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: '2',
  },
  stepsContainer: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '45%',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#222',
  },
  stepsList: {
    paddingLeft: '0',
    listStyle: 'none',
    marginTop: '10px',
  },
  stepBox: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid black',
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: '#fff',
    width: '100%',
    gap: '15px',
  },
  stepNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
    border: '2px solid black',
    borderRadius: '10px',
    padding: '5px 15px',
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  stepTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  stepSubtitle: {
    fontSize: '1rem',
    color: '#777',
  },
  stepWithoutBox: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 'bold',
    paddingLeft: '36px',
  },
  stepNumberWithoutBox: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#000',
    marginRight: '25px',
  },
};

export default Notes;
