import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { usePageTitle } from "../lib/usePageTitle.js";
import {
  Card,
  CardSection,
  CategoryHero,
  FaqStrip,
  FinalCta,
  tripRequestHref,
} from "./TripCategoryUI.jsx";

const TRIP = "beach";

const HANDLES = [
  {
    title: "The right resort",
    blurb:
      "Family-friendly or adults-only, big splashy pools or quiet coves — matched to who's coming and your budget.",
  },
  {
    title: "Room category",
    blurb:
      "Swim-up suites, connecting rooms, club level with its own perks — we translate the fine print into plain English.",
  },
  {
    title: "Dining & inclusions",
    blurb:
      "Which à la carte restaurants need reservations, what's truly included, and where the hidden fees hide.",
  },
  {
    title: "Kids & the grown-ups",
    blurb:
      "Kids clubs, water parks, and splash zones — plus adults-only pools and spas so everyone gets their version of relaxing.",
  },
  {
    title: "Transfers & extras",
    blurb:
      "Airport transfers, excursions, and celebrations (birthdays, anniversaries) arranged before you land.",
  },
  {
    title: "Deals & upgrades",
    blurb:
      "Resort credits, free-night promos, and upgrade offers that are easy to miss booking on your own.",
  },
];

const DESTINATIONS = [
  {
    name: "Cancún & Riviera Maya",
    place: "Mexico",
    blurb:
      "The all-inclusive capital — the widest range of family resorts, short flights, and reliable sunshine.",
  },
  {
    name: "Punta Cana",
    place: "Dominican Republic",
    blurb:
      "Miles of palm-lined beach and great value, with big family resorts and easy nonstop flights.",
  },
  {
    name: "Jamaica",
    place: "Caribbean",
    blurb:
      "Laid-back island charm, family favorites with water parks, and adults-only escapes side by side.",
  },
];

const WHY = [
  {
    title: "Same price, real guidance",
    blurb:
      "Resort pricing matches the big booking sites. You just also get someone who's compared them room by room.",
  },
  {
    title: "The right fit, not the flashiest",
    blurb:
      "\"All-inclusive\" means wildly different things. We steer you to the resort that actually fits your family.",
  },
  {
    title: "We're there if plans wobble",
    blurb:
      "A flight delay, a room that's wrong, a weather week — you've got us, not a call center on hold music.",
  },
];

export default function BeachResortsPage() {
  usePageTitle("Beach & all-inclusive");

  return (
    <div style={{ background: "var(--cream-100)", minHeight: "100vh", overflowX: "clip" }}>
      <SiteHeader />

      <CategoryHero
        stamp="BEACH & ALL-INCLUSIVE"
        trip={TRIP}
        heading={
          <>
            Toes in the sand, wallet{" "}
            <span style={{ fontFamily: "var(--font-script)", color: "var(--coral-500)", fontSize: 66 }}>
              zipped
            </span>{" "}
            shut.
          </>
        }
      >
        One price covers the room, the meals, the drinks, and the kids clubs — and
        we match you to the resort where the hardest choice is pool or ocean.
      </CategoryHero>

      <CardSection eyebrow="WHAT WE HANDLE" heading="The whole beach week, sorted" background="var(--white)">
        {HANDLES.map((h) => (
          <Card key={h.title} title={h.title}>
            {h.blurb}
          </Card>
        ))}
      </CardSection>

      <CardSection
        eyebrow="WHERE TO?"
        heading="Where we send families"
        footer={
          <>
            Somewhere else on the mood board — Turks & Caicos, the Bahamas, Hawaii?{" "}
            <Link to={tripRequestHref(TRIP)} style={{ color: "var(--coral-500)", fontWeight: 600 }}>
              Tell us the vibe
            </Link>{" "}
            and we'll find the spot.
          </>
        }
      >
        {DESTINATIONS.map((d) => (
          <Card key={d.name} title={d.name} kicker={d.place}>
            {d.blurb}
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

      <FaqStrip heading="Passports, deposits, travel protection?">
        The FAQ covers documents for international resorts, deposit and payment
        timelines, and whether travel protection is worth it.
      </FaqStrip>

      <FinalCta
        trip={TRIP}
        headline={
          <>
            Ready for some{" "}
            <span style={{ fontFamily: "var(--font-script)", color: "var(--coral-400)", fontSize: 46 }}>
              sunshine
            </span>
            ?
          </>
        }
      >
        Tell us who's coming and what "relaxing" looks like for your family. Katie
        replies within one business day — free to ask, always.
      </FinalCta>

      <SiteFooter />
    </div>
  );
}
