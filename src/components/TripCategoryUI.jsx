import { Link } from "react-router-dom";
import Button from "../ds/Button.jsx";
import { StampTag } from "../ds/Badge.jsx";
import ImageSlot from "./ImageSlot.jsx";

// Shared building blocks for the /trips/* category pages (Disney, Cruises,
// Beach). Keeps the three pages visually in lockstep — each page supplies its
// own copy, these render it identically.

export const eyebrowStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 13,
  letterSpacing: "0.18em",
  color: "var(--coral-500)",
};

export const sectionHeadingStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 40,
  color: "var(--teal-800)",
  margin: 0,
};

// A soft cream card with an optional coral kicker (place/label) above the title.
export function Card({ title, kicker, children }) {
  return (
    <div
      style={{
        background: "var(--cream-050)",
        borderRadius: 22,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {kicker && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.14em",
            color: "var(--coral-500)",
          }}
        >
          {kicker}
        </span>
      )}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 22,
          color: "var(--teal-800)",
          lineHeight: 1.15,
        }}
      >
        {title}
      </span>
      <span style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink-600)" }}>
        {children}
      </span>
    </div>
  );
}

// A titled section with an eyebrow + a responsive 3-up card grid.
export function CardSection({ eyebrow, heading, background, footer, children }) {
  return (
    <div data-section style={{ padding: "64px 56px", background }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <span style={eyebrowStyle}>{eyebrow}</span>
          <h2 style={{ ...sectionHeadingStyle, marginTop: 10 }}>{heading}</h2>
        </div>
        <div
          className="cards-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
        >
          {children}
        </div>
        {footer && (
          <p style={{ marginTop: 20, fontSize: 15, color: "var(--ink-600)" }}>{footer}</p>
        )}
      </div>
    </div>
  );
}

// Peach strip nudging visitors to the FAQ.
export function FaqStrip({ heading, children }) {
  return (
    <div data-section style={{ padding: "8px 56px 64px" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "var(--peach-100)",
          borderRadius: 22,
          padding: "32px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 22,
              color: "var(--teal-800)",
            }}
          >
            {heading}
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-600)" }}>
            {children}
          </p>
        </div>
        <Link to="/faq" style={{ textDecoration: "none" }}>
          <Button size="md" variant="secondary">
            Read the FAQ
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Left-aligned hero: stamp + script-accented headline + subcopy + two CTAs.
// The primary CTA scrolls to the request form embedded lower on the same page.
export function CategoryHero({ stamp, heading, image, children }) {
  const textCol = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 22,
        maxWidth: image ? 560 : 720,
      }}
    >
      <StampTag>{stamp}</StampTag>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 58,
          lineHeight: 1.06,
          color: "var(--teal-800)",
          margin: 0,
          textWrap: "pretty",
        }}
      >
        {heading}
      </h1>
      <p
        style={{
          fontSize: 19,
          lineHeight: 1.6,
          color: "var(--ink-600)",
          margin: 0,
          maxWidth: 560,
        }}
      >
        {children}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <a href="#request" style={{ textDecoration: "none" }}>
          <Button size="lg">Start a trip request</Button>
        </a>
        <Link to="/#how" style={{ textDecoration: "none" }}>
          <Button size="lg" variant="secondary">
            How it works
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div data-section style={{ padding: "56px 56px 64px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <img
          src="/sun.png"
          alt=""
          style={{
            position: "absolute",
            top: -30,
            right: -18,
            width: 104,
            height: 104,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
        {image ? (
          <div
            className="category-hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
              gap: 48,
              alignItems: "center",
            }}
          >
            {textCol}
            <div
              style={{
                height: 420,
                borderRadius: 22,
                overflow: "hidden",
                boxShadow: "0 18px 44px rgba(15,92,102,0.16)",
              }}
            >
              <ImageSlot
                src={image.jpg}
                webp={image.webp}
                alt={image.alt}
                radius={22}
                priority
              />
            </div>
          </div>
        ) : (
          textCol
        )}
      </div>
    </div>
  );
}
