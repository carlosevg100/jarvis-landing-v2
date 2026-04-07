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

export const ExecutionAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80 },
    from: 0.9,
    to: 1,
  });

  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle zoom pulse on the holographic icons
  const pulseScale = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [1, 1.02]
  );

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${imageScale * pulseScale})`,
          opacity: imageOpacity,
        }}
      >
        <GlowPulse color="rgba(220, 180, 100, 0.25)" intensity={20}>
          <FloatingImage
            src="/images/jarvis-features.jpg"
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
