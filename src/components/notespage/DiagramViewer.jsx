import html2canvas from 'html2canvas';
import React from 'react';
import { AiOutlineClose, AiOutlineDownload } from 'react-icons/ai';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';

const ViewerWrapper = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 800px;
    max-height: 80vh;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .header-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
  }

  .header-actions button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #555;
    transition: color 0.2s ease;
  }

  .header-actions button:hover {
    color: #000;
  }

  .diagram-container {
    width: 100%;
    height: 70vh;
    margin-top: 20px;
  }

  .diagram-info {
    margin-bottom: 15px;
  }

  .diagram-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0 5px 0;
  }

  .diagram-meta {
    color: #666;
    font-size: 0.9rem;
  }
`;

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

const DiagramViewer = ({ diagram, onClose }) => {
  const generateFlowchartElements = (concepts) => {
    const nodes = [];
    const edges = [];

    nodes.push({
      id: 'start',
      type: 'input',
      data: { label: 'Start' },
      position: { x: 175, y: 25 },
      style: { backgroundColor: '#e6f7ff', border: '1px solid #1890ff' },
    });

    concepts.forEach((concept, index) => {
      nodes.push({
        id: `node-${index}`,
        data: { label: concept },
        position: { x: 175, y: 100 + index * 75 },
        style: { backgroundColor: '#f6ffed', border: '1px solid #52c41a' },
      });

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

    nodes.push({
      id: 'end',
      type: 'output',
      data: { label: 'End' },
      position: { x: 175, y: 100 + concepts.length * 75 },
      style: { backgroundColor: '#fff1f0', border: '1px solid #ff4d4f' },
    });

    if (concepts.length > 0) {
      edges.push({
        id: `edge-last-end`,
        source: `node-${concepts.length-1}`,
        target: 'end',
        type: 'step',
        animated: true,
        style: { stroke: '#1890ff' },
      });
    }

    return { nodes, edges };
  };

  const generateMindMapData = (concepts) => {
    const centralConcept = concepts.reduce((longest, current) => 
      current.length > longest.length ? current : longest, concepts[0]);
    
    return {
      name: diagram.title || centralConcept,
      children: concepts
        .filter(concept => concept !== centralConcept)
        .map(concept => ({ name: concept }))
    };
  };

  const handleDownload = async () => {
    try {
      const diagramContainer = document.querySelector('.diagram-container');
      
      if (!diagramContainer) {
        console.error('Diagram container not found');
        return;
      }

      const canvas = await html2canvas(diagramContainer, {
        scale: 2, // Higher quality
        logging: false,
        useCORS: true
      });
      
      const image = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = image;
      link.download = diagram.title ? `${diagram.title.replace(/[^a-z0-9]/gi, '_')}.png` : 'diagram.png';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading diagram:', error);
      alert('Failed to download diagram. Please try again.');
    }
  };

  const renderDiagram = () => {
    if (diagram.type === 'flowchart1') {
      const { nodes, edges } = generateFlowchartElements(diagram.concepts);
      return (
        <div className="diagram-container">
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
          />
        </div>
      );
    } else {
      const mindMapData = generateMindMapData(diagram.concepts);
      return (
        <div className="diagram-container">
          {renderMindMap(mindMapData)}
        </div>
      );
    }
  };

  return (
    <ViewerWrapper>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="header-actions">
            <button onClick={handleDownload} title="Download diagram">
              <AiOutlineDownload />
            </button>
            <button onClick={onClose} title="Close">
              <AiOutlineClose />
            </button>
          </div>
          <div className="diagram-info">
            <h2 className="diagram-title">{diagram.title || 'Untitled Diagram'}</h2>
            <p className="diagram-meta">
              Date: {diagram.date}
            </p>
          </div>
          {renderDiagram()}
        </div>
      </div>
    </ViewerWrapper>
  );
};

export default DiagramViewer;