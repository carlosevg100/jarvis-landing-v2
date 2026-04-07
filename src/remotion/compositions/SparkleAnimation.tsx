import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { FloatingImage } from "../components/FloatingImage";

const Particle: React.FC<{ index: number; total: number }> = ({
  index,
  total,
}) => {
  const frame = useCurrentFrame();

  const angle = (index / total) * Math.PI * 2;
  const speed = 0.03 + (index % 3) * 0.01;
  const radius = 60 + Math.sin(frame * speed + index) * 30;
  const size = interpolate(
    Math.sin(frame * 0.08 + index * 1.2),
    [-1, 1],
    [2, 5]
  );
  const opacity = interpolate(
    Math.sin(frame * 0.06 + index * 0.8),
    [-1, 1],
    [0.15, 0.7]
  );

  const x = Math.cos(frame * speed + angle) * radius;
  const y = Math.sin(frame * speed * 0.7 + angle) * radius * 0.6;

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `rgba(220, 195, 150, ${opacity})`,
        boxShadow: `0 0 ${size * 2}px rgba(220, 195, 150, ${opacity * 0.5})`,
        transform: `translate(${x}px, ${y}px)`,
        left: "50%",
        top: "50%",
      }}
    />
  );
};

export const SparkleAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
    from: 0.85,
    to: 1,
  });

  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
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
      {/* Sparkle particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Particle key={i} index={i} total={12} />
      ))}

      <div style={{ transform: `scale(${imageScale})`, opacity: imageOpacity }}>
        <FloatingImage
          src="/images/jarvis-sparkle.jpg"
          width={680}
          height={388}
          floatAmplitude={6}
          floatSpeed={0.035}
        />
      </div>
    </AbsoluteFill>
  );
};
