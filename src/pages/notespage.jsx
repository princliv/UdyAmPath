import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pyq1 from '../assets/amcat.jpg';
import pyq2 from '../assets/cocube.jpg';
import dsImage from '../assets/ds-image.jpeg';
import javaImage from '../assets/java-image.jpg';
import bgImage from "../assets/notesheaderbg.png"; // adjust path as needed
import oopsImage from '../assets/oops-image.jpeg';
import osImage from '../assets/os-image.png';


const NotesPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePyqIndex, setActivePyqIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredPyqs, setFilteredPyqs] = useState([]);
  const pyqIntervalRef = useRef(null);

  // Books data
  const books = useMemo(() => [
    { id: 1, title: 'Operating System', image: osImage, category: 'books', link: 'https://drive.google.com/file/d/1gioIXpA40SRbwiaobf2u6GXGPYJq_Or4/view?usp=sharing' },
    { id: 2, title: 'OOPS', image: oopsImage, category: 'books', link: 'https://drive.google.com/file/d/1AO9zK1_pPUjEGYR09_YsLdclQIZvdm-s/view?usp=sharing' },
    { id: 3, title: 'Data Structure', image: dsImage, category: 'books', link: 'https://drive.google.com/file/d/1NfePyxDGJczsIjkPepN6hCCtXtkiVe7R/view?usp=sharing' },
    { id: 4, title: 'Java', image: javaImage, category: 'books', link: 'https://drive.google.com/file/d/1DVbe_pOf9eN-vXIlDqtzXAbM-dvCh8BN/view?usp=sharing' },
  ], []);

  const pyqs = useMemo(() => [
    { id: 1, title: 'AMCAT PYQ', image: pyq1, category: 'pyq' },
    { id: 2, title: 'CoCubes PYQ', image: pyq2, category: 'pyq' },
    { id: 3, title: 'AMCAT Advanced', image: pyq1, category: 'pyq' },
    { id: 4, title: 'CoCubes Advanced', image: pyq2, category: 'pyq' }
  ], []);

  useEffect(() => {
    setFilteredBooks(books);
    setFilteredPyqs(pyqs);
  }, [books, pyqs]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
      setFilteredPyqs(pyqs);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredBooks(
        books.filter(book => 
          book.title.toLowerCase().includes(query)
        )
      );
      setFilteredPyqs(
        pyqs.filter(pyq => 
          pyq.title.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, books, pyqs]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

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

  const handleTechInterviewClick = () => {
    navigate("/toolspage");
  };

  const handleFlashNotesClick = () => {
    navigate("/flashcards");
  };

  // Notification messages
  const notifications = [
    "Premium members get exclusive study resources!",
    "Based on your interests, we found these for you!",
    "Daily study update available - check it out!",
    "Daily study goals achieved - reward yourself today!",
    "Your saved notes have been automatically organized!"
  ];

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

  useEffect(() => {
    pyqIntervalRef.current = setInterval(() => {
      setActivePyqIndex(prev => (prev + 1) % filteredPyqs.length);
    }, 2000);
    
    return () => clearInterval(pyqIntervalRef.current);
  }, [filteredPyqs]);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {/* Flash Notes Card */}
        <div 
          style={styles.flashNotesSection}
          onClick={handleFlashNotesClick}
        >
          <h2 style={styles.flashNotesTitle}>📚 Flash Notes</h2>
          <p style={styles.flashNotesText}>Flip cards for quick revision</p>
          <div style={styles.flashNotesExample}>
            <p style={styles.flashNotesQuestion}>What is a semaphore?</p>
            <p style={styles.flashNotesAnswer}>Answer on flip →</p>
          </div>
        </div>

        <div style={styles.notificationSection}>
          <h3 style={styles.notificationTitle}>Notifications</h3>
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
        
        <div 
          style={styles.techInterviewCard}
          onClick={handleTechInterviewClick}
        >
          <h3 style={styles.techInterviewTitle}>Tech Interview Prep</h3>
          <p style={styles.techInterviewText}>
            Practice with AI-powered hints and get real-time feedback on your coding solutions.
          </p>
          <div style={styles.techInterviewFeatures}>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>🔄</span> Interactive
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>⚡</span> Instant Feedback
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>📈</span> Skill Building
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.mainContent}>
        <div style={styles.searchContainer}>
          <h2 style={styles.searchText}>
            Search your <span style={styles.highlight}>Diagrammatic</span> notes,<br />
            Books and PYQ's
          </h2>
          <form onSubmit={handleSearch} style={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search notes, books, PYQs..." 
              style={styles.searchInput} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" style={styles.searchButton}>Search</button>
          </form>
        </div>

        {(filteredBooks.length > 0 || searchQuery.trim() === '') && (
          <>
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
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                  <div key={book.id} style={styles.bookCard}>
                    <img src={book.image} alt={book.title} style={styles.bookImage} />
                    <p style={styles.bookTitle}>{book.title}</p>
                    <a 
                      href={book.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={styles.exploreLink}
                    >
                      Explore the book
                    </a>
                  </div>
                ))
              ) : (
                <div style={styles.noResults}>
                  No books found matching your search.
                </div>
              )}
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
          </>
        )}

        {(filteredPyqs.length > 0 || searchQuery.trim() === '') && (
          <div style={styles.pyqSection} onClick={handlePyqClick}>
            <h2 style={styles.pyqHeading}>
              🎯 Targeted Practice: Your PYQs Await!
              <span style={styles.viewAll}>
                View All <i className="fas fa-arrow-right"></i>
              </span>
            </h2>
            
            {filteredPyqs.length > 0 ? (
              <>
                <div style={styles.pyqGrid}>
                  {filteredPyqs.map((pyq, index) => (
                    <div 
                      key={pyq.id} 
                      style={{
                        ...styles.pyqImageContainer,
                        opacity: index === activePyqIndex ? 1 : 0.7,
                        transform: index === activePyqIndex ? 'scale(1.05)' : 'scale(0.95)',
                      }}
                      onMouseEnter={() => {
                        clearInterval(pyqIntervalRef.current);
                        setActivePyqIndex(index);
                      }}
                      onMouseLeave={() => {
                        pyqIntervalRef.current = setInterval(() => {
                          setActivePyqIndex(prev => (prev + 1) % filteredPyqs.length);
                        }, 3000);
                      }}
                    >
                      <img 
                        src={pyq.image} 
                        alt={pyq.title} 
                        style={styles.pyqImage} 
                      />
                      {index === activePyqIndex && (
                        <div style={styles.pyqOverlay}>
                          <p style={styles.pyqOverlayText}>{pyq.title}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={styles.pyqDots}>
                  {filteredPyqs.map((_, index) => (
                    <span 
                      key={index}
                      style={{
                        ...styles.pyqDot,
                        backgroundColor: index === activePyqIndex ? '#0A52C6' : '#E0E6E9'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePyqIndex(index);
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div style={styles.noResults}>
                No PYQs found matching your search.
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <>
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

              <h2 style={{ fontWeight: "bold", color: "#1181c8", marginBottom: "10px" }}>
                Upgrade to Plus! 🚀
              </h2>

              <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
                Get premium access to exclusive mentorship, tools, and career-boosting resources.
              </p>

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
  flashNotesSection: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    marginBottom: '20px',
    minHeight: '150px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      backgroundColor: '#f8f9fa',
    },
  },
  flashNotesTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  flashNotesText: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    marginBottom: '15px',
  },
  flashNotesExample: {
    backgroundColor: '#e8f4fc',
    padding: '12px',
    borderRadius: '6px',
    borderLeft: '4px solid #3498db',
  },
  flashNotesQuestion: {
    fontWeight: '500',
    marginBottom: '5px',
    color: '#2c3e50',
  },
  flashNotesAnswer: {
    fontSize: '0.85rem',
    color: '#3498db',
    fontStyle: 'italic',
  },
  notificationSection: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    height: '350px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
    transition: 'box-shadow 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    },
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
    height: '25px',
  },
  notificationText: {
    display: 'inline-block',
    position: 'relative',
    transition: 'transform 0.5s linear',
    paddingLeft: '100%',
    fontSize: '1rem',
  },
  techInterviewCard: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '12px',
    marginTop: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
    },
  },
  techInterviewTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#2d3748',
  },
  techInterviewText: {
    marginBottom: '20px',
    color: '#4a5568',
    lineHeight: '1.5',
    fontSize: '0.95rem',
  },
  techInterviewFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    fontSize: '0.95rem',
    color: '#2d3748',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#edf2f7',
      transform: 'translateX(2px)',
    },
  },
  featureIcon: {
    fontSize: '1.1rem',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    overflowX: 'auto', // Add horizontal scroll if needed
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
    fontSize: '1.5rem',
    marginBottom: '10px',
    marginLeft: '10px',
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
    gap: '50px',
    marginBottom: '20px',
    flexWrap: 'nowrap', // Prevent wrapping to new line
    overflowX: 'auto', // Enable horizontal scrolling if needed
    paddingBottom: '10px', // Space for scrollbar
    minWidth: '100%', // Ensure container takes full width
  },
  bookCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    minHeight: '180px',
    width: '200px', // Fixed width for each card
    minWidth: '200px', // Prevent shrinking
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    flexShrink: 0, // Prevent cards from shrinking
    marginLeft:'20px',
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
  pyqSection: {
    marginTop: '40px',
    textAlign: 'left',
    cursor: 'pointer',
  },
  pyqHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '15px',
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
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  pyqImageContainer: {
    width: '100%',
    borderRadius: '10px',
    height: '220px',
    position: 'relative',
    transition: 'all 0.5s ease',
    cursor: 'pointer',
    flex: '0 0 calc(25% - 15px)',
  },
  pyqImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  pyqOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    textAlign: 'center',
  },
  pyqOverlayText: {
    margin: '0',
    fontSize: '14px',
  },
  pyqDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '15px',
  },
  pyqDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  noResults: {
    textAlign: 'center',
    width: '100%',
    padding: '20px',
    color: '#666',
    fontStyle: 'italic',
  },
};

export default NotesPage;