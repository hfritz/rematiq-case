# PRD — Versioning & Draft/Publish

> As-built draft · 2026-06-16 · Owner: Helmut Fritz
> Companion docs: [product-spec.md](product-spec.md) · [ui-spec.md](ui-spec.md) · [prd-citation-linking.md](prd-citation-linking.md)

## Problem Statement

**In a regulated MedTech environment, a document that evolves through several edits with no visible history is a document you can't defend.** 

Today, when an AI extends or rewrites a generated document there is no record of what changed, and no explicit human approval step before the output is treated as final. **A document you can't version is a document you can't audit.**

## Customer Value

A regulatory or quality reviewer gets a generated document with a traceable, controllable view history. After this succeeds the reviewer can: see how the document was built across versions and understand what changed at each step; and keep the document in draft until they explicitly approve it for publication. Mistakes become recoverable, and the published state is always the result of a deliberate human action, not an automatic output.

## Strategic Context

Rematiq's position is a trustworthy AI research tool for regulated MedTech, not a generic chat assistant. Versioning is the second half of the defensibility moat: traceability tells you where a claim came from; versioning tells you which version of the document was actually approved. Together they make AI output acceptable inside a regulated, audited process.

## Solution

The generated document in the right panel carries its own v1/v2/v3 history, mirroring how it was built in the chat (create → extend with summary + takeaways → add breakdown). A version-indicator badge in the document header opens a history popover that lets the user preview any version and restore it as current, with a restore banner shown while a non-current version is in view.

**Draft / Publish.** A document stays in **Draft** state and is only treated as final when the user manually clicks a **Publish** button in the document header, which marks it **Published**. Publishing is always an explicit human action — nothing is published automatically. Restoring an earlier version changes the document's content and therefore returns it to Draft until it is published again, keeping the published state honest about what was actually approved.

## User Stories

- As a user, I want to see how the AI document evolved across versions, so that I can understand what changed and when.
- As a user, I want to preview an older version of the document, so that I can compare it to the current state without leaving the panel.
- As a user, I want a document to stay in draft until I explicitly click Publish, so that nothing is treated as final or audit-ready until I approve it.

## Assumptions

- [Medium] Teams want visibility into document version history; full rollback is a later step once the simpler view-only pattern is validated.
- [High] A single chat session produces at most one generated document. Multiple documents per chat is out of scope.
- Due to lack of supporting evidence to drive the development of this PRD, an initial POC can help us validate the interest/value in being able to see a history of a document generated via the chat.

## Risks

- Low perceived value => Low usage of the document creation flow
- Not covering the right use case

## Implementation Decisions

- Version the generated document in the panel (single level); do not surface source-document version history inside citations, to avoid conflating two version concepts.
- **View-only history (no restore for now).** Per Anton: the simpler approach is to let users only view older versions, but not restore them. This reduces alignment friction with Stefan on the agentic setup and defers the harder questions about how restore interacts with agents and chat sessions. Restore remains a future candidate once the view-only pattern is validated.
- **One document per chat.** A chat session produces at most one generated document. This is a hard constraint for the current scope.

## Success Metrics

- TBA

## Out of Scope

- Restore / recover an earlier version (deferred — requires alignment with Stefan on agentic setup)
- Templating
- Document creation details
- Multiple documents per chat session
- Documents created from chat as SOPs (different artifact type; out of scope for this flow)
  - Why? They are currently being saved
- Referencing to requirements
  - Can we do this?

## Open Questions

- **Other use cases:** Version history is validated for the AI document panel — does Rematiq expect versioning to apply to other artifact types (e.g., requirement assessments, reports)?
- **Version trigger:** What action creates a new version — every AI edit, every user-initiated document generation step, or an explicit "save version" action? The prototype scripts v1/v2/v3 around chat steps, but the real trigger rule needs to be defined.
- **Agentic awareness:** When an AI agent generates new document content in a follow-up turn, is it aware of existing version history? Does it append a new version, overwrite the current one, or operate independently of the version model? Requires alignment with Stefan before implementation.
- **Chat session lifecycle:** What happens to a versioned document when its parent chat session is archived, closed, or deleted? Is the document lifetime tied to the session or independent?
- **Unpublish:** Can a published document be returned to Draft — for example, if the reviewer discovers an error but doesn't want to lose current content?
- **Access control:** Who can publish — any user with document access, or is this role-restricted (e.g., only the document owner or a designated reviewer)?

