# Product Spec: Citation Mini-Component (Rematiq Case)

## Status

Draft

## Owner

Name: Helmut Fritz

## Summary

In regulated MedTech, AI-generated answers and documents cannot be trusted or used for audit without direct traceability to their sources. Today there is no mechanism to go from "the AI said X" to "here is exactly where X came from, in version Y of document Z" — verification means manually hunting through regulatory or internal documents. This project prototypes a **clickable citation mini-component**: every claim or quote in an AI-generated document carries an inline citation that highlights the exact content unit (paragraph) in its source and provides a path from an isolated claim to its full document context, including internal documents and external legislation. The generated document itself is versioned (v1/v2/v3) with restore. The outcome is audit-ready trust and traceability made tangible in the UI.

## Context

Rematiq has an AI document-research product for regulated MedTech. Users chat with a research agent grounded in their uploaded regulatory and internal documents (e.g. COFEPRIS pharmacovigilance guidance, SOPs, risk management files). The agent can generate structured documents (summaries, breakdowns) that appear in a side editor panel and are saved into a Documentation library. These generated documents make many specific, sourced claims — exactly the kind of content that needs to be verifiable in a regulated environment.

This is a **frontend-only clickable prototype** built against a same-day deadline to present to the Rematiq team. It is scripted with mock data (no backend, no live LLM) and reproduces the real product's UI so the team can react as if to their own product.

## Target Users

Primary audience for the prototype is the **Rematiq team** in a live presentation:

- **ML lead** and **engineering lead** — to assess technical feasibility of the citation/content-unit mechanism.
- **Designer** — to react to the UX pattern and how citations and source context are visually displayed.

End users of the eventual feature are **regulatory, quality, and compliance professionals in MedTech** who must verify and audit AI-generated claims against source documents.

## Problem

AI-generated answers in a regulated MedTech context are untrustworthy without traceability. There is no way to verify a claim without manually searching source documents. This blocks audit-readiness: a claim that cannot be traced to a specific content unit cannot be relied upon for regulatory work.

## Goals

- Make paragraph-level verifiability tangible: clicking a citation highlights the exact content unit in the source document.
- Version the generated document itself: let users see how the AI document evolved (v1/v2/v3) and restore an earlier version.
- Provide a seamless transition from an isolated claim to fuller context — mini-preview and full-document view.
- Support both internal sources (uploaded documents broken into content units) and external sources (link-out to legislation websites).
- Make the prototype look and feel like Rematiq's existing product so the team engages with it directly.
- Elicit concrete feedback: feasibility (ML/eng) and UX/visual direction (design).

## Non-Goals

- No backend, no database, no live LLM calls — all data is scripted/mock.
- No real document ingestion, parsing, or content-unit extraction pipeline.
- No authentication, multi-user, or persistence.
- No production-readiness, error handling for real failure modes, or performance work beyond demo smoothness.
- The dedicated **content-unit deep view** is out of scope for this pass — it will be designed later once a reference screenshot of that screen is available.

## Jobs To Be Done

When I am reviewing an AI-generated claim in a regulated MedTech document, I want to instantly see the exact source paragraph it came from, so I can trust and audit the claim without manually searching the source documents.

## User Experience

The prototype reproduces Rematiq's three-panel research interface: an icon rail, a chat list, the chat thread, and a document editor panel. Sourced claims and quotes carry inline citations in both the chat answer and the generated document — the same citation component is reused in both places. Activating a citation opens the mini-component, which highlights the cited content unit in its source, distinguishes internal vs external sources, and offers expansion to a mini-preview or full-document view. A secondary Documentation list view (matching the real product) provides surrounding context.

### Citation trigger — A/B variants

To gather design feedback, the prototype ships **two visual treatments** of the citation trigger, toggleable for an informal A/B comparison:

- **Variant A** — highlighted claim text with a small superscript marker, binding the claim and its source visually.
- **Variant B** — an inline chip/badge attached to the claim.

## Key Flows

### Flow 1: Verify a claim from an AI-generated document

1. User views the generated COFEPRIS summary document in the editor panel.
2. A sourced claim/quote shows a citation (Variant A or B).
3. User clicks the citation; the mini-component opens.
4. The exact content unit is highlighted in its source document, in context.
5. User expands to a mini-preview or full-document view for comprehensive context, or follows an external link to the underlying legislation.

## Requirements

### Functional Requirements

Stub — to be detailed in the technical spec.

### Non-Functional Requirements

- Performance: Smooth and instant during a live demo; no perceptible latency on citation interactions.
- Accessibility: Reasonable for a prototype; not a launch gate.
- Security: N/A (no backend, no real data beyond mock regulatory content).
- Privacy: Use anonymized/sample regulatory content only.
- Reliability: Must not break or hang during presentation; no live dependencies.

## Success Metrics

Primary metric (qualitative, this is a presentation): the Rematiq team reacts as if seeing their own product, agrees the pattern addresses audit-ready traceability, and gives concrete feedback — **ML and engineering leads weigh in on feasibility, the designer weighs in on the UX/visual treatment** — leaving aligned that this is a pattern worth building, with Helmut seen as someone who understood the product and could work directly with them.

Input metrics: number of distinct pieces of actionable feedback captured; whether a preferred A/B citation variant emerges.

Guardrail metrics: none (prototype).

## Assumptions

- Matching the real product's UI closely enough will make the team engage with the prototype as their own.
- The scripted COFEPRIS conversation and generated document are representative enough to carry the demo and showcase citations naturally.
- Paragraph-level content units are the right granularity for the team's trust/audit needs.
- A frontend-only prototype is sufficient to assess feasibility and UX; backend realism is not required for this conversation.

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| UI doesn't match the real product closely enough | Medium | High | Reverse-engineer tokens from screenshots; capture in ui-spec.md before building |
| Demo breaks live | Low | High | No live dependencies; fully scripted; rehearse the happy path |
| Content-unit deep view expected but not built | Medium | Medium | Explicitly scoped out this pass; stub a placeholder, gather the screenshot for next iteration |

## Launch Plan

Deploy to Vercel as a shareable link; present live to the Rematiq team by end of day.

## Learning Plan

Capture feasibility feedback from ML/eng leads and UX feedback from the designer during the session, including which citation variant (A or B) resonates. Use the input to scope the content-unit deep view and a follow-up iteration.

## Open Questions

- [ ] What does the dedicated content-unit view look like in the real product? (Awaiting screenshot.)
- [ ] Which citation trigger variant does the designer prefer?
- [ ] Should restore create an explicit audit-logged version entry on the generated document?
