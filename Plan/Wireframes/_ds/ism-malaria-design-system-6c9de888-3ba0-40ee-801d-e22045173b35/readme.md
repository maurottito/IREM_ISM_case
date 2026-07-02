# ISM Malaria Design System

A design system for **web applications that report and consume malaria diagnostic
information** in the Mesoamerican region — built on the brand of the **Regional
Malaria Elimination Initiative (RMEI)** / **Iniciativa Salud Mesoamérica (ISM)**,
an Inter‑American Development Bank (IDB) results‑based‑finance program.

The system is tuned for **surveillance & diagnostic reporting**: case registries,
field data entry, coverage dashboards, and the status vocabulary of malaria testing
(positive / negative / pending, *Plasmodium* species, RDT / microscopy / PCR).

## Context & product

The Regional Malaria Elimination Initiative (RMEI), launched in 2018 by the
countries of Mesoamerica, Colombia and the Dominican Republic together with the IDB,
supports countries to achieve and sustain malaria elimination. It sits alongside the
sister initiative **Salud Mesoamérica** under one umbrella brand. This design system
serves the *tooling* side of that mission — the internal web app where health workers
report rapid‑diagnostic‑test results and epidemiologists consume aggregated data.

Products represented here:
- **Malaria surveillance & reporting web app** (`ui_kits/reporting-app/`) — the
  primary product: dashboard, case registry, and field reporting form.

## Sources

- **Logo (provided):** `uploads/ism-malaria.png` → copied to `assets/`.
- **Brand site:** https://www.saludmesoamerica.org (and `/en/malaria`) — Drupal 10
  site of the umbrella initiative. Used for colour extraction, copy tone, structure,
  and country/partner context. *Reader may not have access; captured here for reference.*
- **Brand colours** were sampled directly from the provided logo:
  green **#92BF4E**, blue **#217AB3**.

---

## CONTENT FUNDAMENTALS

**Voice.** Institutional public‑health, bilingual (Spanish‑first in the field,
English for regional/donor communication). Calm, precise, non‑alarmist even when
reporting positive cases. Never playful, never marketing‑hype.

**Tone.** Clinical clarity over persuasion. Sentences are declarative and factual:
"An innovative development model supporting countries and partners in Mesoamerica to
achieve and sustain malaria elimination." Numbers are stated plainly with their unit
and timeframe ("1.8 million women and children"; "128 cases this week").

**Person.** Third‑person / imperative for the app ("Report a case", "Submit report",
"Save draft"). The organisation speaks as "we" only in mission copy; UI never uses
"I". Address the health worker with neutral imperatives, not "you should…".

**Casing.** Sentence case for headings, labels and buttons ("Case registry",
"Report a case", "Submit report"). UPPERCASE reserved for small eyebrow labels and
table column headers. Country names in local form: **México, Panamá, Petén**.

**Terminology (use exactly).** *case*, *report* (verb + noun), *diagnostic*,
*RDT* (rapid diagnostic test), *microscopy*, *PCR*, *positive / negative / pending*,
*species* (*P. falciparum*, *P. vivax*, *P. malariae*, *mixed*), *coverage*,
*surveillance*, *elimination* (not "eradication"), *reporter*, *health site*.

**Numbers & codes.** Case IDs and site codes are monospaced (`RDT‑2231`, `GT‑PET‑04`,
`2026‑W26`). Percentages to one decimal for rates ("3.0%"), whole numbers for counts.

**Emoji:** never. This is a health‑surveillance product; emoji would undercut trust.

**Micro‑copy examples.**
- Button: `Submit report` · `Save draft` · `Export CSV` · `New report`
- Empty/aux: `Showing 8 of 128 cases` · `Last synced 4 minutes ago`
- Alert: `Positive case flagged — a P. falciparum case in Petén requires 24h follow‑up.`

---

## VISUAL FOUNDATIONS

**Colour.** Two‑tone brand signature: **green #92BF4E** (life/health, the primary
action colour) + **blue #217AB3** (water/trust, IDB heritage, secondary + links).
Full 50–900 scales in `tokens/colors.css`. Neutrals are a **cool slate** ramp —
clinical and calm, never warm‑gray. Critically, **diagnostic status colours are held
separate from brand green** so "positive/negative" never reads as branding:
positive = clinical red **#D64545**, negative = teal‑green **#2F9E5F**, pending =
amber **#E69A29**, submitted/info = brand blue. Species get their own chart accents.

**Typography.** **Source Sans 3** (IDB's brand face is Source Sans; SS3 is its
maintained successor) as the single workhorse — highly legible for dense case tables
and small labels. **IBM Plex Mono** for IDs, codes and week numbers. Scale is a ~1.2
minor third; display/headings are bold (700) and tight, body is 15px/1.5.
⚠ *Substitution: the site's exact licensed web fonts were unavailable; Source Sans 3
+ IBM Plex Mono (Google Fonts) are the closest matches — see caveats.*

**Shape & radius.** Soft, friendly corners echoing the rounded, hand‑drawn logo
shapes: 10px on controls/inputs, 14px on cards, pills for badges/tags/status. Nothing
sharp‑cornered; nothing fully skeuomorphic.

**Elevation.** Low, **cool‑tinted, diffuse** shadows (slate `rgba(22,26,30,…)`), never
black or glossy. Cards rest on `--shadow-sm` and lift to `--shadow-md` on hover.
Form fields use a subtle *inset* shadow to read as inputs. Modals use `--shadow-xl`.

**Backgrounds.** Flat and quiet: page = `--neutral-50`, cards = white. **No gradients**
in UI chrome, no textures, no full‑bleed hero imagery inside the app. The one dark
surface is the app **sidebar** (`--neutral-900`) which anchors the layout and lets the
white logo and green active‑state read. Photography (when used in marketing contexts)
is documentary, warm, human — field health workers and communities.

**Borders.** Hairline `1px` `--border-subtle/-default` on the slate ramp. Cards may
carry an optional **3px coloured top accent** (green/blue/red/amber) to signal
category — this is the only "coloured border" motif and it is top‑only, deliberate.

**Motion.** Gentle and confident — **no bounce**. Standard ease
`cubic-bezier(0.2,0,0.1,1)` at 120–200ms; entrances use a soft ease‑out. Bars and
progress grow with a 320ms ease‑out. Reduced‑motion friendly (transforms are small).

**Interaction states.**
- *Hover:* buttons darken one step (green 500→600); ghost/outline gain a
  `--surface-sunken` fill; cards lift 2px + deeper shadow.
- *Press:* 1px downward nudge (`translateY(1px)`) — no scale‑shrink.
- *Focus:* 3px blue focus ring `rgba(63,146,194,.35)` + blue border on inputs.
- *Selected:* brand green (checkboxes, radios, switches, active segmented buttons).

**Transparency & blur.** Sparing. Modal scrim is `rgba(22,26,30,.45)` with a light
`blur(2px)`. Sidebar active/hover states use low‑alpha white overlays. No glassmorphism.

**Layout.** Fixed 248px dark sidebar + 60px white topbar + scrollable content on
`--surface-page`. Content max ~1200px; forms center at ~860px. 4px spacing grid.

---

## ICONOGRAPHY

The source brand site ships **no icon font or icon sprite** — its visuals are
photographic plus the pictographic logo mark. For UI iconography the system therefore
adopts **Lucide** (MIT), whose 2px round‑joined stroke style matches the soft,
rounded, friendly character of the ISM logo.

- Icons live in `ui_kits/reporting-app/Icons.jsx` as inline SVGs using **Lucide path
  data** (dashboard, registry, report, coverage, bell, search, settings, drop,
  activity, users, etc.). Stroke width `2`, `round` caps/joins, `currentColor`.
- ⚠ *Substitution flagged:* Lucide stands in for a bespoke ISM icon set. If the
  initiative has official iconography, drop it into `assets/` and swap `Icons.jsx`.
- **Emoji / unicode as icons:** never used.
- **Logo assets** are real PNGs in `assets/` (full‑colour, white, and blue variants).

---

## Index / manifest

**Root**
- `styles.css` — global entry (import list only). Consumers link this.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`.
- `assets/` — `logo-ism-malaria.png`, `‑white.png`, `‑blue.png`.
- `readme.md` — this file. `SKILL.md` — Agent‑Skills entry point.

**Components** (`components/…`, namespace `window.ISMMalariaDesignSystem_…`)
- `core/` — Button, IconButton, Badge, Tag, Avatar, Card
- `forms/` — Input, Select, Textarea, Checkbox, Radio, Switch
- `data/` — StatCard, StatusBadge, Table, Progress
- `feedback/` — Alert, Dialog, Toast, Tooltip
- `navigation/` — Tabs

**Foundations** (`guidelines/*.card.html`) — Colours, Type, Spacing, Brand specimen cards.

**UI kits**
- `ui_kits/reporting-app/` — interactive malaria surveillance app (Dashboard,
  Case registry, Report a case). `index.html` is the click‑through entry.

The Design System tab renders every `@dsCard`‑tagged HTML file above.
