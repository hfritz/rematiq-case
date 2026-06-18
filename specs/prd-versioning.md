# PRD — Versioning & Draft/Publish

> Draft · 2026-06-17 · Owner: Helmut Fritz

## Problem Statement

**In a regulated MedTech environment, a document that evolves through several edits with no visible history is a document you can't defend.** 

Today, when a document is updated via the chat or by a human on the document container, there is no record of what changed, and there's no need of an explicit human approval step before the output is treated as final. **A document you can't version is a document you can't audit.**

## Customer Value

**A regulatory or quality reviewer gets a generated document with a traceable, controllable view history.** After this succeeds the reviewer can: see how the document was built across versions and understand what changed at each step; and keep the document in draft until they explicitly approve it for publication. **The published state is always the result of a deliberate human action, not an automatic output.**

## Strategic Context

Versioning and an explicit publish gate are what let a reviewer prove which version was approved and how it got there, which is the bar an audited process demands and a differentiator from a tool that silently overwrite AI output. The view-only history is the cheapest first step to validate that this control matters before investing in full restore.

## Solution

The generated document in the right panel can have its own history. A document is by default in 'Draft' status until a user clicks on 'Publish'. A version-indicator badge in the document header opens a history popover that lets the user see any previous version with a non-current version banner on top of the document view.

**Draft / Publish.** A document stays in **Draft** state and is only treated as final when the user manually clicks a **Publish** button in the document header, which marks it **Published**. Publishing is always an explicit human action; nothing is published automatically. Restoring an earlier version changes the document's content and therefore returns it to Draft until it is published again, keeping the published state honest about what was actually approved.

Prototype link: [https://rematiq-case.vercel.app/](<https://rematiq-case.vercel.app/>)

## **Epic: Document versioning & publishing**

*A generated document is a Draft until a reviewer explicitly publishes it. Publishing saves a version, and the document carries a reviewable history of those published versions, so anyone can see which version was approved and how it got there.*

### Issues in epic:

#### **Milestone 1: Draft / Publish gate**

* As a reviewer, I want a generated document to stay in **Draft** until I explicitly click **Publish**, so that nothing is treated as final until I approve it.
* As a reviewer, I want to see the document's status (Draft / Published) at a glance in the header, so that I always know whether what I'm looking at has been approved.
* ~~As a reviewer, I want publishing to save the current content as a version, so that there is a durable, approved record; and editing a published document creates a new Draft until I publish again.~~

#### **Milestone 2: Version history**

* As a reviewer, I want to open a history of previous versions from the document header, so that I can find an earlier state.
* As a reviewer, I want to preview an older version without leaving the panel, with a clear banner that I'm viewing a non-current version, so that I don't confuse it with the live document.
*  As a reviewer, I want to see how the document evolved across versions, so that I understand what changed and when.

#### **Milestone 3: Edit a previous version into a new one**

* As a reviewer, I want to edit a previewed older version, so that I can correct or revive earlier content without breaking the version trail.
* As a reviewer, my drafts are saved automatically, so that if I want to continue editing the version on another session, I can continue without problems.
  * Same behaviour as for the 'Regulatory database'

## Assumptions

* Teams want visibility into document version history; full rollback is a later step once the simpler view-only pattern is validated.
* A single chat session produces at most one generated document. Multiple documents per chat is out of scope.
* Despite the lack of supporting evidence to drive this, an initial POC can help us validate the interest/value in being able to see a history of a document generated via the chat.

## Risks

* The Publish button makes a document feel approved; users might click it reflexively without real review
* View-only history is too thin => low engagement
* Hard to understand what changed without a diff

## Implementation Decisions

* Publishing is always an explicit human action. Nothing is published automatically.
* Version the generated document in the panel (single level); do not surface source-document version history inside citations, to avoid conflating two version concepts.
* **View-only history (no restore for now).** Per Anton: the simpler approach is to let users only view older versions, but not restore them. This reduces alignment friction with Stefan on the agentic setup and defers the harder questions about how restore interacts with agents and chat sessions. Restore remains a future candidate once the view-only pattern is validated.
  * A user can view a previous version and edit it and publish it to create a new version.
* **One document per chat.** A chat session produces at most one generated document. This is a hard constraint for the current scope.

## Success Metrics

### **Engagement: do users even use this?**

* % of generated documents where the user opens the version history popover
* % where they actually preview a non-current version

### **Guardrail**

* The versioning/publish steps don't add friction that slows document creation

## Out of Scope

* Restore / recover an earlier version (deferred — requires alignment with Stefan on agentic setup)
* Templating
* A document cannot be modified from a different chat than the one where it was created
* Multiple documents per chat session
* Documents created from chat as SOPs (different artifact type; out of scope for this flow)
  * Why? They are currently being saved
    * Highly regulated documents, deeply embedded in a company 
    * They are currently saved but not available on for workflows

## Open Questions

|  | **Question** | **Answer** |
| -- | -- | -- |
| ✅ | **Version trigger:** What action creates a new version — every AI edit, every user-initiated document generation step, or an explicit "save version" action? The prototype scripts v1/v2/v3 around chat steps, but the real trigger rule needs to be defined. | Publishing is the only way to create a new version that gets saved to the documentation and it's always an explicit human action. Nothing is published automatically. |
| ✅  | **Agentic awareness:** When an AI agent generates new document content in a follow-up turn, is it aware of existing version history? Does it append a new version, overwrite the current one, or operate independently of the version model? Requires alignment with Stefan before implementation. | Due to the answer above, this scenario won't happen. Only manual trigger of pusblishing generates a new version. That will then add the new version on the document if V>1 |
| ✅  | **Chat session lifecycle:** What happens to a versioned document when its parent chat session is archived, closed, or deleted? Is the document lifetime tied to the session or independent? | No. The document is now part of the documentation and it should not be deleted automatically. |
| ✅  | **Unpublish:** Can a published document be returned to Draft — for example, if the reviewer discovers an error but doesn't want to lose current content? | No. New version will be required. |
| ✅ | **Access control:** Who can publish — any user with document access, or is this role-restricted (e.g., only the document owner or a designated reviewer)? | Do we have role-restricted access rights?<br><br>Admins can publish and create new chats. Others can see documents. |
| ✅ | What the publish button really does and how it interacts with the rest of the system (e.g. the internal documentation) | Documents created from chat are currently being saved with the type "Other" and they are not selectable for SOPs.<br><br>Changing that behaviour is out of the scope of this PRD. |
