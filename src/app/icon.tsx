import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <svg width="28" height="8" viewBox="0 0 100 27">
          <path d="M0 5 Q50 24 100 5 Q50 13 0 5 Z" fill="#0a0a0a" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
