import React from "react";

/**
 * EXCLUSIVE - E-commerce Loading Animation
 * Colors: White (#FFFFFF) background + Brand Red (#DB4444)
 *
 * Usage:
 *   import LoadingAnimation from "./LoadingAnimation";
 *   <LoadingAnimation />
 */
const LoadingAnimation = () => {
  return (
    <div data-loading-overlay="true" style={styles.wrapper}>
      <div style={styles.content}>
        {/* Logo Text */}
        <h1 style={styles.logo}>
          EXCLUSIVE
        </h1>

        {/* Spinner made of bouncing/pulsing dots */}
        <div style={styles.dotsContainer}>
          <span style={{ ...styles.dot, animationDelay: "0s" }} />
          <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
          <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
        </div>

        {/* Ring loader under the dots */}
        <div style={styles.ring}></div>

        <p style={styles.subtitle}>Loading your shopping experience...</p>
      </div>

      {/* Keyframes injected via style tag since this is a plain JS style object approach */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeIn 0.6s ease-out",
  },
  logo: {
    fontSize: "2.2rem",
    fontWeight: 700,
    letterSpacing: "2px",
    color: "#DB4444",
    marginBottom: "24px",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },
  ring: {
    width: "48px",
    height: "48px",
    border: "4px solid #F5C6C6",
    borderTop: "4px solid #DB4444",
    borderRadius: "50%",
    animation: "spin 0.9s linear infinite",
    marginTop: "18px",
  },
  dotsContainer: {
    display: "flex",
    gap: "10px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#DB4444",
    display: "inline-block",
    animation: "bounce 1.2s infinite ease-in-out",
  },
  subtitle: {
    marginTop: "20px",
    fontSize: "0.85rem",
    color: "#7d7d7d",
    fontFamily: "'Segoe UI', sans-serif",
  },
};

export default LoadingAnimation;