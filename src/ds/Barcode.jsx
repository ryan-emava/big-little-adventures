import { useMemo } from "react";

export default function Barcode({ code = "BLA · EST · 2026", style }) {
  const bars = useMemo(() => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: 38 }).map(() => (rand() > 0.5 ? 3 : 1.5));
  }, []);
  return (
    <div style={{ ...style }}>
      <div
        style={{
          display: "flex",
          gap: 2,
          alignItems: "flex-end",
          justifyContent: "center",
          height: 44,
        }}
      >
        {bars.map((w, i) => (
          <span
            key={i}
            style={{
              width: w,
              height: "100%",
              background: "var(--color-brand)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "var(--tracking-widest)",
          color: "var(--color-text-muted)",
          marginTop: 6,
          textAlign: "center",
        }}
      >
        {code}
      </div>
    </div>
  );
}
