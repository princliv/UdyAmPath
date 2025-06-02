import { motion } from "framer-motion";
import React, { forwardRef, useState } from "react";
import { FaArrowRight, FaBookmark, FaBookOpen, FaDownload, FaRegBookmark, FaShare } from "react-icons/fa";
import bookPlaceholder from "../../assets/com.avif";

const RecommendedBooks = forwardRef((props, ref) => {
  const [savedBooks, setSavedBooks] = useState({});
  const [hoveredBook, setHoveredBook] = useState(null);

  const books = [
    {
      id: 1,
      title: "Software Engineering",
      description: "Comprehensive guide to software development methodologies, best practices, and modern techniques for building scalable systems.",
      image: bookPlaceholder,
      pdfLink: "https://drive.google.com/file/d/1zbCsmBUSaHp0VTU8gR3gpmCQNUS5hRCE/view?usp=sharing",
      rating: 4.5,
      pages: 320,
      category: "Computer Science",
      author: "Richard Schmidt",
      year: 2013
    },
    {
      id: 2,
      title: "Artificial Intelligence",
      description: "Cutting-edge exploration of AI concepts including machine learning, neural networks, and natural language processing with practical examples.",
      image: bookPlaceholder,
      pdfLink: "https://drive.google.com/file/d/1tXqR8GsoTMECGLP23aQBoDYIoXMJFges/view?usp=sharing",
      rating: 4.8,
      pages: 450,
      category: "Computer Science",
      author: "Roman Shirkin",
      year: 2020
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      description: "Master fundamental algorithms and data structures with implementations in multiple programming languages.",
      image: bookPlaceholder,
      pdfLink: "https://drive.google.com/file/d/1NfePyxDGJczsIjkPepN6hCCtXtkiVe7R/view?usp=sharing",
      rating: 4.7,
      pages: 380,
      category: "Computer Science",
      author: "Sartaj Sahni",
      year: 2005
    }
  ];

  const toggleSaveBook = (bookId) => {
    setSavedBooks(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  const handleBookOpen = (pdfLink) => {
    window.open(pdfLink, '_blank', 'noopener,noreferrer');
  };

  const handleShare = (title) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this book: ${title}`,
        text: `I found this amazing book "${title}" that you might be interested in!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Share this book: ${title}`);
    }
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} style={styles.starFilled}>★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} style={styles.starHalf}>★</span>);
      } else {
        stars.push(<span key={i} style={styles.starEmpty}>★</span>);
      }
    }
    
    return <div style={styles.ratingContainer}>{stars} <span style={styles.ratingText}>{rating.toFixed(1)}</span></div>;
  };

  return (
    <section ref={ref} style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Recommended Books</h2>
        <p style={styles.subtitle}>Curated collection of top-rated academic resources</p>
      </div>
      
      <div style={styles.booksGrid}>
        {books.map((book) => (
          <motion.div 
            key={book.id}
            whileHover={{ y: -5 }}
            style={styles.bookCard}
            onMouseEnter={() => setHoveredBook(book.id)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            <div style={styles.bookImageContainer}>
              <img 
                src={book.image} 
                alt={book.title} 
                style={styles.bookImage}
              />
              <div style={styles.bookBadges}>
                <span style={styles.categoryBadge}>{book.category}</span>
                <span style={styles.pagesBadge}>{book.pages} pages</span>
              </div>
            </div>
            
            <div style={styles.bookContent}>
              <div style={styles.bookHeader}>
                <h3 style={styles.bookTitle}>{book.title}</h3>
                <button 
                  style={styles.saveButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveBook(book.id);
                  }}
                >
                  {savedBooks[book.id] ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
              
              <p style={styles.bookAuthor}>{book.author} • {book.year}</p>
              
              {renderRatingStars(book.rating)}
              
              <p style={styles.bookDescription}>{book.description}</p>
              
              <div style={styles.bookActions}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={styles.readButton}
                  onClick={() => handleBookOpen(book.pdfLink)}
                >
                  <FaBookOpen style={styles.buttonIcon} />
                  Read Now
                </motion.button>
                
                <div style={styles.secondaryActions}>
                  <button 
                    style={styles.iconButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(book.title);
                    }}
                  >
                    <FaShare />
                  </button>
                  <button 
                    style={styles.iconButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookOpen(book.pdfLink);
                    }}
                  >
                    <FaDownload />
                  </button>
                </div>
              </div>
            </div>
            
            {hoveredBook === book.id && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.floatingArrow}
                onClick={() => handleBookOpen(book.pdfLink)}
              >
                <FaArrowRight />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div style={styles.footer}>
        <button style={styles.viewAllButton}>View All Recommended Books</button>
      </div>
    </section>
  );
});

const styles = {
  container: {
    backgroundColor: "#f8f8f8",
    padding: "10px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "left",
    marginBottom: "50px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#000",
    marginBottom: "10px",
    background: "linear-gradient(90deg, #000, #333)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
    maxWidth: "600px",
    textAlign: "left",
  },
  booksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "30px",
    marginBottom: "40px",
  },
  bookCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    position: "relative",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  },
  bookImageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
  },
  bookImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  bookBadges: {
    position: "absolute",
    top: "15px",
    left: "15px",
    display: "flex",
    gap: "10px",
  },
  categoryBadge: {
    backgroundColor: "#000",
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  pagesBadge: {
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#333",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
    backdropFilter: "blur(5px)",
  },
  bookContent: {
    padding: "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  bookHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "5px",
  },
  bookTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#000",
    margin: "0",
    flex: 1,
  },
  saveButton: {
    background: "none",
    border: "none",
    color: "#aaa",
    fontSize: "1.2rem",
    cursor: "pointer",
    padding: "5px",
    marginLeft: "10px",
    transition: "all 0.2s ease",
  },
  bookAuthor: {
    fontSize: "0.9rem",
    color: "#666",
    margin: "0 0 15px 0",
  },
  ratingContainer: {
    marginBottom: "15px",
  },
  starFilled: {
    color: "#f59e0b",
    fontSize: "1.1rem",
  },
  starHalf: {
    color: "#f59e0b",
    fontSize: "1.1rem",
    position: "relative",
    display: "inline-block",
    overflow: "hidden",
    width: "0.55rem",
  },
  starEmpty: {
    color: "#ddd",
    fontSize: "1.1rem",
  },
  ratingText: {
    fontSize: "0.9rem",
    color: "#666",
    marginLeft: "5px",
    verticalAlign: "middle",
  },
  bookDescription: {
    fontSize: "0.95rem",
    color: "#444",
    lineHeight: "1.6",
    margin: "0 0 20px 0",
    flex: 1,
  },
  bookActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  readButton: {
    backgroundColor: "#000",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  },
  buttonIcon: {
    fontSize: "0.9rem",
  },
  secondaryActions: {
    display: "flex",
    gap: "10px",
  },
  iconButton: {
    backgroundColor: "#f0f0f0",
    color: "#555",
    border: "none",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "0.9rem",
  },
  floatingArrow: {
    position: "absolute",
    right: "20px",
    bottom: "20px",
    backgroundColor: "#000",
    color: "white",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    zIndex: 2,
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
  },
  viewAllButton: {
    backgroundColor: "transparent",
    color: "#000",
    border: "2px solid #000",
    padding: "12px 30px",
    borderRadius: "30px",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default RecommendedBooks;