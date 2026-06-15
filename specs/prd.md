# PRD — Citation & Versioning Prototype (Rematiq Case)

> As-built draft · 2026-06-15 · Owner: Helmut Fritz
> Companion docs: [product-spec.md](product-spec.md) · [ui-spec.md](ui-spec.md)

## Problem Statement

In a regulated MedTech environment, an AI-generated answer or document cannot be trusted or used for compliance work unless every claim is traceable to the exact source it came from. Today, a generated summary that states a requirement — for example, that a pharmacovigilance request "must be submitted in Spanish and in electronic format" — is unusable for an audit until the reader manually hunts through long regulatory PDFs to confirm where it came from. The output also evolves through several AI edits with no visible history and no way to roll back. In short: an answer you can't trace is an answer you can't use, and a document you can't version is a document you can't defend.

## Customer Value

A regulatory or quality reviewer gets verifiable, defensible AI output. Concretely, after this succeeds the reviewer can: click any claim and immediately see the exact source paragraph (content unit) that grounds it, with a precise locator; follow a claim out to external legislation when the source is a public standard; review the generated document at full screen width rather than in a cramped side panel; and see how the AI document was built across versions and restore an earlier one. Verification drops from minutes of PDF hunting to a single click, trust is calibrated (grounded claims are visibly distinct from model framing), and the output becomes audit-ready by construction.

## Strategic Context

Rematiq's position is a trustworthy AI research tool for regulated MedTech, not a generic chat assistant. Traceability and versioning are the defensibility moat: they are what make AI output acceptable inside a regulated, audited process, and they are hard to retrofit. This prototype demonstrates that Rematiq understands the compliance reviewer's real bar — provenance and version control — which is exactly the capability that justifies enterprise adoption and differentiates the product from undifferentiated LLM chat. It also serves an immediate goal: aligning the Rematiq team (ML, engineering, design) on the pattern before it is built for real.

## Solution

A frontend-only clickable prototype that mirrors Rematiq's existing product UI (reverse-engineered from screenshots) and is scripted around a real COFEPRIS pharmacovigilance conversation. It delivers three epics.

**Epic 1 — Citation linking.** Every AI-generated claim and quote — in both the chat answer and the generated document — carries an inline citation that binds it to a specific content unit (paragraph) in a source document. Two A/B trigger variants are toggleable live for design feedback: Variant A highlights the claim text with a superscript marker; Variant B appends an inline source chip. Clicking a citation opens a mini-component showing the cited content unit (highlighted, with locator), an internal-vs-external indicator, and a primary action — "Open full document" for internal sources (which scrolls to and flashes the cited unit in context) or "Open source ↗" for external legislation. The same citation component is reused in the chat thread and the document, so grounding is consistent everywhere a claim appears.

**Broken citations.** If a cited content unit is later deleted from its source — for example, the source document is re-uploaded and that paragraph is removed — the citation is rendered as a **broken (red) link** wherever it appears, with a strikethrough and an "unlink" marker. Opening it shows a red "Link broken / content unit deleted" mini-component explaining when and why the paragraph was removed, and the full-document view shows the deleted unit as a red, struck-through tombstone. The system never silently shows a dead citation: a claim whose grounding has disappeared is always visibly flagged so it can be reviewed or re-grounded before the document is published.

**Epic 2 — Versioning.** The generated document in the right panel carries its own v1/v2/v3 history, mirroring how it was built in the chat (create → extend with summary + takeaways → add breakdown). A version-indicator badge in the document header opens a history popover that lets the user preview any version and restore it as current, with a restore banner shown while a non-current version is in view. **Draft / Publish:** a document stays in **Draft** state and is only treated as final when the user manually clicks a **Publish** button in the document header, which marks it **Published**. Publishing is always an explicit human action — nothing is published automatically. Restoring an earlier version changes the document's content and therefore returns it to Draft until it is published again, keeping the published state honest about what was actually approved.

**Epic 3 — Full-screen document view.** An expand action in the document header opens the generated document at full screen width with a comfortable reading column, while keeping citations, the A/B toggle, the version indicator, and the restore banner fully functional. Collapse, close, or Esc returns to the side panel.

## User Stories

*Epic 1 — Citation linking*

- As a user, I want to click a claim in the AI document and see the exact source paragraph, so that I can verify it without searching the original PDF.
- As a user, I want claims in the chat answer to be cited too, so that I can verify the AI's response inline before it ever becomes a document.
- As a user I want each claim to show a precise locator (e.g. §3.4), so that I can record where evidence came from.
- As a user, I want grounded claims to look visually distinct from the model's framing, so that I can calibrate how much to trust each statement.
- As a user, I want a claim sourced from a law to link out to the official legislation, so that I can read the primary text.
- As a user, I want a citation whose source paragraph was deleted to be clearly flagged as a broken (red) link, so that I never trust a claim whose grounding has silently disappeared.

*Epic 2 — Versioning*

- As a user, I want to see how the AI document evolved across versions, so that I can understand what changed and when.
- As a user, I want to restore an earlier version of the generated document, so that I can roll back an unwanted change.
- As a user, I want a document to stay in draft until I explicitly click Publish, so that nothing is treated as final or audit-ready until I approve it.

*Other — Full-screen view*

- As a user, I want to expand the generated document to full width, so that I can review it comfortably for sign-off.
- As a user, I want citations and versioning to keep working in the expanded view, so that I don't lose capability when reading at full size.

## Assumptions

- [High] Paragraph-level content units are the right granularity for traceability and audit.
- [High] Matching Rematiq's existing UI closely enough makes the demo land as "you understood our product."
- [Medium] A scripted COFEPRIS flow is representative enough to carry the conversation and showcase citations naturally.
- [Medium] Teams want rollback on the generated document, not just visibility into its history.

## Risks

- [High] If the UI doesn't match the real product closely enough, the demo loses credibility — mitigated by reverse-engineering tokens from screenshots into the UI spec.
- [Medium] Expectation of a dedicated content-unit view that isn't built yet — mitigated by an explicit stub and "coming next" affordance.
- [Low] Live demo failure — mitigated by no live dependencies and fully scripted data.

## Implementation Decisions

- Link to content unit and not to document (feasibility question answered)
- Version the generated document in the panel (single level); do not surface source-document version history inside citations, to avoid conflating two version concepts.
- Share version state between the side panel and the full-screen view so they stay in sync.
- Make "restore" set the chosen version as current in-session (no persistence), as a believable prototype interaction.
- Stub the dedicated content-unit deep view with a disabled control, pending a reference screenshot.

## Success Metrics

- TBA

## Out of Scope

- Referencing to requirements

## Open questions

- Which other use cases do we have?



