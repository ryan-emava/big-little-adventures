import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Home from "./components/Home.jsx";
import QuotesList from "./components/QuotesList.jsx";
import QuotePage from "./components/QuotePage.jsx";
import TripPage from "./components/TripPage.jsx";
import ClientTripsPage from "./components/ClientTripsPage.jsx";
import PrivacyPage from "./components/PrivacyPage.jsx";
import TermsPage from "./components/TermsPage.jsx";
import NotFound from "./components/NotFound.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotes" element={<QuotesList />} />
        <Route path="/quotes/:slug" element={<QuotePage />} />
        <Route path="/client/:clientId/trips" element={<ClientTripsPage />} />
        <Route path="/client/:clientId/trips/:guid" element={<TripPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
