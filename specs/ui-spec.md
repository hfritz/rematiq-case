# UI Spec: Rematiq Case

## Status

Draft

## Owner

Name: Helmut Fritz

## Aesthetic Direction

**Clone Rematiq's existing product**, reverse-engineered from screenshots. This is not an invented aesthetic — fidelity to the real product is the goal, because the prototype must feel like the team's own tool.

- **Mood:** Clean, calm, professional B2B SaaS for regulated MedTech. Trustworthy, precise, uncluttered.
- **Keywords:** light, airy, indigo-violet accent, generous whitespace, soft borders, content-first.
- **What this style is NOT:** not dark, not mystical, not playful, not high-contrast/bold, not serif, not heavily shadowed, not gradient-heavy. No decorative flourish — this is a serious enterprise tool.

## Color Palette

Read from the product screenshots. Light mode only. No pure black, no pure white.

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#FFFFFF` | App background, document panel |
| `--bg-subtle` | `#FAFAFB` | Chat thread background, table zebra |
| `--surface` | `#F4F4F7` | Panels, hover surfaces |
| `--surface-raised` | `#FFFFFF` | Cards, editor panel, popovers |
| `--user-bubble` | `#F1F1F4` | User chat message pill |
| `--border` | `#E6E6EC` | Dividers, table rows, input borders |
| `--border-strong` | `#D6D6DF` | Focused inputs, active borders |
| `--accent` | `#4F3FCF` | Primary buttons, send button, active page, key actions |
| `--accent-hover` | `#4334B5` | Primary button hover |
| `--accent-tint` | `#EEEBFA` | Selected chat row, citation highlight bg, subtle accent fills |
| `--accent-text` | `#5B4BC4` | Violet text labels (doc type "SOP"/"Other"), links |
| `--text` | `#1E2230` | Primary text (near-black slate) |
| `--text-secondary` | `#4B4F5C` | Body secondary, labels |
| `--text-muted` | `#8A8F9C` | Timestamps, meta, placeholders |
| `--success` | `#1FA971` | Status check circles |
| `--success-bg` | `#E4F5EC` | Status circle background |
| `--external` | `#0B7285` | External-source citation accent (distinguish from internal violet) |

## Typography

- **Font family:** Clean sans-serif throughout — **Inter** (with system-ui fallback). No serif anywhere; the real product is fully sans-serif.
- **Headings:** Inter, semibold (600). Document H1 ~24px, H2 ~18px, H3 ~16px.
- **Body:** Inter, regular (400), ~15px, line-height ~1.6.
- **Meta/labels:** ~13px, `--text-muted`.
- **Inline emphasis:** bold (600) used heavily inside generated documents for key terms (matches screenshots).
- **Scale:** 13 / 15 / 16 / 18 / 24 / 30.

## Spacing & Layout

- **Base unit:** 4px. Common steps: 4, 8, 12, 16, 24, 32.
- **Three/four-panel layout:** icon rail (~56px) → chat list panel (~280px) → chat thread (flex) → document editor panel (~480–560px, collapsible). Panels divided by `--border`.
- **Section padding:** 24px inside panels; 16px list rows.
- **Max width:** content panels are fluid; chat thread comfortably caps reading width (~720px) and centers.
- **Chat input:** docked at bottom of the thread, full-width with padding, rounded.

## Elevation & Depth

Minimal, soft, warm-neutral shadows — never harsh black.

- `--shadow-sm`: `0 1px 2px rgba(30, 34, 48, 0.06)` — inputs, rows on hover.
- `--shadow-md`: `0 4px 12px rgba(30, 34, 48, 0.08)` — popovers, the citation mini-component, dropdowns.
- `--shadow-lg`: `0 8px 28px rgba(30, 34, 48, 0.12)` — modals / full-document overlay.

## Border Radius

- Inputs & buttons: 8px.
- Chat message pill: 14px.
- Cards / panels / popovers: 10px.
- Citation chip (Variant B): 6px (pill, full radius for small badge).
- Table container: 10px outer; rows square.
- Status check circle: full (icon in circle).

## Buttons

- **Primary:** bg `--accent` `#4F3FCF`, text `#FFFFFF`, radius 8px, padding 8×14, semibold; hover `--accent-hover`. (e.g. "Upload Document", chat send.)
- **Secondary:** bg `--surface-raised`, border `--border`, text `--text`, radius 8px; hover bg `--surface`. (e.g. "Import from connectors", "Export".)
- **Ghost/icon:** transparent, text `--text-secondary`, hover bg `--surface`; used in the icon rail and editor toolbar.
- **Send button:** small square, `--accent` bg, white arrow icon, radius 8px.

## Gradients & Decorative Elements

Essentially none — the product is flat and clean. Do not introduce gradients, glows, or illustration. The only "decoration" is the violet accent used sparingly. Citation highlight is a flat tint, not a gradient.

## Cards

- **Standard card / panel:** `--surface-raised` bg, 1px `--border`, radius 10px, `--shadow-sm`, 24px padding.
- **Document list row:** full-width, bottom border `--border`, 16px vertical padding; columns Title · Version · Document type · Status · Uploaded; hover bg `--bg-subtle`.
- **Citation mini-component (feature card):** popover anchored to the citation; `--surface-raised`, radius 10px, `--shadow-md`. Contains: source title, version badge/history, highlighted content-unit excerpt, internal/external indicator, and "Expand to full document" / mini-preview action.

## Iconography

- **Set:** Lucide (matches the thin, rounded line style in screenshots).
- **Stroke:** ~1.75px, rounded caps/joins.
- **Color:** `--text-secondary` default; `--accent` when active/selected; `--success` for status.
- **Sizing:** 18–20px in rails and toolbars, 16px inline.

## Motion

Subtle and fast — never showy. This is an enterprise tool.

- **Philosophy:** quick, functional transitions that reinforce cause→effect (clicking a citation → mini-component appears, source scrolls/highlights).
- **Specs:** 120–180ms ease-out for popovers/fades; content-unit highlight fades in over ~200ms; panel expand ~220ms ease-in-out.
- No bounce, no parallax, no looping animation.

## Tone of Voice

UI copy mirrors the real product: helpful, precise, lightly conversational research-assistant voice.

- Be direct and concrete ("I found 2 documents that are clearly in Spanish.").
- Be honest about uncertainty ("A few other files were ambiguous from a quick scan…").
- Use exact regulatory terminology (IFV, CNFV, COFEPRIS, NOM-220-SSA1-2016) — accuracy signals domain credibility.
- Offer next steps without pushing ("If you want, I can also give you…").
- Never hype. Trust comes from precision, not enthusiasm.

## Reference Images

Two screenshots of Rematiq's live product informed this spec:

1. **Three-panel "Regulatory Research" chat view** — icon rail; chat list with "New chat"/"Search chats" and selected row in violet tint; chat thread with right-aligned gray user pills and left-aligned plain-text agent responses (headings, bullet/numbered lists, bold terms); bottom "Ask the research agent…" input with violet send button; right-side document editor with rich-text toolbar (H1/H2/H3, B/I/S, code, lists, quote, hr) and copy/download/edit/close controls. Extracted: layout structure, accent violet, message styling, editor toolbar, typography.

2. **"Documentation" list view** — search + filter, "Import from connectors", "Export", deep-violet "Upload Document"; table with checkbox, Title, Version (—), Document type ("Other"/"SOP" in violet text), Status (green check), Uploaded (name + date); pagination with active violet page number. Extracted: table styling, status treatment, doc-type label color, primary button shade, pagination.

## What This Style Is Not

- Not dark mode. Not high-contrast/bold.
- No serif type anywhere.
- No gradients, glows, or decorative illustration.
- No heavy or black drop shadows.
- No rounded "friendly" oversized radii — keep corners moderate.
- No pure `#000`/`#FFF` for text or surfaces.
- Not flashy motion — nothing that draws attention away from the content and the citation interaction.
