import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
};

export const FadeSlideIn: React.FC<Props> = ({
  children,
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 30,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delay;

  const opacity = interpolate(adjustedFrame, [0, duration * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const translate = interpolate(adjustedFrame, [0, duration], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const transforms: Record<string, string> = {
    up: `translateY(${translate}px)`,
    down: `translateY(${-translate}px)`,
    left: `translateX(${translate}px)`,
    right: `translateX(${-translate}px)`,
  };

  return (
    <div style={{ opacity, transform: transforms[direction] }}>{children}</div>
  );
};
