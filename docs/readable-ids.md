# Readable IDs - Artifact ID Naming Scheme

**Status:** Draft for Discussion
**Version:** 0.2
**Date:** 2026-04-28
**Author:** Stefan

---

## **TL;DR**

Introduce **stable readable IDs** for all artifact types so **humans and agents can cite and navigate them easily.**

Keep existing patterns:

- REQ-001 for library requirements
- PR-001 for project requirements

Extend the same style to other artifacts, e.g. DOC-001, CC-001, SCA-001.

UI and chat should display these IDs consistently.

Open questions: storage location, counter scope, prefixes, padding, and backfill.

## 1. Background

The artifact table stores many artifact types: requirements, assessments, reports, coverage checks, and others.
Each artifact already has an internal ID, but these **IDs are not user-friendly or agent-friendly.**

A human-readable ID system already exists for some artifacts, especially requirements.
The current implementation is useful but inconsistent.
We should extend the convention across all artifact types in the artifact graph.

This matters because AI agents (and humans) read, cite, and discuss artifacts in chat.
Agents (and humans) should refer to stable handles such as `REQ-001` or `PR-001`, not opaque internal IDs.
The IDs should also be displayed in the UI so artifacts are easy to reference and navigate to.

## 2. Goals

- Give every artifact type a stable, human-readable ID.
- Make IDs easy for users and agents to cite in chat.
- Use a prefix that signals the artifact type.
- Keep IDs stable once assigned.
- Avoid reusing IDs.
- Preserve existing internal IDs and UUIDs.

## 3. Non-goals

- Replacing internal artifact IDs.
- Changing permissions or access control.
- Redesigning display logic in the UI.
- Solving source-document identifiers such as `documentNumber` or imported `externalId`.
- Replacing source- or domain-specific identifiers that already exist for some artifact types.

## 4. Current conventions

### 4.1 Library requirements

Legacy library requirements use `FormulatedRequirement.readableId`.

Current convention:

- Format: `<PREFIX>-<NUMBER>`
- Example: `REQ-001`
- Default prefix: `REQ`
- Counter scope: organization + prefix
- Counter table: `ReadableRequirementCounter`
- Database uniqueness: `organizationId + readableId`

Evaluation requirements also use the same counter mechanism with prefix `EVAL`.

### 4.2 Project requirements

Project requirements in the artifact graph use `fields.readableId`.

Current convention:

- Format: `PR-001`
- Prefix: `PR`
- Counter scope: project
- Counter table: `ProjectRequirementCounter`

### 4.3 Source/domain identifiers

Some artifacts already have semi-meaningful source or domain ids, but these are not the same as generated artifact-readable IDs.

Examples:

- `cdm_document.documentNumber`
- `cdm_document.documentKey`
- `cdm_content_unit.unitKey`
- `requirement_list.requirements[].externalId`
- `uploaded_requirement.externalId`

These identifiers should probably be preserved, but they do not replace the need for a stable generated artifact ID where agents need to cite the artifact itself.

## 5. Proposed naming convention

### Format

```
<PREFIX>-<NUMBER>
```

- **PREFIX**: short, uppercase artifact-type code.
- **NUMBER**: sequential integer.
- **Separator**: hyphen (`-`).
- **Case**: uppercase by convention.

Existing implementations use three-digit zero-padding (`REQ-001`, `PR-001`).
The proposal should either keep that convention or explicitly decide to change it.

## 6. Artifact inventory and suggestions for names

Starting point: `packages/artifact-graph/src/types/registry.ts`.

| Artifact type | Current readable ID | Proposed readable ID | Notes |
| --- | --- | --- | --- |
| `library_requirement_shell` | `fields.readableId`, copied from `FormulatedRequirement.readableId`, e.g. `REQ-001`. | Keep `REQ-001` | Shell mirrors legacy library requirement. |
| `project_requirement` | `fields.readableId`, e.g. `PR-001`. | Keep `PR-001` | Already implemented. Project-scoped counter. |
|  |  |  | . |
| `cdm_document` | No generated readable ID. Has `documentKey` and optional `documentNumber`. | `DOC-001` | `documentNumber` remains source/domain metadata. |
| `cdm_content_unit` | No generated readable ID. Has `unitKey`, e.g. `cu_0001`. Should abide by default conventions. | TBD, likely `CU-001` | Need to decide whether `unitKey` is enough. Likely not. |
|  |  |  | . |
| `project` | No generated readable ID. Has title. | `PRJ-001` | Useful for chat and cross-project references. |
|  |  |  | . |
| `project_requirement_assessment` | None. | `PRA-001` | Assessment of library requirement applicability to a project. |
| `project_document_assessment` | None. | `PDA-001` | Assessment of document applicability to a project. |
|  |  |  | . |
| `sop_applicability_assessment` | None. | `SAA-001` | SOP content-unit applicability assessment. |
| `sop_compliance_assessment` | None. | `SCA-001` | SOP compliance assessment. |
| `sop_lr_applicability_assessment` | None. | `SLRAA-001` | SOP/library-requirement applicability assessment. Prefix is awkward; needs review. |
| `sop_lr_compliance_assessment` | None. | `SLRCA-001` | SOP/library-requirement compliance assessment. Prefix is awkward; needs review. |
|  |  |  | . |
| `multi_level_applicability_assessment` | None. | `MLAA-001` | Assessment at requirement/scope-level intersection. |
| `multi_level_applicability_export` | None. | `MLAX-001` | Export artifact. |
|  |  |  | . |
| `project_report` | None. Has title. | `RPT-001` | Report artifact. |
| `report_template` | None. Has name. | `TMPL-001` | Template artifact. |
| `requirement_list` | No generated readable ID. Has name and uploaded source metadata. | `RL-001` | Requirement list artifact; source metadata remains separate. |
| `coverage_check` | None. | `CC-001` | Coverage check run. |
| `uploaded_requirement` | No generated readable ID. Has source `externalId`. | `UR-001` | Source `externalId` remains separate from the generated artifact ID. |
|  |  |  | . |
| `coverage_applicability_assessment` | None. | `CAA-001` | Applicability assessment in coverage workflow. |
| `coverage_assessment` | None. | `CA-001` | Coverage result assessment. |

### Coverage

This proposal applies to all artifact types.

Some artifact types may still be transitional or likely to change later, but that is not a reason to exclude them from readable ID coverage in the current system.

## 7. UI design implications

The UI should display readable IDs wherever artifacts are shown or referenced.

The current requirement and project-requirement UIs already show IDs such as `REQ-001` and `PR-001`.
The same visual pattern should be extended to the remaining artifact types so users learn one consistent referencing convention.

The chat interface must also render these IDs clearly.
Agents should be able to cite artifacts by readable ID, and users should be able to recognize and navigate those references from chat.

## 8. Open design questions

1. **Where should the generated readable ID live?** Options include `Artifact.fields.readableId` or a real top-level `Artifact.readableId` column.
2. **What is the counter scope?** Existing implementations differ: library requirements are organization-scoped, project requirements are project-scoped. Most artifact live in the scope of a project. But is this going to be the case moving forward?
3. **Should IDs be globally unique by full string?** If yes, prefixes must not collide and counters must be scoped carefully.
4. **Should zero-padding remain mandatory?** Current convention uses `REQ-001` and `PR-001`.
5. **Do any artifact types need special handling?** Default assumption: every artifact type gets a generated readable ID. Source/domain IDs remain separate because they may change or may not identify the artifact itself.
6. **How should existing artifacts be backfilled?** Existing artifacts should be backfilled; ordering and collision handling are TBD.
7. **Should prefixes be stored in the artifact type registry?** This could make the registry the source of truth for ID generation.
