import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import QuotesList from "./components/QuotesList.jsx";
import QuotePage from "./components/QuotePage.jsx";
import TripPage from "./components/TripPage.jsx";
import ClientTripsPage from "./components/ClientTripsPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quotes" element={<QuotesList />} />
      <Route path="/quotes/:slug" element={<QuotePage />} />
      <Route path="/client/:clientId/trips" element={<ClientTripsPage />} />
      <Route path="/client/:clientId/trips/:guid" element={<TripPage />} />
    </Routes>
  );
}
