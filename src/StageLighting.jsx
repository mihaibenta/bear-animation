import React from "react";

export default function StageLighting({ children }) {
  return (
    <div style={stageWrapper}>
      {/* Top Light Beam */}
      <div style={lightBeam} />

      {/* Ambient Glow */}
      <div style={ambientGlow} />

      {/* Content */}
      <div style={content}>
        {children}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const stageWrapper = {
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundImage: `
    radial-gradient(
      ellipse at top center,
      rgba(255,255,220,0.25) 0%,
      rgba(255,255,200,0.15) 20%,
      rgba(0,0,0,0.25) 55%,
      rgba(0,0,0,0.6) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(0,0,0,0.3) 0%,
      rgba(0,0,0,0.5) 60%,
      rgba(0,0,0,0.75) 100%
    ),
    url("/your-image.jpg")
  `,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

/* Main spotlight cone */
const lightBeam = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "500px",
  height: "100%",
  pointerEvents: "none",
  zIndex: 1,

  background: `
    radial-gradient(
      ellipse at top center,
      rgba(255,255,235,0.75) 0%,
      rgba(255,255,220,0.55) 12%,
      rgba(255,255,200,0.35) 28%,
      rgba(255,255,180,0.18) 45%,
      rgba(255,255,160,0.08) 60%,
      transparent 75%
    )
  `,

  filter: "blur(8px)",
};

/* Soft ambient glow around subject */
const ambientGlow = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "40%",
  background: `
    linear-gradient(
      to top,
      rgba(255,255,220,0.18) 0%,
      rgba(255,255,220,0.12) 20%,
      rgba(255,255,220,0.06) 40%,
      rgba(255,255,220,0.02) 60%,
      transparent 80%
    )
  `,
  pointerEvents: "none",
  zIndex: 1,
};

/* Where animation renders */
const content = {
  position: "relative",
  zIndex: 2,
};