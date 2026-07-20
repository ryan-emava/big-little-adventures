import { Link } from "react-router-dom";
import { contact, business, social } from "../lib/contact.js";

export default function SiteFooter({ wordmarkSize = 26, littleRatio = 1 }) {
  const big = Math.round(wordmarkSize * 0.85);
  // "big" must never be smaller than "little"
  const ratio = Math.min(littleRatio, 1);
  const footBigPx = big;
  const footLittlePx = Math.round(big * ratio);

  return (
    <div
      id="footer-bar"
      style={{
        background: "var(--teal-800)",
        padding: "44px 56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#fff",
              fontSize: `${footBigPx}px`,
            }}
          >
            big
          </span>
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontWeight: 700,
              color: "var(--coral-400)",
              fontSize: `${footLittlePx}px`,
            }}
          >
            little
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "#fff",
            }}
          >
            ADVENTURES
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-script)",
            fontSize: 20,
            color: "var(--teal-100)",
          }}
        >
          big memories · little travelers
        </span>
        {business.sellerOfTravel && (
          <span style={{ fontSize: 11, color: "var(--teal-100)", opacity: 0.75 }}>
            {business.sellerOfTravel}
          </span>
        )}
        <span style={{ fontSize: 12, color: "var(--teal-100)", opacity: 0.75 }}>
          © {new Date().getFullYear()} {business.legalName}
          {business.location ? ` · ${business.location}` : ""}
          {" · "}
          <Link to="/privacy" style={{ color: "var(--teal-100)" }}>
            Privacy
          </Link>
          {" · "}
          <Link to="/terms" style={{ color: "var(--teal-100)" }}>
            Terms
          </Link>
        </span>
      </div>
      <div
        className="footer-links"
        style={{
          display: "flex",
          gap: 28,
          flexWrap: "wrap",
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--teal-100)",
        }}
      >
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            style={{ color: "var(--teal-100)", textDecoration: "none" }}
          >
            {contact.email}
          </a>
        )}
        {contact.phone && (
          <a
            href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
            style={{ color: "var(--teal-100)", textDecoration: "none" }}
          >
            {contact.phone}
          </a>
        )}
        {social.facebook && (
          <a
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--teal-100)", textDecoration: "none" }}
          >
            Facebook
          </a>
        )}
        {social.instagram && (
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--teal-100)", textDecoration: "none" }}
          >
            Instagram
          </a>
        )}
        <a
          href="https://biglittleadventures.co"
          style={{ color: "var(--teal-100)", textDecoration: "none" }}
        >
          biglittleadventures.co
        </a>
      </div>
    </div>
  );
}
