import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { FloatingImage } from "../components/FloatingImage";

export const ExperienceAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
    from: 0.88,
    to: 1,
  });

  const imageOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: `scale(${imageScale})`, opacity: imageOpacity }}>
        <FloatingImage
          src="/images/jarvis-standing.jpg"
          width={860}
          height={490}
          floatAmplitude={7}
          floatSpeed={0.04}
          style={{ filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.1))" }}
        />
      </div>
    </AbsoluteFill>
  );
};
