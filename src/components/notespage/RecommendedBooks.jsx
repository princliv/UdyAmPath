import React, { forwardRef } from "react";
import bookImage from "../../assets/com.avif";

const RecommendedBooks = forwardRef((props, ref) => {
  const books = [
    {
      title: "Software Engineering",
      description:
        "Offers a comprehensive study of the software development lifecycle, methodologies, and best practices.",
      image: bookImage,
      pdfLink: "https://drive.google.com/file/d/1zbCsmBUSaHp0VTU8gR3gpmCQNUS5hRCE/view?usp=sharing" // Replace with your actual Google Drive link
    },
    {
      title: "Artificial Intelligence",
      description:
        "Provides a thorough introduction to the fundamental concepts, methodologies, and advanced techniques.",
      image: bookImage,
      pdfLink: "https://drive.google.com/file/d/1tXqR8GsoTMECGLP23aQBoDYIoXMJFges/view?usp=sharing" // Replace with your actual Google Drive link
    },
  ];

  const handleBookOpen = (pdfLink) => {
    window.open(pdfLink, '_blank', 'noopener,noreferrer');
  };

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
      background: "#FFEBCC",
      padding: "25px",
      borderRadius: "12px",
      transition: "0.3s ease",
      cursor: "pointer",
      width: "98%",
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
      color: "#FFD580",
      transition: "0.3s ease",
    },
    bookIconHover: {
      color: "#FFA733",
    },
  };

  return (
    <div ref={ref} style={styles.container}>
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
              onClick={() => handleBookOpen(book.pdfLink)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
});

export default RecommendedBooks;