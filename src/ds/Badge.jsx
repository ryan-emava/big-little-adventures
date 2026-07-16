const toneStyles = {
  neutral: { background: "var(--teal-100)", color: "var(--teal-800)" },
  accent: { background: "var(--coral-100)", color: "var(--coral-700)" },
  brand: { background: "var(--teal-800)", color: "#fff" },
};

export function Badge({ children, tone = "neutral", style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "12px",
        letterSpacing: "var(--tracking-wide)",
        padding: "4px 12px",
        borderRadius: "var(--radius-pill)",
        ...toneStyles[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function StampTag({ children, style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "12px",
        letterSpacing: "var(--tracking-wide)",
        padding: "6px 14px",
        borderRadius: "var(--radius-pill)",
        border: "2px solid var(--color-accent)",
        color: "var(--color-accent)",
        transform: "rotate(-4deg)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
