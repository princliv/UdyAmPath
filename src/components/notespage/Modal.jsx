import html2canvas from 'html2canvas';
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import React, { useState } from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineDownload } from 'react-icons/ai';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import flowImage from '../../assets/flow.png';
import mindImage from '../../assets/mind.png';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ModalWrapper = styled.div` 
  .icon-button {
    position: relative;
    top: 5px;
    background: none;
    border: none;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
    color: #333;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  }

  .icon-button:hover {
    color: #000;
  }

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
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 80px;
  }

  .modal-content, .result-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    height: 450px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .result-card {
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 29px;
    cursor: pointer;
    color: #555;

    &:hover {
      color: #000;
    }
  }

  .result-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
  }

  .result-actions button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #555;
  }

  .result-actions button:hover {
    color: #000;
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
    display: inline-block;
  }

  .button:hover {
    background-color: #0056b3;
  }

  .image-container {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    width: 80%;
  }

  .flowchart-image {
    width: 48%;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: border 0.3s ease;
  }

  .flowchart-image.selected {
    border: 2px solid #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
  }

  .create-button {
    padding: 12px 25px;
    background-color: #28a745;
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
    background-color: #218838;
  }

  .diagram-result {
    margin-top: 20px;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
  }

  .save-button-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .save-button {
    padding: 10px 20px;
    background-color: #858d94;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;
  }


  .save-button.saved {
    background-color: #28a745;
    padding-right: 15px;
  }

  .save-button:hover:not(.saved) {
    background-color: #5a6268;
  }

  .check-icon {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .check-icon.visible {
    opacity: 1;
  }
`;

const extractTextFromPDF = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    
    reader.onload = async () => {
      try {
        if (!pdfjsLib || !pdfjsLib.getDocument) {
          console.error("pdfjsLib is not properly loaded");
          reject(new Error("PDF.js library failed to load"));
          return;
        }

        const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
        let extractedText = "";
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map(item => item.str).join(" ") + " ";
        }

        console.log("Extracted Text:", extractedText);
        resolve(extractedText);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
  });
};

const extractKeyConcepts = (text) => {
  // First try to extract process steps (lines separated by newlines)
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length > 3) { // If we have multiple lines, use them as steps
    return lines.map(line => line.trim()).filter(line => line.length > 0);
  }

  // Fallback to word frequency analysis
  const words = text.split(/\s+/);
  const stopwords = ["the", "and", "to", "of", "in", "a", "is", "that", "with", "as", "for", "was", "on"];
  const filteredWords = words.filter(word => !stopwords.includes(word.toLowerCase()) && word.length > 3);

  const wordCounts = {};
  filteredWords.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);
};

const generateFlowchartElements = (keyConcepts) => {
  const nodes = [];
  const edges = [];

  // Add start node
  nodes.push({
    id: 'start',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 175, y: 25 },
    style: { backgroundColor: '#e6f7ff', border: '1px solid #1890ff' },
  });

  // Add process nodes
  keyConcepts.forEach((concept, index) => {
    nodes.push({
      id: `node-${index}`,
      data: { label: concept },
      position: { x: 175, y: 100 + index * 75 },
      style: { backgroundColor: '#f6ffed', border: '1px solid #52c41a' },
    });

    // Add edges
    if (index === 0) {
      edges.push({
        id: `edge-start-${index}`,
        source: 'start',
        target: `node-${index}`,
        type: 'step',
        animated: true,
        style: { stroke: '#1890ff' },
      });
    } else {
      edges.push({
        id: `edge-${index-1}-${index}`,
        source: `node-${index-1}`,
        target: `node-${index}`,
        type: 'step',
        animated: true,
        style: { stroke: '#1890ff' },
      });
    }
  });

  // Add end node
  nodes.push({
    id: 'end',
    type: 'output',
    data: { label: 'End' },
    position: { x: 175, y: 100 + keyConcepts.length * 75 },
    style: { backgroundColor: '#fff1f0', border: '1px solid #ff4d4f' },
  });

  if (keyConcepts.length > 0) {
    edges.push({
      id: `edge-last-end`,
      source: `node-${keyConcepts.length-1}`,
      target: 'end',
      type: 'step',
      animated: true,
      style: { stroke: '#1890ff' },
    });
  }

  return { nodes, edges };
};

const generateMindMapData = (keyConcepts) => {
  // Find the most central concept (longest or most frequent)
  const centralConcept = keyConcepts.reduce((longest, current) => 
    current.length > longest.length ? current : longest, keyConcepts[0]);
  
  // Group remaining concepts
  return {
    name: centralConcept,
    children: keyConcepts
      .filter(concept => concept !== centralConcept)
      .map(concept => ({ name: concept }))
  };
};

const renderMindMap = (data) => {
  if (!data) return <div>No data to display</div>;

  // Calculate positions for child nodes in a circular layout
  const childCount = data.children.length;
  const radius = Math.min(150, 50 + childCount * 20); // Dynamic radius based on number of children
  const centerX = 175;
  const centerY = 150;
  const nodeWidth = 100;
  const nodeHeight = 40;

  return (
    <div style={{
      position: 'relative',
      width: '350px',
      height: '300px',
      overflow: 'visible'
    }}>
      {/* Central Node */}
      <div style={{
        position: 'absolute',
        left: `${centerX - 60}px`,
        top: `${centerY - 60}px`,
        width: '120px',
        height: '120px',
        backgroundColor: '#e3f2fd',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 2,
        padding: '10px',
        boxSizing: 'border-box'
      }}>
        {data.name}
      </div>

      {/* Child Nodes */}
      {data.children.map((child, index) => {
        // Calculate position in circle with angle offset to prevent overlap
        const angle = (index * (2 * Math.PI)) / childCount;
        const x = centerX + radius * Math.cos(angle) - nodeWidth/2;
        const y = centerY + radius * Math.sin(angle) - nodeHeight/2;

        // Adjust position if nodes would overlap
        const adjustedX = x;
        let adjustedY = y;
        
        // For nodes at the top and bottom, add extra spacing
        if (Math.abs(angle - Math.PI/2) < 0.3 || Math.abs(angle - 3*Math.PI/2) < 0.3) {
          adjustedY = y + (angle < Math.PI ? -15 : 15);
        }

        return (
          <div key={index} style={{
            position: 'absolute',
            left: `${adjustedX}px`,
            top: `${adjustedY}px`,
            width: `${nodeWidth}px`,
            height: `${nodeHeight}px`,
            backgroundColor: '#f5f5f5',
            borderRadius: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '5px 10px',
            zIndex: 1,
            fontSize: '0.8rem',
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {child.name}
          </div>
        );
      })}

      {/* Connection Lines */}
      {data.children.map((_, index) => {
        const angle = (index * (2 * Math.PI)) / childCount;
        const startX = centerX + 60 * Math.cos(angle);
        const startY = centerY + 60 * Math.sin(angle);
        const endX = centerX + (radius - nodeWidth/2) * Math.cos(angle);
        const endY = centerY + (radius - nodeHeight/2) * Math.sin(angle);

        return (
          <svg key={index} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0
          }}>
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="#90caf9"
              strokeWidth="2"
            />
          </svg>
        );
      })}
    </div>
  );
};

const Modal = ({ onClose, onDiagramSave }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [selectedFlowchart, setSelectedFlowchart] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [diagram, setDiagram] = useState(null);
  const [keyConcepts, setKeyConcepts] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleFlowchartSelect = (type) => {
    setSelectedFlowchart(type);
  };

  const handleCreate = async () => {
    if (!selectedFlowchart) {
      alert("Please select a flowchart type.");
      return;
    }
    if (!uploadedFile) {
      alert("Please upload a file.");
      return;
    }
  
    try {
      const extractedText = await extractTextFromPDF(uploadedFile);
      const concepts = extractKeyConcepts(extractedText);
      setKeyConcepts(concepts);
  
      if (selectedFlowchart === "flowchart1") {
        const { nodes, edges } = generateFlowchartElements(concepts);
        setDiagram(
          <div style={{ width: "350px", height: "300px" }}>
            <ReactFlow 
              nodes={nodes} 
              edges={edges} 
              fitView
              nodesDraggable={false}
              nodesConnectable={false}
            />
          </div>
        );
      } else if (selectedFlowchart === "flowchart2") {
        const mindMapData = generateMindMapData(concepts);
        setDiagram(
          <div id="diagram-container" style={{ 
            width: "350px", 
            height: "300px",
            position: 'relative',
            overflow: 'visible'
          }}>
            {renderMindMap(mindMapData)}
          </div>
        );
      }
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Error processing file. Please try again.");
    }
  };

  const handleSave = () => {
    if (!name || !title || !selectedFlowchart || !keyConcepts.length) {
      alert("Please complete all fields and create a diagram first.");
      return;
    }

    setIsSaved(true);
    
    // Prepare the diagram data
    const diagramData = {
      name,
      title,
      date: new Date().toLocaleDateString(),
      type: selectedFlowchart,
      concepts: keyConcepts
    };

    // After 1.5 seconds, save the diagram and close the modal
    setTimeout(() => {
      onDiagramSave(diagramData);
      onClose();
    }, 1500);
  };

  const handleDownload = async () => {
    const diagramContainer = document.getElementById('diagram-container');
    if (!diagramContainer) return;
  
    try {
      const canvas = await html2canvas(diagramContainer);
      const image = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = image;
      link.download = 'diagram.png';
      link.click();
    } catch (error) {
      console.error('Error capturing diagram:', error);
      alert('Failed to download the diagram.');
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-content">
            <button className="close-button" onClick={onClose}>×</button>
  
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
              {uploadedFile ? uploadedFile.name : "📂 Browse Files"}
            </label>
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
  
            <div className="image-container">
              <img 
                src={flowImage} 
                alt="Flowchart" 
                className={`flowchart-image ${selectedFlowchart === 'flowchart1' ? 'selected' : ''}`} 
                onClick={() => handleFlowchartSelect('flowchart1')} 
              />
              <img 
                src={mindImage} 
                alt="Mind Map" 
                className={`flowchart-image ${selectedFlowchart === 'flowchart2' ? 'selected' : ''}`} 
                onClick={() => handleFlowchartSelect('flowchart2')} 
              />
            </div>
  
            <button className="create-button" onClick={handleCreate}>Create</button>
          </div>
  
          {diagram && (
            <div className="result-card">
              <div className="result-actions">
                <AiOutlineDownload className="icon-button" onClick={handleDownload} />
                <AiOutlineClose className="icon-button" onClick={() => setDiagram(null)} />
              </div>
              <h3>Generated Diagram</h3>
              <div id="diagram-container">{diagram}</div>
              <div className="save-button-container">
                <button 
                  className={`save-button ${isSaved ? 'saved' : ''}`} 
                  onClick={!isSaved ? handleSave : null}
                  disabled={isSaved}
                >
                  {isSaved ? 'Saved' : 'Save'}
                  <AiOutlineCheck className={`check-icon ${isSaved ? 'visible' : ''}`} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;