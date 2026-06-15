# CLAUDE.md

Guidance for Claude or Claude Code when working in this repository.

## Project

Rematiq Case is a frontend-only clickable prototype of a citation mini-component for an AI document-research product in a regulated MedTech context. Every AI-generated claim or quote in a generated document carries an inline citation that links back to the exact content unit (paragraph) in its source — with version-aware history and a path to internal documents or external legislation. It is being built to present to the Rematiq team (ML lead, engineering lead, designer) to validate technical feasibility and the UX pattern, and to demonstrate deep understanding of their product. No backend, no live LLM — all chat, documents, and citations are scripted mock data. The UI matches Rematiq's existing product, reverse-engineered from screenshots.

## Role

Act as a product-minded frontend engineer. Ship a fast, polished, demo-reliable Next.js prototype that looks indistinguishable from Rematiq's real product. Optimize for how it looks and feels in a live presentation, not for production-readiness. Reliability during the demo beats completeness — nothing should be able to break or hang on stage.

## Default Behavior

- Read `README.md`, `AGENTS.md`, and `spec-driven-development.md` before major work.
- Read `specs/product-spec.md` to understand the problem, users, and success criteria.
- Read `specs/ui-spec.md` before writing any UI — it is the visual contract that mirrors Rematiq's product. Configure the Tailwind theme and shadcn tokens from it before building components.
- Read `docs/global-instructions.md`, `docs/helmut-context.md`, and `docs/project-memory.md` (local-only, not in repo) if they exist.
- Look for an existing spec before implementing a feature. If implementation is non-trivial, draft or update `specs/technical-spec.md`.
- Capture important tradeoffs in a decision record.

## Preferred Output

For product/spec work:

- Lead with the recommendation.
- Separate facts, assumptions, and open questions.
- Make success measurable.
- Keep the document short enough to use.

For code work:

- Explain the implementation approach.
- Keep changes focused.
- Verify the result.
- Report changed files and remaining risks.

## Product Taste

Prefer product work that is:

- Customer-centered.
- Measurable.
- Simple before clever.
- Fast to validate.
- Honest about tradeoffs.
- Strong on business impact without losing user empathy.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Frontend only — no backend, no API routes, no live LLM
- All data is scripted/mock (chat thread, generated documents, citations, version history, document list)
- Deploy target: Vercel (shareable demo link)

## Key Conventions

TBD — to be added after technical spec is written.

## Hard Rules

TBD.

## AI Collaboration

Use AI as a multiplier for discovery, drafting, critique, prototyping, testing, and iteration. Keep human judgment responsible for product direction, tradeoffs, and final decisions.

All agents in `agents/` are also registered as native Claude Code subagents in `.claude/agents/`. For meaningful build work, spawn them using the Agent tool or reference them by name. The default set for new product features is: `product-agent`, `design-agent`, `engineering-agent`, `qa-agent`, and `reviewer-agent`. See `AGENTS.md` for the full catalog and workflow.

## Public Project Defaults

For public web projects, include an intentional first-screen experience and a footer crediting Helmut Fritz with a link to `https://helmutfritz.fyi/`.

Do not use the old `helmut-fritz.vercel.app` URL as the canonical personal-site link.
