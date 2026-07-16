import { Link, useParams } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import Barcode from "../ds/Barcode.jsx";
import { StampTag } from "../ds/Badge.jsx";
import { useQuote } from "../lib/useQuotes.js";

const subpageLinks = [
  { label: "Trips", href: "/#trips" },
  { label: "How it works", href: "/#how" },
  { label: "About", href: "/#about" },
];

export default function QuotePage() {
  const { slug } = useParams();
  const { quote, loading, error } = useQuote(slug);

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
        style={{ padding: "64px 56px 80px", maxWidth: 760, margin: "0 auto" }}
      >
        <Link
          to="/quotes"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 14,
            color: "var(--coral-500)",
            textDecoration: "none",
          }}
        >
          ← All reviews
        </Link>

        {loading && (
          <p
            style={{
              marginTop: 40,
              textAlign: "center",
              color: "var(--ink-400)",
            }}
          >
            Loading…
          </p>
        )}

        {!loading && error && (
          <p
            style={{
              marginTop: 40,
              textAlign: "center",
              color: "var(--ink-400)",
            }}
          >
            This review is taking a moment to load. Please try again shortly.
          </p>
        )}

        {!loading && !error && quote === null && (
          <div
            style={{
              marginTop: 60,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 34,
                color: "var(--teal-800)",
                margin: 0,
              }}
            >
              Review not found
            </h1>
            <p style={{ color: "var(--ink-600)", margin: 0 }}>
              We couldn’t find that review.
            </p>
            <Link
              to="/quotes"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--coral-500)",
              }}
            >
              Browse all reviews →
            </Link>
          </div>
        )}

        {!loading && !error && quote && (
          <div
            style={{
              marginTop: 28,
              background: "var(--white)",
              borderRadius: 22,
              boxShadow: "0 18px 44px rgba(15,92,102,0.14)",
              padding: "48px 44px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <StampTag>GUEST REVIEW</StampTag>

            {quote.photo && (
              <img
                src={quote.photo}
                alt={quote.author}
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 28,
                lineHeight: 1.4,
                color: "var(--ink-900)",
                margin: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontSize: 40,
                  color: "var(--coral-500)",
                }}
              >
                "
              </span>
              {quote.text}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--teal-800)",
                }}
              >
                {quote.author}
              </span>
              {quote.trip && (
                <span
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: 22,
                    color: "var(--coral-500)",
                  }}
                >
                  {quote.trip}
                </span>
              )}
            </div>

            <div
              style={{
                borderTop: "2px dashed var(--line-300)",
                paddingTop: 24,
                marginTop: 8,
              }}
            >
              <Barcode code={`BLA · ${(quote.slug || "").toUpperCase()}`} />
            </div>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
