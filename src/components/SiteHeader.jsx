import { useLocation, Link } from "react-router-dom";
import Button from "../ds/Button.jsx";

// Single source of truth for the site header. Rendered identically on every
// page — the nav does not change based on route. In-page section links use
// absolute "/#id" targets so they work from any route (they land on the home
// page and scroll to the section); on the home page itself they scroll in place.
const NAV_LINKS = [
  { label: "Trips", href: "/#trips" },
  { label: "How it works", href: "/#how" },
  { label: "About", href: "/#about" },
];

const WORDMARK_SIZE = 26;

export default function SiteHeader() {
  const location = useLocation();
  const bigPx = WORDMARK_SIZE;
  const littlePx = WORDMARK_SIZE;
  const capsPx = Math.max(9, Math.round(WORDMARK_SIZE * 0.34));

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
      <Link to="/" style={{ textDecoration: "none" }}>
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
      </Link>
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
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className="nav-link"
            style={{ color: "var(--teal-800)", textDecoration: "none" }}
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/faq"
          className="nav-link"
          aria-current={location.pathname === "/faq" ? "page" : undefined}
          style={{
            color:
              location.pathname === "/faq"
                ? "var(--coral-500)"
                : "var(--teal-800)",
            textDecoration: "none",
          }}
        >
          FAQ
        </Link>
        <Link to="/#request" style={{ textDecoration: "none" }}>
          <Button size="sm">Plan my trip</Button>
        </Link>
      </div>
    </div>
  );
}
