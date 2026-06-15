import type {
  Block,
  ChatMessage,
  ChatSummary,
  Citation,
  DocListRow,
  GeneratedDocument,
  SourceDocument,
} from "./types";

// ---------------------------------------------------------------------------
// Source documents — internal (uploaded, broken into content units, versioned)
// and external (link-out to legislation).
// ---------------------------------------------------------------------------

export const SOURCE_DOCS: SourceDocument[] = [
  {
    id: "lineamientos",
    title: "Lineamientos para la Solicitud del Informe de Farmacovigilancia",
    kind: "internal",
    docType: "Regulatory",
    publisher: "COFEPRIS · Mexico",
    versions: [
      {
        id: "lineamientos-v1",
        label: "v1",
        date: "12 Mar 2024",
        isCurrent: true,
        changeNote: "Original published lineamientos. No later revisions on file.",
        contentUnits: [
          {
            id: "lin-cu-1",
            locator: "§1.2",
            text: "La prórroga del registro sanitario de medicamentos y vacunas está sujeta al cumplimiento de obligaciones de farmacovigilancia, incluyendo la solicitud del Informe de Farmacovigilancia (IFV) ante el Centro Nacional de Farmacovigilancia (CNFV).",
          },
          {
            id: "lin-cu-2",
            locator: "§2.1",
            isQuote: true,
            text: "El titular de registro sanitario o su representante legal que pretenda prorrogar en México, deberán elaborar y someter un escrito libre para solicitar el Informe de farmacovigilancia para todos los medicamentos y vacunas que cuenten con un registro sanitario u oficio de reconocimiento.",
          },
          {
            id: "lin-cu-3",
            locator: "§2.4",
            text: "La solicitud se realiza por cada registro sanitario y debe cubrir todas las presentaciones y concentraciones amparadas por dicho registro, acompañada de los anexos correspondientes.",
          },
          {
            id: "lin-cu-deleted",
            locator: "§2.3",
            text: "El escrito libre deberá presentarse dentro de los plazos establecidos para la prórroga del registro sanitario correspondiente.",
            deleted: true,
            deletedNote:
              "Removed when the Lineamientos were re-uploaded on 14 Jun 2026; this paragraph no longer exists in the current source.",
          },
        ],
      },
    ],
  },
  {
    id: "guia",
    title: "Guía para la Solicitud del Informe de Farmacovigilancia",
    kind: "internal",
    docType: "Regulatory",
    publisher: "COFEPRIS · Mexico",
    versions: [
      {
        id: "guia-v1",
        label: "v1",
        date: "08 Jan 2023",
        isCurrent: false,
        changeNote:
          "Initial guía. Did not yet specify the electronic submission format (USB/CD) and predated alignment to the NOM-220 modifications.",
        contentUnits: [
          {
            id: "guia-v1-cu-2",
            locator: "§3.1",
            text: "La solicitud del informe de farmacovigilancia deberá presentarse por escrito ante el CNFV.",
          },
        ],
      },
      {
        id: "guia-v2",
        label: "v2",
        date: "21 May 2024",
        isCurrent: true,
        changeNote:
          "Aligned to NOM-220-SSA1-2016 and its modifications. Added the explicit Spanish-language and electronic-format (USB/CD) requirement, annex expectations (PDF), and handling of ownership / registration-number changes.",
        contentUnits: [
          {
            id: "guia-v2-cu-1",
            locator: "§3.1",
            text: "La solicitud se somete a través del Centro Integral de Servicios (CIS), por registro sanitario, dirigida al Centro Nacional de Farmacovigilancia (CNFV).",
          },
          {
            id: "guia-v2-cu-2",
            locator: "§3.4",
            isQuote: true,
            text: "La solicitud del informe de farmacovigilancia deberá someterse en idioma español y en formato electrónico (USB/CD).",
          },
          {
            id: "guia-v2-cu-3",
            locator: "§4.2",
            text: "Los anexos deberán entregarse en formato PDF, incluyendo el registro vigente y la información para prescribir. En caso de cambios de titularidad o número de registro, deberán documentarse y justificarse dentro del expediente.",
          },
        ],
      },
    ],
  },
  {
    id: "nom-220",
    title: "NOM-220-SSA1-2016, Instalación y operación de la farmacovigilancia",
    kind: "external",
    docType: "Legislation",
    publisher: "Diario Oficial de la Federación (DOF)",
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5490830",
    versions: [
      {
        id: "nom-220-current",
        label: "Consolidated text",
        date: "19 Jul 2017 (+ modifications)",
        isCurrent: true,
        changeNote:
          "Official standard with subsequent modifications. The Guía v2 aligns its submission requirements to this text.",
        contentUnits: [
          {
            id: "nom-220-cu-1",
            locator: "Norm",
            text: "Norma Oficial Mexicana que establece los lineamientos para la instalación y operación de la farmacovigilancia, base regulatoria de los requisitos de la solicitud del IFV.",
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Citations — bind a claim in the generated document to an exact content unit
// in a specific version of a source document.
// ---------------------------------------------------------------------------

export const CITATIONS: Record<string, Citation> = {
  c1: {
    id: "c1",
    number: 1,
    sourceId: "lineamientos",
    versionId: "lineamientos-v1",
    contentUnitId: "lin-cu-1",
  },
  c2: {
    id: "c2",
    number: 2,
    sourceId: "nom-220",
    versionId: "nom-220-current",
    contentUnitId: "nom-220-cu-1",
  },
  c3: {
    id: "c3",
    number: 3,
    sourceId: "guia",
    versionId: "guia-v2",
    contentUnitId: "guia-v2-cu-1",
  },
  c4: {
    id: "c4",
    number: 4,
    sourceId: "lineamientos",
    versionId: "lineamientos-v1",
    contentUnitId: "lin-cu-3",
  },
  c5: {
    id: "c5",
    number: 5,
    sourceId: "guia",
    versionId: "guia-v2",
    contentUnitId: "guia-v2-cu-2",
  },
  c6: {
    id: "c6",
    number: 6,
    sourceId: "lineamientos",
    versionId: "lineamientos-v1",
    contentUnitId: "lin-cu-2",
  },
  c7: {
    id: "c7",
    number: 7,
    sourceId: "guia",
    versionId: "guia-v2",
    contentUnitId: "guia-v2-cu-2",
  },
  c8: {
    id: "c8",
    number: 8,
    sourceId: "guia",
    versionId: "guia-v2",
    contentUnitId: "guia-v2-cu-3",
  },
  // Points at a content unit that was later deleted from its source — renders
  // as a broken (red) citation.
  c9: {
    id: "c9",
    number: 9,
    sourceId: "lineamientos",
    versionId: "lineamientos-v1",
    contentUnitId: "lin-cu-deleted",
  },
};

export const CITATION_LIST = Object.values(CITATIONS);

// ---------------------------------------------------------------------------
// The generated document — appears in the right-hand editor panel and is where
// the citation mini-components live.
// ---------------------------------------------------------------------------

const DOC_TITLE = "Summary of Spanish COFEPRIS Pharmacovigilance Documents";

/** v1 — initial document, just the combined summary paragraph. */
const DOC_V1_BLOCKS: Block[] = [
  { type: "h1", text: DOC_TITLE },
  {
    type: "p",
    content: [
      { type: "text", text: "Both documents explain COFEPRIS requirements for requesting a Farmacovigilancia Report (IFV) from the Centro Nacional de Farmacovigilancia (CNFV) as part of " },
      {
        type: "claim",
        text: "renewing a Mexican sanitary registration for medicines or vaccines",
        citationId: "c1",
      },
      { type: "text", text: ". The earlier Lineamientos sets the regulatory basis, purpose, and core contents of the request, while the newer Guía is more detailed and " },
      {
        type: "claim",
        text: "aligned to NOM-220-SSA1-2016 and its modifications",
        citationId: "c2",
      },
      { type: "text", text: "." },
    ],
  },
];

/** Executive summary + main takeaways sections (added in v2). */
const DOC_SUMMARY_SECTIONS: Block[] = [
  { type: "h2", text: "Executive Summary" },
    {
      type: "p",
      content: [
        { type: "text", text: "This summary covers two Spanish-language COFEPRIS regulatory documents: " },
        { type: "bold", text: "Lineamientos para la Solicitud del Informe de Farmacovigilancia" },
        { type: "text", text: " and " },
        { type: "bold", text: "Guía para la Solicitud del Informe de Farmacovigilancia" },
        { type: "text", text: ". Both address the requirements for requesting an " },
        { type: "bold", text: "Informe de Farmacovigilancia (IFV)" },
        { type: "text", text: " from the Centro Nacional de Farmacovigilancia (CNFV) in connection with the " },
        {
          type: "claim",
          text: "renewal of sanitary registrations for medicines and vaccines in Mexico",
          citationId: "c1",
        },
        { type: "text", text: ". The Guía provides a more detailed operational roadmap " },
        {
          type: "claim",
          text: "aligned to NOM-220-SSA1-2016 and its modifications",
          citationId: "c2",
        },
        { type: "text", text: "." },
      ],
    },

    { type: "h2", text: "Main Takeaways" },
    {
      type: "ul",
      items: [
        [
          { type: "text", text: "The request is directed to the CNFV, with " },
          {
            type: "claim",
            text: "submission through the Centro Integral de Servicios (CIS)",
            citationId: "c3",
          },
          { type: "text", text: "." },
        ],
        [
          { type: "text", text: "The request is made " },
          {
            type: "claim",
            text: "per sanitary registration, covering all presentations and concentrations",
            citationId: "c4",
          },
          { type: "text", text: ", not as a single global request." },
        ],
        [
          { type: "text", text: "The Guía explicitly states the request must be " },
          {
            type: "claim",
            text: "submitted in Spanish and in electronic format",
            citationId: "c5",
          },
          { type: "text", text: "." },
        ],
      ],
    },

];

/** Per-document breakdown (added in v3, the current version). */
const DOC_BREAKDOWN_SECTIONS: Block[] = [
    { type: "hr" },

    { type: "h2", text: "Breakdown by Document" },

    { type: "h3", text: "1. Lineamientos para la Solicitud del Informe de Farmacovigilancia" },
    {
      type: "p",
      content: [
        { type: "text", text: "Serves as the foundational procedural framework. It explains the legal basis for the IFV request and sets out the basic structure and " },
        {
          type: "claim",
          text: "timing expectations for submitting the request",
          citationId: "c9",
        },
        { type: "text", text: ". Key quote:" },
      ],
    },
    {
      type: "quote",
      citationId: "c6",
      content: [
        {
          type: "text",
          text: "El titular de registro sanitario o su representante legal que pretenda prorrogar en México, deberán elaborar y someter un escrito libre para solicitar el Informe de farmacovigilancia para todos los medicamentos y vacunas que cuenten con un registro sanitario u oficio de reconocimiento.",
        },
      ],
    },

    { type: "h3", text: "2. Guía para la Solicitud del Informe de Farmacovigilancia" },
    {
      type: "p",
      content: [
        { type: "text", text: "A more detailed and updated practical guide for preparing the IFV request dossier. It is explicit about format, language, annexes, and special submission scenarios. Key quote:" },
      ],
    },
    {
      type: "quote",
      citationId: "c7",
      content: [
        {
          type: "text",
          text: "La solicitud del informe de farmacovigilancia deberá someterse en idioma español y en formato electrónico (USB/CD).",
        },
      ],
    },
    {
      type: "p",
      content: [
        { type: "text", text: "The guide also specifies that " },
        {
          type: "claim",
          text: "annexes must be provided as PDFs, with ownership or registration changes documented",
          citationId: "c8",
        },
        { type: "text", text: " within the dossier." },
      ],
    },
];

export const GENERATED_DOC: GeneratedDocument = {
  id: "summary-cofepris",
  title: DOC_TITLE,
  versions: [
    {
      id: "doc-v1",
      label: "v1",
      date: "15 Jun 2026, 09:42",
      isCurrent: false,
      changeNote: "Initial document created from the combined summary.",
      blocks: DOC_V1_BLOCKS,
    },
    {
      id: "doc-v2",
      label: "v2",
      date: "15 Jun 2026, 09:55",
      isCurrent: false,
      changeNote: "Added an executive summary and main takeaways.",
      blocks: [{ type: "h1", text: DOC_TITLE }, ...DOC_SUMMARY_SECTIONS],
    },
    {
      id: "doc-v3",
      label: "v3",
      date: "15 Jun 2026, 10:01",
      isCurrent: true,
      changeNote: "Added a per-document breakdown with cited quotes.",
      blocks: [
        { type: "h1", text: DOC_TITLE },
        ...DOC_SUMMARY_SECTIONS,
        ...DOC_BREAKDOWN_SECTIONS,
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Chat thread — the scripted COFEPRIS conversation that produced the document.
// ---------------------------------------------------------------------------

export const CHAT_LIST: ChatSummary[] = [
  { id: "chat-1", title: "which documents do I have in Spanish?", timeAgo: "42 minutes ago", active: true },
  { id: "chat-2", title: "what's in here REQ-5…", timeAgo: "about 3 hours ago" },
];

export const CHAT_THREAD: ChatMessage[] = [
  { id: "m1", role: "user", text: "which documents do I have in Spanish?" },
  {
    id: "m2",
    role: "agent",
    blocks: [
      { type: "p", content: [{ type: "text", text: "I found 2 documents that are clearly in Spanish." }] },
      { type: "h3", text: "Spanish regulatory documents" },
      {
        type: "ul",
        items: [
          [{ type: "bold", text: "Lineamientos para la Solicitud del Informe de Farmacovigilancia" }],
          [{ type: "bold", text: "Guía para la Solicitud del Informe de Farmacovigilancia" }],
        ],
      },
      { type: "h3", text: "Notes" },
      {
        type: "ul",
        items: [
          [{ type: "text", text: "I did not find any clearly Spanish documents in your uploaded documentation set." }],
          [{ type: "text", text: "I also saw a few documents in Portuguese, but I excluded those since you asked specifically for Spanish." }],
          [{ type: "text", text: "A few other files were ambiguous from a quick scan, so I'm only listing the ones I could confirm confidently." }],
        ],
      },
    ],
  },
  { id: "m3", role: "user", text: "summarise both of them. 1 brief paragraph." },
  {
    id: "m4",
    role: "agent",
    blocks: [
      {
        type: "p",
        content: [
          { type: "text", text: "Both documents explain COFEPRIS requirements for requesting a Farmacovigilancia Report (IFV) from the Centro Nacional de Farmacovigilancia (CNFV) as part of " },
          {
            type: "claim",
            text: "renewing a Mexican sanitary registration for medicines or vaccines",
            citationId: "c1",
          },
          { type: "text", text: ". The earlier Lineamientos sets the regulatory basis, purpose, submission timing, and core contents of the request, while the newer Guía is a more detailed and updated instruction document " },
          {
            type: "claim",
            text: "aligned to NOM-220-SSA1-2016 and its modifications",
            citationId: "c2",
          },
          { type: "text", text: ". It also specifies that the request must be " },
          {
            type: "claim",
            text: "submitted in Spanish and in electronic format",
            citationId: "c5",
          },
          { type: "text", text: "." },
        ],
      },
    ],
  },
  { id: "m5", role: "user", text: "create a doc for this" },
  {
    id: "m6",
    role: "agent",
    blocks: [
      { type: "p", content: [{ type: "text", text: "Created document: Summary of Spanish COFEPRIS Pharmacovigilance Documents →" }] },
    ],
  },
  { id: "m7", role: "user", text: "extend it. Add an executive summary, main takeaways, and a breakdown of each document." },
  {
    id: "m8",
    role: "agent",
    blocks: [
      { type: "p", content: [{ type: "text", text: "Updated the document with an executive summary, main takeaways, and a per-document breakdown. Each sourced claim now links back to its exact content unit — open the document panel and click any citation to verify it." }] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Documentation list view (secondary screen — matches the real product).
// ---------------------------------------------------------------------------

export const DOC_LIST_ROWS: DocListRow[] = [
  {
    id: "d1",
    title: "Summary of Spanish COFEPRIS Pharmacovigilance Documents",
    version: "—",
    docType: "Other",
    status: "ready",
    uploadedBy: "Helmut Fritz",
    uploadedAt: "15/06/2026, 10:01",
  },
  {
    id: "d2",
    title: "MDCG 2022-5 Rev. 1 — 1-Page Summary",
    version: "—",
    docType: "Other",
    status: "ready",
    uploadedBy: "Florian Scherer",
    uploadedAt: "13/06/2026, 17:09",
  },
  {
    id: "d3",
    title: "Summary of SOP-0019984",
    version: "—",
    docType: "Other",
    status: "ready",
    uploadedBy: "Florian Scherer",
    uploadedAt: "13/06/2026, 17:04",
  },
  {
    id: "d4",
    title: "SOP Template for Risk Management",
    version: "—",
    docType: "Other",
    status: "ready",
    uploadedBy: "Marius Marx",
    uploadedAt: "11/06/2026, 16:05",
  },
  {
    id: "d5",
    title: "005_C_CLC_28242_PRO_MEC - INOS.pdf",
    version: "—",
    docType: "Other",
    status: "ready",
    uploadedBy: "Marius Marx",
    uploadedAt: "11/06/2026, 16:03",
  },
  {
    id: "d6",
    title: "VVP_00000205_Rev01_fully_anonymized_v3.pdf",
    version: "—",
    docType: "Other",
    status: "ready",
    uploadedBy: "Marius Marx",
    uploadedAt: "11/06/2026, 15:52",
  },
  {
    id: "d7",
    title: "SRS_00000219_Rev03_fully_anonymized_v2.pdf",
    version: "—",
    docType: "Other",
    status: "ready",
    uploadedBy: "Marius Marx",
    uploadedAt: "11/06/2026, 15:52",
  },
  {
    id: "d8",
    title: "DHF-XX-YY",
    subtitle: "Risk Management File [Project name]",
    version: "—",
    docType: "SOP",
    status: "ready",
    uploadedBy: "Marcel Ksoll",
    uploadedAt: "08/05/2026, 18:24",
  },
];

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export function getSource(sourceId: string): SourceDocument | undefined {
  return SOURCE_DOCS.find((s) => s.id === sourceId);
}

export function resolveCitation(citationId: string) {
  const citation = CITATIONS[citationId];
  if (!citation) return undefined;
  const source = getSource(citation.sourceId);
  if (!source) return undefined;
  const version = source.versions.find((v) => v.id === citation.versionId);
  const contentUnit = version?.contentUnits.find(
    (cu) => cu.id === citation.contentUnitId,
  );
  return { citation, source, version, contentUnit };
}
