# PRD — Citation & Versioning Prototype (Rematiq Case)

> As-built draft · 2026-06-15 · Owner: Helmut Fritz
> Companion docs: [product-spec.md](product-spec.md) · [ui-spec.md](ui-spec.md)
> Structure follows the Alineo PRD format.

## Problem Statement

In a regulated MedTech environment, an AI-generated answer or document cannot be trusted or used for compliance work unless every claim is traceable to the exact source it came from and pinned to a known version of that source. Today, a generated summary that states a requirement — for example, that a pharmacovigilance request "must be submitted in Spanish and in electronic format" — is unusable for an audit until the reader manually hunts through long regulatory PDFs to confirm where it came from, and there is no way to tell whether the claim was drawn from current or superseded guidance. The output evolves through several AI edits with no visible history and no way to roll back. In short: an answer you can't trace is an answer you can't use, and a document you can't version is a document you can't defend.

## Customer Value

A regulatory or quality reviewer gets verifiable, defensible AI output. Concretely, after this succeeds the reviewer can: click any claim and immediately see the exact source paragraph (content unit) that grounds it, with a precise locator; know which version of the regulation that claim relied on, and be warned when a requirement only exists in a newer version; follow a claim out to external legislation when the source is a public standard; review the generated document at full screen width rather than in a cramped side panel; and see how the AI document was built across versions and restore an earlier one. Verification drops from minutes of PDF hunting to a single click, trust is calibrated (grounded claims are visibly distinct from model framing), and the output becomes audit-ready by construction.

## Strategic Context

Rematiq's position is a trustworthy AI research tool for regulated MedTech, not a generic chat assistant. Traceability and versioning are the defensibility moat: they are what make AI output acceptable inside a regulated, audited process, and they are hard to retrofit. This prototype demonstrates that Rematiq understands the compliance reviewer's real bar — provenance and version control — which is exactly the capability that justifies enterprise adoption and differentiates the product from undifferentiated LLM chat. It also serves an immediate goal: aligning the Rematiq team (ML, engineering, design) on the pattern before it is built for real.

## Solution

A frontend-only clickable prototype that mirrors Rematiq's existing product UI (reverse-engineered from screenshots) and is scripted around a real COFEPRIS pharmacovigilance conversation. It delivers three epics.

**Epic 1 — Citation linking.** Every AI-generated claim and quote in the generated document carries an inline citation that binds it to a specific content unit (paragraph) in a specific version of a source document. Two A/B trigger variants are toggleable live for design feedback: Variant A highlights the claim text with a superscript marker; Variant B appends an inline source chip. Clicking a citation opens a mini-component showing the cited content unit (highlighted, with locator), an internal-vs-external indicator, the source's version history, and a primary action — "Open full document" for internal sources (which scrolls to and flashes the cited unit in context) or "Open source ↗" for external legislation.

**Epic 2 — Versioning.** Versioning works at two levels. *Source versioning* lives inside citations: each internal source carries a version history with dates and change notes, the citation marks which version the claim was drawn from, and previewing a different version warns the reader. *Generated-document versioning* lives in the right panel: the document carries v1/v2/v3 history mirroring how it was built in the chat (create → extend with summary + takeaways → add breakdown), shown via a version-indicator badge and a history popover that lets the user preview any version and restore it as current, with a restore banner while a non-current version is in view.

**Epic 3 — Full-screen document view.** An expand action in the document header opens the generated document at full screen width with a comfortable reading column, while keeping citations, the A/B toggle, the version indicator, and the restore banner fully functional. Collapse, close, or Esc returns to the side panel.

## User Stories

*Epic 1 — Citation linking*
- As a regulatory reviewer, I want to click a claim in the AI document and see the exact source paragraph, so that I can verify it without searching the original PDF.
- As an auditor, I want each claim to show a precise locator (e.g. §3.4), so that I can record where evidence came from.
- As a reviewer, I want grounded claims to look visually distinct from the model's framing, so that I can calibrate how much to trust each statement.
- As a reviewer, I want a claim sourced from a law to link out to the official legislation, so that I can read the primary text.
- As a designer, I want to compare two citation treatments side by side, so that I can choose the clearest pattern.

*Epic 2 — Versioning*
- As a compliance reviewer, I want to know which version of a regulation a claim relied on, so that I am not citing superseded guidance.
- As a reviewer, I want to be warned when a requirement only exists in the newer version of a source, so that I catch version-sensitive obligations.
- As a document owner, I want to see how the AI document evolved across versions, so that I can understand what changed and when.
- As a document owner, I want to restore an earlier version of the generated document, so that I can roll back an unwanted change.

*Epic 3 — Full-screen view*
- As a reviewer, I want to expand the generated document to full width, so that I can review it comfortably for sign-off.
- As a reviewer, I want citations and versioning to keep working in the expanded view, so that I don't lose capability when reading at full size.

## Assumptions

- [High] Paragraph-level content units are the right granularity for traceability and audit.
- [High] Matching Rematiq's existing UI closely enough makes the demo land as "you understood our product."
- [Medium] A scripted COFEPRIS flow is representative enough to carry the conversation and showcase citations naturally.
- [Medium] Teams want rollback on the generated document, not just visibility into its history.
- [Low] Source-version and document-version concepts can coexist without confusing users.

## Risks

- [High] If the UI doesn't match the real product closely enough, the demo loses credibility — mitigated by reverse-engineering tokens from screenshots into the UI spec.
- [Medium] The two version concepts (source vs generated document) may be conflated by viewers — mitigated by distinct placement; may need explicit labels.
- [Medium] Expectation of a dedicated content-unit view that isn't built yet — mitigated by an explicit stub and "coming next" affordance.
- [Low] Live demo failure — mitigated by no live dependencies and fully scripted data.

## Implementation Decisions

- Build frontend-only with scripted mock data; no backend and no live LLM, so the demo is fast and cannot fail on stage.
- Ship two A/B citation variants behind a live toggle rather than picking one, to gather designer feedback in the room.
- Bind the claim and its source visually in Variant A (highlight + superscript) and keep claim text clean in Variant B (inline chip).
- Derive all design tokens (indigo-violet accent, Inter, light mode) from the product screenshots rather than inventing an aesthetic.
- Model versioning at two levels — source versions inside citations, generated-document versions in the panel — to tell the full auditability story.
- Share version state between the side panel and the full-screen view so they stay in sync.
- Make "restore" set the chosen version as current in-session (no persistence), as a believable prototype interaction.
- Stub the dedicated content-unit deep view with a disabled control, pending a reference screenshot.

## Success Metrics

- ML and engineering leads give an explicit feasibility read on the citation/content-unit and versioning mechanisms during the session.
- The designer names a preferred citation variant (A or B) after seeing both.
- The team agrees citation + versioning are the right direction for audit-ready trust (qualitative go/no-go).
- At least 3 pieces of concrete, actionable feedback are captured to scope the next iteration.

## Out of Scope

- Backend, database, authentication, and persistence.
- Real document ingestion, parsing, or content-unit extraction.
- Live LLM calls — the conversation and citations are scripted.
- The dedicated content-unit deep view (stubbed for a later pass).
- An audit-logged "restored from vX" version entry on restore.
- Production error handling, performance, and accessibility hardening.

## Further Notes

- [ ] Need a reference screenshot of the dedicated content-unit view before building it.
- [ ] Decide the preferred citation trigger — Variant A (highlight) or Variant B (chip).
- [ ] Decide whether restore should create an explicit audit-logged version entry rather than silently swapping current.
- [ ] Decide whether source-version and document-version should be labeled distinctly in-product to avoid conflation.
