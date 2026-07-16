/**
 * ImageSlot — image placeholder.
 *
 * The original static site used a drag-and-drop <image-slot> web component whose
 * dropped photos lived in localStorage (never in files). For production, pass a
 * real `src` (drop your photo in src/assets and import it) — the slot then renders
 * a plain <img>. With no `src` it shows the dashed empty-state placeholder.
 */
export default function ImageSlot({
  src,
  alt = "",
  shape = "rounded",
  radius = 22,
  placeholder = "Drop an image",
}) {
  const borderRadius = shape === "circle" ? "50%" : radius;

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius,
          display: "block",
        }}
      />
    );
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
