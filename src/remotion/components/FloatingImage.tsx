/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import React from "react";
import { useCurrentFrame } from "remotion";

type Props = {
  src: string;
  width: number;
  height: number;
  floatAmplitude?: number;
  floatSpeed?: number;
  style?: React.CSSProperties;
};

export const FloatingImage: React.FC<Props> = ({
  src,
  width,
  height,
  floatAmplitude = 8,
  floatSpeed = 0.04,
  style,
}) => {
  const frame = useCurrentFrame();

  const y = Math.sin(frame * floatSpeed) * floatAmplitude;
  const rotation = Math.sin(frame * floatSpeed * 0.7) * 1.5;

  return (
    <img
      src={src}
      style={{
        width,
        height,
        objectFit: "cover",
        borderRadius: 24,
        transform: `translateY(${y}px) rotate(${rotation}deg)`,
        filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.12))",
        ...style,
      }}
    />
  );
};
