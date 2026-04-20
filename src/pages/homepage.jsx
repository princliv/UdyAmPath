import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import bgImage1 from "../assets/homebg1.png";
import NewFeature from "../components/homepage/newFeature";
import Popular from "../components/homepage/popular";
import HomeTool from "../components/homepage/hometool";
import Event from "../components/homepage/event";
import { useMediaQuery } from "react-responsive";
import FaqPage from "../components/homepage/FaqPage";
import Works from "../components/homepage/howitworks";
import PageTransition from "../components/shared/PageTransition";
import AnimatedSection from "../components/shared/AnimatedSection";
import GlassCard from "../components/shared/GlassCard";

const Homepage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <PageTransition>
      <div style={styles.container}>
        {/* Hero Section with Gradient Background */}
        <div style={{ ...styles.heroSection, ...(isMobile ? styles.heroSectionMobile : {}) }}>
          <div style={{ ...styles.contentWrapper, ...(isMobile ? styles.contentWrapperMobile : {}) }}>
            {/* Left Section - Hero Text */}
            <div style={{ ...styles.leftSection, ...(isMobile ? styles.leftSectionMobile : {}) }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 style={styles.heroHeading}>
                  Your Complete<br />Career Companion
                </h1>
              </motion.div>

              <motion.p
                style={{ ...styles.description, ...(isMobile ? styles.descriptionMobile : {}) }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                A complete solution for learning, time management, mental wellness, and career growth.
              </motion.p>

              <motion.div
                style={{ ...styles.buttonContainer, ...(isMobile ? styles.buttonContainerMobile : {}) }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <button style={styles.seeMoreBtn}>See More</button>
                <button 
                  style={styles.exploreBtn} 
                  onClick={() => navigate("/recruiter")}
                >
                  Hire Talent
                </button>
              </motion.div>
            </div>

            {/* Right Section - Feature Cards */}
            <div style={{ ...styles.rightSection, ...(isMobile ? styles.rightSectionMobile : styles.rightSectionDesktop) }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={isMobile ? undefined : styles.desktopCardSlotA}
              >
                <Link to="/jobpage" style={{ textDecoration: "none" }}>
                  <GlassCard
                    style={{
                      ...styles.featureCardContent,
                      ...(isMobile ? styles.featureCardMobile : styles.featureCardDesktopSquare),
                    }}
                  >
                    <div style={{ ...styles.cardBackgroundImage, backgroundImage: `url(${home1})` }} />
                    <div style={styles.cardBackgroundOverlay} />
                    <div style={styles.cardForeground}>
                      <div style={styles.cardIconSection}>
                        <div style={{ ...styles.cardIcon, backgroundColor: "#9be6c1" }}>💼</div>
                        <div>
                          <h3 style={styles.cardTitle}>Jobs and Internships</h3>
                          <p style={styles.cardSubtitle}>Explore and Achieve</p>
                        </div>
                      </div>
                      <p style={styles.cardTagline}>Open roles, internships, and fresh opportunities.</p>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={isMobile ? undefined : styles.desktopCardSlotB}
              >
                <Link to="/coursepage" style={{ textDecoration: "none" }}>
                  <GlassCard
                    style={{
                      ...styles.featureCardContent,
                      ...(isMobile ? styles.featureCardMobile : styles.featureCardDesktopSquare),
                    }}
                  >
                    <div style={{ ...styles.cardBackgroundImage, backgroundImage: `url(${home2})` }} />
                    <div style={styles.cardBackgroundOverlay} />
                    <div style={styles.cardForeground}>
                      <div style={styles.cardIconSection}>
                        <div style={{ ...styles.cardIcon, backgroundColor: "#c8bbff" }}>📚</div>
                        <div>
                          <h3 style={styles.cardTitle}>Courses</h3>
                          <p style={styles.cardSubtitle}>Refine Your Knowledge</p>
                        </div>
                      </div>
                      <p style={styles.cardTagline}>Structured learning paths to master in-demand skills.</p>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={isMobile ? undefined : styles.desktopCardSlotC}
              >
                <Link to="/toolspage" style={{ textDecoration: "none" }}>
                  <GlassCard
                    style={{
                      ...styles.featureCardContent,
                      ...(isMobile ? styles.featureCardMobile : styles.featureCardDesktopWide),
                    }}
                  >
                    <div style={{ ...styles.cardBackgroundImage, backgroundImage: `url(${home3})` }} />
                    <div style={styles.cardBackgroundOverlay} />
                    <div style={styles.cardForeground}>
                      <div style={styles.cardIconSection}>
                        <div style={{ ...styles.cardIcon, backgroundColor: "#fed7aa" }}>⚡</div>
                        <div>
                          <h3 style={styles.cardTitle}>Productivity Tools</h3>
                          <p style={styles.cardSubtitle}>Enjoy and Explore</p>
                        </div>
                      </div>
                      <p style={styles.cardTagline}>Practice tests, simulators, and tools to stay ahead.</p>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div style={styles.sectionDivider} />

        {/* Additional Sections with Animations */}
        <AnimatedSection direction="up">
          <NewFeature />
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <Popular />
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.4}>
          <HomeTool />
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.6}>
          <Works />
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.8}>
          <Event />
        </AnimatedSection>

        <AnimatedSection direction="up" delay={1}>
          <FaqPage />
        </AnimatedSection>
      </div>
    </PageTransition>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  heroSection: {
    width: "100%",
    background: "var(--home-gradient)",
    padding: "60px 40px",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroSectionMobile: {
    padding: "40px 20px",
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1200px",
    gap: "40px",
  },
  contentWrapperMobile: {
    flexDirection: "column",
    gap: "28px",
  },
  leftSection: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#ffffff",
    paddingRight: "40px",
  },
  leftSectionMobile: {
    paddingRight: "0",
  },
  heroHeading: {
    fontSize: "48px",
    fontWeight: 800,
    lineHeight: "1.2",
    marginBottom: "20px",
    color: "#ffffff",
  },
  description: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "1.6",
    maxWidth: "500px",
    marginBottom: "30px",
    color: "rgba(255, 255, 255, 0.9)",
  },
  descriptionMobile: {
    fontSize: "16px",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  buttonContainerMobile: {
    flexWrap: "wrap",
  },
  seeMoreBtn: {
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    borderRadius: "var(--radius-md)",
    transition: "all var(--transition-base)",
  },
  exploreBtn: {
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "var(--radius-md)",
    transition: "all var(--transition-base)",
  },
  rightSection: {
    flex: 1,
    gap: "20px",
  },
  rightSectionDesktop: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "20px",
    width: "min(44vw, 520px)",
    aspectRatio: "1 / 1",
  },
  rightSectionMobile: {
    display: "flex",
    flexDirection: "column",
  },
  desktopCardSlotA: {
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
    width: "100%",
    height: "100%",
  },
  desktopCardSlotB: {
    gridColumn: "2 / 3",
    gridRow: "1 / 2",
    width: "100%",
    height: "100%",
  },
  desktopCardSlotC: {
    gridColumn: "1 / 3",
    gridRow: "2 / 3",
    width: "100%",
    height: "100%",
  },
  featureCardContent: {
    position: "relative",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    justifyContent: "space-between",
  },
  featureCardDesktopSquare: {
    width: "100%",
    height: "100%",
    minHeight: "0",
    aspectRatio: "1 / 1",
  },
  featureCardDesktopWide: {
    width: "100%",
    height: "100%",
    minHeight: "0",
  },
  featureCardMobile: {
    minHeight: "250px",
  },
  cardBackgroundImage: {
    position: "absolute",
    inset: "0",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.6,
    transform: "scale(1.03)",
  },
  cardBackgroundOverlay: {
    position: "absolute",
    inset: "0",
    background: "linear-gradient(180deg, rgba(10, 20, 56, 0.28) 0%, rgba(10, 20, 56, 0.74) 100%)",
  },
  cardForeground: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "10px",
  },
  cardIconSection: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  cardIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: 600,
    margin: "0 0 4px 0",
    color: "#ffffff",
  },
  cardSubtitle: {
    fontSize: "13px",
    fontWeight: 400,
    margin: "0",
    color: "rgba(255, 255, 255, 0.9)",
  },
  cardTagline: {
    margin: "0",
    fontSize: "13px",
    lineHeight: "1.5",
    color: "rgba(255, 255, 255, 0.92)",
    maxWidth: "90%",
  },
  sectionDivider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#f0f0f0",
  },
};

export default Homepage;
