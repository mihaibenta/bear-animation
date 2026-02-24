import React, { useState } from "react";
import HandOverEyesAnimation from "./HandOverEyesAnimation";
import KneeBendAnimation from "./KneeBendAnimation";
import LaterHandAnimation from "./LateralHandAnimation";
import FullHandAnimation from "./FullHandAnimation";
import KneeRaiseAnimation from "./KneeRaiseAnimation";
import StageLighting from "./StageLighting";

export default function App() {
  const [animation, setAnimation] = useState("hands");

  return (
    <>
      {/* Buttons */}
      <div style={buttonRow}>
        <button
          style={button}
          onClick={() => setAnimation("hands")}
        >
          Hand Over Eyes
        </button>

        <button
          style={button}
          onClick={() => setAnimation("lateral-raise")}
        >
          Later raise
        </button>
         <button
          style={button}
          onClick={() => setAnimation("full-raise")}
        >
          Full raise
        </button>
         <button
          style={button}
          onClick={() => setAnimation("knees")}
        >
          Knee Bend
        </button>
        <button
          style={button}
          onClick={() => setAnimation("knees-raise")}
        >
          Knee Rase
        </button>
      </div>

     <StageLighting>
  {animation === "hands" && <HandOverEyesAnimation />}
  {animation === "knees" && <KneeBendAnimation />}
  {animation === "knees-raise" && <KneeRaiseAnimation />}
  {animation === "lateral-raise" && <LaterHandAnimation />}
  {animation === "full-raise" && <FullHandAnimation />}
</StageLighting>
    </>
  );
}

/* Buttons only styling */

const buttonRow = {
  position: "fixed",
  top: 20,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: 12,
  zIndex: 1000
};

const button = {
  padding: "8px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: "#e8b98a",
  fontWeight: 600
};