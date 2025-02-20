import React from 'react';

const NotesPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.notesSection}>
          <h2 style={styles.notesTitle}>📄 NOTES</h2>
          <button style={styles.exploreButton}>Explore</button>
        </div>
        <div style={styles.notificationSection}>
          <h3 style={styles.notificationTitle}>Notification</h3>
          <div style={styles.notificationPlaceholder}></div>
          <div style={styles.notificationPlaceholder}></div>
          <div style={styles.notificationPlaceholder}></div>
        </div>
      </div>
      <div style={styles.mainContent}>
        <div style={styles.searchContainer}>
          <h2 style={styles.searchText}>
            Search your <span style={styles.highlight}>Diagrammatic</span> notes,<br />
            Books and PYQ’s
          </h2>
          <div style={styles.searchBox}>
            <input type="text" placeholder="Search" style={styles.searchInput} />
            <button style={styles.searchButton}>Search</button>
          </div>
        </div>

        <h3 style={styles.insights}>🚀 Fresh Insights: Your Latest Notes!</h3>
        <div style={styles.buttonsContainer}>
          <button style={styles.addNotesButton}>➕ Add Notes</button>
          <button style={styles.viewAllButton}>View all</button>
        </div>
        <div style={styles.booksContainer}>
          <div style={styles.bookCard}>
            <img src="/path-to-os-image" alt="Operating System" style={styles.bookImage} />
            <p>Operating System</p>
            <a href="#" style={styles.exploreLink}>Explore the book</a>
          </div>
          <div style={styles.bookCard}>
            <img src="/path-to-oops-image" alt="OOPS" style={styles.bookImage} />
            <p>OOPS</p>
            <a href="#" style={styles.exploreLink}>Explore the book</a>
          </div>
        </div>
        <button style={styles.exploreMoreButton}>Explore More</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  sidebar: {
    width: '250px',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  notesSection: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '20px',
    minHeight: '150px',
  },
  notesTitle: {
    fontSize: '1.5rem',
    marginBottom: '70px',
  },
  exploreButton: {
    backgroundColor: '#e6e6e6',
    padding: '10px 35px',
    borderRadius: '20px',
    border: 'none',
  },
  notificationSection: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    height: '350px',
  },
  notificationTitle: {
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  notificationPlaceholder: {
    backgroundColor: '#e0e0e0',
    height: '30px',
    margin: '10px 0',
    borderRadius: '5px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  searchContainer: {
    backgroundColor: '#eae6f7', // Light purple background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Text on left, search on right
    marginBottom: '20px',
    border: '1px solid #ddd',
  },

  searchText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },

  highlight: {
    color: '#007bff',
  },

  searchBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // Align input & button to the right
  },

  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px', // Adjust width as needed
    marginBottom: '10px', // Space between input and button
  },

  searchButton: {
    backgroundColor: '#0056b3',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  
  insights: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  addNotesButton: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '8px 15px',
    borderRadius: '5px',
  },
  viewAllButton: {
    backgroundColor: '#ffcc00',
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
  },
  booksContainer: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },
  bookCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    minHeight: '180px',
  },
  bookImage: {
    width: '100px',
    height: 'auto',
  },
  exploreLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
  exploreMoreButton: {
    backgroundColor: '#ffcc00',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
  },
};

export default NotesPage;
