import React, { useEffect, useRef } from "react";

export default function FullHandAnimation() {

  const leftUpper = useRef(null);
  const leftLower = useRef(null);
  const rightUpper = useRef(null);
  const rightLower = useRef(null);
  const tail = useRef(null);
  const leftUpperLeg = useRef(null);
  const leftLowerLeg = useRef(null);
  const rightUpperLeg = useRef(null);
  const rightLowerLeg = useRef(null);

  useEffect(() => {

    let t = 0;
    let frame;

    const animate = () => {

      t += 0.02;

      const progress = (Math.sin(t) + 1) / 2;
      const eased = progress * progress * (3 - 2 * progress);

      // 0° → 90° lateral raise
      const minAngle = 20;   // slight resting lift
        const maxAngle = 180;   // full lateral raise
        const shoulderAngle = minAngle + eased * (maxAngle - minAngle);

      leftUpper.current.style.transform = `rotate(${shoulderAngle}deg)`;
      rightUpper.current.style.transform = `rotate(${-shoulderAngle}deg)`;

      // keep elbows straight
      leftLower.current.style.transform = `rotate(0deg)`;
      rightLower.current.style.transform = `rotate(0deg)`;

      const tailAngle = Math.sin(t * 1.2) * 18;
      tail.current.style.transform = `rotate(${tailAngle}deg)`;

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);

  }, []);

  return (
    <div style={container}>
      <div style={stage}>
        <div style={scaleWrapper}>
          <div style={scaleContainer}>
            <div style={cat}>

              <div ref={tail} style={tailStyle}/>

              <div style={earLeft}><div style={earInner}/></div>
              <div style={earRight}><div style={earInner}/></div>

              <div style={head}>
                <div style={eye}/>
                <div style={eye}/>
                <div style={muzzle}>
                  <div style={nose}/>
                  <div style={whiskerGroupLeft}>
                    <div style={whisker}/>
                    <div style={whisker}/>
                    <div style={whisker}/>
                  </div>
                  <div style={whiskerGroupRight}>
                    <div style={whisker}/>
                    <div style={whisker}/>
                    <div style={whisker}/>
                  </div>
                </div>
              </div>

              <div style={torso}/>
              <div style={chest}/>

              <div ref={leftUpper} style={upperArmLeft}>
                <div ref={leftLower} style={lowerArm}>
                  <div style={paw}/>
                </div>
              </div>

              <div ref={rightUpper} style={upperArmRight}>
                <div ref={rightLower} style={lowerArm}>
                  <div style={paw}/>
                </div>
              </div>

              <div ref={leftUpperLeg} style={upperLegLeft}>
                <div style={knee}/>
                <div ref={leftLowerLeg} style={lowerLeg}>
                  <div style={rearPaw}>
                    <div style={rearClaw}/>
                    <div style={rearClaw}/>
                    <div style={rearClaw}/>
                  </div>
                </div>
              </div>

              <div ref={rightUpperLeg} style={upperLegRight}>
                <div style={knee}/>
                <div ref={rightLowerLeg} style={lowerLeg}>
                  <div style={rearPaw}>
                    <div style={rearClaw}/>
                    <div style={rearClaw}/>
                    <div style={rearClaw}/>
                  </div>
                </div>
              </div>

            </div>

            <div style={shadow}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

};

const stage = {
  width: 420,
  height: 660,
  borderRadius: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const scaleWrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
};

const scaleContainer = {
  transform: "scale(1.5)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const cat = { position: "relative", width: 170, height: 290 };

/* HEAD */

const head = {
  position: "absolute",
  top: 0, left: 28,
  width: 115, height: 100,
  background: "linear-gradient(145deg,#c07a3a,#8a4f1d)",
  borderRadius: "55% 55% 50% 50% / 60% 60% 45% 45%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 18,
  boxShadow: "inset 0 -6px 12px rgba(0,0,0,0.25)"
};

const muzzle = { position: "absolute", bottom: 12, width: 42, height: 26, background: "#e8b98a", borderRadius: "50% 50% 45% 45%" };
const nose = { position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 12, height: 8, background: "#d67a7a", borderRadius: 6 };
const eye = { width: 14, height: 18, background: "linear-gradient(#222,#000)", borderRadius: 8 };
const earLeft = { position: "absolute", top: -22, left: 35, width: 40, height: 50, background: "linear-gradient(145deg,#c07a3a,#8a4f1d)", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" };
const earRight = { position: "absolute", top: -24, right: 35, width: 40, height: 50, background: "linear-gradient(145deg,#c07a3a,#8a4f1d)", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" };
const earInner = { position: "absolute", top: 12, left: 10, width: 20, height: 25, background: "#e8b98a", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" };

/* BODY */

const torso = { position: "absolute", top: 90, left: 38, zIndex: 2, width: 95, height: 140, background: "linear-gradient(145deg,#b9682c,#6b3a14)", borderRadius: "45% 45% 35% 35%" };
const chest = { position: "absolute", top: 100, left: 55, zIndex:3, width: 60, height: 110, background: "#e8b98a", borderRadius: 40 };

/* ARMS */

const upperArmLeft = { position: "absolute", top: 120, left: 50, width: 18, height: 70, background: "linear-gradient(#b9682c,#6b3a14)", borderRadius: 20, transformOrigin: "top center", transform: "rotate(0deg)" };
const upperArmRight = { position: "absolute", top: 120, right: 50, width: 18, height: 70, background: "linear-gradient(#b9682c,#6b3a14)", borderRadius: 20, transformOrigin: "top center", transform: "rotate(0deg)" };
const lowerArm = { position: "absolute", top: 70, left: 0, width: 18, height: 50, background: "linear-gradient(#b9682c,#6b3a14)", borderRadius: 20, transformOrigin: "top center", transform: "rotate(0deg)" };
const paw = { position: "absolute", bottom: -6, width: 28, height: 22, background: "#e8b98a", borderRadius: 14 };

/* LEGS */

const upperLegLeft = { position: "absolute", bottom: 0, left: 50, width: 24, height: 70, background: "linear-gradient(#6b3a14,#3e210d)", borderRadius: 20 };
const upperLegRight = { position: "absolute", bottom: 0, right: 50, width: 24, height: 70, background: "linear-gradient(#6b3a14,#3e210d)", borderRadius: 20 };
const knee = { position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", width: 18, height: 18, background: "#e8b98a", borderRadius: "50%", zIndex: 3 };
const lowerLeg = { position: "relative", top: "100%", width: 24, height: 45, background: "linear-gradient(#6b3a14,#3e210d)", borderRadius: 20 };
const rearPaw = { position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 30, height: 18, background: "#e8b98a", borderRadius: 12, display: "flex", justifyContent: "center", alignItems: "center", gap: 4 };
const rearClaw = { width: 4, height: 6, background: "#dcdcdc", borderRadius: 2 };

/* WHISKERS */

const whiskerGroupLeft = { position: "absolute", left: -32, top: 4, display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" };
const whiskerGroupRight = { position: "absolute", right: -32, top: 4, display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end", transform: "scaleX(-1)" };
const whisker = { width: 40, height: 1.5, background: "linear-gradient(to right, #f5f5f5, #cfcfcf)", borderRadius: "50%", opacity: 0.55 };

/* TAIL & SHADOW */

const tailStyle = { position: "absolute", bottom: 70, left: 100, width: 22, height: 135, background: "linear-gradient(180deg,#c07a3a 0%,#a5622a 40%,#8a4f1d 75%,#5a2f10 100%)", borderRadius: 18, transformOrigin: "bottom center", zIndex: -1 };
const shadow = {
  position: "absolute",
  bottom: -60,
  left: "50%",
  transform: "translateX(-50%)",
  width: 150,
  height: 28,
  zIndex: -1,
  background: `
    radial-gradient(
      ellipse at center,
      rgba(0,0,0,0.45) 0%,
      rgba(0,0,0,0.30) 35%,
      rgba(0,0,0,0.15) 60%,
      rgba(0,0,0,0.05) 75%,
      transparent 85%
    )
  `,
  borderRadius: "50%",
  filter: "blur(4px)",
  willChange: "transform"
};