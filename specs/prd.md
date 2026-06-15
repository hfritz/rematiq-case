# PRD — Citation & Versioning Prototype (Rematiq Case)

## Status

As-built draft · 2026-06-15

## Owner

Helmut Fritz

## Purpose of this document

This PRD documents **what was built** in the `rematiq-case` prototype and **why it matters**. It is an as-built spec: every feature described here exists in the working prototype. It is intended to (1) give the Rematiq team a clear written reference alongside the live demo, and (2) frame the product rationale so feasibility and UX discussions start from shared context.

See also: [product-spec.md](product-spec.md) (problem framing) and [ui-spec.md](ui-spec.md) (visual contract).

## TL;DR

A frontend-only clickable prototype, built to look like Rematiq's existing product, that demonstrates three capabilities for an AI document-research tool in regulated MedTech:

1. **Citation linking** — every AI-generated claim links back to the exact source paragraph it came from.
2. **Versioning** — both the cited *sources* and the *generated document* are version-aware, with restore.
3. **Full-screen document view** — the generated document can be expanded from the side panel to full width for review.

No backend, no live LLM. All content is scripted around a real COFEPRIS pharmacovigilance conversation.

---

## The core use case — why this matters

### The setting

A regulatory/quality professional at a MedTech company asks an AI research agent questions grounded in their uploaded document set (COFEPRIS guidance, SOPs, risk files). The agent answers and can generate structured documents — summaries, breakdowns — that get saved into the Documentation library and may later support a regulatory submission, an audit response, or an internal decision.

### The problem

In a regulated environment, **an answer you cannot trace is an answer you cannot use.** A generated summary that says "the request must be submitted in Spanish and in electronic format" is worthless for compliance work unless the reader can prove *where* that came from and *which version* of the source said it. Today that means manually hunting through long regulatory PDFs, and there is no way to know whether a claim was drawn from a current or a superseded document. This is slow, error-prone, and fails an audit.

### Why **citation linking** is useful

Citation linking turns every claim into a verifiable unit. Instead of "trust the AI," the reader gets: *here is the exact paragraph (content unit), in this document, that grounds this sentence.* This delivers:

- **Audit-readiness** — a reviewer or auditor can confirm each claim against its source in one click, with a precise locator (e.g. §3.4).
- **Trust calibration** — users see what is grounded vs. what is the model's framing, so they can rely on the output with confidence.
- **Speed** — verification goes from "find the right PDF and skim it" to a single click that highlights the source paragraph.

### Why **versioning** is useful

Regulations and internal SOPs change. The same document can say different things in v1 vs v2. Versioning matters at two levels:

- **Source versioning** answers *"which version of the regulation did this claim rely on?"* — critical when a requirement (e.g. the electronic-format/USB-CD rule) only exists in the newer version. Without this, a correct-looking citation can quietly point at outdated guidance.
- **Generated-document versioning** answers *"how did this output evolve, and can I roll back?"* — AI documents are built iteratively (create → extend → refine). Teams need to see that history and restore an earlier state, the same way they expect version control on any document that feeds a regulated process.

Together, citation + versioning make the AI output **defensible**: traceable to a source, and pinned to a known version of that source — which is exactly what "audit-ready" means in MedTech.

---

## Epic 1 — Citation linking

**Goal:** Make every AI-generated claim verifiable at paragraph level.

### What was built

- **Inline citations** on claims and quotes throughout the generated document. Each citation binds a claim to a specific **content unit** (paragraph) in a specific **version** of a source document.
- **Two A/B trigger variants** (toggleable live for design feedback):
  - **Variant A — Highlight:** the claim text is highlighted with a small superscript marker, visually binding claim and source.
  - **Variant B — Chip:** the claim reads normally, followed by an inline source chip/badge.
- **Citation mini-component** (popover) opened from any citation, showing:
  - Source title + **internal vs. external** indicator.
  - The **cited content unit**, highlighted, with its locator (e.g. §2.1) and quote styling where relevant.
  - The source's **version history** (see Epic 2).
  - A primary action: **Open full document** (internal) or **Open source ↗** (external link-out to legislation, e.g. NOM-220 on the DOF site).
- **Full-document view** (dialog) that scrolls to and flashes the cited content unit in context, with a version switcher.
- **Internal vs. external sources** styled distinctly (violet for internal documents, teal for external legislation).

### Use cases covered

- "Is this claim real?" → click → see the exact source paragraph.
- "Where in the document is this?" → locator + jump-to-context in the full-document view.
- "This cites a law — show me the law." → external link-out.

### Out of scope / stubbed

- A dedicated **content-unit deep view** (single-unit focused screen) is stubbed with a disabled control + "coming next" tooltip, pending a reference screenshot of that screen.
- No real document parsing / content-unit extraction — content units are authored mock data.

---

## Epic 2 — Versioning

**Goal:** Make both the sources and the generated output version-aware and recoverable.

### 2a — Source-document versioning (inside citations)

- Each internal source carries a **version history** (e.g. Guía v1 vs v2), surfaced in the citation mini-component and the full-document view.
- Each version has a **date** and a **change note** describing what changed (e.g. "v2 added the explicit electronic-format (USB/CD) requirement").
- The citation marks **which version the claim was cited from**. Previewing a different version shows a "this claim was cited from vX — you're previewing a different version" notice.

**Why:** proves a claim is pinned to a known version of a regulation, and exposes when a requirement only exists in the newer version.

### 2b — Generated-document versioning (right panel)

- The generated document carries its own **v1 / v2 / v3** history, mirroring how it was built in the chat (create → extend with executive summary + takeaways → add per-document breakdown).
- A **version indicator badge** (`v3 · current`) in the document header opens a **version history popover**: browse versions newest-first, each with date + change note.
- **Preview** any older version (the document body swaps to that version's content).
- **Restore** an older version as current — from the popover row or from an amber **restore banner** shown while previewing a non-current version ("You're viewing v1 — an older version" · Restore / Back to current).
- Version state is shared between the side panel and the full-screen view.

**Why:** AI documents are built iteratively and feed regulated processes; teams need history and rollback on the output itself, not just the sources.

### Out of scope / stubbed

- No persistence — restore updates in-session state only.
- Restore makes a prior version current; it does not (yet) create an audit-logged "restored from vX" entry.

---

## Epic 3 — Full-screen document view

**Goal:** Let users review the generated document comfortably, not just in a narrow side panel.

### What was built

- An **expand action** (⤢) in the document header, alongside copy / download / edit / close.
- Opens a **full-screen-width** view of the generated document with a comfortable centered reading column.
- **Collapse** (minimize) / **close** returns to the side panel; **Esc** also collapses.
- Citation interactions and the A/B citation toggle remain fully functional in the expanded view; the version indicator and restore banner are mirrored there.

**Why:** the side panel is fine for glancing, but reviewing a regulatory summary for sign-off needs room. The expanded view keeps every capability (citations, versions) available while reading at full width.

---

## Success criteria (for the demo)

Qualitative — this is a presentation prototype:

- The Rematiq team engages with it as if it were their own product.
- **ML + engineering leads** give a feasibility read on the citation/content-unit and versioning mechanisms.
- **Designer** reacts to the UX and indicates a preferred citation variant (A or B).
- Shared agreement that citation + versioning are the right direction for audit-ready trust.

## Assumptions

- Paragraph-level content units are the right granularity for traceability.
- Matching the real product UI closely enough makes the demo land as "you got it."
- A scripted COFEPRIS flow is representative enough to carry the conversation.

## Open questions

- [ ] What does the dedicated content-unit view look like? (Awaiting screenshot.)
- [ ] Preferred citation variant — A (highlight) or B (chip)?
- [ ] Should restore create an explicit audit-logged version entry?
- [ ] Should source-version and document-version be labeled distinctly in-product to avoid conflation?

## Tech notes

Next.js (App Router, TS) · Tailwind v4 · shadcn/ui · lucide. Frontend only; scripted data in `src/lib/mock-data.ts`; design tokens in `src/app/globals.css` per [ui-spec.md](ui-spec.md). No backend, no LLM.
