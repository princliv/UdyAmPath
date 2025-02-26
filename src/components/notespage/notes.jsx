import React, { useState } from 'react';
import flowImage from '../../assets/flow.png';
import Modal from './Modal'; // Import the Modal component

const Notes = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const stepSubheadings = {
    1: "Start by uploading your notes to begin the conversion process.",
    2: "Choose the flowchart style that best represents your notes.",
    3: "Review the generated flowchart for accuracy and clarity.",
    4: "Save your finalized flowchart for easy access and sharing.",
  };

  return (
    <div style={styles.container}>
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
            <button style={styles.browseButton} onClick={() => setIsModalOpen(true)}>📂 Browse files</button>
            <p style={styles.uploadText}>or drag and drop it here</p>
          </label>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onFileUpload={handleFileUpload}
        />
      )}

      <div style={styles.content}>
        <div style={styles.diagramContainer}>
          <div style={styles.overlay}></div>
          <img src={flowImage} alt="Flowchart Example" style={styles.diagramImage} />
          <button style={styles.exploreButton}>Explore</button>
        </div>

        <div style={styles.stepsContainer}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '25px' }}>
            How to Convert Your Notes into a Flowchart
          </h3>
          <ol style={styles.stepsList}>
            {Object.entries(stepSubheadings).map(([step, subheading]) => (
              <li
                key={step}
                style={{
                  ...styles.stepWithoutBox,
                  ...(hoveredStep === step ? styles.stepWithoutBoxHover : {}),
                }}
                onMouseEnter={() => setHoveredStep(step)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <span style={styles.stepNumberWithoutBox}>{step}</span>
                <div>
                  {step === "1" && "Upload your notes"}
                  {step === "2" && "Select your diagram"}
                  {step === "3" && "Preview the diagram"}
                  {step === "4" && "Download"}
                  {hoveredStep === step && <p style={styles.stepSubheading}>{subheading}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

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
    alignItems: 'flex-start',
    marginTop: '30px',
  },
  diagramContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '40px 20px 20px',
    borderRadius: '20px',
    textAlign: 'center',
    border: '3px solid #CCCCCC',
    display: 'inline-block',
    overflow: 'hidden',
    marginTop: '70px',
    marginRight: '20px',
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
    maxWidth: '550px',
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
    zIndex: '2',
  },
  stepsContainer: {
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '45%',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#222',
    marginLeft: '200px',
  },
  stepsList: {
    paddingLeft: '0',
    listStyle: 'none',
    marginTop: '10px',
  },
  stepWithoutBox: {
    cursor: 'pointer',
    fontSize: '1.5rem',
    marginBottom: '35px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '20px',
    fontWeight: 'bold',
    padding: '15px',
    borderRadius: '12px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  stepWithoutBoxHover: {
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  stepNumberWithoutBox: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#000',
  },
  stepSubheading: {
    fontSize: '1rem',
    color: 'grey',
    marginTop: '5px',
  },
};

export default Notes;