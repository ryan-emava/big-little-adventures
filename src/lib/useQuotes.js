import { useEffect, useState } from "react";
import { fetchQuotes, fetchQuote } from "./quotes.js";

// All quotes. Returns { quotes, loading, error }.
export function useQuotes() {
  const [quotes, setQuotes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchQuotes()
      .then((q) => alive && setQuotes(q))
      .catch((e) => alive && setError(e));
    return () => {
      alive = false;
    };
  }, []);

  return { quotes, loading: quotes === null && !error, error };
}

// A single quote by slug. `quote` is undefined while loading, null if not found.
export function useQuote(slug) {
  const [quote, setQuote] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setQuote(undefined);
    setError(null);
    fetchQuote(slug)
      .then((q) => alive && setQuote(q))
      .catch((e) => alive && setError(e));
    return () => {
      alive = false;
    };
  }, [slug]);

  return { quote, loading: quote === undefined && !error, error };
}
