/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export const HeroAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Start zoomed into the phone (right side of image)
  // Phase 2: Pan out to reveal Jarvis sitting next to it
  const revealProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 20, stiffness: 50, mass: 1.5 },
    from: 0,
    to: 1,
  });

  const scale = interpolate(revealProgress, [0, 1], [1.35, 1]);
  const translateX = interpolate(revealProgress, [0, 1], [12, 0]);

  // Gentle float after reveal
  const floatPhase = Math.max(0, frame - 50);
  const floatY = Math.sin(floatPhase * 0.035) * 4;

  // Fade in
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  // Glow that pulses when Jarvis is revealed
  const glowOpacity = interpolate(frame, [30, 60, 150], [0, 0.5, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Warm glow behind */}
      <div
        style={{
          position: "absolute",
          left: "20%",
          top: "20%",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(210,190,150,0.5) 0%, transparent 70%)",
          opacity: glowOpacity,
        }}
      />

      {/* Image filling the whole canvas */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity,
          transform: `scale(${scale}) translateX(${translateX}%) translateY(${floatY}px)`,
          transformOrigin: "65% 50%",
        }}
      >
        <img
          src="/images/jarvis-sitting.jpg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 20,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
