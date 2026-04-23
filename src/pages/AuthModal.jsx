import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "../firebase/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(initialMode === "signup");
  const [userType, setUserType] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsSignup(initialMode === "signup");
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setGender("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate(userType === "recruiter" ? "/recruiter" : "/homepage");
      onClose();
      resetForm();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }

        await signUpWithEmail(
          email,
          password,
          firstName,
          lastName,
          "",
          userType === "recruiter" ? "Recruiter" : "Candidate"
        );
      } else {
        await signInWithEmail(email, password);
      }

      navigate(userType === "recruiter" ? "/recruiter" : "/homepage");
      onClose();
      resetForm();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    ...styles.input,
    ...(isSignup ? styles.inputDense : null),
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(event) => event.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose} aria-label="Close auth modal">
          x
        </button>

        <div style={styles.headerBadge}>{isSignup ? "Create Account" : "Welcome Back"}</div>
        <h2 style={styles.title}>{isSignup ? "Sign up" : "Log in"}</h2>

        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tabButton,
              ...(userType === "candidate" ? styles.tabButtonActive : null),
            }}
            onClick={() => setUserType("candidate")}
            type="button"
          >
            Candidate
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(userType === "recruiter" ? styles.tabButtonActive : null),
            }}
            onClick={() => setUserType("recruiter")}
            type="button"
          >
            Recruiter
          </button>
        </div>

        <button style={styles.socialButton} onClick={handleGoogleLogin} disabled={loading} type="button">
          <FcGoogle style={styles.icon} /> Continue with Google
        </button>

        <button style={{ ...styles.socialButton, ...styles.linkedinButton }} type="button">
          <FaLinkedin style={styles.icon} /> Continue with LinkedIn
        </button>

        <p style={styles.orText}>Or {isSignup ? "sign up" : "log in"} with email</p>

        <form onSubmit={handleAuth}>
          {isSignup && (
            <>
              <div style={styles.row}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={inputStyle}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={styles.genderContainer}>
                <label style={styles.genderOption}>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                </label>
                <label style={styles.genderOption}>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
                <label style={styles.genderOption}>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={gender === "Other"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Other
                </label>
              </div>
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {isSignup && (
            <div style={styles.passwordContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle}
                required
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}

          <button style={styles.authButton} disabled={loading} type="submit">
            {loading ? "Please wait..." : isSignup ? "Create Account" : "Log in"}
          </button>
        </form>

        <p style={styles.switchText}>
          {isSignup ? "Already have an account?" : "New to UdyAmPath?"}
          <button
            style={styles.switchButton}
            onClick={() => setIsSignup(!isSignup)}
            type="button"
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(7, 18, 40, 0.62)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    zIndex: 1600,
  },
  modal: {
    width: "min(92vw, 430px)",
    maxHeight: "92vh",
    overflowY: "auto",
    borderRadius: "18px",
    padding: "22px 18px 18px",
    background: "rgba(255, 255, 255, 0.18)",
    backdropFilter: "blur(22px) saturate(165%)",
    WebkitBackdropFilter: "blur(22px) saturate(165%)",
    border: "1px solid rgba(255, 255, 255, 0.34)",
    boxShadow: "0 18px 45px rgba(0, 0, 0, 0.28)",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "1px solid rgba(255, 255, 255, 0.34)",
    background: "rgba(255, 255, 255, 0.16)",
    color: "#f4faff",
    fontSize: "15px",
    cursor: "pointer",
  },
  headerBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(255, 255, 255, 0.38)",
    background: "rgba(17, 129, 200, 0.24)",
    color: "#e8f6ff",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  title: {
    margin: "0 0 14px",
    color: "#ffffff",
    fontSize: "32px",
    lineHeight: 1.1,
    fontWeight: 800,
  },
  tabContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "12px",
  },
  tabButton: {
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.34)",
    padding: "9px 8px",
    background: "rgba(255, 255, 255, 0.16)",
    color: "#eef8ff",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },
  tabButtonActive: {
    background: "linear-gradient(135deg, #1181c8 0%, #004aad 100%)",
    border: "1px solid rgba(181, 228, 255, 0.9)",
  },
  socialButton: {
    width: "100%",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.92)",
    color: "#09315f",
    padding: "10px 12px",
    marginBottom: "8px",
    fontWeight: 600,
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  linkedinButton: {
    background: "linear-gradient(135deg, #0077b5 0%, #0a66c2 100%)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.22)",
  },
  icon: {
    marginRight: "8px",
    fontSize: "16px",
  },
  orText: {
    margin: "10px 0",
    fontSize: "13px",
    color: "rgba(238, 248, 255, 0.9)",
    textAlign: "center",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },
  input: {
    width: "100%",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.38)",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "10px 11px",
    marginBottom: "10px",
    fontSize: "13px",
    color: "#102a43",
  },
  inputDense: {
    marginBottom: "8px",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "30%",
    color: "#4b5d73",
    fontSize: "14px",
    cursor: "pointer",
  },
  genderContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "8px",
    color: "#eef8ff",
    fontSize: "12px",
  },
  genderOption: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  authButton: {
    width: "100%",
    border: "none",
    borderRadius: "10px",
    padding: "11px",
    color: "#ffffff",
    background: "linear-gradient(135deg, #1181c8 0%, #004aad 100%)",
    boxShadow: "0 12px 24px rgba(17, 129, 200, 0.35)",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "2px",
  },
  switchText: {
    margin: "10px 0 0",
    color: "rgba(238, 248, 255, 0.9)",
    fontSize: "13px",
    textAlign: "center",
  },
  switchButton: {
    marginLeft: "8px",
    background: "none",
    border: "none",
    color: "#d4ecff",
    textDecoration: "underline",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default AuthModal;
