import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Home from "./components/Home.jsx";
import TripPage from "./components/TripPage.jsx";
import ClientTripsPage from "./components/ClientTripsPage.jsx";
import DisneyParksPage from "./components/DisneyParksPage.jsx";
import FaqPage from "./components/FaqPage.jsx";
import PrivacyPage from "./components/PrivacyPage.jsx";
import TermsPage from "./components/TermsPage.jsx";
import NotFound from "./components/NotFound.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips/disney" element={<DisneyParksPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/client/:clientId/trips" element={<ClientTripsPage />} />
        <Route path="/client/:clientId/trips/:guid" element={<TripPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
