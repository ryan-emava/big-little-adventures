/* @ds-bundle: {"format":4,"namespace":"BigLittleAdventuresDesignSystem_28cc9f","components":[{"name":"Barcode","sourcePath":"components/brand/Barcode.jsx"},{"name":"SunBurst","sourcePath":"components/brand/SunBurst.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"StampTag","sourcePath":"components/feedback/Badge.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"BoardingPassCard","sourcePath":"components/layout/BoardingPassCard.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/Barcode.jsx":"2068e26450ff","components/brand/SunBurst.jsx":"0ce2f9216ae1","components/brand/Wordmark.jsx":"51b5beb5548d","components/feedback/Badge.jsx":"bba82e038228","components/feedback/Tooltip.jsx":"feb4b451f931","components/forms/Button.jsx":"a727bb202695","components/forms/Checkbox.jsx":"e40d3af1f6bf","components/forms/Input.jsx":"eac663c24d86","components/forms/Switch.jsx":"dc0588f297fa","components/layout/BoardingPassCard.jsx":"d4e74b090e4c","components/layout/Card.jsx":"98d540a585fe","components/navigation/Tabs.jsx":"521b81cf2201","ui_kits/marketing-site/ComingSoonPage.jsx":"4a68f19bffae"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {
  const __ds_ns = (window.BigLittleAdventuresDesignSystem_28cc9f =
    window.BigLittleAdventuresDesignSystem_28cc9f || {});

  const __ds_scope = {};

  __ds_ns.__errors = __ds_ns.__errors || [];

  // components/brand/Barcode.jsx
  try {
    (() => {
      function Barcode({ code = "BLA · EST · 2026", style }) {
        const bars = React.useMemo(() => {
          let seed = 42;
          const rand = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
          };
          return Array.from({
            length: 38,
          }).map(() => (rand() > 0.5 ? 3 : 1.5));
        }, []);
        return /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              ...style,
            },
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 2,
                alignItems: "flex-end",
                height: 44,
              },
            },
            bars.map((w, i) =>
              /*#__PURE__*/ React.createElement("span", {
                key: i,
                style: {
                  width: w,
                  height: "100%",
                  background: "var(--color-brand)",
                },
              }),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "var(--tracking-widest)",
                color: "var(--color-text-muted)",
                marginTop: 6,
                textAlign: "center",
              },
            },
            code,
          ),
        );
      }
      Object.assign(__ds_scope, { Barcode });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/brand/Barcode.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/brand/SunBurst.jsx
  try {
    (() => {
      function SunBurst({ size = 120, style }) {
        const ray = {
          position: "absolute",
          background: "var(--color-accent)",
          borderRadius: "var(--radius-pill)",
        };
        return /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              position: "relative",
              width: size,
              height: size,
              ...style,
            },
          },
          /*#__PURE__*/ React.createElement("div", {
            style: {
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "var(--color-accent)",
            },
          }),
          /*#__PURE__*/ React.createElement("div", {
            style: {
              ...ray,
              width: size * 0.22,
              height: size * 0.06,
              left: -size * 0.28,
              top: size * 0.5,
              transform: "rotate(16deg)",
            },
          }),
          /*#__PURE__*/ React.createElement("div", {
            style: {
              ...ray,
              width: size * 0.06,
              height: size * 0.22,
              left: size * 0.03,
              top: size * 1.02,
            },
          }),
        );
      }
      Object.assign(__ds_scope, { SunBurst });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/brand/SunBurst.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/brand/Wordmark.jsx
  try {
    (() => {
      function Wordmark({ size = 40, style }) {
        return /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              textAlign: "center",
              ...style,
            },
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                display: "inline-flex",
                alignItems: "baseline",
                gap: size * 0.18,
              },
            },
            /*#__PURE__*/ React.createElement(
              "span",
              {
                style: {
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: size,
                  lineHeight: 1,
                  color: "var(--color-brand)",
                },
              },
              "big",
            ),
            /*#__PURE__*/ React.createElement(
              "span",
              {
                style: {
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  fontSize: size * 1.08,
                  lineHeight: 1,
                  color: "var(--color-accent)",
                },
              },
              "little",
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: size * 0.32,
                letterSpacing: "var(--tracking-widest)",
                color: "var(--color-brand)",
                marginTop: size * 0.05,
              },
            },
            "ADVENTURES",
          ),
        );
      }
      Object.assign(__ds_scope, { Wordmark });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/brand/Wordmark.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/feedback/Badge.jsx
  try {
    (() => {
      const toneStyles = {
        neutral: {
          background: "var(--teal-100)",
          color: "var(--teal-800)",
        },
        accent: {
          background: "var(--coral-100)",
          color: "var(--coral-700)",
        },
        brand: {
          background: "var(--teal-800)",
          color: "#fff",
        },
      };
      function Badge({ children, tone = "neutral", style }) {
        return /*#__PURE__*/ React.createElement(
          "span",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "var(--tracking-wide)",
              padding: "4px 12px",
              borderRadius: "var(--radius-pill)",
              ...toneStyles[tone],
              ...style,
            },
          },
          children,
        );
      }
      function StampTag({ children, style }) {
        return /*#__PURE__*/ React.createElement(
          "span",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "var(--tracking-wide)",
              padding: "6px 14px",
              borderRadius: "var(--radius-pill)",
              border: "2px solid var(--color-accent)",
              color: "var(--color-accent)",
              transform: "rotate(-4deg)",
              ...style,
            },
          },
          children,
        );
      }
      Object.assign(__ds_scope, { Badge, StampTag });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/feedback/Badge.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/feedback/Tooltip.jsx
  try {
    (() => {
      function Tooltip({ children, label, style }) {
        const [show, setShow] = React.useState(false);
        return /*#__PURE__*/ React.createElement(
          "span",
          {
            style: {
              position: "relative",
              display: "inline-flex",
            },
            onMouseEnter: () => setShow(true),
            onMouseLeave: () => setShow(false),
          },
          children,
          show &&
            /*#__PURE__*/ React.createElement(
              "span",
              {
                style: {
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--color-brand)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  padding: "6px 10px",
                  borderRadius: "var(--radius-sm)",
                  whiteSpace: "nowrap",
                  boxShadow: "var(--shadow-card-soft)",
                  ...style,
                },
              },
              label,
            ),
        );
      }
      Object.assign(__ds_scope, { Tooltip });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/feedback/Tooltip.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/forms/Button.jsx
  try {
    (() => {
      const sizeStyles = {
        sm: {
          padding: "8px 18px",
          fontSize: "14px",
        },
        md: {
          padding: "12px 24px",
          fontSize: "16px",
        },
        lg: {
          padding: "16px 32px",
          fontSize: "18px",
        },
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
      function Button({
        children,
        variant = "primary",
        size = "md",
        disabled = false,
        onClick,
        style,
      }) {
        const [hover, setHover] = React.useState(false);
        const [active, setActive] = React.useState(false);
        const v = variantStyles[variant] || variantStyles.primary;
        return /*#__PURE__*/ React.createElement(
          "button",
          {
            onClick: disabled ? undefined : onClick,
            disabled: disabled,
            onMouseEnter: () => setHover(true),
            onMouseLeave: () => {
              setHover(false);
              setActive(false);
            },
            onMouseDown: () => setActive(true),
            onMouseUp: () => setActive(false),
            style: {
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
            },
          },
          children,
        );
      }
      Object.assign(__ds_scope, { Button });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/forms/Button.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/forms/Checkbox.jsx
  try {
    (() => {
      function Checkbox({ checked, defaultChecked, onChange, label, style }) {
        const [internal, setInternal] = React.useState(defaultChecked || false);
        const isChecked = checked !== undefined ? checked : internal;
        const toggle = () => {
          if (checked === undefined) setInternal(!internal);
          onChange && onChange(!isChecked);
        };
        return /*#__PURE__*/ React.createElement(
          "label",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              ...style,
            },
          },
          /*#__PURE__*/ React.createElement(
            "span",
            {
              onClick: toggle,
              style: {
                width: 22,
                height: 22,
                borderRadius: "var(--radius-sm)",
                border: `2px solid ${isChecked ? "var(--color-accent)" : "var(--color-border-strong)"}`,
                background: isChecked ? "var(--color-accent)" : "var(--white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all var(--duration-fast) var(--ease-standard)",
                flexShrink: 0,
              },
            },
            isChecked &&
              /*#__PURE__*/ React.createElement(
                "svg",
                {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: "3",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                },
                /*#__PURE__*/ React.createElement("path", {
                  d: "M20 6L9 17l-5-5",
                }),
              ),
          ),
          label &&
            /*#__PURE__*/ React.createElement(
              "span",
              {
                style: {
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-primary)",
                },
              },
              label,
            ),
        );
      }
      Object.assign(__ds_scope, { Checkbox });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/forms/Checkbox.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/forms/Input.jsx
  try {
    (() => {
      function Input({
        placeholder = "be@paradise.com",
        type = "email",
        icon,
        onSubmit,
        style,
      }) {
        const [value, setValue] = React.useState("");
        const [focused, setFocused] = React.useState(false);
        return /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--white)",
              border: `2px solid ${focused ? "var(--color-accent)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-pill)",
              padding: "6px 8px 6px 20px",
              boxShadow: focused ? "var(--shadow-focus)" : "none",
              transition:
                "box-shadow var(--duration-standard) var(--ease-standard), border-color var(--duration-standard)",
              ...style,
            },
          },
          /*#__PURE__*/ React.createElement("input", {
            type: type,
            value: value,
            onChange: (e) => setValue(e.target.value),
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
            placeholder: placeholder,
            style: {
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              color: "var(--color-text-primary)",
              padding: "8px 0",
            },
          }),
          /*#__PURE__*/ React.createElement(
            "button",
            {
              onClick: () => onSubmit && onSubmit(value),
              "aria-label": "Submit",
              style: {
                width: 36,
                height: 36,
                flexShrink: 0,
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: "var(--color-accent)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              },
            },
            icon ||
              /*#__PURE__*/ React.createElement(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                },
                /*#__PURE__*/ React.createElement("path", {
                  d: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
                }),
              ),
          ),
        );
      }
      Object.assign(__ds_scope, { Input });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/forms/Input.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/forms/Switch.jsx
  try {
    (() => {
      function Switch({ checked, defaultChecked, onChange, style }) {
        const [internal, setInternal] = React.useState(defaultChecked || false);
        const isOn = checked !== undefined ? checked : internal;
        const toggle = () => {
          if (checked === undefined) setInternal(!internal);
          onChange && onChange(!isOn);
        };
        return /*#__PURE__*/ React.createElement(
          "button",
          {
            onClick: toggle,
            "aria-pressed": isOn,
            style: {
              width: 48,
              height: 28,
              borderRadius: "var(--radius-pill)",
              border: "none",
              padding: 3,
              background: isOn ? "var(--color-accent)" : "var(--line-300)",
              transition:
                "background var(--duration-standard) var(--ease-standard)",
              cursor: "pointer",
              display: "flex",
              justifyContent: isOn ? "flex-end" : "flex-start",
              ...style,
            },
          },
          /*#__PURE__*/ React.createElement("span", {
            style: {
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              transition:
                "transform var(--duration-standard) var(--ease-bounce)",
            },
          }),
        );
      }
      Object.assign(__ds_scope, { Switch });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/forms/Switch.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/layout/BoardingPassCard.jsx
  try {
    (() => {
      /**
       * The signature boarding-pass card: two stubs joined by a dashed perforation, flight-code
       * hero, detail row, and a barcode footer. This is the brand's core visual motif.
       */
      function BoardingPassCard({
        from = {
          code: "DRM",
          label: "Dreaming",
        },
        to = {
          code: "BKD",
          label: "Booked",
        },
        airline = "BIG LITTLE AIR",
        status = "ON TIME",
        details = [
          {
            label: "FLIGHT",
            value: "BLA-001",
          },
          {
            label: "GATE",
            value: "Opening soon",
          },
          {
            label: "SEAT",
            value: "Yours",
          },
          {
            label: "CLASS",
            value: "Family",
          },
        ],
        note,
        right,
        style,
      }) {
        return /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              display: "flex",
              background: "var(--white)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-card)",
              overflow: "hidden",
              fontFamily: "var(--font-body)",
              ...style,
            },
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                flex: "1 1 60%",
                padding: "var(--space-6) var(--space-8)",
                position: "relative",
              },
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "var(--space-6)",
                },
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  style: {
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "var(--tracking-widest)",
                    color: "var(--color-brand)",
                  },
                },
                airline,
              ),
              /*#__PURE__*/ React.createElement(
                "span",
                {
                  style: {
                    border: "2px solid var(--color-accent)",
                    color: "var(--color-accent)",
                    borderRadius: "var(--radius-pill)",
                    padding: "4px 12px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "var(--tracking-wide)",
                    transform: "rotate(-4deg)",
                  },
                },
                status,
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: "var(--space-4)",
                },
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "var(--text-2xl)",
                      color: "var(--color-brand)",
                      lineHeight: 1,
                    },
                  },
                  from.code,
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "var(--font-script)",
                      fontSize: 20,
                      color: "var(--color-accent)",
                    },
                  },
                  from.label,
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  style: {
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    minWidth: 60,
                  },
                },
                Array.from({
                  length: 7,
                }).map((_, i) =>
                  /*#__PURE__*/ React.createElement("span", {
                    key: i,
                    style: {
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--coral-400)",
                    },
                  }),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "var(--text-2xl)",
                      color: "var(--color-brand)",
                      lineHeight: 1,
                    },
                  },
                  to.code,
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "var(--font-script)",
                      fontSize: 20,
                      color: "var(--color-accent)",
                    },
                  },
                  to.label,
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  borderTop: "var(--border-hairline)",
                  paddingTop: "var(--space-4)",
                  display: "flex",
                  gap: "var(--space-8)",
                },
              },
              details.map((d) =>
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    key: d.label,
                  },
                  /*#__PURE__*/ React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 11,
                        letterSpacing: "var(--tracking-wide)",
                        color: "var(--color-text-muted)",
                        marginBottom: 2,
                      },
                    },
                    d.label,
                  ),
                  /*#__PURE__*/ React.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "var(--text-base)",
                        color: "var(--color-brand)",
                      },
                    },
                    d.value,
                  ),
                ),
              ),
            ),
            note &&
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  style: {
                    marginTop: "var(--space-5)",
                    background: "var(--color-bg-surface-soft)",
                    borderRadius: "var(--radius-md)",
                    padding: "var(--space-4) var(--space-5)",
                  },
                },
                note,
              ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                borderLeft: "var(--border-dashed)",
                padding: "var(--space-6) var(--space-8)",
                flex: "1 1 40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              },
            },
            right,
          ),
        );
      }
      Object.assign(__ds_scope, { BoardingPassCard });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/layout/BoardingPassCard.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/layout/Card.jsx
  try {
    (() => {
      function Card({ children, soft = false, style }) {
        return /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              background: soft
                ? "var(--color-bg-surface-soft)"
                : "var(--color-bg-surface)",
              borderRadius: "var(--radius-lg)",
              boxShadow: soft ? "none" : "var(--shadow-card-soft)",
              padding: "var(--space-6)",
              ...style,
            },
          },
          children,
        );
      }
      Object.assign(__ds_scope, { Card });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/layout/Card.jsx",
      error: String((e && e.message) || e),
    });
  }

  // components/navigation/Tabs.jsx
  try {
    (() => {
      function Tabs({ tabs, defaultActive = 0, onChange, style }) {
        const [active, setActive] = React.useState(defaultActive);
        const select = (i) => {
          setActive(i);
          onChange && onChange(i);
        };
        return /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              display: "inline-flex",
              gap: 4,
              background: "var(--cream-100)",
              padding: 4,
              borderRadius: "var(--radius-pill)",
              ...style,
            },
          },
          tabs.map((t, i) =>
            /*#__PURE__*/ React.createElement(
              "button",
              {
                key: t,
                onClick: () => select(i),
                style: {
                  border: "none",
                  cursor: "pointer",
                  padding: "9px 20px",
                  borderRadius: "var(--radius-pill)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 14,
                  transition:
                    "all var(--duration-standard) var(--ease-standard)",
                  background:
                    active === i ? "var(--color-brand)" : "transparent",
                  color: active === i ? "#fff" : "var(--color-text-secondary)",
                },
              },
              t,
            ),
          ),
        );
      }
      Object.assign(__ds_scope, { Tabs });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "components/navigation/Tabs.jsx",
      error: String((e && e.message) || e),
    });
  }

  // ui_kits/marketing-site/ComingSoonPage.jsx
  try {
    (() => {
      function ComingSoonPage() {
        const { Wordmark, SunBurst, Barcode, BoardingPassCard, Input, Button } =
          window.BigLittleAdventuresDesignSystem_28cc9f;
        const [submitted, setSubmitted] = React.useState(false);
        return /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              position: "relative",
              minHeight: "100vh",
              background: "var(--color-bg-page)",
              overflow: "hidden",
              fontFamily: "var(--font-body)",
            },
          },
          /*#__PURE__*/ React.createElement(SunBurst, {
            size: 220,
            style: {
              position: "absolute",
              top: -70,
              right: -70,
            },
          }),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                position: "relative",
                maxWidth: 1040,
                margin: "0 auto",
                padding: "56px 24px 40px",
                textAlign: "center",
              },
            },
            /*#__PURE__*/ React.createElement(Wordmark, {
              size: 44,
            }),
            /*#__PURE__*/ React.createElement(
              "p",
              {
                style: {
                  fontSize: "var(--text-md)",
                  color: "var(--color-text-primary)",
                  marginTop: 20,
                },
              },
              "A family travel agency is ",
              /*#__PURE__*/ React.createElement(
                "b",
                {
                  style: {
                    color: "var(--color-accent)",
                  },
                },
                "boarding soon",
              ),
              ".",
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                position: "relative",
                maxWidth: 900,
                margin: "0 auto",
                padding: "0 24px 64px",
              },
            },
            /*#__PURE__*/ React.createElement(BoardingPassCard, {
              note: /*#__PURE__*/ React.createElement(
                "span",
                {
                  style: {
                    color: "var(--color-text-primary)",
                  },
                },
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 30,
                      color: "var(--color-accent)",
                      marginRight: 8,
                    },
                  },
                  "13",
                ),
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--font-script)",
                      fontSize: 22,
                      color: "var(--color-accent)",
                      marginRight: 10,
                    },
                  },
                  "sleeps",
                ),
                "Departing July 22, 2026",
              ),
              right: /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "var(--text-lg)",
                      color: "var(--color-brand)",
                      marginBottom: 10,
                    },
                  },
                  "Reserve your seat",
                ),
                /*#__PURE__*/ React.createElement(
                  "p",
                  {
                    style: {
                      fontSize: "var(--text-base)",
                      color: "var(--color-text-secondary)",
                      lineHeight: "var(--leading-relaxed)",
                      marginBottom: 20,
                    },
                  },
                  "Be the first to book when the doors open \u2014 plus get a free mom-tested family packing list.",
                ),
                submitted
                  ? /*#__PURE__*/ React.createElement(
                      "div",
                      {
                        style: {
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          color: "var(--color-brand)",
                        },
                      },
                      "You're on the list! \u2708\uFE0F",
                    )
                  : /*#__PURE__*/ React.createElement(
                      React.Fragment,
                      null,
                      /*#__PURE__*/ React.createElement(Input, {
                        placeholder: "be@paradise.com",
                        onSubmit: () => setSubmitted(true),
                      }),
                      /*#__PURE__*/ React.createElement(
                        "div",
                        {
                          style: {
                            marginTop: 14,
                          },
                        },
                        /*#__PURE__*/ React.createElement(
                          Button,
                          {
                            variant: "primary",
                            size: "md",
                            style: {
                              width: "100%",
                            },
                            onClick: () => setSubmitted(true),
                          },
                          "Get boarding updates",
                        ),
                      ),
                    ),
                /*#__PURE__*/ React.createElement(
                  "p",
                  {
                    style: {
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                      marginTop: 14,
                    },
                  },
                  'No spam. Just one "we\'re live!" email.',
                ),
                /*#__PURE__*/ React.createElement(Barcode, {
                  style: {
                    marginTop: 20,
                  },
                }),
              ),
            }),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                textAlign: "center",
                paddingBottom: 40,
              },
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  fontFamily: "var(--font-script)",
                  fontSize: 22,
                  color: "var(--color-accent)",
                },
              },
              "big memories \xB7 little travelers",
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-muted)",
                  marginTop: 8,
                },
              },
              "\xA9 2026 Big Little Adventures \xB7 @biglittleadventures",
            ),
          ),
        );
      }
      window.ComingSoonPage = ComingSoonPage;
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: "ui_kits/marketing-site/ComingSoonPage.jsx",
      error: String((e && e.message) || e),
    });
  }

  __ds_ns.Barcode = __ds_scope.Barcode;

  __ds_ns.SunBurst = __ds_scope.SunBurst;

  __ds_ns.Wordmark = __ds_scope.Wordmark;

  __ds_ns.Badge = __ds_scope.Badge;

  __ds_ns.StampTag = __ds_scope.StampTag;

  __ds_ns.Tooltip = __ds_scope.Tooltip;

  __ds_ns.Button = __ds_scope.Button;

  __ds_ns.Checkbox = __ds_scope.Checkbox;

  __ds_ns.Input = __ds_scope.Input;

  __ds_ns.Switch = __ds_scope.Switch;

  __ds_ns.BoardingPassCard = __ds_scope.BoardingPassCard;

  __ds_ns.Card = __ds_scope.Card;

  __ds_ns.Tabs = __ds_scope.Tabs;
})();
