import React from 'react';
import { Link } from 'react-router-dom';
import dsImage from '../assets/ds-image.jpeg';
import oopsImage from '../assets/oops-image.jpeg';
import osImage from '../assets/os-image.png';

const NotesPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.notesSection}>
          <h2 style={styles.notesTitle}>📄 NOTES</h2>
          <Link to="/notes">
            <button style={styles.exploreButton}>Explore</button>
          </Link>
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
          <Link to="/notes">
            <button style={styles.addNotesButton}>
              <span style={styles.plusIcon}>➕</span> Add Notes
            </button>
          </Link>
          <Link to="/notes">
            <button style={styles.viewAllButton}>View all</button>
          </Link>
        </div>

        <div style={styles.booksContainer}>
          <div style={styles.bookCard}>
            <img src={osImage} alt="Operating System" style={styles.bookImage} />
            <p style={styles.bookTitle}>Operating System</p>
            <a href="#" style={styles.exploreLink}>Explore the book</a>
          </div>
          <div style={styles.bookCard}>
            <img src={oopsImage} alt="OOPS" style={styles.bookImage} />
            <p style={styles.bookTitle}>OOPS</p>
            <a href="#" style={styles.exploreLink}>Explore the book</a>
          </div>
          <div style={styles.bookCard}>
            <img src={dsImage} alt="Data Structure" style={styles.bookImage} />
            <p style={styles.bookTitle}>Data Structure</p>
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
    backgroundColor: '#f5f5f5',
    padding: '10px 35px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
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
    backgroundColor: '#f5f5f5',
    height: '30px',
    margin: '10px 0',
    borderRadius: '5px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  searchContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    alignItems: 'flex-end',
  },
  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
    marginBottom: '10px',
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
    marginLeft: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginBottom: '20px',
    marginTop: '20px',
  },
  addNotesButton: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '8px 15px',
    borderRadius: '20px',
    border: '2px solid #ffcc00',
    cursor: 'pointer',
  },
  plusIcon: {
    color: 'grey',
  },
  viewAllButton: {
    backgroundColor: '#ffcc00',
    padding: '10px 35px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
  },
  booksContainer: {
    display: 'flex',
    gap: '70px',
    marginBottom: '20px',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: '80px',

  },
  bookCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    minHeight: '180px',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

  },
  bookImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  
  exploreLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
  bookTitle: {
    fontWeight: 'bold',
  },
  exploreMoreButton: {
    backgroundColor: '#ffcc00',
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    display: 'block',
    margin: '0 auto',
    textAlign: 'center',
    cursor: 'pointer',
  },
};

export default NotesPage;