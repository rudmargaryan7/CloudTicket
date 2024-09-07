import React from "react";

interface ArrowDownProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowDown: React.FC<ArrowDownProps> = ({
  width = 24,
  height = 24,
  color = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

export default ArrowDown;
