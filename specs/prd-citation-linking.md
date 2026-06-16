# PRD — Citation Linking

> As-built draft · 2026-06-16 · Owner: Helmut Fritz
> Companion docs: [product-spec.md](product-spec.md) · [ui-spec.md](ui-spec.md) · [prd-versioning.md](prd-versioning.md)

## Problem Statement

**In a regulated MedTech environment, an AI-generated answer or document cannot be trusted or used for compliance work unless every claim is traceable to the exact source it came from.** 

Today, a generated summary that states a requirement — for example, that a pharmacovigilance request "must be submitted in Spanish and in electronic format" — is unusable for an audit until the reader manually hunts through long regulatory PDFs to confirm where it came from. **An answer you can't trace is an answer you can't use.**

### Use cases

- QMS / template document generation from source docs => Core “N input docs → 1 output deliverable” flow. Citations prove where generated content came from
- Novanta R&D document generation => Concrete customer/POC use case: MDR compliance, updating specs, generating R&D docs

## Customer Value

A regulatory or quality reviewer gets verifiable, defensible AI output. After this succeeds the reviewer can: click any claim and immediately see the exact source paragraph (content unit) that grounds it, with a precise locator; follow a claim out to external legislation when the source is a public standard; and instantly understand which parts of an AI response are grounded in a source vs. model framing. Verification drops from minutes of PDF hunting to a single click, and the output becomes audit-ready by construction.

## Strategic Context

Rematiq's position is a trustworthy AI research tool for regulated MedTech, not a generic chat assistant. Traceability is the defensibility moat: it is what makes AI output acceptable inside a regulated, audited process, and it is hard to retrofit.

## Happy path

User asks a regulatory question → AI answers with paragraph-level citations → user generates a document → document keeps citations → user iterates → user publishes only after review.

## Solution

Every AI-generated claim and quote — in both the chat answer and the generated document — carries an inline citation that binds it to a specific artifact type (content unit, requirement, applicability assessment, etc) in a source document via an inline source chip. Clicking a citation opens a mini-component showing the cited content unit (highlighted, with locator), an internal-vs-external indicator, and a primary action — "Open full document" for internal sources (which scrolls to and flashes the cited unit in context) or "Open source ↗" for external legislation. The same citation component is reused in the chat thread and the document, so grounding is consistent everywhere a claim appears.

**Broken citations.** If a cited content unit is later deleted from its source — for example, the source document is re-uploaded and that paragraph is removed — the citation is rendered as a **broken (red) link** wherever it appears, with a strikethrough and an "unlink" marker. Opening it shows a red "Link broken / content unit deleted" mini-component explaining when and why the paragraph was removed, and the full-document view shows the deleted unit as a red, struck-through tombstone. The system never silently shows a dead citation: a claim whose grounding has disappeared is always visibly flagged so it can be reviewed or re-grounded before the document is published.

## User Stories

- As a user, I want to click a claim in the AI document and see the exact source paragraph, so that I can verify it without searching the original PDF.
- As a user, I want claims in the chat answer to be cited too, so that I can verify the AI's response inline before it ever becomes a document.
- As a user, I want each claim to show a precise locator (e.g. `CU-001`), so that I can record where evidence came from.
- As a user, I want grounded claims to look visually distinct from the model's framing, so that I can calibrate how much to trust each statement.
- As a user, I want a claim sourced from a law to link out to the official legislation, so that I can read the primary text.
- As a user, I want a citation whose source paragraph was deleted to be clearly flagged as a broken (red) link, so that I never trust a claim whose grounding has silently disappeared.

## Assumptions

- [High] Paragraph-level content units are the right granularity for traceability and audit.
- [High] Chat answer citations are core for the verification of the content, which leads to the document generation
- Due to lack of supporting data to drive the development of this PRD, initial POCs can help us validate interest/value in:
  - Citations on chat pre document generation
  - Citations on generated documents

## Risks

- Low perceived value => Low usage of the citation flow
- Not covering the right use case

## Implementation Decisions

- Link to content unit and not to document (feasibility question answered). Validated by Rematiq's real data model: `cdm_content_unit` is a first-class artifact type in their artifact graph.
- The same citation mini-component is reused in chat and document to keep grounding consistent.
- **Locator format (prototype stand-in):** The prototype displays section-style locators (e.g., `§3.4`) as a readable stand-in. Real integration would use `cdm_content_unit.unitKey` (current format: `cu_0001`) or the proposed `CU-001` readable ID once that is finalized. See `docs/readable-ids.md` for the open questions on counter scope, padding, and storage location.

## Success Metrics

- TBA

## Out of Scope

- Referencing to requirements
- Templating
- Document creation details

## Open Questions

- **Other use cases:** Citation linking is validated for a pharmacovigilance research conversation — which other workflows or document types does Rematiq expect citations to appear in?
- Content units only?
- Maybe a pre-requisite [readable-ids.md?](http://readable-ids.md)
  - **Locator display format:** Which identifier should citations show to the reviewer — `cdm_content_unit.unitKey` (`cu_0001`), the proposed readable ID (`CU-001`), or a human-readable source reference (article, section, page) if the content unit carries that metadata? The `CU-001` scheme is still a draft with unresolved questions (see `docs/readable-ids.md` §8).
- **Broken citation detection mechanism:** When a `cdm_content_unit` is deleted, how does the citation layer know? Does deletion propagate a tombstone event, or does the system need to poll for missing unit keys? What is the acceptable staleness window?
- **Broken vs. stale citations:** The current design detects hard deletes. What happens when a content unit is *edited* after a citation is written — the unit still exists but its content has changed? Should edited units be flagged differently from deleted ones?
- **Broken citations and publishing:** Should a document with one or more broken citations be blocked from publishing, or only warned? Who decides — the system or the reviewer?
- **Multi-unit grounding:** Can a single claim be grounded in more than one content unit? If yes, how should the citation display handle multiple sources for one claim?
  - Yes
- **Re-grounding responsibility:** When a citation is broken, is the expected workflow for the author to manually find a replacement source, or should the system suggest candidate content units?
- What document format? Only text? Template?
- From the feedback: "It has not explained the differences between requirements within the document editor and the requirements in the compliance library sufficient."
- Should citations be reusable in other components (workflow/ai agent)
- 

