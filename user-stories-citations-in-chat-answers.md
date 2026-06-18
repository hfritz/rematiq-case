# Epic 1 — Citations in chat answers

> Inline citations appear on every AI response in the chat thread, binding each claim
> to the exact source artifact it came from. The reviewer can verify the AI's answer
> in the moment — before it ever becomes a document — and distinguish grounded claims
> from model framing at a glance.

**Linear mapping:** Epic → Project · Milestone → Project Milestone · Story → Issue
**Role:** Reviewer (regulated MedTech document research)

---

## Milestone 1 — Chat basics

### 1. Inline citation on direct quotes
**Description:** As a reviewer, I want a direct quote from a source artifact to be cited inline, so that I can see exactly where that text came from.
**Acceptance Criteria:**
1. A direct quote in an AI answer renders with an inline citation marker adjacent to the quoted text.
2. The marker resolves to a specific source locator (e.g. `CU-xxx`), not just the parent document.
3. Multiple quotes within a single answer are each cited independently.
4. The quoted span is visually delimited so it reads as verbatim source text, not model prose.
5. The citation persists with the message as the reviewer scrolls the thread.

### 2. Open source artifact from a chat citation
**Description:** As a reviewer, I want to click a citation in chat and see the exact source artifact it came from, so that I can confirm the AI's answer is grounded before acting on it.
**Acceptance Criteria:**
1. Clicking a citation opens the source artifact it points to.
2. The exact cited content unit is scrolled into view and highlighted.
3. The action works from any AI message in the thread.
4. Returning to chat restores the reviewer's previous scroll position.
5. A citation pointing at a specific paragraph resolves to that paragraph, not the document top.

### 3. Visually distinguish grounded claims from framing
**Description:** As a reviewer, I want grounded claims to look visually distinct from the model's framing, so that I know which parts of the answer are sourced and which are not.
**Acceptance Criteria:**
1. Sourced spans carry a distinct visual treatment from surrounding model framing.
2. Non-sourced framing text uses default styling with no citation affordance.
3. The distinction does not rely on color alone (legible for low-vision / colorblind reviewers).
4. The treatment is consistent across every AI message in the thread.
5. A grounded span signals it is interactive (hover/focus affordance) before it is clicked.

---

## Milestone 2 — Chat breadth

### 4. Reference citations for paraphrased claims
**Description:** As a reviewer, I want AI-generated text that is grounded in a source artifact to carry a reference citation, so that I know which artifact informed that claim even when it's not a direct quote.
**Acceptance Criteria:**
1. A paraphrased (non-verbatim) claim carries a reference-style citation.
2. Reference citations are visually distinguishable from direct-quote citations.
3. The reference resolves to the informing artifact / content unit.
4. A reviewer can tell at a glance whether a claim is quoted or referenced.
5. The reference works when a claim draws on a source without reproducing its text.

### 5. Citations link to official legislation
**Description:** As a reviewer, I want a citation in chat to link out to the official legislation when the source is a public standard, so that I can read the primary text directly.
**Acceptance Criteria:**
1. When the source is a public standard, the citation exposes a link to the official legislation.
2. The link opens the primary external text.
3. Citations to internal sources continue to resolve to the internal artifact.
4. External (legislation) citations are clearly distinguished from internal ones.
5. The external link target is identifiable before the reviewer clicks it.

### 6. Citations across all artifact types
**Description:** As a reviewer, I want citations to work across different artifact types — content units, requirements, assessments — so that any claim can be traced regardless of what kind of source grounded it.
**Acceptance Criteria:**
1. A claim grounded in a content unit cites correctly.
2. A claim grounded in a requirement cites correctly.
3. A claim grounded in an assessment cites correctly.
4. The citation label/locator reflects the artifact type it points to.
5. Clicking resolves to the correct artifact regardless of type.

---

## Milestone 3 — Chat integrity

### 7. Flag broken citations in chat
**Description:** As a reviewer, I want broken citations in the chat to be clearly flagged, so that I can identify and re-ground any claim whose source has disappeared before I generate a document.
**Acceptance Criteria:**
1. A citation whose source content unit has been deleted/removed renders in a clearly broken state.
2. The broken state is visually distinct from a valid citation.
3. The reviewer is given guidance to re-ground the affected claim.
4. Interacting with a broken citation explains why it is broken (source no longer exists).
5. Broken citations are surfaced in chat before the reviewer generates a document.
