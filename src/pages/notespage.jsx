import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pyq1 from '../assets/amcat.jpg';
import pyq2 from '../assets/cocube.jpg';
import dsImage from '../assets/ds-image.jpeg';
import javaImage from '../assets/java-image.webp';
import oopsImage from '../assets/oops-image.jpeg';
import osImage from '../assets/os-image.png';
import bgImage from "../assets/notesheaderbg.png"; // adjust path as needed


const NotesPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.2)";
  };

  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePyqClick = () => {
    navigate("/pyqs");
  };

  // Notification messages
  const notifications = [
    "Premium members get exclusive study resources!",
    "Based on your interests, we found these for you!",
    "Daily study update available - check it out!"
  ];

  // Refs for each notification container
  const notificationRefs = useRef([]);

  useEffect(() => {
    const animateNotifications = () => {
      notificationRefs.current.forEach((container, index) => {
        if (!container) return;
        
        const text = container.querySelector('span');
        if (!text) return;
        
        const containerWidth = container.offsetWidth;
        const textWidth = text.offsetWidth;
        
        if (textWidth > containerWidth) {
          let position = 0;
          const animation = () => {
            position -= 0.5;
            if (position < -textWidth) {
              position = containerWidth;
            }
            text.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animation);
          };
          animation();
        }
      });
    };

    animateNotifications();
  }, []);

  const pyqImages = [pyq1, pyq2, pyq1, pyq2]; // Reusing images for demo

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.notesSection}>
          <h2 style={styles.notesTitle}>📄 NOTES</h2>
          <Link to="/notes">
            <button
              style={styles.exploreButton}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Explore
            </button>
          </Link>
        </div>
        <div style={styles.notificationSection}>
          <h3 style={styles.notificationTitle}>Notification</h3>
          {notifications.map((notification, index) => (
            <div 
              key={index} 
              style={{...styles.notificationContainer, cursor: 'pointer'}}
              ref={el => notificationRefs.current[index] = el}
            >
              <span style={styles.notificationText}>{notification}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.mainContent}>
        <div style={styles.searchContainer}>
          <h2 style={styles.searchText}>
            Search your <span style={styles.highlight}>Diagrammatic</span> notes,<br />
            Books and PYQ's
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
            <a href="/books" style={styles.exploreLink}>Explore the book</a>
          </div>
          <div style={styles.bookCard}>
            <img src={oopsImage} alt="OOPS" style={styles.bookImage} />
            <p style={styles.bookTitle}>OOPS</p>
            <a href="/books" style={styles.exploreLink}>Explore the book</a>
          </div>
          <div style={styles.bookCard}>
            <img src={dsImage} alt="Data Structure" style={styles.bookImage} />
            <p style={styles.bookTitle}>Data Structure</p>
            <a href="/books" style={styles.exploreLink}>Explore the book</a>
          </div>
          <div style={styles.bookCard}>
            <img src={javaImage} alt="Java" style={styles.bookImage} />
            <p style={styles.bookTitle}>Java</p>
            <a href="/books" style={styles.exploreLink}>Explore the book</a>
          </div>
        </div>

        <Link to="/books" style={{ textDecoration: 'none' }}>
          <button
            style={styles.exploreMoreButton}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Explore More
          </button>
        </Link>

        {/* Added PYQ Section */}
        <div style={styles.pyqSection} onClick={handlePyqClick}>
          <h2 style={styles.pyqHeading}>
            Some PYQ's just for you
            <span style={styles.viewAll}>
              View All <i className="fas fa-arrow-right"></i>
            </span>
          </h2>
          <div style={styles.pyqGrid}>
            {pyqImages.map((image, index) => (
              <img key={index} src={image} alt={`PYQ ${index + 1}`} style={styles.pyqImage} />
            ))}
          </div>

          {/* Centered Divider Below Images */}
          <div style={styles.dividerContainer}>
            <div style={styles.line}></div>
            <div style={styles.centerLine}></div>
            <div style={styles.line}></div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* MODAL OVERLAY */}
          <div
            onClick={handleCloseModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              zIndex: 999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {/* MODAL CONTENT */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                width: "350px",
                textAlign: "center",
                zIndex: 1000,
                animation: "fadeIn 0.3s ease-in-out",
                position: "relative"
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#888"
                }}
              >
                ✕
              </button>

              {/* Modal Header */}
              <h2 style={{ fontWeight: "bold", color: "#1181c8", marginBottom: "10px" }}>
                Upgrade to Plus! 🚀
              </h2>

              {/* Description */}
              <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
                Get premium access to exclusive mentorship, tools, and career-boosting resources.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => alert("Redirecting to purchase page...")}
                style={{
                  backgroundColor: "#1181c8",
                  color: "#fff",
                  padding: "10px 20px",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                  width: "100%",
                  fontWeight: "bold"
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0e6ba8")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1181c8")}
              >
                Get Plus Now →
              </button>
            </div>
          </div>
        </>
      )}
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
    width: '285px',
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
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
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
    marginBottom: '15px',
  },
  notificationContainer: {
    backgroundColor: '#f5f5f5',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '6px',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    height: '20px',
  },
  notificationText: {
    display: 'inline-block',
    position: 'relative',
    transition: 'transform 0.5s linear',
    paddingLeft: '100%',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  searchContainer: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '30px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
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
    fontSize: '1.5rem',
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
    gap: '100px',
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
    borderRadius: '8px',
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
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  // Added PYQ Section Styles
  pyqSection: {
    marginTop: '40px',
    textAlign: 'left',
    cursor: 'pointer',
  },
  pyqHeading: {
    fontSize: '1.8rem',
    fontWeight: '500',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAll: {
    fontSize: '1rem',
    color: '#0A52C6',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  pyqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  pyqImage: {
    width: '100%',
    borderRadius: '10px',
    height: '200px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  dividerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  line: {
    height: '4px',
    width: '60px',
    backgroundColor: '#E0E6E9',
    borderRadius: '10px',
  },
  centerLine: {
    height: '8px',
    width: '70px',
    backgroundColor: '#0A52C6',
    borderRadius: '10px',
    margin: '0 15px',
  },
};

export default NotesPage;