import { useLocation } from "react-router-dom";
import Button from "../ds/Button.jsx";

export default function SiteHeader({
  wordmarkSize = 26,
  littleRatio = 1,
  homeHref = "#",
  ctaHref = "#request",
  ctaLabel = "Plan my trip",
  links = [
    { label: "Trips", href: "#trips" },
    { label: "How it works", href: "#how" },
    { label: "About", href: "#about" },
  ],
}) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const big = wordmarkSize;
  // "big" must never be smaller than "little"
  const ratio = Math.min(littleRatio, 1);
  const bigPx = big;
  const littlePx = Math.round(big * ratio);
  const capsPx = Math.max(9, Math.round(big * 0.34));

  return (
    <div
      id="main-nav"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        padding: "22px 56px",
        position: "sticky",
        top: 0,
        background: "var(--cream-100)",
        zIndex: 10,
        fontFamily: "var(--font-body)",
      }}
    >
      <a href={homeHref} style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                lineHeight: 1,
                color: "var(--color-brand)",
                fontSize: `${bigPx}px`,
              }}
            >
              big
            </span>
            <span
              style={{
                fontFamily: "var(--font-script)",
                fontWeight: 700,
                lineHeight: 1,
                color: "var(--color-accent)",
                fontSize: `${littlePx}px`,
              }}
            >
              little
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: "var(--color-brand)",
              fontSize: `${capsPx}px`,
              marginTop: 2,
            }}
          >
            ADVENTURES
          </div>
        </div>
      </a>
      <div
        data-nav-links
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 36,
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 16,
          color: "var(--teal-800)",
        }}
      >
        {isHome &&
          links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{ color: "var(--teal-800)", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
        <a href={ctaHref} style={{ textDecoration: "none" }}>
          <Button size="sm">{ctaLabel}</Button>
        </a>
      </div>
    </div>
  );
}
