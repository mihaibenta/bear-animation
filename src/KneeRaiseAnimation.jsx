import React, { useEffect, useRef } from "react";

export default function KneeRaiseAnimation() {
  const catRef = useRef(null);
  const torsoRef = useRef(null);
  const leftUpperLeg = useRef(null);
  const leftLowerLeg = useRef(null);
  const rightUpperLeg = useRef(null);
  const rightLowerLeg = useRef(null);
  const tail = useRef(null);
  const shadowRef = useRef(null);
  const upperArmLeftRef = useRef(null);
    const upperArmRightRef = useRef(null);

 useEffect(() => {
  let t = 0;
  let frame;

  const maxLiftUpperLeg = 25;
  const maxLiftLowerLeg = 40;
  const armLift = 2;

  // Stronger body motion
  const bodyLift = 6;     // increased from 3
  const bodySway = 1;     // new side movement
  const bodyRotate = 1;   // new tilt amount

  // --- ADVANCED BOTTOM PAUSE CURVE ---
  const easeWithBottomPause = (x) => {
    const pauseZone = 0.35;
    const pauseStrength = 0.6;

    if (x < pauseZone) {
      return x * pauseStrength;
    }

    const adjusted = (x - pauseZone) / (1 - pauseZone);
    return pauseZone * pauseStrength + adjusted * (1 - pauseZone * pauseStrength);
  };

  const animate = () => {
    t += 0.04;

    // --- RAW LEG CYCLE ---
    const leftRaw = (Math.sin(t) + 1) / 2;
    const rightRaw = (Math.sin(t + Math.PI) + 1) / 2;

    // --- APPLY BOTTOM PAUSE ---
    const leftEase = easeWithBottomPause(leftRaw);
    const rightEase = easeWithBottomPause(rightRaw);

    // --- LEGS ---
    leftUpperLeg.current.style.transform =
      `translateY(${-maxLiftUpperLeg * leftEase}px)`;

    leftLowerLeg.current.style.transform =
      `translateY(${-maxLiftLowerLeg * leftEase}px)`;

    rightUpperLeg.current.style.transform =
      `translateY(${-maxLiftUpperLeg * rightEase}px)`;

    rightLowerLeg.current.style.transform =
      `translateY(${-maxLiftLowerLeg * rightEase}px)`;

    // --- BODY (MORE OBVIOUS + NATURAL) ---
    const dominantLeg = Math.max(leftEase, rightEase);

    const bodyY = -bodyLift * dominantLeg;
    const sway = (leftEase - rightEase) * bodySway;
    const rotate = (leftEase - rightEase) * bodyRotate;

    catRef.current.style.transform =
      `translateY(${bodyY}px) translateX(${sway}px) rotate(${rotate}deg)`;

    // --- ARMS ---
    const leftArmEase = (Math.sin(t * 1.1) + 1) / 2;
    const rightArmEase = (Math.sin(t * 1.1 + Math.PI) + 1) / 2;

    upperArmLeftRef.current.style.transform =
      `translateY(${-armLift * leftArmEase}px) rotate(15deg)`;

    upperArmRightRef.current.style.transform =
      `translateY(${-armLift * rightArmEase}px) rotate(-15deg)`;

    // --- TAIL ---
    const tailAngle = Math.sin(t * 0.5) * 8;
    tail.current.style.transform =
      `rotate(${tailAngle}deg)`;

    // --- SHADOW ---
    const shadowScale =
      1 - Math.max(leftEase, rightEase) * 0.15; // slightly stronger squash

    shadowRef.current.style.transform =
      `translateX(-50%) scale(${shadowScale})`;

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
            <div ref={catRef} style={cat}>

              {/* tail */}
              <div ref={tail} style={tailStyle}/>

              {/* ears */}
              <div style={earLeft}><div style={earInner}/></div>
              <div style={earRight}><div style={earInner}/></div>

              {/* head */}
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

              {/* torso */}
              <div ref={torsoRef} style={torso}/>
              <div style={chest}/>

              {/* arms */}
              <div ref={upperArmLeftRef} style={upperArmLeft}>
                <div style={lowerArmLeft}>
                    <div style={paw}/>
                </div>
                </div>
                <div ref={upperArmRightRef} style={upperArmRight}>
                <div style={lowerArmRight}>
                    <div style={paw}/>
                </div>
                </div>

              {/* LEFT LEG */}
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

              {/* RIGHT LEG */}
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

            {/* shadow */}
            <div ref={shadowRef} style={shadow}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
/* Keep all styles exactly the same as your original snippet */
const container = { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"};
const stage = { width: 420, height: 660, borderRadius: 24,  display: "flex", justifyContent: "center", alignItems: "center" };
const scaleWrapper = { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" };
const scaleContainer = { transform: "scale(1.5)", display: "flex", flexDirection: "column", alignItems: "center" };
const cat = { position: "relative", width: 170, height: 290, willChange: "transform" };
const head = { position: "absolute", top: 0, left: 28, width: 115, height: 100, background: "linear-gradient(145deg,#c07a3a,#8a4f1d)", borderRadius: "55% 55% 50% 50% / 60% 60% 45% 45%", display: "flex", justifyContent: "center", alignItems: "center", gap: 18 };
const muzzle = { position: "absolute", bottom: 12, width: 42, height: 26, background: "#e8b98a", borderRadius: "50% 50% 45% 45%" };
const nose = { position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 12, height: 8, background: "#d67a7a", borderRadius: 6 };
const whiskerGroupLeft = { position: "absolute", left: -32, top: 4, display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" };
const whiskerGroupRight = { position: "absolute", right: -32, top: 4, display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end", transform: "scaleX(-1)" };
const whisker = { width: 40, height: 1.5, background: "linear-gradient(to right, #f5f5f5, #cfcfcf)", borderRadius: "50%", opacity: 0.55 };
const eye = { width: 14, height: 18, background: "#000", borderRadius: 8 };
const earLeft = { position: "absolute", top: -22, left: 35, width: 40, height: 50, background: "#a5622a", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" };
const earRight = { position: "absolute", top: -24, right: 35, width: 40, height: 50, background: "#a5622a", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" };
const earInner = { position: "absolute", top: 12, left: 10, width: 20, height: 25, background: "#e8b98a", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" };
const torso = { position: "absolute", top: 90, left: 38, width: 95, height: 140, background: "linear-gradient(145deg,#b9682c,#6b3a14)", borderRadius: "45% 45% 35% 35%", transformOrigin: "bottom center" };
const upperArmLeft = { position: "absolute", top: 110, left: 40, width: 20, height: 75, background: "linear-gradient(#b9682c,#6b3a14)", borderRadius: 20, transform: "rotate(15deg)", transformOrigin: "top center", zIndex: 5 };
const upperArmRight = { position: "absolute", top: 110, right: 40, width: 20, height: 75, background: "linear-gradient(#b9682c,#6b3a14)", borderRadius: 20, transform: "rotate(-15deg)", transformOrigin: "top center", zIndex: 5 };
const lowerArmLeft = { position: "absolute", top: 65, left: 0, width: 20, height: 60, background: "linear-gradient(#b9682c,#6b3a14)", borderRadius: 20, transform: "rotate(10deg)", transformOrigin: "top center" };
const lowerArmRight = { position: "absolute", top: 65, left: 0, width: 20, height: 60, background: "linear-gradient(#b9682c,#6b3a14)", borderRadius: 20, transform: "rotate(-10deg)", transformOrigin: "top center" };
const paw = { position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)", width: 30, height: 22, background: "#e8b98a", borderRadius: 14 };
const upperLegLeft = { position: "absolute", bottom: 0, left: 50, width: 24, height: 70, background: "linear-gradient(#6b3a14,#3e210d)", borderRadius: 20 };
const upperLegRight = { position: "absolute", bottom: 0, right: 50, width: 24, height: 70, background: "linear-gradient(#6b3a14,#3e210d)", borderRadius: 20 };
const knee = { position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", width: 18, height: 18, background: "#e8b98a", borderRadius: "50%" };
const lowerLeg = { position: "relative", top: "100%", width: 24, height: 45, background: "linear-gradient(#6b3a14,#3e210d)", borderRadius: 20, transformOrigin: "top center" };
const rearPaw = { position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 30, height: 18, background: "#e8b98a", borderRadius: 12, display: "flex", justifyContent: "center", alignItems: "center", gap: 4 };
const rearClaw = { width: 4, height: 6, background: "#dcdcdc", borderRadius: 2 };
const tailStyle = { position: "absolute", bottom: 70, left: 100, width: 22, height: 135, background: "linear-gradient(180deg,#c07a3a,#5a2f10)", borderRadius: 18, transformOrigin: "bottom center" };
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
const chest = { position: "absolute", top: 100, left: 55, width: 60, height: 110, background: "#e8b98a", borderRadius: 40 };