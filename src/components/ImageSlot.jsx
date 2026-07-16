/**
 * ImageSlot — image placeholder.
 *
 * The original static site used a drag-and-drop <image-slot> web component whose
 * dropped photos lived in localStorage (never in files). For production, pass a
 * real `src` (drop your photo in src/assets and import it) — the slot then renders
 * a plain <img>. With no `src` it shows the dashed empty-state placeholder.
 *
 * Pass `webp` alongside `src` to serve an optimized WebP with the `src` (e.g. a
 * JPEG) as the fallback. Set `priority` for above-the-fold images like the hero
 * so the browser fetches them eagerly at high priority (better LCP).
 */
export default function ImageSlot({
  src,
  webp,
  alt = "",
  shape = "rounded",
  radius = 22,
  priority = false,
  placeholder = "Drop an image",
}) {
  const borderRadius = shape === "circle" ? "50%" : radius;

  if (src) {
    const imgStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius,
      display: "block",
    };
    const img = (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={imgStyle}
      />
    );
    if (webp) {
      return (
        <picture style={{ display: "block", width: "100%", height: "100%" }}>
          <source srcSet={webp} type="image/webp" />
          {img}
        </picture>
      );
    }
    return img;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 12,
        boxSizing: "border-box",
        borderRadius,
        background: "#f2f1ef",
        color: "#6e6c66",
        border: "1.5px dashed rgba(0,0,0,.25)",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        userSelect: "none",
      }}
    >
      {placeholder}
    </div>
  );
}
