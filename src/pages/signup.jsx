import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import signupLogo from "../assets/footerLogo.png";

const Signup = ({ onClose }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("Candidate");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user info in Firebase Database
      await set(ref(database, "users/" + user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        userType: userType,
      });

      alert("Signup Successful");

      // Close the modal and navigate to respective page
      onClose();  
      navigate(userType === "Recruiter" ? "/recruiter" : "/homepage");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.container}>
          {/* Close Button */}
          <button onClick={onClose} style={styles.closeButton}>&times;</button>

          <div style={styles.formContainer}>
            <h2>Sign up</h2>
            <div style={styles.switchButtons}>
              <button
                style={{
                  ...styles.switchButton,
                  backgroundColor: userType === "Candidate" ? "#196795" : "#fff",
                  color: userType === "Candidate" ? "#fff" : "#196795",
                }}
                onClick={() => setUserType("Candidate")}
              >
                As Candidate
              </button>
              <button
                style={{
                  ...styles.switchButton,
                  backgroundColor: userType === "Recruiter" ? "#196795" : "#fff",
                  color: userType === "Recruiter" ? "#fff" : "#196795",
                }}
                onClick={() => setUserType("Recruiter")}
              >
                As Recruiter
              </button>
            </div>

            <form onSubmit={handleSignup}>
              <div style={styles.row}>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={styles.input} />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={styles.input} />
              </div>
              <input type="email" name="email" placeholder="Email Id" value={formData.email} onChange={handleChange} required style={styles.input} />
              <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} required style={styles.input} />
              
              <div style={styles.genderContainer}>
                <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
                <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
                <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> More Options</label>
              </div>

              <div style={styles.row}>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.input} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={styles.input} />
              </div>

              <button type="submit" style={styles.signupButton}>Signup</button>
            </form>

            <p>
              Already have an account?{" "}
              <span style={styles.link} onClick={() => { onClose(); navigate("/login"); }}>
                Login
              </span>
            </p>
          </div>

          <div style={styles.imageContainer}>
            <img src={signupLogo} alt="Signup Logo" style={styles.logo} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    width: "700px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  container: {
    display: "flex",
    width: "100%",
  },
  formContainer: {
    flex: 1,
    padding: "30px",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#196795",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "150px",
    height: "auto",
  },
  switchButtons: {
    display: "flex",
    marginBottom: "20px",
  },
  switchButton: {
    flex: 1,
    padding: "10px",
    border: "1px solid #196795",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  genderContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  signupButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#196795",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  link: {
    color: "#196795",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Signup;
