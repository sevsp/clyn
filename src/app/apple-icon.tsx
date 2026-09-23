import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <svg width="150" height="40" viewBox="0 0 100 27">
          <path d="M0 5 Q50 24 100 5 Q50 13 0 5 Z" fill="#0a0a0a" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
