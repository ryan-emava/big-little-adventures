import { Link, useSearchParams } from "react-router-dom";
import Button from "../ds/Button.jsx";
import { StampTag } from "../ds/Badge.jsx";
import ImageSlot from "./ImageSlot.jsx";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import TripRequestForm, { TRIP_TYPE_BY_SLUG } from "./TripRequestForm.jsx";
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

export default function Home({ showSunburst = false }) {
  usePageTitle("");
  const [searchParams] = useSearchParams();
  const defaultTripType =
    TRIP_TYPE_BY_SLUG[searchParams.get("trip")] || "Disney & theme parks";

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
      <TripRequestForm id="request" defaultTripType={defaultTripType} />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
