import React, { useState } from 'react';
import styled from 'styled-components';
import flowImage from '../../assets/flow.png';
import mindImage from '../../assets/mind.png';

const ModalWrapper = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }


  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    color: #555;

    &:hover {
      color: #000;
    }
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    height: 450px; /* Increased height */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centers content horizontally */
  }
  
  .input-field {
    width: 70%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  .button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    margin: 10px 0;
    text-align: center;
  }
  
  .button:hover {
    background-color: #0056b3;
  }
  

  .image-container {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }

  .flowchart-image {
    width: 48%;
    cursor: pointer;
    border: 2px solid transparent;

    &:hover {
      border-color: #007bff;
    }
  }
  .create-button {
    padding: 12px 25px;
    background-color: #28a745; /* Green color */
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    margin-top: 15px;
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    transition: background 0.3s ease;
  }
  
  .create-button:hover {
    background-color: #218838; /* Darker green on hover */
  }
  
`;

const Modal = ({ onClose, onFileUpload }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [selectedFlowchart, setSelectedFlowchart] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      onFileUpload(event);
    }
  };

  const handleFlowchartSelect = (type) => {
    setSelectedFlowchart(type);
    console.log('Selected flowchart type:', type);
  };

  return (
    <ModalWrapper>
      <div className="modal-overlay">
        <div className="modal-content">
          {/* Close Button */}
          <button className="close-button" onClick={onClose}>
            ×
          </button>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <label className="button" htmlFor="file-upload">
          📂 Browse Files
            <input
              id="file-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </label>
          <div className="image-container">
            <img
              src={flowImage}
              alt="Flowchart 1"
              className="flowchart-image"
              onClick={() => handleFlowchartSelect('flowchart1')}
            />
            <img
              src={mindImage}
              alt="Flowchart 2"
              className="flowchart-image"
              onClick={() => handleFlowchartSelect('flowchart2')}
            />
          </div>
          {/* Create Button */}
          <button className="create-button">Create</button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
