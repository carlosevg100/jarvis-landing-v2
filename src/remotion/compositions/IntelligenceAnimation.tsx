import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { FloatingImage } from "../components/FloatingImage";
import { GlowPulse } from "../components/GlowPulse";

export const IntelligenceAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    from: 0.9,
    to: 1,
  });

  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Sound wave rings
  const rings = [0, 1, 2].map((i) => {
    const ringFrame = frame - i * 20;
    const ringScale = interpolate(
      ringFrame % 90,
      [0, 90],
      [0.8, 1.8],
    );
    const ringOpacity = interpolate(
      ringFrame % 90,
      [0, 60, 90],
      [0.4, 0.15, 0],
    );
    return { scale: ringScale, opacity: Math.max(0, ringOpacity) };
  });

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Animated rings behind */}
      {rings.map((ring, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "2px solid rgba(210, 180, 130, 0.3)",
            transform: `scale(${ring.scale})`,
            opacity: ring.opacity,
          }}
        />
      ))}

      <div style={{ transform: `scale(${imageScale})`, opacity: imageOpacity }}>
        <GlowPulse color="rgba(210, 180, 130, 0.35)" intensity={22}>
          <FloatingImage
            src="/images/jarvis-voice.jpg"
            width={860}
            height={490}
            floatAmplitude={5}
            floatSpeed={0.03}
          />
        </GlowPulse>
      </div>
    </AbsoluteFill>
  );
};
