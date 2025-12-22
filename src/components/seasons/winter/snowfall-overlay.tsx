"use client";

import { Snowfall } from "react-snowfall";

export default function SnowfallOverlay() {
  return <Snowfall style={{ zIndex: 100, position: "fixed" }} color={"oklch(78% 0.12 200)"} />;
}
