# Media Requirements (for the trkit CRM)

Hotel photos currently serve through `/api/public/v1/media/:path` — a function
invocation per image, no edge caching. That's why loading feels slow. Three changes,
in priority order. The site needs **zero changes** for any of this — it renders
whatever `url`/`thumb_url` the API sends.

## 1. Serve photos from Supabase Storage's public CDN (biggest win)

Quote-page hotel photos aren't sensitive — make their bucket public and stop
proxying them through the API:

- Make the media bucket **public** (or move trip photos to a public `trip-media`
  bucket).
- When building a photo object's `url` / `thumb_url`, use the storage public URL
  (`supabase.storage.from('trip-media').getPublicUrl(path)`) instead of the
  `/api/public/v1/media/...` route. Public storage URLs are served from Supabase's
  CDN with edge caching worldwide.
- On upload, set the file's cache control: `upload(path, file, { cacheControl:
  '31536000', contentType: 'image/webp' })`. Paths are content-addressed UUIDs that
  never change, so year-long immutable caching is safe — each photo downloads once
  per client, ever.
- Keep the existing API media route working until old photo records are re-pointed,
  then retire it. If it must stay for anything, add
  `Cache-Control: public, max-age=31536000, immutable` to its responses.

## 2. Transcode to two derivatives at upload

Do the resizing in the **admin app at upload time** (canvas: `createImageBitmap` →
draw → `toBlob('image/webp', q)`) — no server infrastructure needed:

| Derivative | Spec | Target size | Used for |
|---|---|---|---|
| `thumb` | 480px longest edge, WebP q0.7 | ~20–40KB | photo strip + lightbox rail |
| `display` | 1600px longest edge, WebP q0.75 | ~150–250KB | lightbox full view |

- Upload both; record `width`/`height` of the **display** version in the photo
  object (the API already has these fields).
- Discard the original (or keep it in a private bucket if you want re-derives
  later). Never serve it as `url`.

## 3. Guardrails

- Reject uploads over **10MB** pre-transcode with a friendly message.
- Cap **10 photos per trip** in the admin UI — protects page weight and forces
  curation.
- Accept jpg/png/heic/webp inputs; always output WebP.

## Response shape — unchanged

```jsonc
"photos": [
  {
    "id": "…",
    "url": "https://<project>.supabase.co/storage/v1/object/public/trip-media/…/x.webp",
    "thumb_url": "https://…/x_thumb.webp",
    "width": 1600, "height": 900
  }
]
```

Only the URL host changes; the site renders it as-is.
