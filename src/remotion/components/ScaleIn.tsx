import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  damping?: number;
  stiffness?: number;
};

export const ScaleIn: React.FC<Props> = ({
  children,
  delay = 0,
  damping = 10,
  stiffness = 200,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping, stiffness, mass: 0.6 },
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};
