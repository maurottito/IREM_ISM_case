/* @ds-bundle: {"format":3,"namespace":"ISMMalariaDesignSystem_6c9de8","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Progress","sourcePath":"components/data/Progress.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"StatusBadge","sourcePath":"components/data/StatusBadge.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"30e3f9aa8db7","components/core/Badge.jsx":"6e2b636890e2","components/core/Button.jsx":"4569c1360df9","components/core/Card.jsx":"0d0b859d6c05","components/core/IconButton.jsx":"e10b0bbfb7d2","components/core/Tag.jsx":"26d57681b970","components/data/Progress.jsx":"d60d3c63b73c","components/data/StatCard.jsx":"307c9cc48832","components/data/StatusBadge.jsx":"930e0fb4e891","components/data/Table.jsx":"5a4ca1746afa","components/feedback/Alert.jsx":"a683d47a0efc","components/feedback/Dialog.jsx":"06f83becdfdb","components/feedback/Toast.jsx":"ea03596c2341","components/feedback/Tooltip.jsx":"ff0f24bf3ff8","components/forms/Checkbox.jsx":"1c96f8de7e88","components/forms/Input.jsx":"c94a8230a54b","components/forms/Radio.jsx":"64cdf93066f7","components/forms/Select.jsx":"802303ed8b7b","components/forms/Switch.jsx":"3ca31b65e60f","components/forms/Textarea.jsx":"e4380f1c3b9c","components/navigation/Tabs.jsx":"0ac1c944a7e4","ui_kits/reporting-app/DashboardScreen.jsx":"1e5c122550b1","ui_kits/reporting-app/Icons.jsx":"e6b1d27435a9","ui_kits/reporting-app/RegistryScreen.jsx":"05f257039c55","ui_kits/reporting-app/ReportScreen.jsx":"5da63238e7f6","ui_kits/reporting-app/Shell.jsx":"7fe57221e4ec"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ISMMalariaDesignSystem_6c9de8 = window.ISMMalariaDesignSystem_6c9de8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
/** ISM Malaria — Avatar. Initials or image; brand-tinted fallback. */
function Avatar({
  name = "",
  src,
  size = 36,
  tone = "green",
  style = {}
}) {
  const tones = {
    green: {
      bg: "var(--green-100)",
      fg: "var(--green-800)"
    },
    blue: {
      bg: "var(--blue-100)",
      fg: "var(--blue-800)"
    },
    neutral: {
      bg: "var(--neutral-200)",
      fg: "var(--neutral-700)"
    }
  };
  const t = tones[tone] || tones.green;
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: t.bg,
      color: t.fg,
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-semibold)",
      fontSize: size * 0.4,
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/** ISM Malaria — Badge. Small count / label pill. */
function Badge({
  children,
  tone = "neutral",
  solid = false,
  style = {}
}) {
  const tones = {
    neutral: {
      soft: "var(--neutral-100)",
      softText: "var(--neutral-700)",
      solid: "var(--neutral-600)"
    },
    green: {
      soft: "var(--green-50)",
      softText: "var(--green-800)",
      solid: "var(--green-600)"
    },
    blue: {
      soft: "var(--blue-50)",
      softText: "var(--blue-800)",
      solid: "var(--blue-500)"
    },
    red: {
      soft: "var(--status-positive-50)",
      softText: "var(--status-positive-700)",
      solid: "var(--status-positive-500)"
    },
    amber: {
      soft: "var(--status-pending-50)",
      softText: "var(--status-pending-700)",
      solid: "var(--status-pending-500)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2px 8px",
      minWidth: 20,
      height: 20,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-xs)",
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1,
      borderRadius: "var(--radius-pill)",
      background: solid ? t.solid : t.soft,
      color: solid ? "#fff" : t.softText,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ISM Malaria — Button
 * Brand-green primary, blue secondary, plus outline/ghost/danger.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  type = "button",
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const heights = {
    sm: "var(--control-h-sm)",
    md: "var(--control-h-md)",
    lg: "var(--control-h-lg)"
  };
  const pads = {
    sm: "0 12px",
    md: "0 18px",
    lg: "0 24px"
  };
  const fontSizes = {
    sm: "var(--fs-sm)",
    md: "var(--fs-body)",
    lg: "var(--fs-body-lg)"
  };
  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--color-on-primary)",
      border: "1px solid transparent"
    },
    secondary: {
      background: "var(--color-secondary)",
      color: "var(--color-on-secondary)",
      border: "1px solid transparent"
    },
    outline: {
      background: "var(--surface-card)",
      color: "var(--text-strong)",
      border: "1px solid var(--border-default)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "1px solid transparent"
    },
    danger: {
      background: "var(--status-positive-500)",
      color: "#fff",
      border: "1px solid transparent"
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    height: heights[size],
    padding: pads[size],
    width: block ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontSize: fontSizes[size],
    fontWeight: "var(--fw-semibold)",
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast), transform var(--dur-fast)",
    whiteSpace: "nowrap",
    userSelect: "none",
    ...variants[variant],
    ...style
  };
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const hoverBg = {
    primary: "var(--color-primary-hover)",
    secondary: "var(--color-secondary-hover)",
    outline: "var(--surface-sunken)",
    ghost: "var(--surface-sunken)",
    danger: "var(--status-positive-700)"
  };
  const dynamic = !disabled && hover ? {
    background: hoverBg[variant]
  } : {};
  const press = !disabled && active ? {
    transform: "translateY(1px)"
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: {
      ...base,
      ...dynamic,
      ...press
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/** ISM Malaria — Card container. */
function Card({
  children,
  padding = "var(--space-6)",
  interactive = false,
  accent = null,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const accents = {
    green: "var(--color-primary)",
    blue: "var(--color-secondary)",
    red: "var(--status-positive-500)",
    amber: "var(--status-pending-500)"
  };
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderTop: accent ? `3px solid ${accents[accent]}` : "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-card)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
      padding,
      cursor: interactive ? "pointer" : "default",
      transform: hover ? "translateY(-2px)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** ISM Malaria — IconButton. Square action button for toolbars. */
function IconButton({
  children,
  label,
  variant = "ghost",
  size = "md",
  disabled = false,
  style = {},
  ...rest
}) {
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const [hover, setHover] = React.useState(false);
  const variants = {
    ghost: {
      bg: "transparent",
      fg: "var(--text-body)",
      hoverBg: "var(--surface-sunken)"
    },
    outline: {
      bg: "var(--surface-card)",
      fg: "var(--text-body)",
      border: "1px solid var(--border-default)",
      hoverBg: "var(--surface-sunken)"
    },
    primary: {
      bg: "var(--color-primary)",
      fg: "#fff",
      hoverBg: "var(--color-primary-hover)"
    }
  };
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dims[size],
      height: dims[size],
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      border: v.border || "1px solid transparent",
      background: !disabled && hover ? v.hoverBg : v.bg,
      color: v.fg,
      transition: "background var(--dur-fast) var(--ease-standard)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/** ISM Malaria — Tag / removable chip. */
function Tag({
  children,
  tone = "neutral",
  onRemove,
  style = {}
}) {
  const tones = {
    neutral: {
      bg: "var(--neutral-100)",
      fg: "var(--neutral-700)",
      br: "var(--neutral-200)"
    },
    green: {
      bg: "var(--green-50)",
      fg: "var(--green-800)",
      br: "var(--green-200)"
    },
    blue: {
      bg: "var(--blue-50)",
      fg: "var(--blue-800)",
      br: "var(--blue-200)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "3px 8px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-medium)",
      lineHeight: 1.2,
      borderRadius: "var(--radius-sm)",
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.br}`,
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: t.fg,
      padding: 0,
      display: "flex",
      opacity: 0.7,
      fontSize: 13,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/Progress.jsx
try { (() => {
/** ISM Malaria — Progress bar (coverage, completeness). */
function Progress({
  value = 0,
  max = 100,
  tone = "green",
  showLabel = false,
  height = 8,
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const tones = {
    green: "var(--color-primary)",
    blue: "var(--color-secondary)",
    amber: "var(--status-pending-500)",
    red: "var(--status-positive-500)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      background: "var(--neutral-200)",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      background: tones[tone] || tones.green,
      borderRadius: "var(--radius-pill)",
      transition: "width var(--dur-slow) var(--ease-out)"
    }
  })), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)",
      fontWeight: "var(--fw-medium)"
    }
  }, Math.round(pct), "%"));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Progress.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
/** ISM Malaria — StatCard. KPI tile for dashboards (cases, coverage, etc). */
function StatCard({
  label,
  value,
  unit,
  delta,
  deltaTone = "auto",
  icon,
  accent = "green",
  style = {}
}) {
  const accents = {
    green: "var(--color-primary)",
    blue: "var(--color-secondary)",
    red: "var(--status-positive-500)",
    amber: "var(--status-pending-500)"
  };
  const softBg = {
    green: "var(--green-50)",
    blue: "var(--blue-50)",
    red: "var(--status-positive-50)",
    amber: "var(--status-pending-50)"
  };
  let dTone = deltaTone;
  if (delta != null && deltaTone === "auto") {
    dTone = String(delta).trim().startsWith("-") ? "down" : "up";
  }
  const deltaColor = dTone === "down" ? "var(--status-positive-600, #c0392b)" : "var(--status-negative-700)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      padding: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-muted)",
      letterSpacing: "var(--ls-wide)"
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "var(--radius-sm)",
      background: softBg[accent],
      color: accents[accent],
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-h1)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-strong)",
      lineHeight: 1
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body)",
      color: "var(--text-muted)"
    }
  }, unit)), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-semibold)",
      color: deltaColor
    }
  }, dTone === "down" ? "▾" : "▴", " ", delta));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusBadge.jsx
try { (() => {
/**
 * ISM Malaria — StatusBadge. Diagnostic case status with a leading dot.
 * The domain-specific status vocabulary for malaria reporting.
 */
function StatusBadge({
  status = "pending",
  children,
  style = {}
}) {
  const map = {
    positive: {
      bg: "var(--status-positive-50)",
      fg: "var(--status-positive-700)",
      dot: "var(--status-positive-500)",
      label: "Positive"
    },
    negative: {
      bg: "var(--status-negative-50)",
      fg: "var(--status-negative-700)",
      dot: "var(--status-negative-500)",
      label: "Negative"
    },
    pending: {
      bg: "var(--status-pending-50)",
      fg: "var(--status-pending-700)",
      dot: "var(--status-pending-500)",
      label: "Pending"
    },
    submitted: {
      bg: "var(--status-info-50)",
      fg: "var(--status-info-700)",
      dot: "var(--status-info-500)",
      label: "Submitted"
    },
    treated: {
      bg: "var(--green-50)",
      fg: "var(--green-800)",
      dot: "var(--green-600)",
      label: "Treated"
    },
    default: {
      bg: "var(--neutral-100)",
      fg: "var(--neutral-700)",
      dot: "var(--neutral-500)",
      label: "—"
    }
  };
  const s = map[status] || map.default;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      padding: "3px 10px 3px 9px",
      height: 24,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1,
      borderRadius: "var(--radius-pill)",
      background: s.bg,
      color: s.fg,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: s.dot,
      flexShrink: 0
    }
  }), children || s.label);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
/**
 * ISM Malaria — Table. Lightweight data table for case lists / registries.
 * columns: [{ key, header, width, align, render }]
 */
function Table({
  columns = [],
  rows = [],
  onRowClick,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-card)",
      background: "var(--surface-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: "11px 16px",
      fontSize: "var(--fs-xs)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--ls-wide)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      background: "var(--surface-sunken)",
      borderBottom: "1px solid var(--border-subtle)",
      width: c.width,
      whiteSpace: "nowrap"
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: row.id ?? i,
    onClick: () => onRowClick && onRowClick(row),
    style: {
      cursor: onRowClick ? "pointer" : "default",
      transition: "background var(--dur-fast)"
    },
    onMouseEnter: e => {
      if (onRowClick) e.currentTarget.style.background = "var(--surface-sunken)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: "12px 16px",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border-subtle)"
    }
  }, c.render ? c.render(row[c.key], row) : row[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
/** ISM Malaria — Alert / inline banner. */
function Alert({
  tone = "info",
  title,
  children,
  onClose,
  style = {}
}) {
  const map = {
    info: {
      bg: "var(--status-info-50)",
      br: "var(--blue-200)",
      fg: "var(--blue-800)",
      icon: "var(--status-info-500)",
      glyph: "i"
    },
    success: {
      bg: "var(--status-negative-50)",
      br: "#bfe3cd",
      fg: "var(--status-negative-700)",
      icon: "var(--status-negative-500)",
      glyph: "✓"
    },
    warning: {
      bg: "var(--status-pending-50)",
      br: "#f3ddb4",
      fg: "var(--status-pending-700)",
      icon: "var(--status-pending-500)",
      glyph: "!"
    },
    danger: {
      bg: "var(--status-positive-50)",
      br: "#f2c4c4",
      fg: "var(--status-positive-700)",
      icon: "var(--status-positive-500)",
      glyph: "!"
    }
  };
  const t = map[tone] || map.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: "flex",
      gap: 12,
      padding: "14px 16px",
      background: t.bg,
      border: `1px solid ${t.br}`,
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      flexShrink: 0,
      borderRadius: "50%",
      background: t.icon,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      fontWeight: 700
    }
  }, t.glyph), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-body)",
      fontWeight: "var(--fw-semibold)",
      color: t.fg,
      marginBottom: children ? 3 : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-sm)",
      color: "var(--text-body)",
      lineHeight: "var(--lh-normal)"
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: t.fg,
      fontSize: 18,
      lineHeight: 1,
      opacity: 0.6,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/** ISM Malaria — Dialog / modal. Controlled via `open`. */
function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  width = 480
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "rgba(22,26,30,0.45)",
      backdropFilter: "blur(2px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      animation: "ismFade var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: "100%",
      maxHeight: "90vh",
      overflow: "auto",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xl)",
      display: "flex",
      flexDirection: "column",
      animation: "ismPop var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 22px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-h4)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-strong)"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: 22,
      color: "var(--text-muted)",
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      lineHeight: "var(--lh-normal)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      padding: "16px 22px",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-page)"
    }
  }, footer)), /*#__PURE__*/React.createElement("style", null, `@keyframes ismFade{from{opacity:0}to{opacity:1}}@keyframes ismPop{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}`));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/** ISM Malaria — Toast. Render one; position with the container style. */
function Toast({
  tone = "info",
  title,
  children,
  onClose,
  style = {}
}) {
  const accents = {
    info: "var(--status-info-500)",
    success: "var(--status-negative-500)",
    warning: "var(--status-pending-500)",
    danger: "var(--status-positive-500)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      minWidth: 280,
      maxWidth: 380,
      padding: "13px 15px",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      borderLeft: `3px solid ${accents[tone] || accents.info}`,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-body)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-strong)"
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-sm)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-faint)",
      fontSize: 16,
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** ISM Malaria — Tooltip (hover). Wraps a trigger; shows `content` above. */
function Tooltip({
  content,
  children,
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--neutral-900)",
      color: "#fff",
      padding: "6px 10px",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-xs)",
      fontWeight: "var(--fw-medium)",
      whiteSpace: "nowrap",
      boxShadow: "var(--shadow-md)",
      zIndex: 900,
      pointerEvents: "none",
      ...style
    }
  }, content, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      borderTop: "5px solid var(--neutral-900)"
    }
  })));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** ISM Malaria — Checkbox with label. Controlled via `checked`/`onChange`. */
function Checkbox({
  label,
  checked = false,
  disabled = false,
  onChange,
  id,
  style = {}
}) {
  const reactId = React.useId();
  const cbId = id || reactId;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cbId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flexShrink: 0,
      borderRadius: "var(--radius-xs)",
      border: `1.5px solid ${checked ? "var(--color-primary)" : "var(--border-strong)"}`,
      background: checked ? "var(--color-primary)" : "var(--surface-card)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all var(--dur-fast) var(--ease-standard)"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2L5 8.5L9.5 3.5",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("input", {
    id: cbId,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ISM Malaria — Input (text field) with optional label, hint, error, adornments.
 */
function Input({
  label,
  hint,
  error,
  required = false,
  size = "md",
  iconLeft = null,
  suffix = null,
  id,
  style = {},
  ...rest
}) {
  const reactId = React.useId();
  const inputId = id || reactId;
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: "var(--control-h-sm)",
    md: "var(--control-h-md)",
    lg: "var(--control-h-lg)"
  };
  const wrap = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    height: heights[size],
    padding: "0 12px",
    background: rest.disabled ? "var(--surface-sunken)" : "var(--surface-card)",
    border: `1px solid ${error ? "var(--status-positive-500)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
    borderRadius: "var(--radius-md)",
    boxShadow: focus ? "var(--ring-focus)" : "var(--shadow-inset)",
    transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)"
  };
  const input = {
    flex: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--fs-body)",
    color: "var(--text-strong)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-strong)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--status-positive-500)",
      marginLeft: 2
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "flex"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: input,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-sm)"
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-xs)",
      color: error ? "var(--status-positive-700)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** ISM Malaria — Radio button with label. */
function Radio({
  label,
  checked = false,
  disabled = false,
  onChange,
  name,
  value,
  id,
  style = {}
}) {
  const reactId = React.useId();
  const rId = id || reactId;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: rId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flexShrink: 0,
      borderRadius: "50%",
      border: `1.5px solid ${checked ? "var(--color-primary)" : "var(--border-strong)"}`,
      background: "var(--surface-card)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all var(--dur-fast) var(--ease-standard)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: "var(--color-primary)"
    }
  })), /*#__PURE__*/React.createElement("input", {
    id: rId,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** ISM Malaria — Select dropdown (native, styled to match Input). */
function Select({
  label,
  hint,
  error,
  required = false,
  size = "md",
  options = [],
  placeholder,
  id,
  style = {},
  children,
  ...rest
}) {
  const reactId = React.useId();
  const selId = id || reactId;
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: "var(--control-h-sm)",
    md: "var(--control-h-md)",
    lg: "var(--control-h-lg)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-strong)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--status-positive-500)",
      marginLeft: 2
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      width: "100%",
      height: heights[size],
      padding: "0 36px 0 12px",
      background: rest.disabled ? "var(--surface-sunken)" : "var(--surface-card)",
      border: `1px solid ${error ? "var(--status-positive-500)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "var(--ring-focus)" : "var(--shadow-inset)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-strong)",
      cursor: "pointer",
      outline: "none"
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lab = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  }), children), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 12,
      pointerEvents: "none",
      color: "var(--text-muted)",
      fontSize: 12
    }
  }, "\u25BE")), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-xs)",
      color: error ? "var(--status-positive-700)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** ISM Malaria — Switch toggle. */
function Switch({
  label,
  checked = false,
  disabled = false,
  onChange,
  id,
  style = {}
}) {
  const reactId = React.useId();
  const swId = id || reactId;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: swId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 22,
      flexShrink: 0,
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--color-primary)" : "var(--neutral-300)",
      position: "relative",
      transition: "background var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: checked ? 18 : 2,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transition: "left var(--dur-base) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("input", {
    id: swId,
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** ISM Malaria — Textarea, matches Input styling. */
function Textarea({
  label,
  hint,
  error,
  required = false,
  rows = 4,
  id,
  style = {},
  ...rest
}) {
  const reactId = React.useId();
  const taId = id || reactId;
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: taId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-strong)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--status-positive-500)",
      marginLeft: 2
    }
  }, "*")), /*#__PURE__*/React.createElement("textarea", _extends({
    id: taId,
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      resize: "vertical",
      padding: "10px 12px",
      background: rest.disabled ? "var(--surface-sunken)" : "var(--surface-card)",
      border: `1px solid ${error ? "var(--status-positive-500)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "var(--ring-focus)" : "var(--shadow-inset)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-strong)",
      lineHeight: "var(--lh-normal)",
      outline: "none"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-xs)",
      color: error ? "var(--status-positive-700)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** ISM Malaria — Tabs. Controlled: pass `value` + `onChange`, or uncontrolled via `defaultValue`. */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && tabs[0].value));
  const active = value !== undefined ? value : internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, tabs.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      onClick: () => select(t.value),
      style: {
        position: "relative",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "10px 14px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body)",
        fontWeight: on ? "var(--fw-semibold)" : "var(--fw-medium)",
        color: on ? "var(--color-secondary)" : "var(--text-muted)",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "color var(--dur-fast)"
      }
    }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-xs)",
        fontWeight: 600,
        padding: "1px 7px",
        borderRadius: "var(--radius-pill)",
        background: on ? "var(--blue-50)" : "var(--neutral-100)",
        color: on ? "var(--blue-700)" : "var(--text-muted)"
      }
    }, t.count), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 8,
        right: 8,
        bottom: -1,
        height: 2.5,
        borderRadius: 2,
        background: on ? "var(--color-secondary)" : "transparent"
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reporting-app/DashboardScreen.jsx
try { (() => {
// ISM Malaria UI kit — Dashboard / surveillance overview
function DashboardScreen() {
  const DS = window.ISMMalariaDesignSystem_6c9de8;
  const I = window.Icons;
  const weeks = [{
    w: "W20",
    v: 62
  }, {
    w: "W21",
    v: 48
  }, {
    w: "W22",
    v: 71
  }, {
    w: "W23",
    v: 55
  }, {
    w: "W24",
    v: 40
  }, {
    w: "W25",
    v: 33
  }, {
    w: "W26",
    v: 28
  }];
  const max = Math.max(...weeks.map(x => x.v));
  const species = [{
    name: "P. falciparum",
    pct: 58,
    color: "var(--species-falciparum)"
  }, {
    name: "P. vivax",
    pct: 34,
    color: "var(--species-vivax)"
  }, {
    name: "P. malariae",
    pct: 5,
    color: "var(--species-malariae)"
  }, {
    name: "Mixed",
    pct: 3,
    color: "var(--species-mixed)"
  }];
  const cols = [{
    key: "id",
    header: "Case ID",
    render: v => /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "var(--text-strong)"
      }
    }, v)
  }, {
    key: "country",
    header: "Country"
  }, {
    key: "site",
    header: "Site"
  }, {
    key: "species",
    header: "Species"
  }, {
    key: "date",
    header: "Reported"
  }, {
    key: "status",
    header: "Result",
    render: v => /*#__PURE__*/React.createElement(DS.StatusBadge, {
      status: v
    })
  }];
  const rows = [{
    id: "RDT-2231",
    country: "Guatemala",
    site: "Petén",
    species: "P. falciparum",
    date: "26 Jun",
    status: "positive"
  }, {
    id: "RDT-2230",
    country: "Honduras",
    site: "Gracias a Dios",
    species: "—",
    date: "26 Jun",
    status: "negative"
  }, {
    id: "RDT-2229",
    country: "Panamá",
    site: "Darién",
    species: "P. vivax",
    date: "25 Jun",
    status: "positive"
  }, {
    id: "RDT-2228",
    country: "Nicaragua",
    site: "RACCN",
    species: "Pending",
    date: "25 Jun",
    status: "pending"
  }, {
    id: "RDT-2227",
    country: "Guatemala",
    site: "Izabal",
    species: "P. vivax",
    date: "24 Jun",
    status: "treated"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 26,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(DS.StatCard, {
    label: "Confirmed cases",
    value: "1,284",
    delta: "-8% vs W25",
    accent: "green",
    icon: /*#__PURE__*/React.createElement(I.drop, {
      size: 18
    })
  }), /*#__PURE__*/React.createElement(DS.StatCard, {
    label: "Tests reported",
    value: "42.6k",
    delta: "+12%",
    accent: "blue",
    icon: /*#__PURE__*/React.createElement(I.activity, {
      size: 18
    })
  }), /*#__PURE__*/React.createElement(DS.StatCard, {
    label: "Positivity rate",
    value: "3.0",
    unit: "%",
    delta: "-0.4pt",
    accent: "amber",
    icon: /*#__PURE__*/React.createElement(I.trendDown, {
      size: 18
    })
  }), /*#__PURE__*/React.createElement(DS.StatCard, {
    label: "Active reporters",
    value: "318",
    delta: "+6",
    accent: "blue",
    icon: /*#__PURE__*/React.createElement(I.users, {
      size: 18
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(DS.Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-strong)"
    }
  }, "Confirmed cases by week"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, "Region-wide \xB7 rolling 7 weeks")), /*#__PURE__*/React.createElement(DS.Badge, {
    tone: "green"
  }, "\u2193 declining")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      height: 150,
      paddingLeft: 4
    }
  }, weeks.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: x.w,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "var(--text-muted)"
    }
  }, x.v), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 46,
      height: x.v / max * 118,
      borderRadius: "6px 6px 0 0",
      background: i === weeks.length - 1 ? "var(--green-500)" : "var(--green-300)",
      transition: "height var(--dur-slow) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-faint)",
      fontFamily: "var(--font-mono)"
    }
  }, x.w))))), /*#__PURE__*/React.createElement(DS.Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-strong)",
      marginBottom: 4
    }
  }, "Species breakdown"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)",
      marginBottom: 18
    }
  }, "Of confirmed cases this month"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: 12,
      borderRadius: "var(--radius-pill)",
      overflow: "hidden",
      marginBottom: 18
    }
  }, species.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    style: {
      width: s.pct + "%",
      background: s.color
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, species.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      fontSize: 13.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 3,
      background: s.color,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: "var(--text-body)"
    }
  }, s.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, s.pct, "%")))))), /*#__PURE__*/React.createElement(DS.Card, {
    padding: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-strong)"
    }
  }, "Recent case reports"), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "ghost",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(I.chevron, {
      size: 15
    })
  }, "View registry")), /*#__PURE__*/React.createElement(DS.Table, {
    columns: cols,
    rows: rows,
    onRowClick: () => {},
    style: {
      border: "none",
      borderRadius: 0,
      borderTop: "1px solid var(--border-subtle)"
    }
  })));
}
window.DashboardScreen = DashboardScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reporting-app/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reporting-app/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ISM Malaria UI kit — icon set (Lucide 0.x path data, MIT).
// Iconography substitution: the source site ships no icon font, so we use
// Lucide (2px round stroke) as the system icon set. Documented in readme.
function Ic({
  d,
  size = 20,
  fill = "none",
  ...p
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), Array.isArray(d) ? d.map((x, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: x
  })) : /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
const Icons = {
  dashboard: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M3 3h8v8H3z", "M13 3h8v5h-8z", "M13 12h8v9h-8z", "M3 15h8v6H3z"]
  })),
  registry: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", "M9 3h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z", "M8 11h8", "M8 15h5"]
  })),
  report: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M12 12v6", "M9 15h6"]
  })),
  coverage: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M9 20 3 17V4l6 3 6-3 6 3v13l-6-3-6 3z", "M9 7v13", "M15 4v13"]
  })),
  book: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"]
  })),
  bell: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"]
  })),
  search: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"]
  })),
  settings: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"]
  })),
  logout: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]
  })),
  chevron: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: "M6 9l6 6 6-6"
  })),
  plus: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M12 5v14", "M5 12h14"]
  })),
  filter: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: "M22 3H2l8 9.46V19l4 2v-8.54z"
  })),
  download: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"]
  })),
  activity: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: "M22 12h-4l-3 9L9 3l-3 9H2"
  })),
  users: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]
  })),
  drop: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: "M12 2.7s6 6.3 6 10.3a6 6 0 0 1-12 0c0-4 6-10.3 6-10.3z"
  })),
  trendDown: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M23 18l-9.5-9.5-5 5L1 6", "M17 18h6v-6"]
  })),
  check: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: "M20 6L9 17l-5-5"
  })),
  menu: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M3 12h18", "M3 6h18", "M3 18h18"]
  })),
  pin: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M12 21s-6-5.7-6-10a6 6 0 0 1 12 0c0 4.3-6 10-6 10z", "M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]
  })),
  calendar: p => /*#__PURE__*/React.createElement(Ic, _extends({}, p, {
    d: ["M8 2v4", "M16 2v4", "M3 8h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"]
  }))
};
window.Icons = Icons;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reporting-app/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reporting-app/RegistryScreen.jsx
try { (() => {
// ISM Malaria UI kit — Case registry (filterable list)
function RegistryScreen() {
  const DS = window.ISMMalariaDesignSystem_6c9de8;
  const I = window.Icons;
  const [tab, setTab] = React.useState("all");
  const [country, setCountry] = React.useState("");
  const all = [{
    id: "RDT-2231",
    country: "Guatemala",
    site: "Petén",
    species: "P. falciparum",
    date: "26 Jun 2026",
    reporter: "A. López",
    status: "positive"
  }, {
    id: "RDT-2230",
    country: "Honduras",
    site: "Gracias a Dios",
    species: "—",
    date: "26 Jun 2026",
    reporter: "M. Cruz",
    status: "negative"
  }, {
    id: "RDT-2229",
    country: "Panamá",
    site: "Darién",
    species: "P. vivax",
    date: "25 Jun 2026",
    reporter: "J. Ortega",
    status: "positive"
  }, {
    id: "RDT-2228",
    country: "Nicaragua",
    site: "RACCN",
    species: "Pending",
    date: "25 Jun 2026",
    reporter: "L. Díaz",
    status: "pending"
  }, {
    id: "RDT-2227",
    country: "Guatemala",
    site: "Izabal",
    species: "P. vivax",
    date: "24 Jun 2026",
    reporter: "A. López",
    status: "treated"
  }, {
    id: "RDT-2226",
    country: "El Salvador",
    site: "La Unión",
    species: "—",
    date: "24 Jun 2026",
    reporter: "R. Mena",
    status: "negative"
  }, {
    id: "RDT-2225",
    country: "Panamá",
    site: "Guna Yala",
    species: "P. falciparum",
    date: "23 Jun 2026",
    reporter: "J. Ortega",
    status: "positive"
  }, {
    id: "RDT-2224",
    country: "Honduras",
    site: "Colón",
    species: "Pending",
    date: "23 Jun 2026",
    reporter: "M. Cruz",
    status: "submitted"
  }];
  const filtered = all.filter(r => (tab === "all" || tab === "positive" && r.status === "positive" || tab === "pending" && (r.status === "pending" || r.status === "submitted")) && (!country || r.country === country));
  const cols = [{
    key: "id",
    header: "Case ID",
    render: v => /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "var(--text-strong)"
      }
    }, v)
  }, {
    key: "country",
    header: "Country"
  }, {
    key: "site",
    header: "Site"
  }, {
    key: "species",
    header: "Species"
  }, {
    key: "reporter",
    header: "Reporter"
  }, {
    key: "date",
    header: "Reported"
  }, {
    key: "status",
    header: "Result",
    render: v => /*#__PURE__*/React.createElement(DS.StatusBadge, {
      status: v
    })
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 26,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(DS.Select, {
    label: "Country",
    placeholder: "All countries",
    value: country,
    onChange: e => setCountry(e.target.value),
    options: ["Guatemala", "Honduras", "Panamá", "Nicaragua", "El Salvador", "Belize"],
    style: {
      width: 200
    }
  }), /*#__PURE__*/React.createElement(DS.Select, {
    label: "Species",
    placeholder: "All species",
    options: ["P. falciparum", "P. vivax", "P. malariae"],
    style: {
      width: 180
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "outline",
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement(I.filter, {
      size: 15
    })
  }, "More filters"), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "outline",
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement(I.download, {
      size: 15
    })
  }, "Export CSV"))), country && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)"
    }
  }, "Active filters:"), /*#__PURE__*/React.createElement(DS.Tag, {
    tone: "blue",
    onRemove: () => setCountry("")
  }, country)), /*#__PURE__*/React.createElement(DS.Card, {
    padding: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 16px 0"
    }
  }, /*#__PURE__*/React.createElement(DS.Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      value: "all",
      label: "All cases",
      count: all.length
    }, {
      value: "positive",
      label: "Positive",
      count: all.filter(r => r.status === "positive").length
    }, {
      value: "pending",
      label: "Awaiting result",
      count: all.filter(r => r.status === "pending" || r.status === "submitted").length
    }]
  })), /*#__PURE__*/React.createElement(DS.Table, {
    columns: cols,
    rows: filtered,
    onRowClick: () => {},
    style: {
      border: "none",
      borderRadius: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 18px",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)"
    }
  }, "Showing ", filtered.length, " of ", all.length, " cases"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "ghost",
    size: "sm"
  }, "Previous"), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "outline",
    size: "sm"
  }, "Next")))));
}
window.RegistryScreen = RegistryScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reporting-app/RegistryScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reporting-app/ReportScreen.jsx
try { (() => {
// ISM Malaria UI kit — Report a case (field data-entry form)
function ReportScreen({
  onSubmit
}) {
  const DS = window.ISMMalariaDesignSystem_6c9de8;
  const I = window.Icons;
  const [result, setResult] = React.useState("positive");
  const [species, setSpecies] = React.useState("pf");
  const [method, setMethod] = React.useState("rdt");
  const [consent, setConsent] = React.useState(true);
  const [followup, setFollowup] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 26,
      maxWidth: 860,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(DS.Alert, {
    tone: "info",
    title: "New diagnostic report"
  }, "Fields marked * are required for regional aggregation. Submitted reports sync to the COMISCA registry within 5 minutes."), /*#__PURE__*/React.createElement(DS.Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-strong)",
      marginBottom: 16
    }
  }, "Patient & sample"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(DS.Input, {
    label: "Case ID",
    defaultValue: "RDT-2232",
    required: true
  }), /*#__PURE__*/React.createElement(DS.Input, {
    label: "Patient age",
    type: "number",
    placeholder: "e.g. 34",
    suffix: "yrs"
  }), /*#__PURE__*/React.createElement(DS.Select, {
    label: "Sex",
    placeholder: "Select\u2026",
    options: ["Female", "Male", "Other"]
  }), /*#__PURE__*/React.createElement(DS.Select, {
    label: "Country",
    required: true,
    options: ["Guatemala", "Honduras", "Panamá", "Nicaragua", "El Salvador", "Belize"]
  }), /*#__PURE__*/React.createElement(DS.Input, {
    label: "Health site",
    placeholder: "Facility / community",
    iconLeft: /*#__PURE__*/React.createElement(I.pin, {
      size: 15
    })
  }), /*#__PURE__*/React.createElement(DS.Input, {
    label: "Sample date",
    type: "date",
    defaultValue: "2026-06-28",
    required: true
  }))), /*#__PURE__*/React.createElement(DS.Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-strong)",
      marginBottom: 16
    }
  }, "Diagnosis"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-strong)",
      marginBottom: 10
    }
  }, "Test method"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(DS.Radio, {
    name: "m",
    label: "Rapid diagnostic test (RDT)",
    checked: method === "rdt",
    onChange: () => setMethod("rdt")
  }), /*#__PURE__*/React.createElement(DS.Radio, {
    name: "m",
    label: "Microscopy",
    checked: method === "mic",
    onChange: () => setMethod("mic")
  }), /*#__PURE__*/React.createElement(DS.Radio, {
    name: "m",
    label: "PCR / molecular",
    checked: method === "pcr",
    onChange: () => setMethod("pcr")
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-strong)",
      marginBottom: 10
    }
  }, "Result"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, [["positive", "Positive"], ["negative", "Negative"], ["pending", "Pending"]].map(([k, lab]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setResult(k),
    style: {
      flex: 1,
      padding: "12px 8px",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      border: `1.5px solid ${result === k ? "var(--color-primary)" : "var(--border-default)"}`,
      background: result === k ? "var(--green-50)" : "var(--surface-card)",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 600,
      color: result === k ? "var(--green-800)" : "var(--text-muted)"
    }
  }, lab))), result === "positive" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(DS.Select, {
    label: "Species",
    value: species,
    onChange: e => setSpecies(e.target.value),
    options: [{
      value: "pf",
      label: "P. falciparum"
    }, {
      value: "pv",
      label: "P. vivax"
    }, {
      value: "pm",
      label: "P. malariae"
    }, {
      value: "mix",
      label: "Mixed infection"
    }]
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(DS.Textarea, {
    label: "Clinical notes",
    rows: 3,
    placeholder: "Symptoms, travel history, treatment started\u2026"
  }))), /*#__PURE__*/React.createElement(DS.Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(DS.Switch, {
    label: "Schedule 24h follow-up for positive case",
    checked: followup,
    onChange: () => setFollowup(!followup)
  }), /*#__PURE__*/React.createElement(DS.Checkbox, {
    label: "Patient consent recorded for surveillance reporting",
    checked: consent,
    onChange: () => setConsent(!consent)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "outline"
  }, "Save draft"), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(I.check, {
      size: 17
    }),
    onClick: onSubmit
  }, "Submit report")));
}
window.ReportScreen = ReportScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reporting-app/ReportScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reporting-app/Shell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ISM Malaria UI kit — app shell (sidebar + topbar)
const DS = window.ISMMalariaDesignSystem_6c9de8;
function NavItem({
  icon,
  label,
  active,
  badge,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      width: "100%",
      border: "none",
      padding: "9px 12px",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      fontWeight: active ? 600 : 500,
      color: active ? "#fff" : hover ? "var(--text-strong)" : "var(--neutral-300)",
      background: active ? "rgba(255,255,255,0.14)" : hover ? "rgba(255,255,255,0.06)" : "transparent",
      transition: "all var(--dur-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: active ? "var(--green-300)" : "inherit"
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label), badge != null && /*#__PURE__*/React.createElement(DS.Badge, {
    tone: active ? "green" : "neutral",
    solid: true
  }, badge));
}
function Sidebar({
  route,
  setRoute
}) {
  const I = window.Icons;
  const items = [{
    id: "dashboard",
    label: "Dashboard",
    icon: /*#__PURE__*/React.createElement(I.dashboard, {
      size: 19
    })
  }, {
    id: "registry",
    label: "Case registry",
    icon: /*#__PURE__*/React.createElement(I.registry, {
      size: 19
    }),
    badge: 128
  }, {
    id: "report",
    label: "Report a case",
    icon: /*#__PURE__*/React.createElement(I.report, {
      size: 19
    })
  }, {
    id: "coverage",
    label: "Coverage",
    icon: /*#__PURE__*/React.createElement(I.coverage, {
      size: 19
    })
  }, {
    id: "publications",
    label: "Publications",
    icon: /*#__PURE__*/React.createElement(I.book, {
      size: 19
    })
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "var(--sidebar-w)",
      flexShrink: 0,
      background: "var(--neutral-900)",
      display: "flex",
      flexDirection: "column",
      padding: "18px 14px",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "6px 8px 18px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-ism-malaria-white.png",
    alt: "ISM Malaria",
    style: {
      height: 30,
      width: "auto"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--neutral-500)",
      padding: "6px 12px 4px"
    }
  }, "Surveillance"), items.map(it => /*#__PURE__*/React.createElement(NavItem, _extends({
    key: it.id
  }, it, {
    active: route === it.id,
    onClick: () => setRoute(it.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: /*#__PURE__*/React.createElement(I.settings, {
      size: 19
    }),
    label: "Settings",
    active: route === "settings",
    onClick: () => setRoute("settings")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 8px 4px",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(DS.Avatar, {
    name: "Ana L\xF3pez",
    tone: "green",
    size: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: "#fff",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "Ana L\xF3pez"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--neutral-500)"
    }
  }, "Epidemi\xF3loga \xB7 GT")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--neutral-500)",
      display: "flex",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(I.logout, {
    size: 17
  }))));
}
function Topbar({
  title,
  subtitle,
  actions
}) {
  const I = window.Icons;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: "var(--topbar-h)",
      flexShrink: 0,
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      padding: "0 26px",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 19,
      fontWeight: 700,
      color: "var(--text-strong)",
      lineHeight: 1.1
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)",
      marginTop: 1
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 38,
      padding: "0 12px",
      background: "var(--surface-page)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      color: "var(--text-faint)",
      width: 220
    }
  }, /*#__PURE__*/React.createElement(I.search, {
    size: 16
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search case ID\u2026",
    style: {
      border: "none",
      background: "transparent",
      outline: "none",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      width: "100%",
      color: "var(--text-body)"
    }
  })), /*#__PURE__*/React.createElement(DS.IconButton, {
    label: "Notifications",
    variant: "outline"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(I.bell, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -3,
      right: -3,
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--status-positive-500)",
      border: "1.5px solid #fff"
    }
  }))), actions);
}
Object.assign(window, {
  Sidebar,
  Topbar,
  NavItem
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reporting-app/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
