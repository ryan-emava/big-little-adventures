import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { usePageTitle } from "../lib/usePageTitle.js";
import { Card, CardSection, CategoryHero, FaqStrip } from "./TripCategoryUI.jsx";
import TripRequestForm, { TRIP_TYPE_BY_SLUG } from "./TripRequestForm.jsx";

const TRIP = "disney";

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
    blurb: "Skip-the-line timing planned so you ride more and melt down less.",
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

export default function DisneyParksPage() {
  usePageTitle("Disney & parks");

  return (
    <div style={{ background: "var(--cream-100)", minHeight: "100vh", overflowX: "clip" }}>
      <SiteHeader />

      <CategoryHero
        stamp="DISNEY & PARKS"
        heading={
          <>
            The parks, planned around your{" "}
            <span style={{ fontFamily: "var(--font-script)", color: "var(--coral-500)", fontSize: 66 }}>
              people
            </span>
            .
          </>
        }
      >
        Ride strategy, dining reservations, the right resort, and Lightning Lane
        timing — sorted, so your days feel like a vacation instead of a logistics
        project.
      </CategoryHero>

      <CardSection eyebrow="WHAT WE HANDLE" heading="Every fiddly detail, handled" background="var(--white)">
        {HANDLES.map((h) => (
          <Card key={h.title} title={h.title}>
            {h.blurb}
          </Card>
        ))}
      </CardSection>

      <CardSection
        eyebrow="WHERE TO?"
        heading="Parks we plan most"
        footer={
          <>
            Dreaming bigger — Disneyland Paris, Tokyo, or a Disney Cruise?{" "}
            <a href="#request" style={{ color: "var(--coral-500)", fontWeight: 600 }}>
              Tell us the plan
            </a>{" "}
            and we'll take it from there.
          </>
        }
      >
        {PARKS.map((p) => (
          <Card key={p.name} title={p.name} kicker={p.place}>
            {p.blurb}
          </Card>
        ))}
      </CardSection>

      <CardSection eyebrow="WHY A REAL PLANNER" heading="A booking site can't do this" background="var(--white)">
        {WHY.map((w) => (
          <Card key={w.title} title={w.title}>
            {w.blurb}
          </Card>
        ))}
      </CardSection>

      <FaqStrip heading="Wondering when to start — or if the kids need passports?">
        The FAQ covers planning timelines, deposits, travel protection, and
        documents for international parks.
      </FaqStrip>

      <TripRequestForm defaultTripType={TRIP_TYPE_BY_SLUG[TRIP]} />

      <SiteFooter />
    </div>
  );
}
