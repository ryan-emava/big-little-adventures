import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../ds/Button.jsx";
import Barcode from "../ds/Barcode.jsx";
import { StampTag } from "../ds/Badge.jsx";
import ImageSlot from "./ImageSlot.jsx";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { usePageTitle } from "../lib/usePageTitle.js";
import sunImg from "../assets/sun.png";
import heroJpg from "../assets/hero.jpg";
import heroWebp from "../assets/hero.webp";
import katieJpg from "../assets/katie.jpg";
import katieWebp from "../assets/katie.webp";

const services = [
  {
    code: "MCO",
    slug: "disney",
    to: "/trips/disney",
    name: "Disney & parks",
    blurb:
      "Park days, dining plans, Lightning Lane strategy, engineered around nap schedules.",
  },
  {
    code: "SEA",
    slug: "cruises",
    to: "/trips/cruises",
    name: "Family cruises",
    blurb:
      "Kids clubs, connecting cabins, and shore days that work for every age.",
  },
  {
    code: "SUN",
    slug: "beach",
    to: "/trips/beach",
    name: "Beach & all-inclusive",
    blurb: "Warm-water resorts where the hardest choice is pool or ocean.",
  },
  {
    code: "ANY",
    slug: "flights",
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
  color: "var(--ink-600)", // ink-400 fails AA contrast for small text on white
};

const errorTextStyle = {
  fontFamily: "var(--font-body)",
  fontSize: 12.5,
  color: "var(--color-danger)",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A gentle floor for Trip Details — enough to nudge past a one-word "Disney".
const NOTES_MIN = 15;

// Trip Details placeholder swaps to match the selected Dream Trip — just a
// friendly prompt, never touches whatever the user has already typed.
const NOTES_DEFAULT_PLACEHOLDER =
  "Dates, budget, must-dos, nap schedules — the more the better.";
const NOTES_PLACEHOLDERS = {
  "Disney & theme parks":
    "Which parks? Rope-drop rides or pool afternoons? Character breakfast a must? How old's the crew?",
  Cruise:
    "Where to — Caribbean, Alaska, the Med? Sailing from where? Balcony or bust? Sea days or shore excursions?",
  "Beach resort / all-inclusive":
    "Swim-up bar or kids' club? Adults-only or bring-everyone? Which stretch of sand are we dreaming of?",
  "Flights + hotel package":
    "Where to, and roughly when? Nonstop or fine with a layover? City lights or somewhere quieter?",
  "Not sure yet — surprise us":
    "Give us a vibe — beach, mountains, big city? Chaos-with-kids or blissful quiet? Budget ballpark?",
};

// Red-border an input when its field has an error, otherwise leave it as-is.
const withError = (base, invalid) =>
  invalid ? { ...base, borderColor: "var(--color-danger)" } : base;

// Labeled field wrapper: consistent label, a coral "required" marker, and an
// inline error message. The CRM requires every field, so the form surfaces that
// up front instead of letting a submission fail silently server-side.
function Field({ label, htmlFor, required, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={htmlFor} style={labelStyle}>
        {label}
        {required && <span style={{ color: "var(--coral-500)" }}> *</span>}
      </label>
      {children}
      {error && (
        <span role="alert" style={errorTextStyle}>
          {error}
        </span>
      )}
    </div>
  );
}

// Maps the ?trip= slug (set by the /trips/* category pages) to the matching
// Dream Trip select value, so arriving from a category preselects it.
const TRIP_PARAM_TO_TYPE = {
  disney: "Disney & theme parks",
  cruise: "Cruise",
  beach: "Beach resort / all-inclusive",
  flights: "Flights + hotel package",
};

export default function Home({ showSunburst = false }) {
  usePageTitle("");
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    tripType:
      TRIP_PARAM_TO_TYPE[searchParams.get("trip")] || "Disney & theme parks",
    party: "",
    notes: "",
    honeypot: "",
  });
  const [formState, setFormState] = useState("idle"); // idle | sending | sent | error
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const sent = formState === "sent";
  const setField = (key) => (e) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [key]: value }));
    // Clear a field's error as soon as the user starts fixing it.
    setFieldErrors((fe) => (fe[key] ? { ...fe, [key]: undefined } : fe));
  };

  // The CRM requires all of these, so validate them here and point at the exact
  // field rather than letting the submission fail server-side.
  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Please add your name.";
    if (!EMAIL_RE.test(form.email.trim()))
      errors.email = "Add a valid email so Katie can reply.";
    if (!form.party.trim()) errors.party = "Let Katie know who's going.";
    const notes = form.notes.trim();
    if (!notes) {
      errors.notes = "Don't leave Katie hanging — give her a little to dream on! ✨";
    } else if (notes.length < NOTES_MIN) {
      errors.notes = "Ooh, tell us more — dates, budget, or must-dos. Even a sentence helps!";
    }
    return errors;
  };

  const submitRequest = async () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setFormError(null);
      document.getElementById(`tr-${Object.keys(errors)[0]}`)?.focus();
      return;
    }
    setFieldErrors({});
    setFormState("sending");
    setFormError(null);
    try {
      const r = await fetch("/api/trip-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (r.ok) {
        setFormState("sent");
        return;
      }
    } catch {
      // Network error — fall through to the generic message below.
    }
    setFormState("error");
    setFormError(
      "Something went wrong sending your request. Please try again in a moment.",
    );
  };


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
      <SiteHeader />

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
              src={heroJpg}
              webp={heroWebp}
              alt="A family on vacation"
              shape="rounded"
              radius={22}
              priority
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
            {services.map((s) => {
              const cardStyle = {
                background: "var(--cream-050)",
                borderRadius: 22,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                scrollMarginTop: 100,
                textDecoration: "none",
              };
              const inner = (
                <>
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
                  {s.to && (
                    <span
                      className="service-card-cta"
                      style={{
                        marginTop: "auto",
                        paddingTop: 4,
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "var(--coral-500)",
                      }}
                    >
                      Explore →
                    </span>
                  )}
                </>
              );
              return s.to ? (
                <Link
                  key={s.code}
                  id={`trips-${s.slug}`}
                  to={s.to}
                  className="service-card"
                  style={cardStyle}
                >
                  {inner}
                </Link>
              ) : (
                <div key={s.code} id={`trips-${s.slug}`} style={cardStyle}>
                  {inner}
                </div>
              );
            })}
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
            <ImageSlot
              src={katieJpg}
              webp={katieWebp}
              alt="Katie Truran"
              shape="circle"
            />
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
              replies within one business day with ideas and honest pricing. No
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
                <p style={{ margin: "-4px 0 0", fontSize: 13.5, color: "var(--ink-600)" }}>
                  A few details so Katie can come back with real ideas — every field helps.
                </p>
                <div
                  id="request-fields"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <Field label="YOUR NAME" htmlFor="tr-name" required error={fieldErrors.name}>
                    <input
                      id="tr-name"
                      type="text"
                      placeholder="Juana Getaway"
                      value={form.name}
                      onChange={setField("name")}
                      aria-invalid={!!fieldErrors.name}
                      style={withError(inputStyle, fieldErrors.name)}
                    />
                  </Field>
                  <Field label="EMAIL" htmlFor="tr-email" required error={fieldErrors.email}>
                    <input
                      id="tr-email"
                      type="email"
                      placeholder="catchme@paradise.com"
                      value={form.email}
                      onChange={setField("email")}
                      aria-invalid={!!fieldErrors.email}
                      style={withError(inputStyle, fieldErrors.email)}
                    />
                  </Field>
                  <Field label="DREAM TRIP" htmlFor="tr-triptype">
                    <select
                      id="tr-triptype"
                      value={form.tripType}
                      onChange={setField("tripType")}
                      style={{ ...inputStyle, appearance: "none" }}
                    >
                      <option>Disney &amp; theme parks</option>
                      <option>Cruise</option>
                      <option>Beach resort / all-inclusive</option>
                      <option>Flights + hotel package</option>
                      <option>Not sure yet — surprise us</option>
                    </select>
                  </Field>
                  <Field label="WHO'S GOING?" htmlFor="tr-party" required error={fieldErrors.party}>
                    <input
                      id="tr-party"
                      type="text"
                      placeholder="2 adults, 2 kids (4 &amp; 7)"
                      value={form.party}
                      onChange={setField("party")}
                      aria-invalid={!!fieldErrors.party}
                      style={withError(inputStyle, fieldErrors.party)}
                    />
                  </Field>
                </div>
                <Field label="TRIP DETAILS" htmlFor="tr-notes" required error={fieldErrors.notes}>
                  <textarea
                    id="tr-notes"
                    placeholder={
                      NOTES_PLACEHOLDERS[form.tripType] || NOTES_DEFAULT_PLACEHOLDER
                    }
                    value={form.notes}
                    onChange={setField("notes")}
                    rows={3}
                    aria-invalid={!!fieldErrors.notes}
                    style={{
                      ...withError(inputStyle, fieldErrors.notes),
                      borderRadius: 18,
                      padding: "14px 18px",
                      resize: "vertical",
                    }}
                  />
                </Field>
                {/* Honeypot — hidden from humans, bots fill it and get discarded */}
                <input
                  type="text"
                  value={form.honeypot}
                  onChange={setField("honeypot")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: -9999, height: 0, width: 0, opacity: 0 }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Button
                    size="lg"
                    disabled={formState === "sending"}
                    onClick={submitRequest}
                  >
                    {formState === "sending" ? "Sending…" : "Send trip request ✈"}
                  </Button>
                </div>
                {formError && (
                  <p style={{ margin: 0, fontSize: 14, color: "var(--color-danger)" }}>
                    {formError}
                  </p>
                )}
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
      <SiteFooter />
    </div>
  );
}
