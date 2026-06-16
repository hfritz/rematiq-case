"use client";

import { FileText, ExternalLink, ScanText, Unlink } from "lucide-react";
import { resolveCitation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function CitationCard({ citationId }: { citationId: string }) {
  const resolved = resolveCitation(citationId);

  if (!resolved) return null;
  const { citation, source, contentUnit } = resolved;
  const isExternal = source.kind === "external";
  const isBroken = !!contentUnit?.deleted;

  return (
    <div className="text-sm">
      {/* Header */}
      <div className="flex items-start gap-2.5 px-3.5 pt-3.5">
        <div
          className={cn(
            "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            isBroken
              ? "bg-red-100 text-red-600"
              : isExternal
                ? "bg-external-tint text-external"
                : "bg-brand-tint text-brand",
          )}
        >
          {isBroken ? (
            <Unlink className="h-4 w-4" strokeWidth={1.75} />
          ) : isExternal ? (
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <FileText className="h-4 w-4" strokeWidth={1.75} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
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
            {isBroken ? (
              <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600">
                Link broken
              </span>
            ) : null}
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

      {/* Highlighted content unit */}
      {isBroken && contentUnit ? (
        <div className="mt-3 px-3.5">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-red-600">
            <span>Cited content unit deleted</span>
            <span className="rounded bg-red-50 px-1.5 py-0.5 font-mono text-[10px] normal-case text-red-600 line-through">
              {contentUnit.locator}
            </span>
          </div>
          <div className="mt-1.5 rounded-md border-l-2 border-red-400 bg-red-50 py-2 pl-3 pr-2.5">
            <p className="text-[12.5px] leading-relaxed text-red-700 line-through">
              {contentUnit.text}
            </p>
            <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-snug text-red-600">
              <Unlink className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={2} />
              <span>{contentUnit.deletedNote}</span>
            </p>
          </div>
          <p className="mt-1.5 py-1.5 text-[11px] leading-snug text-text-muted">
            This claim can no longer be traced to live source content. Review the
            claim or re-ground it before publishing.
          </p>
        </div>
      ) : contentUnit ? (
        <div className="mt-3 px-3.5">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-text-muted">
            <span>Cited content unit</span>
            <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] normal-case text-text-secondary">
              {contentUnit.locator}
            </span>
          </div>
          <div
            className={cn(
              "mt-1.5 rounded-md border-l-2 border-brand bg-brand-tint/50 py-2 pl-3 pr-2.5 text-[12.5px] leading-relaxed text-foreground",
              contentUnit.isQuote && "italic",
            )}
          >
            {contentUnit.text}
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

      {/* Actions — a deleted content unit has no artifact to open. */}
      {isExternal || !isBroken ? (
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
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-brand-hover">
              <ScanText className="h-3.5 w-3.5" strokeWidth={2} />
              See artifact
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
