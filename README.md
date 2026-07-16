# Big Little Adventures — Site

Vite + React single-page marketing site.

## Getting started

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Deploy: build with `npm run build` and serve `dist/` (Vercel: framework preset "Vite").

## Structure

- `index.html` — Vite entry, mounts `#root`
- `src/main.jsx` — React entry, imports global CSS
- `src/App.jsx` — renders the `Home` page
- `src/components/`
  - `Home.jsx` — the homepage (hero, services, how-it-works, about, testimonials, inquiry form)
  - `SiteHeader.jsx` / `SiteFooter.jsx` — reusable header/footer
  - `ImageSlot.jsx` — image placeholder (see Notes)
- `src/ds/` — design-system components ported to React: `Button`, `Badge`/`StampTag`, `Barcode`
- `src/styles/`
  - `global.css` — global + responsive styles, imports the token files
  - `tokens/` — design tokens (colors, typography, spacing, fonts)
- `src/assets/` — images (sun.png)

## Adding a page

The site is currently single-page. To add routes, install `react-router-dom`, wrap `App` in a router, and reuse `SiteHeader` / `SiteFooter` in each page component.

## Notes

- `ImageSlot` renders a dashed placeholder when it has no `src`. For production, drop your photo in `src/assets/`, `import` it, and pass it as `src` — the slot then renders a real `<img>`.
- The inquiry form is front-end only (it just flips to a "received" confirmation). Wire the submit handler in `Home.jsx` to your form backend (Formspree, a Vercel serverless function, etc.).
- The original design-tool source (`*.dc.html`, `support.js`, `image-slot.js`, `_ds/`) has been superseded by this React app. The design tokens now live in `src/styles/tokens/`.
