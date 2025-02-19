import React from 'react';

const NotesPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#fefbf4',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '20px' }}>Visual Diagrams & Notes</h1>

      <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', textAlign: 'center' }}>
        Transform your lengthy notes into easy-to-understand visual diagrams.  
        Simplify learning with structured and clear representations of complex topics.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px',
        maxWidth: '900px'
      }}>
        <div style={{
          background: '#e4deff',
          padding: '15px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>Mind Maps</h3>
          <p>Organize your notes using interconnected diagrams.</p>
        </div>

        <div style={{
          background: '#d1c4ff',
          padding: '15px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>Flowcharts</h3>
          <p>Visualize processes and decision-making steps.</p>
        </div>

        <div style={{
          background: '#c2b5ff',
          padding: '15px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>Concept Maps</h3>
          <p>Link different concepts and understand their relationships.</p>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
