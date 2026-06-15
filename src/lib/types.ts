// Data model for the Rematiq citation prototype.
// Everything here is scripted mock data — no backend, no live LLM.

/** Inline content inside a generated-document block or chat message. */
export type Inline =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  /** A sourced claim that carries a citation. */
  | { type: "claim"; text: string; citationId: string };

/** A block of rich content (used for generated docs and agent chat messages). */
export type Block =
  | { type: "h1" | "h2" | "h3"; text: string }
  | { type: "p"; content: Inline[] }
  | { type: "ul" | "ol"; items: Inline[][] }
  | { type: "quote"; content: Inline[]; citationId?: string }
  | { type: "hr" };

/** A single citable paragraph within a source document version. */
export type ContentUnit = {
  id: string;
  /** Locator shown in the audit trail, e.g. "§2.1" or "p. 3, ¶2". */
  locator: string;
  text: string;
  isQuote?: boolean;
  /** Tombstone: the paragraph was removed from the source after being cited. */
  deleted?: boolean;
  /** When/why it was removed — shown when a citation points at it. */
  deletedNote?: string;
};

/** One version of a source document. */
export type DocVersion = {
  id: string;
  /** Display label, e.g. "v2". */
  label: string;
  date: string;
  isCurrent: boolean;
  /** What changed in this version — surfaced in the version history UI. */
  changeNote?: string;
  contentUnits: ContentUnit[];
};

export type SourceDocument = {
  id: string;
  title: string;
  kind: "internal" | "external";
  /** Document type label, e.g. "Regulatory", "SOP". */
  docType?: string;
  /** External sources link out instead of opening a content unit. */
  url?: string;
  /** Short publisher/context line, e.g. "COFEPRIS · Mexico". */
  publisher?: string;
  versions: DocVersion[];
};

/** Binds a claim in the generated doc to an exact content unit + version. */
export type Citation = {
  id: string;
  /** Footnote-style number shown in the UI. */
  number: number;
  sourceId: string;
  /** Which version the claim was drawn from. */
  versionId: string;
  /** Internal sources point at a content unit; external sources may omit it. */
  contentUnitId?: string;
};

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "agent"; blocks: Block[] };

export type ChatSummary = {
  id: string;
  title: string;
  timeAgo: string;
  active?: boolean;
};

/** One saved version of the generated document (right panel). */
export type GeneratedDocVersion = {
  id: string;
  /** Display label, e.g. "v1". */
  label: string;
  date: string;
  isCurrent: boolean;
  /** What changed in this version — shown in the version history. */
  changeNote: string;
  blocks: Block[];
};

export type GeneratedDocument = {
  id: string;
  title: string;
  versions: GeneratedDocVersion[];
};

export type DocListRow = {
  id: string;
  title: string;
  subtitle?: string;
  version: string;
  docType: string;
  status: "ready";
  uploadedBy: string;
  uploadedAt: string;
};

/** A/B variants of the citation trigger, for design feedback. */
export type CitationVariant = "highlight" | "chip";
