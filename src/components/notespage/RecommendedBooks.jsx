import React from "react";
import { default as pyq1, default as pyq3 } from "../../assets/amcat.jpg";
import { default as pyq2, default as pyq4 } from "../../assets/cocube.jpg";
import bookImage from "../../assets/com.avif";

const RecommendedBooks = () => {
  const books = [
    {
      title: "Software Engineering",
      description:
        "Offers a comprehensive study of the software development lifecycle, methodologies, and best practices.",
      image: bookImage,
    },
    {
      title: "Artificial Intelligence",
      description:
        "Provides a thorough introduction to the fundamental concepts, methodologies, and advanced techniques.",
      image: bookImage,
    },
  ];

  const pyqImages = [pyq1, pyq2, pyq3, pyq4];

  const styles = {
    container: {
      backgroundColor: "white",
      padding: "20px",
      maxWidth: "1190px",
      margin: "auto",
    },
    heading: {
      fontSize: "36px",
      fontWeight: "500",
      marginBottom: "20px",
      textAlign: "left",
    },
    booksList: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    bookCard: {
      display: "flex",
      alignItems: "center",
      background: "#f3e8ff",
      padding: "25px",
      borderRadius: "12px",
      transition: "0.3s ease",
      cursor: "pointer",
      width: "100%",
      minHeight: "150px",
    },
    bookImage: {
      width: "170px",
      height: "170px",
      marginRight: "20px",
      borderRadius: "5px",
      objectFit: "cover",
    },
    bookDetails: {
      flex: 1,
      marginLeft: "70px",
      marginTop: "-30px",
    },
    bookTitle: {
      fontSize: "30px",
      fontWeight: "500",
    },
    bookDescription: {
      fontSize: "26px",
      color: "#555",
    },
    bookIcon: {
      fontSize: "36px",
      color: "#9333ea",
      transition: "0.3s ease",
    },
    bookIconHover: {
      color: "#7e22ce",
    },
    pyqSection: {
      marginTop: "40px",
      textAlign: "left",
    },
    pyqHeading: {
      fontSize: "36px",
      fontWeight: "500",
      marginBottom: "20px",
    },
    pyqGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "15px",
      justifyContent: "center",
      marginTop: "20px",
    },
    pyqImage: {
      width: "100%",
      borderRadius: "10px",
      height: "200px",
      cursor:"pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Recommended Books for You</h1>
      <div style={styles.booksList}>
        {books.map((book, index) => (
          <div key={index} style={styles.bookCard}>
            <img src={book.image} alt={book.title} style={styles.bookImage} />
            <div style={styles.bookDetails}>
              <h2 style={styles.bookTitle}>{book.title}</h2>
              <p style={styles.bookDescription}>{book.description}</p>
            </div>
            <i
              className="fas fa-arrow-circle-right"
              style={styles.bookIcon}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = styles.bookIconHover.color)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = styles.bookIcon.color)
              }
            ></i>
          </div>
        ))}
      </div>

      {/* PYQ Section with Four Images */}
      <div style={styles.pyqSection}>
        <h2 style={styles.pyqHeading}>Some PYQ's just for you</h2>
        <div style={styles.pyqGrid}>
          {pyqImages.map((image, index) => (
            <img key={index} src={image} alt={`PYQ ${index + 1}`} style={styles.pyqImage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedBooks;
