import { ImageResponse } from "next/og";
export const alt = "Vishaka Parab — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f0f2e9",
        color: "#273e2b",
        padding: 70,
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ fontSize: 25, display: "flex" }}>
        VISHAKA PARAB / SOFTWARE DEVELOPER
      </div>
      <div
        style={{
          fontSize: 85,
          lineHeight: 1.1,
          letterSpacing: -4,
          display: "flex",
        }}
      >
        Software Developer.
        <br />
        Engineering with intent.
      </div>
      <div style={{ fontSize: 24, display: "flex" }}>
        React · Next.js · TypeScript
      </div>
    </div>,
    size,
  );
}
