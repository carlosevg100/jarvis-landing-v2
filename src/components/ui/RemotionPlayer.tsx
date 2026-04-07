"use client";

import { Player } from "@remotion/player";
import type { ComponentType } from "react";

type RemotionPlayerProps = {
  component: ComponentType;
  durationInFrames?: number;
  fps?: number;
  compositionWidth?: number;
  compositionHeight?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function RemotionPlayer({
  component,
  durationInFrames = 300,
  fps = 30,
  compositionWidth = 960,
  compositionHeight = 548,
  className = "",
  style,
}: RemotionPlayerProps) {
  return (
    <Player
      component={component}
      durationInFrames={durationInFrames}
      compositionWidth={compositionWidth}
      compositionHeight={compositionHeight}
      fps={fps}
      style={{
        width: "100%",
        borderRadius: 24,
        overflow: "hidden",
        ...style,
      }}
      className={className}
      autoPlay
      loop
      controls={false}
      showVolumeControls={false}
      acknowledgeRemotionLicense
    />
  );
}
