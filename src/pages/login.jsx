import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithGoogle, signInWithEmail } from "../firebase/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import loginLogo from "../assets/footerLogo.png";

const Login = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(auth, googleProvider);
      alert("Google Login Successful");
      onClose(); // Close modal after login
      navigate("/homepage"); 
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Email & Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(auth, email, password);
      alert("Login Successful");
      onClose(); // Close modal after login
      navigate("/homepage");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* 🔹 Close Button */}
        <button style={styles.closeButton} onClick={onClose}>✖</button>

        {/* Left Section (Logo) */} 
        <div style={styles.modalLeft}>
          <img src={loginLogo} alt="Aspiro Logo" style={styles.logo} />
        </div>

        {/* Right Section (Login Form) */}
        <div style={styles.modalRight}>
          <h2>Log in</h2>

          {/* Google & LinkedIn Login */}
          <button style={styles.socialButton} onClick={handleGoogleLogin}>
            <FcGoogle style={styles.icon} /> Continue with Google
          </button>
          <button style={{ ...styles.socialButton, background: "#0077b5", color: "white" }}>
            <FaLinkedin style={styles.icon} /> Login with LinkedIn
          </button>

          <p style={styles.orText}>Or login with email</p>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          {/* Password Input with Eye Toggle */}
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Login Button */}
          <button style={styles.loginButton} onClick={handleEmailLogin}>Login</button>

          {/* Signup Redirect */}
          <p style={styles.signupText}>
            Don't have an account?{" "}
            <button style={styles.signupLink} onClick={() => { onClose(); navigate("/signup"); }}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// 🔹 Inline Styles
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    position: "relative",
    width: "700px",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  modalLeft: {
    width: "40%",
    background: "#1d3480",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  logo: {
    width: "100%",
    maxWidth: "150px",
  },
  modalRight: {
    width: "60%",
    padding: "30px",
    textAlign: "center",
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    background: "white",
    border: "1px solid #ccc",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
  },
  orText: {
    margin: "10px 0",
    fontSize: "14px",
    color: "gray",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "35%",
    cursor: "pointer",
    fontSize: "16px",
    color: "gray",
  },
  loginButton: {
    width: "100%",
    background: "#1d3480",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  signupText: {
    marginTop: "10px",
    fontSize: "14px",
  },
  signupLink: {
    background: "none",
    border: "none",
    color: "#1d3480",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;
