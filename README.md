# Rematiq Case

A clickable citation mini-component that turns every AI-generated claim into a verifiable, version-aware link back to the exact paragraph in its source document.

## What it does

In regulated MedTech, AI answers can't be trusted without traceability — there's no way to go from "the AI said X" to "here's exactly where X came from, in version Y of document Z" without manually hunting through regulatory docs. This prototype solves that with a citation mini-component: claims and quotes in an AI-generated document carry inline citations that highlight the precise content unit in the source, show its version history, and link out to internal documents or external legislation. Built as a frontend-only clickable prototype to present to the Rematiq team for feasibility and UX feedback.

## Specs

- [PRD — Citation & Versioning (as-built)](specs/prd.md)
- [Product Spec](specs/product-spec.md)
- [Technical Spec](specs/technical-spec.md)
- [UI Spec](specs/ui-spec.md)

## Tech stack

Next.js (App Router, TypeScript) + Tailwind + shadcn/ui. Frontend only — no backend, no live LLM. All chat, documents, and citations are scripted mock data. UI matches Rematiq's existing product (indigo-violet accent, light mode, clean sans-serif).

## Getting started

Coming soon — app not yet scaffolded.

---

Built by [Helmut Fritz](https://helmutfritz.fyi/) using AI tools · 2026
