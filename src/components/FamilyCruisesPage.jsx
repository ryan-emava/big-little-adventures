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

const TRIP = "cruise";

const HANDLES = [
  {
    title: "The right cabin",
    blurb:
      "Inside vs. balcony, connecting rooms, or a suite with room for the crew — matched to your budget.",
  },
  {
    title: "Dining & drink packages",
    blurb:
      "Fixed or flexible dining, specialty restaurants, and whether a drink package actually pays off.",
  },
  {
    title: "Shore excursions",
    blurb:
      "Ship tours vs. trusted local operators, planned around port timing and little-kid stamina.",
  },
  {
    title: "Kids clubs & ages",
    blurb:
      "Which ships have the best kids clubs, nurseries, and teen spaces for the ages you're traveling with.",
  },
  {
    title: "Embarkation logistics",
    blurb:
      "Flights, pre-cruise hotels, transfers, and getting a family of five onto the ship without the stress.",
  },
  {
    title: "Deals & perks",
    blurb:
      "Onboard credit, kids-sail-free promos, and package options that are easy to miss on your own.",
  },
];

// The user asked these lines be named specifically.
const LINES = [
  {
    name: "Carnival",
    tag: "Fun & easygoing",
    blurb:
      "Casual, budget-friendly Fun Ships — a great first cruise for families who want value and a party atmosphere.",
  },
  {
    name: "Royal Caribbean",
    tag: "Big-ship adventure",
    blurb:
      "Waterslides, surf simulators, rock walls — the most to do at sea, ideal for active kids and teens.",
  },
  {
    name: "Norwegian",
    tag: "Freestyle flexibility",
    blurb:
      "No fixed dining times or dress codes. Come-and-go freedom that suits families who hate a rigid schedule.",
  },
  {
    name: "Disney Cruise Line",
    tag: "Family magic",
    blurb:
      "Character experiences, standout kids clubs, and a private island. Premium, and worth it for Disney-loving families.",
  },
  {
    name: "Princess",
    tag: "Relaxed & scenic",
    blurb:
      "A calmer, elegant feel with fantastic itineraries — a favorite for Alaska and multigenerational trips.",
  },
  {
    name: "…and more",
    tag: "Whatever fits",
    blurb:
      "Celebrity, MSC, Holland America, Virgin Voyages and beyond — we'll match the line to your family, not the other way around.",
  },
];

const WHY = [
  {
    title: "Same fare, more backup",
    blurb:
      "Cruise fares are the same as booking direct. You just also get someone who knows the ships deck by deck.",
  },
  {
    title: "The right ship for your ages",
    blurb:
      "A toddler, a teen, and grandparents want very different cruises. We find the one that works for everyone.",
  },
  {
    title: "Support if a port changes",
    blurb:
      "Itinerary swaps, weather, a missed excursion — you've got us in your corner, not a call center.",
  },
];

export default function FamilyCruisesPage() {
  usePageTitle("Family cruises");

  return (
    <div style={{ background: "var(--cream-100)", minHeight: "100vh", overflowX: "clip" }}>
      <SiteHeader />

      <CategoryHero
        stamp="FAMILY CRUISES"
        trip={TRIP}
        heading={
          <>
            Unpack once, wake up somewhere{" "}
            <span style={{ fontFamily: "var(--font-script)", color: "var(--coral-500)", fontSize: 66 }}>
              new
            </span>
            .
          </>
        }
      >
        Cabins, dining, shore days, and kids clubs — matched to your family and
        your budget, so everyone from the toddler to grandpa has their kind of fun.
      </CategoryHero>

      <CardSection eyebrow="WHAT WE HANDLE" heading="From cabin to gangway, sorted" background="var(--white)">
        {HANDLES.map((h) => (
          <Card key={h.title} title={h.title}>
            {h.blurb}
          </Card>
        ))}
      </CardSection>

      <CardSection
        eyebrow="THE LINES WE BOOK"
        heading="Every major cruise line"
        footer={
          <>
            Not sure which line fits?{" "}
            <Link to={tripRequestHref(TRIP)} style={{ color: "var(--coral-500)", fontWeight: 600 }}>
              Tell us who's sailing
            </Link>{" "}
            and we'll point you to the right ship.
          </>
        }
      >
        {LINES.map((l) => (
          <Card key={l.name} title={l.name} kicker={l.tag}>
            {l.blurb}
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

      <FaqStrip heading="Do we need passports for a cruise?">
        The FAQ covers closed-loop sailings, when passports are (and aren't)
        required, travel protection, and deposit timelines.
      </FaqStrip>

      <FinalCta
        trip={TRIP}
        headline={
          <>
            Ready to set{" "}
            <span style={{ fontFamily: "var(--font-script)", color: "var(--coral-400)", fontSize: 46 }}>
              sail
            </span>
            ?
          </>
        }
      >
        Tell us who's cruising and where you're dreaming of. Katie replies within
        one business day — free to ask, always.
      </FinalCta>

      <SiteFooter />
    </div>
  );
}
