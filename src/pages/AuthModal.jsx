import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import { auth, googleProvider, signInWithGoogle, signInWithEmail } from "../firebase/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // Toggle Login/Signup
  const [userType, setUserType] = useState("candidate"); // Toggle Candidate/Recruiter
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  if (!isOpen) return null; // Don't render if modal is closed
  
  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(auth, googleProvider);
      navigate(userType === "recruiter" ? "/recruiter" : "/homepage");
      setTimeout(onClose, 500);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };


// Email Login/Signup
const handleAuth = async (e) => {
  e.preventDefault();
  try {
    if (isSignup) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      await auth.createUserWithEmailAndPassword(email, password);
    } else {
      await signInWithEmail(auth, email, password);
    }

    // Redirect based on userType
    const redirectPath = userType === "recruiter" ? "/recruiter" : "/homepage";
    navigate(redirectPath);

    setTimeout(() => onClose(), 500); // Close modal after a slight delay
  } catch (error) {
    alert(error.message);
  }
};
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>✖</button>
        <h2>{isSignup ? "Sign Up" : "Log In"}</h2>

        {/* Tabs: Candidate / Recruiter */}
        <div style={styles.tabContainer}>
          <button
            style={{ ...styles.tabButton, background: userType === "candidate" ? "#1d3480" : "white", color: userType === "candidate" ? "white" : "#1d3480" }}
            onClick={() => setUserType("candidate")}
          >
            Candidate
          </button>
          <button
            style={{ ...styles.tabButton, background: userType === "recruiter" ? "#1d3480" : "white", color: userType === "recruiter" ? "white" : "#1d3480" }}
            onClick={() => setUserType("recruiter")}
          >
            Recruiter
          </button>
        </div>

        {/* Google & LinkedIn Login */}
        <button style={styles.socialButton} onClick={handleGoogleLogin}>
          <FcGoogle style={styles.icon} /> Continue with Google
        </button>
        <button style={{ ...styles.socialButton, background: "#0077b5", color: "white" }}>
          <FaLinkedin style={styles.icon} /> Login with LinkedIn
        </button>

        <p style={styles.orText}>Or {isSignup ? "sign up" : "log in"} with email</p>

        {isSignup && (
          <>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} />

            <div style={styles.genderContainer}>
              <label>
                <input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
                Female
              </label>
              <label>
                <input type="radio" name="gender" value="Other" checked={gender === "Other"} onChange={(e) => setGender(e.target.value)} />
                Other
              </label>
            </div>
          </>
        )}

        <input type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <div style={styles.passwordContainer}>
          <input type={showPassword ? "text" : "password"} placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {isSignup && (
          <div style={styles.passwordContainer}>
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}

        <button style={styles.authButton} onClick={handleAuth}>{isSignup ? "Sign Up" : "Log In"}</button>

        <p style={styles.switchText}>
          {isSignup ? "Already have an account?" : "Don't have an account?"} 
          <button style={styles.switchButton} onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

// 🔹 Styles
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modal: { background: "white", padding: "30px", borderRadius: "10px", width: "350px", textAlign: "center", position: "relative" },
  closeButton: { position: "absolute", top: "10px", right: "15px", border: "none", background: "none", fontSize: "18px", cursor: "pointer" },
  tabContainer: { display: "flex", justifyContent: "center", marginBottom: "10px" },
  tabButton: { padding: "10px", flex: 1, border: "1px solid #1d3480", cursor: "pointer", fontSize: "14px", fontWeight: "bold" },
  socialButton: { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", fontSize: "14px", cursor: "pointer", background: "white", border: "1px solid #ccc" },
  icon: { marginRight: "10px", fontSize: "18px" },
  orText: { margin: "10px 0", fontSize: "14px", color: "gray" },
  input: { width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "14px" },
  passwordContainer: { position: "relative" },
  eyeIcon: { position: "absolute", right: "10px", top: "35%", cursor: "pointer", fontSize: "16px", color: "gray" },
  authButton: { width: "100%", background: "#1d3480", color: "white", padding: "10px", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer" },
};

export default AuthModal;
