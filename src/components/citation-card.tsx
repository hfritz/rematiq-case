"use client";

import { useState } from "react";
import {
  FileText,
  ExternalLink,
  Maximize2,
  History,
  Check,
  ScanText,
} from "lucide-react";
import { resolveCitation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAppState } from "./app-state";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CitationCard({ citationId }: { citationId: string }) {
  const resolved = resolveCitation(citationId);
  const { openFullDoc } = useAppState();
  // Version shown in the card — defaults to the version the claim was cited from.
  const [versionId, setVersionId] = useState(resolved?.version?.id ?? "");

  if (!resolved) return null;
  const { citation, source } = resolved;
  const isExternal = source.kind === "external";

  const selectedVersion =
    source.versions.find((v) => v.id === versionId) ?? resolved.version!;
  const citedUnit = selectedVersion.contentUnits.find(
    (cu) => cu.id === citation.contentUnitId,
  );
  const isCitedVersion = selectedVersion.id === citation.versionId;

  return (
    <div className="text-sm">
      {/* Header */}
      <div className="flex items-start gap-2.5 px-3.5 pt-3.5">
        <div
          className={cn(
            "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            isExternal ? "bg-external-tint text-external" : "bg-brand-tint text-brand",
          )}
        >
          {isExternal ? (
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <FileText className="h-4 w-4" strokeWidth={1.75} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                isExternal
                  ? "bg-external-tint text-external"
                  : "bg-brand-tint text-brand-text",
              )}
            >
              {isExternal ? "External source" : "Internal document"}
            </span>
            <span className="text-[11px] tabular-nums text-text-muted">
              Citation [{citation.number}]
            </span>
          </div>
          <p className="mt-1 text-[13px] font-semibold leading-snug text-foreground">
            {source.title}
          </p>
          {source.publisher ? (
            <p className="text-[11px] text-text-muted">{source.publisher}</p>
          ) : null}
        </div>
      </div>

      {/* Version history */}
      <div className="mt-3 px-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-text-muted">
          <History className="h-3.5 w-3.5" strokeWidth={1.75} />
          Version history
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {source.versions.map((v) => {
            const active = v.id === selectedVersion.id;
            const cited = v.id === citation.versionId;
            return (
              <button
                key={v.id}
                onClick={() => setVersionId(v.id)}
                className={cn(
                  "flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] transition-colors",
                  active
                    ? "border-brand bg-brand-tint text-brand-text"
                    : "border-border text-text-secondary hover:bg-surface",
                )}
              >
                <span className="font-semibold">{v.label}</span>
                {v.isCurrent ? (
                  <span className="text-[10px] text-success">· current</span>
                ) : null}
                {cited ? (
                  <Check className="h-3 w-3 text-brand" strokeWidth={2.5} />
                ) : null}
              </button>
            );
          })}
        </div>
        <p className="mt-1.5 text-[11px] leading-snug text-text-muted">
          <span className="font-medium text-text-secondary">
            {selectedVersion.label} · {selectedVersion.date}.{" "}
          </span>
          {selectedVersion.changeNote}
        </p>
        {!isCitedVersion ? (
          <p className="mt-1 rounded-md bg-bg-subtle px-2 py-1 text-[11px] text-text-secondary">
            This claim was cited from{" "}
            <span className="font-semibold text-foreground">
              {resolved.version?.label}
            </span>
            . You&apos;re previewing a different version.
          </p>
        ) : null}
      </div>

      {/* Highlighted content unit */}
      {citedUnit ? (
        <div className="mt-3 px-3.5">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-text-muted">
            <span>Cited content unit</span>
            <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] normal-case text-text-secondary">
              {citedUnit.locator}
            </span>
          </div>
          <div
            className={cn(
              "mt-1.5 rounded-md border-l-2 border-brand bg-brand-tint/50 py-2 pl-3 pr-2.5 text-[12.5px] leading-relaxed text-foreground",
              citedUnit.isQuote && "italic",
            )}
          >
            {citedUnit.text}
          </div>
        </div>
      ) : (
        <div className="mt-3 px-3.5">
          <p className="rounded-md bg-bg-subtle px-3 py-2 text-[12px] leading-relaxed text-text-secondary">
            This claim is grounded in an external regulatory standard. Open the
            source to read it in full context.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center gap-2 border-t border-border px-3.5 py-2.5">
        {isExternal ? (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-brand-hover"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
            Open source
          </a>
        ) : (
          <button
            onClick={() =>
              openFullDoc({
                sourceId: source.id,
                versionId: selectedVersion.id,
                contentUnitId: citation.contentUnitId,
              })
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-brand-hover"
          >
            <Maximize2 className="h-3.5 w-3.5" strokeWidth={2} />
            Open full document
          </button>
        )}

        <Tooltip>
          <TooltipTrigger
            disabled
            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[12px] font-medium text-text-muted"
          >
            <ScanText className="h-3.5 w-3.5" strokeWidth={1.75} />
            Content-unit view
          </TooltipTrigger>
          <TooltipContent>Dedicated content-unit view — coming next</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
