import React from "react";
import bookImage from "../../assets/book-cover.avif"; // Adjust the path as per your structure
import readingPerson from "../../assets/reading-person.jpeg";

const Books = () => {
  return (
    <div style={styles.booksContainer}>
      <div style={styles.content}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <div>
            <h1 style={styles.title}>Get your Books</h1>
            <p style={styles.subtitle}>Find the Books You Need to Succeed!</p>
            <div style={styles.buttonGroup}>
              <button style={{ ...styles.btn, ...styles.yellowBtn }}>Learn More</button>
              <button style={{ ...styles.btn, ...styles.outlineBtn }}>Get PYQ's</button>
            </div>
          </div>
          <div>
            <img src={bookImage} alt="Book cover" style={styles.profileImg} />
          </div>
        </div>

        {/* Navigation Section */}
        <div style={styles.navSection}>
          <div style={styles.navItem}>
            <i className="fas fa-book-open"></i>
            <h2>GET YOUR BOOKS</h2>
            <p>Start Reading Today</p>
          </div>
          <div style={styles.navItem}>
            <i className="fas fa-bookmark"></i>
            <h2>SAVED BOOKS</h2>
            <p>Your Study Shelf</p>
          </div>
          <div style={styles.navItem}>
            <i className="fas fa-download"></i>
            <h2>GET PYQ'S FREE</h2>
            <p>Free Access to PYQ's</p>
          </div>
        </div>

        {/* Explore Section */}
        <div style={styles.exploreSection}>
          <div style={styles.exploreImage}>
            <img src={readingPerson} alt="Person reading" style={styles.exploreImg} />
          </div>
          <div style={styles.exploreText}>
            <h2>EXPLORE</h2>
            <p>
              Enhance your learning with a daily update of fresh study books. We bring you the latest educational resources to keep your study sessions productive and up-to-date.
            </p>
            <button style={{ ...styles.btn, ...styles.outlineBlue }}>View all</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal CSS
const styles = {
  booksContainer: {
    backgroundColor: "white",
    color: "#333",
    padding: "40px 20px",
  },
  content: {
    maxWidth: "1200px",
    margin: "auto",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "18px",
    color: "#666",
  },
  buttonGroup: {
    marginTop: "15px",
  },
  btn: {
    fontSize: "16px",
    padding: "10px 20px",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginRight: "10px",
  },
  yellowBtn: {
    backgroundColor: "#facc15",
    border: "none",
    color: "black",
  },
  outlineBtn: {
    border: "2px solid #facc15",
    background: "white",
    color: "#facc15",
  },
  profileImg: {
    width: "240px",
    height: "240px",
    borderRadius: "50%",
  },
  navSection: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px",
    textAlign: "center",
  },
  navItem: {
    textAlign: "center",
  },
  exploreSection: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "40px",
  },
  exploreImage: {
    flex: "1",
  },
  exploreImg: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "10px",
  },
  exploreText: {
    maxWidth: "500px",
    marginLeft: "20px",
  },
  outlineBlue: {
    marginTop: "15px",
    border: "2px solid #3b82f6",
    background: "white",
    color: "#3b82f6",
  },
};

export default Books;
