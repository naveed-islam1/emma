import { ImageResponse } from "next/og";

export const alt = "Emma — Safe, Affordable Surgery in Mexico";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #EDE0FF 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "#8A38F5",
            color: "#ffffff",
            fontSize: 84,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          e
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, color: "#191919" }}>
          Emma
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#4E4E4E",
            marginTop: 16,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Safe, affordable surgery in Mexico with verified surgeons
        </div>
      </div>
    ),
    size,
  );
}
