import { Link, useParams, useSearchParams } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { toDisplayTrip } from "../lib/tripFormat.js";
import { useClientTrips } from "../lib/useClientTrips.js";
import { usePageTitle } from "../lib/usePageTitle.js";
import { SkeletonCard } from "./Skeleton.jsx";
import LoadErrorNotice from "./LoadErrorNotice.jsx";

export default function ClientTripsPage() {
  const { clientId } = useParams();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const { trips, loading, error } = useClientTrips(clientId, status);
  const clientTrips = Object.entries(trips || {}).map(([guid, data]) => ({
    guid,
    data,
  }));

  // Client name now lives directly on each trip record.
  const clientName = clientTrips[0]?.data?.client || "Your Trips";
  usePageTitle(loading ? null : "Your Trip Quotes");

  return (
    <div
      style={{
        background: "var(--cream-100)",
        minHeight: "100vh",
        overflowX: "clip",
      }}
    >
      <SiteHeader />

      <div
        style={{ padding: "64px 56px 80px", maxWidth: 1100, margin: "0 auto" }}
      >
        {/* Page heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginBottom: 48,
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
            TRIP QUOTES
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
            {clientName}
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "var(--ink-600)",
              margin: 0,
              maxWidth: 520,
            }}
          >
            Your personalised quotes are below — review each option and let us
            know which adventure calls to you.
          </p>
        </div>

        {/* Trip cards */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : error ? (
          <LoadErrorNotice error={error} what="your trips" />
        ) : clientTrips.length === 0 ? (
          <div
            style={{
              background: "var(--white)",
              borderRadius: 22,
              boxShadow: "0 4px 24px rgba(15,92,102,0.10)",
              padding: "32px 36px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 28,
                color: "var(--teal-800)",
              }}
            >
              No trips found
            </div>
            <p style={{ margin: "12px 0 0", color: "var(--ink-600)" }}>
              This client doesn’t have any quotes yet.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {clientTrips.map((trip) => {
            const d = toDisplayTrip(trip.data);
            const overview = d?.overview;
            const travelers = d?.travelers;
            const pricing = d?.pricing;
            const hotel = d?.hotel;

            return (
              <Link
                key={trip.guid}
                to={`/client/${clientId}/trips/${trip.guid}${status ? `?status=${encodeURIComponent(status)}` : ""}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "var(--white)",
                    borderRadius: 22,
                    boxShadow: "0 4px 24px rgba(15,92,102,0.10)",
                    padding: "32px 36px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 32,
                    flexWrap: "wrap",
                    transition: "box-shadow 150ms ease, transform 150ms ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 36px rgba(15,92,102,0.18)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 24px rgba(15,92,102,0.10)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Left: destination info */}
                  <div
                    style={{
                      flex: "1 1 280px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: 12,
                        letterSpacing: "0.18em",
                        color: "var(--coral-500)",
                      }}
                    >
                      {(overview?.destination || overview?.headline || "Trip option").toUpperCase()}
                    </span>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 28,
                        color: "var(--teal-800)",
                        lineHeight: 1.1,
                      }}
                    >
                      {overview?.headline || "Trip option"}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-script)",
                        fontSize: 20,
                        color: "var(--coral-500)",
                      }}
                    >
                      {overview?.subhead}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px 20px",
                        marginTop: 8,
                      }}
                    >
                      {travelers?.dateRange && (
                        <span style={{ fontSize: 13, color: "var(--ink-600)" }}>
                          📅 {travelers.dateRange}
                        </span>
                      )}
                      {travelers?.count && (
                        <span style={{ fontSize: 13, color: "var(--ink-600)" }}>
                          👥 {travelers.count}
                        </span>
                      )}
                      {hotel?.name && (
                        <span style={{ fontSize: 13, color: "var(--ink-600)" }}>
                          🏨 {hotel.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: price + CTA */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 6,
                    }}
                  >
                    {pricing?.totalPrice && (
                      <>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 11,
                            letterSpacing: "0.14em",
                            color: "var(--ink-400)",
                          }}
                        >
                          TOTAL PRICE
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: 34,
                            color: "var(--coral-500)",
                            lineHeight: 1,
                          }}
                        >
                          {pricing.totalPrice}
                        </span>
                        <span style={{ fontSize: 12, color: "var(--ink-400)" }}>
                          incl. taxes &amp; fees
                        </span>
                      </>
                    )}
                    <span
                      style={{
                        marginTop: 10,
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "var(--teal-800)",
                        background: "var(--cream-100)",
                        borderRadius: 999,
                        padding: "8px 20px",
                        border: "2px solid var(--teal-800)",
                      }}
                    >
                      View quote →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
          </div>
        )}

      </div>

      <SiteFooter />
    </div>
  );
}


