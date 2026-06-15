"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, History, ScanText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getSource } from "@/lib/mock-data";
import { useAppState, type FullDocTarget } from "./app-state";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FullDocumentDialog() {
  const { fullDoc, closeFullDoc } = useAppState();

  return (
    <Dialog open={!!fullDoc} onOpenChange={(o) => !o && closeFullDoc()}>
      <DialogContent
        showCloseButton
        className="max-h-[85vh] gap-0 overflow-hidden p-0 sm:max-w-2xl"
      >
        {fullDoc ? (
          // Keying on the target remounts the body so its local state
          // (selected version) resets each time a new citation opens it.
          <DocumentBody
            key={`${fullDoc.sourceId}:${fullDoc.versionId}:${fullDoc.contentUnitId ?? ""}`}
            target={fullDoc}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function DocumentBody({ target }: { target: FullDocTarget }) {
  const source = getSource(target.sourceId);
  const [versionId, setVersionId] = useState(target.versionId);
  const citedRef = useRef<HTMLDivElement | null>(null);

  // Scroll the cited content unit into view when the version changes.
  useEffect(() => {
    const t = setTimeout(() => {
      citedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    return () => clearTimeout(t);
  }, [versionId]);

  if (!source) return null;

  const version =
    source.versions.find((v) => v.id === versionId) ?? source.versions[0];

  return (
    <>
      <DialogHeader className="border-b border-border px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand">
            <FileText className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <DialogTitle className="text-[15px] font-semibold leading-snug text-foreground">
              {source.title}
            </DialogTitle>
            {source.publisher ? (
              <p className="text-[12px] text-text-muted">{source.publisher}</p>
            ) : null}
          </div>
        </div>

        {/* Version switcher */}
        <div className="mt-3 flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-text-muted">
            <History className="h-3.5 w-3.5" strokeWidth={1.75} />
            Version
          </span>
          {source.versions.map((v) => (
            <button
              key={v.id}
              onClick={() => setVersionId(v.id)}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] transition-colors",
                v.id === version.id
                  ? "border-brand bg-brand-tint text-brand-text"
                  : "border-border text-text-secondary hover:bg-surface",
              )}
            >
              <span className="font-semibold">{v.label}</span>
              {v.isCurrent ? (
                <span className="text-[10px] text-success">· current</span>
              ) : null}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-text-muted">{version.date}</span>
        </div>
      </DialogHeader>

      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 px-5 py-5">
          {version.changeNote ? (
            <p className="rounded-md bg-bg-subtle px-3 py-2 text-[12px] leading-relaxed text-text-secondary">
              <span className="font-medium text-foreground">
                {version.label} changes:{" "}
              </span>
              {version.changeNote}
            </p>
          ) : null}

          {version.contentUnits.map((cu) => {
            const isCited = cu.id === target.contentUnitId;
            return (
              <div
                key={cu.id}
                ref={isCited ? citedRef : undefined}
                className={cn(
                  "group rounded-md py-2 pl-3 pr-2 transition-colors",
                  isCited
                    ? "cu-flash bg-brand-tint/40 ring-1 ring-brand/30"
                    : "hover:bg-bg-subtle",
                )}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                    {cu.locator}
                  </span>
                  {isCited ? (
                    <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      Cited here
                    </span>
                  ) : null}
                  <Tooltip>
                    <TooltipTrigger
                      disabled
                      className="ml-auto cursor-not-allowed text-text-muted opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <ScanText className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </TooltipTrigger>
                    <TooltipContent>
                      Content-unit view — coming next
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p
                  className={cn(
                    "text-[14px] leading-relaxed text-foreground",
                    cu.isQuote && "italic text-text-secondary",
                  )}
                >
                  {cu.text}
                </p>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
