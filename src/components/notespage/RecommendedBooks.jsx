import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { default as pyq1, default as pyq3 } from "../../assets/amcat.jpg";
import { default as pyq2, default as pyq4 } from "../../assets/cocube.jpg";
import bookImage from "../../assets/com.avif";

const RecommendedBooks = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePyqClick = () => {
    navigate("/pyqs");
  };

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
    pyqSection: {
      marginTop: "40px",
      textAlign: "left",
      cursor: "pointer",
    },
    pyqHeading: {
      fontSize: "36px",
      fontWeight: "500",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    viewAll: {
      fontSize: "16px",
      color: "#0A52C6",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "5px",
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
      cursor: "pointer",
    },
    dividerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    },
    line: {
      height: "4px",
      width: "60px",
      backgroundColor: "#E0E6E9",
      borderRadius: "10px",
    },
    centerLine: {
      height: "8px",
      width: "70px",
      backgroundColor: "#0A52C6",
      borderRadius: "10px",
      margin: "0 15px",
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
              onClick={handleOpenModal}
            ></i>
          </div>
        ))}
      </div>

      {/* PYQ Section with Four Images */}
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
});

export default RecommendedBooks;