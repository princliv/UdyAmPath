import React from 'react';

const Blog = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Coming Soon</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fefbf4',
    overflow: 'hidden',
  },
  text: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333',
    animation: 'moveText 5s infinite alternate',
  },
};

// Adding keyframes to style using a simple style tag
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes moveText {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(styleTag);

export default Blog;