import nlp from 'compromise';
import html2canvas from 'html2canvas';
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import React, { useState } from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineDownload } from 'react-icons/ai';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import flowImage from '../../assets/flow.png';
import mindImage from '../../assets/mind.png';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Modal = ({ onClose, onDiagramSave }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [selectedFlowchart, setSelectedFlowchart] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [diagram, setDiagram] = useState(null);
  const [keyConcepts, setKeyConcepts] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const extractTextFromPDF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      
      reader.onload = async () => {
        try {
          const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
          let extractedText = "";
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            extractedText += textContent.items.map(item => item.str).join(" ") + " ";
          }

          resolve(extractedText);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const extractKeyConcepts = async (text) => {
    try {
      const doc = nlp(text);
      
      // First try to extract process steps (lines separated by newlines)
      const lines = text.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      if (lines.length > 3) { // If we have multiple lines, use them as steps
        return lines.slice(0, 10); // Limit to 10 steps
      }

      // Fallback to NLP-based extraction
      const nouns = doc.nouns().out('array');
      const topics = doc.topics().out('array');
      
      // Combine and deduplicate
      const allConcepts = [...new Set([...nouns, ...topics])];
      
      // Filter and return the most relevant concepts
      return allConcepts
        .filter(concept => 
          concept.length > 3 && 
          !concept.match(/^[0-9.,]+$/) &&
          !['page', 'chapter', 'section', 'figure'].includes(concept.toLowerCase())
        )
        .slice(0, 10);
    } catch (error) {
      console.error("NLP processing failed, using fallback", error);
      // Fallback to simple extraction
      const words = text.split(/\s+/);
      const stopwords = ["the", "and", "to", "of", "in", "a", "is", "that", "with", "as", "for", "was", "on"];
      return words.filter(word => 
        !stopwords.includes(word.toLowerCase()) && 
        word.length > 3
      ).slice(0, 10);
    }
  };

  // Keep your original flowchart generation exactly as it was
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

  // Keep your original mind map generation
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

    const childCount = data.children.length;
    const radius = Math.min(150, 50 + childCount * 20);
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
          const angle = (index * (2 * Math.PI)) / childCount;
          const x = centerX + radius * Math.cos(angle) - nodeWidth/2;
          const y = centerY + radius * Math.sin(angle) - nodeHeight/2;

          const adjustedX = x;
          let adjustedY = y;
          
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
  
    setIsProcessing(true);
    setError(null);
    
    try {
      const extractedText = await extractTextFromPDF(uploadedFile);
      const concepts = await extractKeyConcepts(extractedText);
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
      setError("Error processing file. Please try again with a different file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    if (!name || !title || !selectedFlowchart || !keyConcepts.length) {
      alert("Please complete all fields and create a diagram first.");
      return;
    }

    setIsSaved(true);
    
    const diagramData = {
      name,
      title,
      date: new Date().toLocaleDateString(),
      type: selectedFlowchart,
      concepts: keyConcepts
    };

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
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '80px'
      }}>
        <div style={{ 
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          width: '400px',
          height: '450px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}>
          <button style={{ 
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '29px',
            cursor: 'pointer',
            color: '#555'
          }} onClick={onClose}>×</button>
  
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{
              width: '70%',
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #ccc',
              borderRadius: '10px'
            }} 
          />
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{
              width: '70%',
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #ccc',
              borderRadius: '10px'
            }} 
          />
  
          <label style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            margin: '10px 0',
            textAlign: 'center',
            display: 'inline-block'
          }} htmlFor="file-upload">
            {uploadedFile ? uploadedFile.name : "📂 Browse Files"}
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
  
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px 0',
            width: '80%'
          }}>
            <img 
              src={flowImage} 
              alt="Flowchart" 
              style={{
                width: '48%',
                cursor: 'pointer',
                border: selectedFlowchart === 'flowchart1' ? '2px solid #007bff' : '2px solid transparent',
                borderRadius: '5px',
                boxShadow: selectedFlowchart === 'flowchart1' ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none'
              }} 
              onClick={() => handleFlowchartSelect('flowchart1')} 
            />
            <img 
              src={mindImage} 
              alt="Mind Map" 
              style={{
                width: '48%',
                cursor: 'pointer',
                border: selectedFlowchart === 'flowchart2' ? '2px solid #007bff' : '2px solid transparent',
                borderRadius: '5px',
                boxShadow: selectedFlowchart === 'flowchart2' ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none'
              }} 
              onClick={() => handleFlowchartSelect('flowchart2')} 
            />
          </div>
  
          <button style={{ 
            padding: '12px 25px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            marginTop: '15px',
            fontSize: '16px',
            fontWeight: '300',
            textAlign: 'center'
          }} onClick={handleCreate}>
            {isProcessing ? 'Processing...' : 'Create'}
          </button>

          {error && (
            <div style={{ 
              color: 'red',
              marginTop: '10px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
        </div>
  
        {diagram && (
          <div style={{ 
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '400px',
            height: '450px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              gap: '10px'
            }}>
              <AiOutlineDownload style={{ 
                cursor: 'pointer',
                fontSize: '20px',
                color: '#555'
              }} onClick={handleDownload} />
              <AiOutlineClose style={{ 
                cursor: 'pointer',
                fontSize: '20px',
                color: '#555'
              }} onClick={() => setDiagram(null)} />
            </div>
            <h3>Generated Diagram</h3>
            <div id="diagram-container">{diagram}</div>
            <div style={{ 
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <button 
                style={{ 
                  padding: '10px 20px',
                  backgroundColor: isSaved ? '#28a745' : '#858d94',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }} 
                onClick={!isSaved ? handleSave : null}
                disabled={isSaved}
              >
                {isSaved ? 'Saved' : 'Save'}
                <AiOutlineCheck style={{ 
                  opacity: isSaved ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;