import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FaBookmark, FaBookOpen, FaDownload, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import bookImage from "../../assets/book-cover.avif";
import readingPerson from "../../assets/reading-person.jpeg";
import RecommendedBooks from "./RecommendedBooks";

const Books = () => {
  const recommendedBooksRef = useRef(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToRecommendedBooks = () => {
    recommendedBooksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    {
      icon: <FaBookOpen />,
      title: "GET YOUR BOOKS",
      subtitle: "Start Reading Today",
      action: scrollToRecommendedBooks
    },
    {
      icon: <FaBookmark />,
      title: "SAVED BOOKS",
      subtitle: "Your Study Shelf",
      action: scrollToRecommendedBooks
    },
    {
      icon: <FaDownload />,
      title: "GET PYQ'S FREE",
      subtitle: "Free Access to PYQ's",
      action: () => navigate("/pyqs")
    }
  ];

  return (
    <div style={styles.booksContainer}>
      <div style={styles.content}>
        {/* Header Section */}
        <section style={styles.headerSection}>
          <div style={styles.headerText}>
            <div style={styles.searchContainer}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search books, authors, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={styles.title}
            >
              Expand Your <span style={styles.highlight}>Knowledge</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={styles.subtitle}
            >
              Discover the perfect books to fuel your academic journey
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={styles.buttonGroup}
            >
              <motion.button
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ ...styles.btn, ...styles.primaryBtn }}
                onClick={scrollToRecommendedBooks}
              >
                Browse Collection
              </motion.button>
              <motion.button
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ ...styles.btn, ...styles.secondaryBtn }}
                onClick={() => navigate("/pyqs")}
              >
                Get PYQ's
              </motion.button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={bookImage} alt="Book cover" style={styles.profileImg} />
          </motion.div>
        </section>

        {/* Stats Section */}
        <section style={styles.statsSection}>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>10,000+</h3>
            <p style={styles.statLabel}>Books Available</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>500+</h3>
            <p style={styles.statLabel}>Subjects Covered</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>24/7</h3>
            <p style={styles.statLabel}>Access Anywhere</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>Free</h3>
            <p style={styles.statLabel}>No Hidden Costs</p>
          </div>
        </section>

        {/* Navigation Section */}
        <section style={styles.navSection}>
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              style={styles.navItem}
              onClick={item.action}
            >
              <div style={styles.navIcon}>{item.icon}</div>
              <div style={styles.navTextContainer}>
                <h2 style={styles.navItemTitle}>{item.title}</h2>
                <p style={styles.navItemText}>{item.subtitle}</p>
              </div>
              
            </motion.div>
          ))}
        </section>

        {/* Explore Section */}
        <section style={styles.exploreSection}>
          <div style={styles.exploreImage}>
            <img src={readingPerson} alt="Person reading" style={styles.exploreImg} />
          </div>
          <div style={styles.exploreText}>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={styles.exploreTitle}
            >
              Daily Book Updates
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={styles.exploreDescription}
            >
              We continuously update our library with the latest academic resources 
              to keep your study sessions productive and relevant. Our team curates 
              high-quality materials across all disciplines.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={styles.featureList}
            >
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>✓</div>
                <span>New books added daily</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>✓</div>
                <span>Expert recommendations</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>✓</div>
                <span>Personalized suggestions</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Recommended Books Section */}
      <RecommendedBooks ref={recommendedBooksRef} />
    </div>
  );
};

const styles = {
  booksContainer: {
    backgroundColor: "#f9f9f9",
    color: "#333",
    padding: "40px 20px",
    position: "relative",
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
    marginBottom: "60px",
  },
  headerText: {
    flex: 1,
    minWidth: "300px",
    paddingRight: "40px",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "30px",
    maxWidth: "500px",
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#777",
  },
  searchInput: {
    padding: "15px 15px 15px 45px",
    borderRadius: "30px",
    border: "2px solid #ddd",
    width: "100%",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "700",
    lineHeight: "1.2",
    marginBottom: "15px",
    background: "linear-gradient(90deg, #000, #333)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  highlight: {
    color: "#000",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#555",
    fontWeight: "400",
    marginBottom: "30px",
    lineHeight: "1.4",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },
  btn: {
    fontSize: "16px",
    padding: "12px 30px",
    borderRadius: "30px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  primaryBtn: {
    backgroundColor: "#000",
    color: "white",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  },
  secondaryBtn: {
    backgroundColor: "white",
    color: "#000",
    border: "2px solid #000",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  },
  profileImg: {
    width: "400px",
    height: "400px",
    borderRadius: "20px",
    objectFit: "cover",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  statsSection: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "30px 20px",
    margin: "40px 0",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },
  statItem: {
    textAlign: "center",
    padding: "10px 20px",
    minWidth: "150px",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#000",
    margin: "0",
  },
  statLabel: {
    fontSize: "1rem",
    color: "#666",
    margin: "5px 0 0",
  },
  navSection: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
    margin: "50px 0",
  },
  navItem: {
    flex: "1",
    minWidth: "250px",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
  navIcon: {
    fontSize: "28px",
    color: "#000",
    backgroundColor: "#f0f0f0",
    padding: "15px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navTextContainer: {
    flex: 1,
  },
  navItemTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "5px",
    color: "#000",
  },
  navItemText: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
  },
  navArrow: {
    color: "#999",
    fontSize: "18px",
  },
  exploreSection: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "80px 0",
    gap: "40px",
  },
  exploreImage: {
    flex: "1",
    minWidth: "300px",
  },
  exploreImg: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  exploreText: {
    flex: "1",
    minWidth: "300px",
    padding: "20px",
  },
  exploreTitle: {
    fontSize: "2.5rem",
    fontWeight: "600",
    color: "#000",
    marginBottom: "20px",
  },
  exploreDescription: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: "#555",
    marginBottom: "30px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1rem",
    color: "#444",
  },
  featureIcon: {
    backgroundColor: "#000",
    color: "white",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
};

export default Books;