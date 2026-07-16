import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ds/Button.jsx";
import Barcode from "../ds/Barcode.jsx";
import { StampTag } from "../ds/Badge.jsx";
import ImageSlot from "./ImageSlot.jsx";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { useQuotes } from "../lib/useQuotes.js";
import sunImg from "../assets/sun.png";

const services = [
  {
    code: "MCO",
    name: "Disney & parks",
    blurb:
      "Park days, dining plans, Genie+ strategy — engineered around nap schedules.",
  },
  {
    code: "SEA",
    name: "Family cruises",
    blurb:
      "Kids clubs, connecting cabins, and shore days that work for every age.",
  },
  {
    code: "SUN",
    name: "Beach & all-inclusive",
    blurb: "Warm-water resorts where the hardest choice is pool or ocean.",
  },
  {
    code: "ANY",
    name: "Flights + hotels",
    blurb: "City weekends, grandparent visits, big firsts — booked end to end.",
  },
];

const steps = [
  {
    n: "1",
    tag: "tell us the dream",
    title: "Share your trip",
    blurb:
      "A five-minute request form: who’s going, when-ish, and what a great trip looks like for your family.",
  },
  {
    n: "2",
    tag: "we do the homework",
    title: "Get a real plan",
    blurb:
      "Katie comes back with itinerary options and honest pricing — flights, rooms, parks, all of it.",
  },
  {
    n: "3",
    tag: "you just pack",
    title: "Book & board",
    blurb:
      "Approve the plan and we book everything. You get one tidy itinerary and a human to call.",
  },
];

// Fallback shown while quotes load or if the API is unavailable. The live
// testimonials come from Airtable via /api/quotes (rows marked "Featured").
const DEFAULT_QUOTES = [
  {
    text: "Our cruise had three kids under six and zero meltdowns at check-in. Katie thought of things we didn’t know to ask about.",
    who: "THE OKAFOR FAMILY · CARIBBEAN 2026",
    slug: null,
  },
  {
    text: "Same price as booking it ourselves, except someone else did the six hours of comparing. Never going back.",
    who: "THE BECKER FAMILY · MAUI 2026",
    slug: null,
  },
];

const inputStyle = {
  fontFamily: "var(--font-body)",
  fontSize: 16,
  padding: "12px 18px",
  border: "2px solid var(--line-200)",
  borderRadius: 999,
  outline: "none",
  color: "var(--ink-900)",
  background: "var(--white)",
};

const labelStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: "0.16em",
  color: "var(--ink-400)",
};

export default function Home({
  wordmarkSize = 26,
  littleRatio = 1,
  showSunburst = true,
}) {
  const [sent, setSent] = useState(false);
  const { quotes: apiQuotes } = useQuotes();

  const featured = apiQuotes?.filter((q) => q.featured);
  const testimonials =
    featured && featured.length
      ? featured.map((q) => ({
          text: q.text,
          who: `${q.author}${q.trip ? ` · ${q.trip}` : ""}`.toUpperCase(),
          slug: q.slug,
        }))
      : DEFAULT_QUOTES;

  return (
    <div
      data-screen-label="Home"
      style={{
        fontFamily: "var(--font-body)",
        color: "var(--ink-900)",
        background: "var(--cream-100)",
        minHeight: "100vh",
        overflowX: "clip",
      }}
    >
      {/* Nav */}
      <SiteHeader wordmarkSize={wordmarkSize} littleRatio={littleRatio} />

      {/* Hero */}
      <div
        id="hero-grid"
        data-section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
          gap: 56,
          alignItems: "center",
          padding: "48px 56px 72px",
          maxWidth: 1440,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          <StampTag>NOW BOARDING</StampTag>
          <h1
            id="hero-h1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 62,
              lineHeight: 1.08,
              color: "var(--teal-800)",
              margin: 0,
              textWrap: "pretty",
            }}
          >
            Family trips, planned by a{" "}
            <span
              style={{
                fontFamily: "var(--font-script)",
                color: "var(--coral-500)",
                fontSize: 70,
              }}
            >
              real human
            </span>{" "}
            who gets it.
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--ink-600)",
              margin: 0,
              maxWidth: 520,
            }}
          >
            Disney, cruises, beach weeks, big firsts — we handle the flights,
            hotels, and fifty little details so you just show up and make the
            memories.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="#request" style={{ textDecoration: "none" }}>
              <Button size="lg">Start a trip request</Button>
            </a>
            <span
              style={{
                fontFamily: "var(--font-script)",
                fontSize: 24,
                color: "var(--teal-800)",
              }}
            >
              free to ask — really!
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 28px",
              marginTop: 8,
              fontFamily: "var(--font-display)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: "var(--ink-400)",
            }}
          >
            <span>DISNEY &amp; PARKS</span>
            <span>·</span>
            <span>CRUISES</span>
            <span>·</span>
            <span>RESORTS</span>
            <span>·</span>
            <span>FLIGHTS + HOTELS</span>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {showSunburst && (
            <img
              src={sunImg}
              alt=""
              style={{
                position: "absolute",
                top: -64,
                right: -44,
                width: 150,
                height: 150,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          )}
          <div
            id="hero-photo"
            style={{
              width: "100%",
              height: 460,
              position: "relative",
              transform: "rotate(1.5deg)",
              zIndex: 1,
            }}
          >
            <ImageSlot
              shape="rounded"
              radius={22}
              placeholder="Hero photo — family on vacation"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div
        id="trips"
        data-section
        style={{ padding: "72px 56px", background: "var(--white)" }}
      >
        <div style={{ maxWidth: 1328, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              marginBottom: 44,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.18em",
                color: "var(--coral-500)",
              }}
            >
              WHERE TO?
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 40,
                color: "var(--teal-800)",
                margin: 0,
              }}
            >
              Trips we plan every week
            </h2>
          </div>
          <div
            id="services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {services.map((s) => (
              <div
                key={s.code}
                style={{
                  background: "var(--cream-050)",
                  borderRadius: 22,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: "0.14em",
                    color: "var(--coral-500)",
                  }}
                >
                  {s.code}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 22,
                    color: "var(--teal-800)",
                  }}
                >
                  {s.name}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--ink-600)",
                  }}
                >
                  {s.blurb}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how" data-section style={{ padding: "72px 56px" }}>
        <div style={{ maxWidth: 1328, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              marginBottom: 52,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.18em",
                color: "var(--coral-500)",
              }}
            >
              HOW IT WORKS
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 40,
                color: "var(--teal-800)",
                margin: 0,
              }}
            >
              From dreaming to booked in three steps
            </h2>
          </div>
          <div
            id="how-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 0,
              position: "relative",
            }}
          >
            <div
              id="how-line"
              style={{
                position: "absolute",
                top: 30,
                left: "16%",
                right: "16%",
                borderTop: "2px dashed var(--line-300)",
              }}
            />
            {steps.map((st) => (
              <div
                key={st.n}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 14,
                  position: "relative",
                  padding: "0 32px",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "var(--teal-800)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 22,
                  }}
                >
                  {st.n}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: 26,
                    color: "var(--coral-500)",
                  }}
                >
                  {st.tag}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 22,
                    color: "var(--teal-800)",
                    marginTop: -10,
                  }}
                >
                  {st.title}
                </span>
                <span
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "var(--ink-600)",
                    maxWidth: 320,
                  }}
                >
                  {st.blurb}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div
        id="about"
        data-section
        style={{ padding: "72px 56px", background: "var(--peach-100)" }}
      >
        <div
          id="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 56,
            alignItems: "center",
            maxWidth: 1040,
            margin: "0 auto",
          }}
        >
          <div style={{ width: 280, height: 280 }}>
            <ImageSlot shape="circle" placeholder="Katie's photo" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.18em",
                color: "var(--coral-500)",
              }}
            >
              YOUR TRAVEL AGENT
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 38,
                color: "var(--teal-800)",
                margin: 0,
              }}
            >
              Hi, I'm Katie{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontSize: 40,
                  color: "var(--coral-500)",
                }}
              >
                — mom, planner, park-day strategist
              </span>
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--ink-600)",
                margin: 0,
              }}
            >
              I started Big Little Adventures because family travel shouldn't
              require a second full-time job. I've walked the parks with a
              stroller, boarded the ships with a toddler, and I know which "kids
              stay free" deals are actually deals. Tell me the trip you're
              dreaming about — I'll come back with a plan and a price.
            </p>
            <span
              style={{
                fontFamily: "var(--font-script)",
                fontSize: 30,
                color: "var(--teal-800)",
              }}
            >
              — Katie Truran
            </span>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div
        data-section
        style={{ padding: "72px 56px", background: "var(--white)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            id="quotes-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            {testimonials.map((q) => {
              const cardStyle = {
                background: "var(--cream-050)",
                borderRadius: 22,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                textDecoration: "none",
              };
              const inner = (
                <>
                  <span
                    style={{
                      fontFamily: "var(--font-script)",
                      fontSize: 30,
                      color: "var(--coral-500)",
                      lineHeight: 1,
                    }}
                  >
                    "
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      lineHeight: 1.65,
                      color: "var(--ink-900)",
                      marginTop: -18,
                    }}
                  >
                    {q.text}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 14,
                      letterSpacing: "0.1em",
                      color: "var(--teal-800)",
                    }}
                  >
                    {q.who}
                  </span>
                </>
              );
              return q.slug ? (
                <Link key={q.slug} to={`/quotes/${q.slug}`} style={cardStyle}>
                  {inner}
                </Link>
              ) : (
                <div key={q.who} style={cardStyle}>
                  {inner}
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link
              to="/quotes"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                color: "var(--coral-500)",
                textDecoration: "none",
              }}
            >
              Read all reviews →
            </Link>
          </div>
        </div>
      </div>

      {/* Inquiry form */}
      <div id="request" data-section style={{ padding: "80px 56px" }}>
        <div
          id="request-card"
          style={{
            maxWidth: 1060,
            margin: "0 auto",
            background: "var(--white)",
            borderRadius: 22,
            boxShadow: "0 18px 44px rgba(15,92,102,0.14)",
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            overflow: "hidden",
          }}
        >
          <div
            id="request-stub"
            style={{
              padding: "40px 32px",
              borderRight: "2px dashed var(--line-300)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              background: "var(--cream-050)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "var(--ink-400)",
              }}
            >
              TRIP REQUEST · BLA-001
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 40,
                    color: "var(--teal-800)",
                    lineHeight: 1,
                  }}
                >
                  DRM
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: 22,
                    color: "var(--coral-500)",
                  }}
                >
                  Dreaming
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  borderTop: "2px dashed var(--line-300)",
                  position: "relative",
                  top: -10,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 40,
                    color: "var(--teal-800)",
                    lineHeight: 1,
                  }}
                >
                  BKD
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: 22,
                    color: "var(--coral-500)",
                  }}
                >
                  Booked
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--ink-600)",
                margin: 0,
              }}
            >
              Tell us about your crew and the trip you're picturing. Katie
              replies within one business day with ideas and honest pricing — no
              obligation, no spam.
            </p>
            <div style={{ marginTop: "auto" }}>
              <Barcode code="BLA · REQ · 2026" />
            </div>
          </div>
          <div style={{ padding: 40 }}>
            {!sent ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 28,
                    color: "var(--teal-800)",
                    margin: 0,
                  }}
                >
                  Start your trip request
                </h3>
                <div
                  id="request-fields"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <label style={labelStyle}>YOUR NAME</label>
                    <input
                      type="text"
                      placeholder="Jamie Parker"
                      style={inputStyle}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <label style={labelStyle}>EMAIL</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      style={inputStyle}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <label style={labelStyle}>DREAM TRIP</label>
                    <select style={{ ...inputStyle, appearance: "none" }}>
                      <option>Disney &amp; theme parks</option>
                      <option>Cruise</option>
                      <option>Beach resort / all-inclusive</option>
                      <option>Flights + hotel package</option>
                      <option>Not sure yet — surprise us</option>
                    </select>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <label style={labelStyle}>WHO'S FLYING?</label>
                    <input
                      type="text"
                      placeholder="2 adults, 2 kids (4 &amp; 7)"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <label style={labelStyle}>ANYTHING ELSE?</label>
                  <textarea
                    placeholder="Dates, budget, must-dos, nap schedules — the more the better."
                    rows={3}
                    style={{
                      ...inputStyle,
                      borderRadius: 18,
                      padding: "14px 18px",
                      resize: "vertical",
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Button size="lg" onClick={() => setSent(true)}>
                    Send trip request ✈
                  </Button>
                  <span style={{ fontSize: 13.5, color: "var(--ink-400)" }}>
                    No spam. Just your trip plan.
                  </span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  height: "100%",
                  textAlign: "center",
                  padding: "40px 0",
                }}
              >
                <StampTag>REQUEST RECEIVED</StampTag>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 30,
                    color: "var(--teal-800)",
                    margin: 0,
                  }}
                >
                  You're on the manifest!
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "var(--ink-600)",
                    margin: 0,
                    maxWidth: 380,
                  }}
                >
                  Katie will reply within one business day with ideas for your
                  adventure.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter wordmarkSize={wordmarkSize} littleRatio={littleRatio} />
    </div>
  );
}
