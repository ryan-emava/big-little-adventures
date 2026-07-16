import { useState } from "react";

const sizeStyles = {
  sm: { padding: "8px 18px", fontSize: "14px" },
  md: { padding: "12px 24px", fontSize: "16px" },
  lg: { padding: "16px 32px", fontSize: "18px" },
};

const variantStyles = {
  primary: {
    background: "var(--color-accent)",
    color: "var(--color-text-on-accent)",
    border: "none",
  },
  brand: {
    background: "var(--color-brand)",
    color: "var(--color-text-on-brand)",
    border: "none",
  },
  secondary: {
    background: "var(--white)",
    color: "var(--color-brand)",
    border: "2px solid var(--color-brand)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-brand)",
    border: "none",
  },
};

const hoverBg = {
  primary: "var(--color-accent-hover)",
  brand: "var(--color-brand-hover)",
  secondary: "var(--peach-100)",
  ghost: "var(--peach-100)",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  style,
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const v = variantStyles[variant] || variantStyles.primary;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        borderRadius: "var(--radius-pill)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition:
          "background var(--duration-standard) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)",
        transform: active && !disabled ? "scale(0.97)" : "scale(1)",
        ...sizeStyles[size],
        ...v,
        background:
          hover && !disabled && variant !== "secondary"
            ? hoverBg[variant]
            : v.background,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
