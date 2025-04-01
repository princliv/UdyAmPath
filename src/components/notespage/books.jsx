import React, { useRef } from "react";
import bookImage from "../../assets/book-cover.avif";
import readingPerson from "../../assets/reading-person.jpeg";
import RecommendedBooks from "./RecommendedBooks";

const Books = () => {
  const recommendedBooksRef = useRef(null);

  const scrollToRecommendedBooks = () => {
    recommendedBooksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.booksContainer}>
      <div style={styles.content}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <div>
            <input type="text" placeholder="Search" style={styles.searchInput} />
            <h1 style={styles.title}>Get your Books</h1>
            <p style={styles.subtitle}>Find the Books You Need to Succeed!</p>
            <div style={styles.buttonGroup}>
              <button
                style={{ ...styles.btn, ...styles.yellowBtn }}
                onMouseEnter={(e) => (e.target.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
                onClick={scrollToRecommendedBooks}
              >
                Learn More
              </button>
              <button
                style={{ ...styles.btn, ...styles.outlineBtn }}
                onMouseEnter={(e) => (e.target.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
              >
                Get PYQ's
              </button>
            </div>
          </div>
          <div>
            <img src={bookImage} alt="Book cover" style={styles.profileImg} />
          </div>
        </div>

        {/* Navigation Section */}
        <div style={styles.navSection}>
          <div
            style={styles.navItem}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.navItemHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.navItem)}
          >
            <i className="fas fa-book-open" style={styles.navIcon}></i>
            <div style={styles.navTextContainer}>
              <h2 style={styles.navItemTitle}>GET YOUR BOOKS</h2>
              <p style={styles.navItemText}>Start Reading Today</p>
            </div>
          </div>

          <div
            style={styles.navItem}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.navItemHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.navItem)}
          >
            <i className="fas fa-bookmark" style={styles.navIcon}></i>
            <div style={styles.navTextContainer}>
              <h2 style={styles.navItemTitle}>SAVED BOOKS</h2>
              <p style={styles.navItemText}>Your Study Shelf</p>
            </div>
          </div>

          <div
            style={styles.navItem}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.navItemHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.navItem)}
          >
            <i className="fas fa-download" style={styles.navIcon}></i>
            <div style={styles.navTextContainer}>
              <h2 style={styles.navItemTitle}>GET PYQ'S FREE</h2>
              <p style={styles.navItemText}>Free Access to PYQ's</p>
            </div>
          </div>
        </div>

        {/* Explore Section */}
        <div style={styles.exploreSection}>
          <div style={styles.exploreImage}>
            <img src={readingPerson} alt="Person reading" style={styles.exploreImg} />
          </div>
          <div style={styles.exploreText}>
            <h2 style={{ fontSize: "36px", fontWeight: "500" }}>EXPLORE</h2>
            <p
              style={{
                fontSize: "26px",
                lineHeight: "1.6",
                color: "#444",
                marginTop: "-20px",
                textAlign: "left",
              }}
            >
              Enhance your learning with a
              <br /> daily update of fresh study books.
              <br /> We bring you the latest
              <br /> educational resources to keep your <br />
              study sessions productive and <br />
              up-to-date.
            </p>
          </div>
        </div>
      </div>
      {/* 📚 Recommended Books Section */}
      <RecommendedBooks ref={recommendedBooksRef} />
    </div>
  );
};

const styles = {
  searchInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "3px solid #ccc",
    width: "400px",
    marginBottom: "0px",
  },
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
    fontSize: "60px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "30px",
    color: "#666",
    fontWeight: "500",
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
    border: "none",
  },
  yellowBtn: {
    backgroundColor: "#facc15",
    color: "black",
    padding: "10px 35px",
    borderRadius: "20px",
    cursor: "pointer",
  },
  outlineBtn: {
    border: "2px solid #facc15",
    background: "white",
    color: "black",
    padding: "10px 35px",
  },
  profileImg: {
    width: "340px",
    height: "340px",
    borderRadius: "50%",
  },
  navSection: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px",
    textAlign: "center",
    gap: "20px",
    border: "3px solid #ddd",
  },
  navItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "white",
    padding: "10px 30px",
    borderRadius: "35px",
    minWidth: "250px",
    transition: "all 0.3s ease",
    gap: "15px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  navItemHover: {
    border: "2px solid #555",
  },
  navIcon: {
    fontSize: "24px",
    color: "#000",
  },
  navTextContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  navItemTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "2px",
  },
  navItemText: {
    fontSize: "14px",
    color: "#666",
    marginTop: "0px",
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
    maxWidth: "700px",
    borderRadius: "10px",
  },
  exploreText: {
    maxWidth: "600px",
    marginLeft: "20px",
    position: "relative",
    top: "-10px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Books;