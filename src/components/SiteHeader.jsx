import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "../ds/Button.jsx";

// Single source of truth for the site header. Rendered identically on every
// page — the nav does not change based on route. In-page section links use
// absolute "/#id" targets so they work from any route (they land on the home
// page and scroll to the section); on the home page itself they scroll in place.
const NAV_LINKS = [
  { label: "How it works", href: "/#how" },
  { label: "About", href: "/#about" },
];

// Sub-items under "Trips" — each deep-links to a service card in the #trips
// section (ids set in Home.jsx).
const TRIPS_MENU = [
  { label: "Disney & parks", href: "/trips/disney" },
  { label: "Family cruises", href: "/trips/cruises" },
  { label: "Beach & all-inclusive", href: "/trips/beach" },
];

const WORDMARK_SIZE = 26;

// "Trips" nav item with a hover/focus dropdown. The trigger itself still links
// to the whole #trips section; the menu deep-links to individual categories.
function TripsNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const tripsActive = location.pathname.startsWith("/trips");

  return (
    <div
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <Link
        to="/#trips"
        className="nav-link"
        aria-haspopup="true"
        aria-expanded={open}
        aria-current={tripsActive ? "page" : undefined}
        onFocus={() => setOpen(true)}
        style={{
          color: tripsActive ? "var(--coral-500)" : "var(--teal-800)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        Trips
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform var(--duration-fast, 160ms) var(--ease-standard, ease)",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            paddingTop: 12,
            zIndex: 20,
          }}
        >
          <div
            style={{
              background: "var(--white)",
              borderRadius: 14,
              boxShadow: "0 14px 30px -12px rgba(13,71,80,0.30)",
              padding: 8,
              minWidth: 220,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {TRIPS_MENU.map((m) => {
              const active = location.pathname === m.href;
              return (
                <Link
                  key={m.href}
                  to={m.href}
                  className="nav-dropdown-link"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "10px 14px",
                    borderRadius: 10,
                    color: active ? "var(--coral-500)" : "var(--teal-800)",
                    fontWeight: active ? 700 : 500,
                    background: active ? "var(--peach-100)" : "transparent",
                    textDecoration: "none",
                    fontSize: 15,
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

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
        <TripsNav />
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
