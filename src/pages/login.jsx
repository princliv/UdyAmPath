import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { signInWithGoogle, signInWithEmail } from "../firebase/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import loginLogo from "../assets/footerLogo.png";

const Login = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isModalMode = typeof isOpen === "boolean";
  const isCompact = useMediaQuery({ maxWidth: 860 });

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      alert("Google Login Successful");
      if (typeof onClose === "function") {
        onClose();
      }
      navigate("/homepage");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      alert("Login Successful");
      if (typeof onClose === "function") {
        onClose();
      }
      navigate("/homepage");
    } catch (error) {
      alert(error.message);
    }
  };

  if (isModalMode && !isOpen) return null;

  return (
    <div style={styles.pageShell}>
      <div style={styles.bgGlowTop} />
      <div style={styles.bgGlowBottom} />

      <div style={{ ...styles.panel, ...(isCompact ? styles.panelCompact : {}) }}>
        {typeof onClose === "function" && (
          <button style={styles.closeButton} onClick={onClose} aria-label="Close login">
            x
          </button>
        )}

        <div style={{ ...styles.brandPane, ...(isCompact ? styles.brandPaneCompact : {}) }}>
          <div style={styles.brandBadge}>Welcome Back</div>
          <img src={loginLogo} alt="Aspiro Logo" style={styles.logo} />
          <p style={{ ...styles.brandText, ...(isCompact ? styles.brandTextCompact : {}) }}>
            Continue your journey with focused learning, tools, and opportunities built for modern careers.
          </p>
        </div>

        <div style={{ ...styles.formPane, ...(isCompact ? styles.formPaneCompact : {}) }}>
          <h2 style={{ ...styles.heading, ...(isCompact ? styles.headingCompact : {}) }}>Log in</h2>
          <p style={{ ...styles.subHeading, ...(isCompact ? styles.subHeadingCompact : {}) }}>Access your UdyAmPath workspace</p>

          <button style={styles.socialButton} onClick={handleGoogleLogin}>
            <FcGoogle style={styles.icon} /> Continue with Google
          </button>
          <button style={{ ...styles.socialButton, ...styles.linkedinButton }}>
            <FaLinkedin style={styles.icon} /> Login with LinkedIn
          </button>

          <p style={styles.orText}>Or login with email</p>

          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

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

          <button style={styles.loginButton} onClick={handleEmailLogin}>Login</button>

          <p style={styles.signupText}>
            Don&apos;t have an account?{" "}
            <button
              style={styles.signupLink}
              onClick={() => {
                if (typeof onClose === "function") {
                  onClose();
                }
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageShell: {
    minHeight: "100vh",
    width: "100%",
    background: "var(--home-gradient)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "28px 16px",
    position: "relative",
    overflow: "hidden",
  },

  bgGlowTop: {
    position: "absolute",
    top: "-120px",
    left: "-80px",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
    pointerEvents: "none",
  },

  bgGlowBottom: {
    position: "absolute",
    bottom: "-160px",
    right: "-70px",
    width: "340px",
    height: "340px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(156,220,255,0.32) 0%, rgba(156,220,255,0) 72%)",
    pointerEvents: "none",
  },

  panel: {
    display: "flex",
    position: "relative",
    width: "min(980px, 100%)",
    background: "rgba(255, 255, 255, 0.16)",
    backdropFilter: "blur(20px) saturate(170%)",
    WebkitBackdropFilter: "blur(20px) saturate(170%)",
    border: "1px solid rgba(255, 255, 255, 0.28)",
    borderRadius: "20px",
    boxShadow: "0 22px 50px rgba(2, 14, 36, 0.34)",
    overflow: "hidden",
    flexDirection: "row",
  },

  panelCompact: {
    flexDirection: "column",
    maxWidth: "520px",
  },

  closeButton: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "rgba(255, 255, 255, 0.16)",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    color: "#f6fbff",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    fontSize: "16px",
    lineHeight: 1,
    cursor: "pointer",
  },

  brandPane: {
    width: "42%",
    background: "linear-gradient(160deg, rgba(0, 74, 173, 0.65) 0%, rgba(17, 129, 200, 0.58) 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "34px 26px",
    color: "#f6fbff",
    borderRight: "1px solid rgba(255, 255, 255, 0.18)",
  },

  brandPaneCompact: {
    width: "100%",
    borderRight: "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    textAlign: "center",
    padding: "24px 20px",
  },

  brandBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    background: "rgba(255, 255, 255, 0.18)",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "16px",
  },

  logo: {
    width: "min(100%, 230px)",
    height: "auto",
    marginBottom: "14px",
  },

  brandText: {
    fontSize: "14px",
    lineHeight: 1.7,
    color: "rgba(248, 253, 255, 0.92)",
    maxWidth: "34ch",
    margin: 0,
  },

  brandTextCompact: {
    maxWidth: "100%",
  },

  formPane: {
    width: "58%",
    padding: "38px 28px 32px",
    background: "rgba(255, 255, 255, 0.12)",
  },

  formPaneCompact: {
    width: "100%",
    padding: "26px 18px 22px",
  },

  heading: {
    margin: 0,
    fontSize: "clamp(28px, 4vw, 38px)",
    lineHeight: 1.1,
    color: "#ffffff",
    fontWeight: 800,
  },

  headingCompact: {
    fontSize: "32px",
  },

  subHeading: {
    marginTop: "8px",
    marginBottom: "18px",
    color: "rgba(240, 248, 255, 0.92)",
    fontSize: "14px",
  },

  subHeadingCompact: {
    marginBottom: "16px",
  },

  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "11px 12px",
    marginBottom: "10px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.92)",
    border: "1px solid rgba(255, 255, 255, 0.75)",
    color: "#062346",
  },

  linkedinButton: {
    background: "linear-gradient(135deg, #0077b5 0%, #0a66c2 100%)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },

  icon: {
    marginRight: "10px",
    fontSize: "18px",
  },

  orText: {
    margin: "12px 0",
    fontSize: "14px",
    color: "rgba(240, 248, 255, 0.84)",
  },

  input: {
    width: "100%",
    padding: "11px 12px",
    marginBottom: "12px",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    background: "rgba(255, 255, 255, 0.86)",
    color: "#102a43",
    borderRadius: "12px",
    fontSize: "14px",
  },

  passwordContainer: {
    position: "relative",
  },

  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "32%",
    cursor: "pointer",
    fontSize: "16px",
    color: "#475569",
  },

  loginButton: {
    width: "100%",
    background: "linear-gradient(135deg, #1181c8 0%, #004aad 100%)",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 12px 24px rgba(17, 129, 200, 0.35)",
  },

  signupText: {
    marginTop: "12px",
    fontSize: "14px",
    color: "rgba(240, 248, 255, 0.9)",
  },

  signupLink: {
    background: "none",
    border: "none",
    color: "#d9eeff",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};

export default Login;
