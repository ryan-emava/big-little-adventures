import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import Button from "../ds/Button.jsx";
import { StampTag } from "../ds/Badge.jsx";
import { usePageTitle } from "../lib/usePageTitle.js";

const eyebrowStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 13,
  letterSpacing: "0.18em",
  color: "var(--coral-500)",
};

const sectionHeadingStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 40,
  color: "var(--teal-800)",
  margin: 0,
};

// What we take off your plate.
const HANDLES = [
  {
    title: "Park strategy",
    blurb:
      "Which parks, which days, and the rope-drop-or-sleep-in call — built around your crew, not a generic itinerary.",
  },
  {
    title: "Dining reservations",
    blurb:
      "Character breakfasts and the hard-to-get tables, booked the moment the window opens.",
  },
  {
    title: "Lightning Lane & lines",
    blurb:
      "Skip-the-line timing planned so you ride more and melt down less.",
  },
  {
    title: "The right resort",
    blurb:
      "On-property perks vs. price, matched to your budget and your stroller situation.",
  },
  {
    title: "Tickets & add-ons",
    blurb:
      "Park hoppers, water parks, special events — only the extras you'll actually use.",
  },
  {
    title: "Getting around",
    blurb:
      "Airport transfers, park transport, and all the little logistics in between.",
  },
];

// Destinations we plan most.
const PARKS = [
  {
    name: "Walt Disney World",
    place: "Orlando, FL",
    blurb:
      "Four parks, dozens of resorts, endless choices. We cut it down to your best possible week.",
  },
  {
    name: "Disneyland",
    place: "Anaheim, CA",
    blurb:
      "Compact, classic, and easy on little legs — great for younger kids or a shorter trip.",
  },
  {
    name: "Universal Orlando",
    place: "Orlando, FL",
    blurb:
      "Wizarding World and real thrills. Perfect on its own or paired with a Disney week.",
  },
];

// Why a real planner beats going it alone — mirrors the FAQ value prop.
const WHY = [
  {
    title: "Same price, better trip",
    blurb:
      "Park pricing is the same whether you book with us or not. You just also get a human who's done it.",
  },
  {
    title: "Planned around real families",
    blurb:
      "Naps, picky eaters, grandparents, strollers — the stuff a booking site never thinks to ask.",
  },
  {
    title: "We're there if plans wobble",
    blurb:
      "Ride closures, weather, a surprise fever — you've got us, not a 40-minute hold with a call center.",
  },
];

function Card({ title, kicker, children }) {
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

export default function DisneyParksPage() {
  usePageTitle("Disney & parks");

  return (
    <div
      style={{ background: "var(--cream-100)", minHeight: "100vh", overflowX: "clip" }}
    >
      <SiteHeader />

      {/* ===== Hero ===== */}
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
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 22,
              maxWidth: 720,
            }}
          >
            <StampTag>DISNEY &amp; PARKS</StampTag>
            <h1
              id="disney-hero-h1"
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
              The parks, planned around your{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  color: "var(--coral-500)",
                  fontSize: 66,
                }}
              >
                people
              </span>
              .
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
              Ride strategy, dining reservations, the right resort, and Lightning
              Lane timing — sorted, so your days feel like a vacation instead of a
              logistics project.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <Link to="/#request" style={{ textDecoration: "none" }}>
                <Button size="lg">Start a trip request</Button>
              </Link>
              <Link to="/#how" style={{ textDecoration: "none" }}>
                <Button size="lg" variant="secondary">
                  How it works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== What we handle ===== */}
      <div data-section style={{ padding: "64px 56px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <span style={eyebrowStyle}>WHAT WE HANDLE</span>
            <h2 style={{ ...sectionHeadingStyle, marginTop: 10 }}>
              Every fiddly detail, handled
            </h2>
          </div>
          <div
            className="cards-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          >
            {HANDLES.map((h) => (
              <Card key={h.title} title={h.title}>
                {h.blurb}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Parks we plan ===== */}
      <div data-section style={{ padding: "64px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <span style={eyebrowStyle}>WHERE TO?</span>
            <h2 style={{ ...sectionHeadingStyle, marginTop: 10 }}>Parks we plan most</h2>
          </div>
          <div
            className="cards-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          >
            {PARKS.map((p) => (
              <Card key={p.name} title={p.name} kicker={p.place}>
                {p.blurb}
              </Card>
            ))}
          </div>
          <p style={{ marginTop: 20, fontSize: 15, color: "var(--ink-600)" }}>
            Dreaming bigger — Disneyland Paris, Tokyo, or a Disney Cruise?{" "}
            <Link to="/#request" style={{ color: "var(--coral-500)", fontWeight: 600 }}>
              Tell us the plan
            </Link>{" "}
            and we'll take it from there.
          </p>
        </div>
      </div>

      {/* ===== Why book with us ===== */}
      <div data-section style={{ padding: "64px 56px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <span style={eyebrowStyle}>WHY A REAL PLANNER</span>
            <h2 style={{ ...sectionHeadingStyle, marginTop: 10 }}>
              A booking site can't do this
            </h2>
          </div>
          <div
            className="cards-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          >
            {WHY.map((w) => (
              <Card key={w.title} title={w.title}>
                {w.blurb}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Good to know -> FAQ ===== */}
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
              Wondering when to start — or if the kids need passports?
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-600)" }}>
              The FAQ covers planning timelines, deposits, travel protection, and
              documents for international parks.
            </p>
          </div>
          <Link to="/faq" style={{ textDecoration: "none" }}>
            <Button size="md" variant="secondary">
              Read the FAQ
            </Button>
          </Link>
        </div>
      </div>

      {/* ===== Final CTA ===== */}
      <div data-section style={{ padding: "0 56px 80px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "var(--teal-800)",
            borderRadius: 26,
            padding: "56px 48px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 38,
              margin: 0,
            }}
          >
            Ready to make some{" "}
            <span style={{ fontFamily: "var(--font-script)", color: "var(--coral-400)", fontSize: 46 }}>
              magic
            </span>
            ?
          </h2>
          <p
            style={{
              margin: "12px auto 26px",
              maxWidth: 460,
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--teal-100)",
            }}
          >
            Tell us who's going and what you're picturing. Katie replies within one
            business day — free to ask, always.
          </p>
          <Link to="/#request" style={{ textDecoration: "none" }}>
            <Button size="lg">Start a trip request ✈</Button>
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
