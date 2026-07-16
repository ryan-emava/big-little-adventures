// Client-side helpers that talk to the /api/quotes serverless function.

export async function fetchQuotes() {
  const r = await fetch("/api/quotes");
  if (!r.ok) throw new Error(`Failed to load quotes (${r.status})`);
  return r.json();
}

export async function fetchQuote(slug) {
  const r = await fetch(`/api/quotes?slug=${encodeURIComponent(slug)}`);
  if (!r.ok) throw new Error(`Failed to load quote (${r.status})`);
  return r.json(); // the quote object, or null if no match
}
