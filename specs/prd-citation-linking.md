# PRD — Citation Linking

> Draft · 2026-06-17 · Owner: Helmut Fritz

## Problem Statement

**In a regulated MedTech environment, an AI-generated answer or document cannot be trusted or used for compliance work unless every claim is traceable to the exact source it came from.**

Today, a generated summary that states a requirement — for example, that a pharmacovigilance request "must be submitted in Spanish and in electronic format" — is unusable for an audit until the reader manually hunts through long regulatory PDFs to confirm where it came from. **An answer you can't trace is an answer you can't use.**

### Use cases

| **Use case** | **Why it matters** | **Notion source** |
| -- | -- | -- |
| QMS / template document generation from source docs | Core “N input docs → 1 output deliverable” flow. Citations prove where generated content came from | * [PRD: REMATIQ Agent: Document Creation](<https://app.notion.com/p/33d7ea0fb71f80e8884ae29c8fdeabbe>)<br>* [PM Case](<https://app.notion.com/p/37c7ea0fb71f80718b64f6a8e64f8a2a>) |
| Novanta R&D document generation | Concrete customer/POC use case: MDR compliance, updating specs, generating R&D docs | * [Novanta POC Alignment](<https://app.notion.com/p/3807ea0fb71f806fb80cd62b936f86cf>), <br>* [Novanta Use Case Info](<https://app.notion.com/p/37c7ea0fb71f80e1a976ec39b7b2c7d0>) |
| Regulatory Q&A with source paragraph navigation | Validates clickable paragraph-level citations in chat before document creation. Pilot feedback says source tracing works and is valued. | * [Feedback for research agent — 2026-05](<https://app.notion.com/p/3677ea0fb71f804cae31f9ffc5b4ab50>) |

## Customer Value

**A regulatory or quality reviewer gets verifiable, defensible output.** After this succeeds the reviewer can: click any claim and immediately see the exact source artifact (content unit, assessments, reports, coverage checks, etc) that grounds it, with a precise locator; follow a claim out to external legislation when the source is a public standard; and instantly understand which parts of an AI response are grounded in a source vs. model framing. **Verification drops from time spent on PDF hunting to a single click, and the output becomes audit-ready by default.**

## Strategic Context

Traceability is the defensibility moat: it is what makes AI output acceptable inside a regulated, audited process, and building it in from the start is what makes it credible.

## Happy path

User asks a regulatory question → AI answers with paragraph-level citations → user generates a document → document keeps citations → user iterates → user publishes only after review.

## Solution

Every AI-generated claim and quote — in both the chat answer and the generated document — carries one or more inline citation(s) that binds it to a specific artifact type (content unit, requirement, applicability assessment, etc) in a source document via an inline source chip. Clicking a citation opens a mini-component showing the cited content unit (highlighted, with locator), an internal-vs-external indicator, and a primary action — "Open full document" for internal sources (which takes the user to the cited artifact) or "Open source ↗" for external legislation. The same citation component is reused in the chat thread and the document, so grounding is consistent everywhere a claim appears.

**Broken citations.** If a cited content unit is later deleted from its source — for example, the source document is re-uploaded and that paragraph is removed — the citation is rendered as a **broken (red) link** wherever it appears, with a strikethrough and an "unlink" marker. Opening it shows a red "Link broken / content unit deleted" mini-component explaining when and why the paragraph was removed, and the full-document view shows the deleted unit as a red, struck-through tombstone. The system never silently shows a dead citation: a claim whose grounding has disappeared is always visibly flagged so it can be reviewed or re-grounded before the document is published.

Prototype link: [https://rematiq-case.vercel.app/](<https://rematiq-case.vercel.app/>)

## **Epic 1: Citations in chat answers**

Inline citations appear on every AI response in the chat thread, binding each claim to the exact source artifact it came from. The reviewer can verify the AI's answer in the moment before it ever becomes a document and distinguish grounded claims from model framing at a glance.

### Issues in epic:

#### **Milestone 1: Chat basics**

* ~~As a reviewer, I want a direct quote from a source artifact to be cited inline, so that I can see exactly where that text came from.~~
* As a reviewer, I want to click a citation in chat and see the exact source artifact it came from, so that I can confirm the AI's answer is grounded before acting on it.
* As a reviewer, I want grounded claims to look visually distinct from the model's framing, so that I know which parts of the answer are sourced and which are not.

#### **Milestone 2: Chat breadth**

* As a reviewer, I want AI-generated text that is grounded in a source artifact to carry a reference citation, so that I know which artifact informed that claim even when it's not a direct quote.
* As a reviewer, I want a citation in chat to link out to the official legislation when the source is a public standard, so that I can read the primary text directly.
* ~~As a reviewer, I want citations to work across different artifact types, content units, requirements, assessments, so that any claim can be traced regardless of what kind of source grounded it.~~

#### **Milestone 3: Chat integrity**

* As a reviewer, I want broken citations in the chat to be clearly flagged, so that I can identify and re-ground any claim whose source has disappeared before I generate a document.

## **Epic 2: Citations in the generated document**

Citations established in chat carry through into the generated document and remain live. The reviewer can click any cited claim to see its source artifact with a precise locator, and any citation whose source has since been deleted is flagged as broken, so nothing reaches publication with silent, unverifiable grounding.

### Issues in epic:

#### **Milestone 4: Document basics**

* As a reviewer, I want direct quotes in the document to carry inline citations to their source artifact
* As a reviewer, I want citations to carry through from the chat into the generated document

#### **Milestone 5: Document Breadth**

* As a reviewer, I want AI-generated text that is grounded in a source artifact to carry a reference citation, so that I know which artifact informed that claim even when it's not a direct quote
* As a reviewer, I want to click a citation in a document and see the exact source artifact it came from, so that I can confirm the AI's answer is grounded before acting on it.

#### **Milestone 6: Document integrity**

* As a reviewer, I want broken citations in the document to be clearly flagged, so that I can identify and re-ground any claim whose source has disappeared before I publish.

## Assumptions

* Chat answer citations are core for the verification of the content, which leads to the document generation
* Paragraph-level artifacts are the right granularity for traceability and audit.
* Despite the lack of supporting evidence to drive this, initial POCs can help us validate interest/value in:
  * Citations on chat pre document generation
  * Citations on generated documents

## Risks

* Mis-grounded citation => False confidence (The citation links to a real source, but that source doesn't actually support the claim)
* Low perceived value => Low usage of the citation flow

## Implementation Decisions

* Link to content unit and not to document (feasibility question answered). Validated by Rematiq's real data model: `cdm_content_unit` is a first-class artifact type in their artifact graph.
* The same citation mini-component is reused in chat and document to keep grounding consistent.
* Citations only appear at the end of a paragraph. Not mid-sentence.

## Success Metrics

### **Engagement: are citations actually used?**

* % of AI responses where the reviewer clicks at least one citation on the chat.
* % of citations clicked per generated document during review.

### **Guardrail**

* Citations don't slow answer/document generation or clutter the reading experience

## Out of Scope

* Templating
* Document generation logic
* Document / agent layout modifications besides the citation chips, overlays
* Referencing to different (than content units) types of artifacts
* Re-grounding citations on documents where a citation has been deleted

## Open Questions

|  | **Question** | **Answer** |
| -- | -- | -- |
| ✅ | Content units only? | Inclined towards this, after a disussion with Florian on 16.06 |
| ✅  | Maybe a pre-requisite [readable-ids.md?](<https://github.com/clearyai/clr_mono/blob/4c2da280f1b783d1e5de573e455940facb0d44a7/_specs/design/2026-05-15-the-next-agent-setup/readable-ids.md>) | Probably not due to the previous question/answer.<br><br>Not an easy feature (Confirmed by Anton). Not a requirement. |
| ⚠️ | **Broken citation detection mechanism:** When a link is deleted, how does the citation layer know? Does deletion propagate an event? |  |
| ⚠️ | **Broken citations and publishing:** Should a document with one or more broken citations be blocked from publishing, or only warned? | Warned |
| ⚠️ | **Multi-unit grounding:** Can a single claim be grounded in more than one artifact? If yes, how should the citation display handle multiple sources for one claim? | Stefan suggested we should do it.<br><br>Check with Claus |
| ✅  | **Re-grounding responsibility:** When a citation is broken, is the expected workflow for the author to manually find a replacement source, or should the system suggest candidate artifacts? | Leave out of initial scope  |
| ✅ | What document format? Only text? Template? | Decided to leave document creation flow untouched |
| ✅ | Should citations be reusable in other components (workflow/ai agent) | Partially, to be further explored (doc references) |
