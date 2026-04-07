import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  children: React.ReactNode;
  color?: string;
  intensity?: number;
};

export const GlowPulse: React.FC<Props> = ({
  children,
  color = "rgba(210, 190, 160, 0.4)",
  intensity = 20,
}) => {
  const frame = useCurrentFrame();

  const glowSize = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [intensity * 0.5, intensity]
  );

  const opacity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.3, 0.7]
  );

  return (
    <div
      style={{
        filter: `drop-shadow(0 0 ${glowSize}px ${color})`,
        opacity: 1,
      }}
    >
      <div style={{ opacity: interpolate(opacity, [0.3, 0.7], [0.85, 1]) }}>
        {children}
      </div>
    </div>
  );
};
