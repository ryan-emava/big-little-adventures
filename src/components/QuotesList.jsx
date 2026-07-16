import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { useQuotes } from "../lib/useQuotes.js";

// From a subpage, nav links point back to the homepage sections.
const subpageLinks = [
  { label: "Trips", href: "/#trips" },
  { label: "How it works", href: "/#how" },
  { label: "About", href: "/#about" },
];

export default function QuotesList() {
  const { quotes, loading, error } = useQuotes();

  return (
    <div
      style={{
        background: "var(--cream-100)",
        minHeight: "100vh",
        overflowX: "clip",
      }}
    >
      <SiteHeader homeHref="/" links={subpageLinks} ctaHref="/#request" />

      <div
        data-section
        style={{ padding: "64px 56px 80px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginBottom: 44,
            textAlign: "center",
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
            HAPPY TRAVELERS
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 44,
              color: "var(--teal-800)",
              margin: 0,
            }}
          >
            Reviews from real families
          </h1>
        </div>

        {loading && (
          <p style={{ textAlign: "center", color: "var(--ink-400)" }}>
            Loading reviews…
          </p>
        )}
        {error && (
          <p style={{ textAlign: "center", color: "var(--ink-400)" }}>
            Reviews are taking a moment to load. Please try again shortly.
          </p>
        )}
        {quotes && quotes.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--ink-400)" }}>
            No reviews yet — check back soon!
          </p>
        )}

        {quotes && quotes.length > 0 && (
          <div
            id="quotes-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            {quotes.map((q) => (
              <Link
                key={q.slug}
                to={`/quotes/${q.slug}`}
                style={{
                  textDecoration: "none",
                  background: "var(--cream-050)",
                  borderRadius: 22,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
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
                  {q.author}
                  {q.trip ? ` · ${q.trip}` : ""}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
