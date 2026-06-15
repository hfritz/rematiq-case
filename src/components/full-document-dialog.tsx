"use client";

import { useEffect, useRef } from "react";
import { FileText, ScanText, Unlink } from "lucide-react";
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
          // Keying on the target remounts the body so the scroll-to-cited-unit
          // effect re-runs each time a new citation opens it.
          <DocumentBody
            key={`${fullDoc.sourceId}:${fullDoc.contentUnitId ?? ""}`}
            target={fullDoc}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function DocumentBody({ target }: { target: FullDocTarget }) {
  const source = getSource(target.sourceId);
  const citedRef = useRef<HTMLDivElement | null>(null);

  // Scroll the cited content unit into view on open.
  useEffect(() => {
    const t = setTimeout(() => {
      citedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  if (!source) return null;

  const version =
    source.versions.find((v) => v.id === target.versionId) ?? source.versions[0];

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
      </DialogHeader>

      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 px-5 py-5">
          {version.contentUnits.map((cu) => {
            const isCited = cu.id === target.contentUnitId;
            const isDeleted = !!cu.deleted;
            return (
              <div
                key={cu.id}
                ref={isCited ? citedRef : undefined}
                className={cn(
                  "group rounded-md py-2 pl-3 pr-2 transition-colors",
                  isDeleted
                    ? "border-l-2 border-red-400 bg-red-50"
                    : isCited
                      ? "cu-flash bg-brand-tint/40 ring-1 ring-brand/30"
                      : "hover:bg-bg-subtle",
                )}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 font-mono text-[10px]",
                      isDeleted
                        ? "bg-red-100 text-red-600 line-through"
                        : "bg-surface text-text-secondary",
                    )}
                  >
                    {cu.locator}
                  </span>
                  {isDeleted ? (
                    <span className="flex items-center gap-1 rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
                      <Unlink className="h-2.5 w-2.5" strokeWidth={2.25} />
                      Deleted
                    </span>
                  ) : null}
                  {isCited ? (
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10px] font-semibold text-white",
                        isDeleted ? "bg-red-500" : "bg-brand",
                      )}
                    >
                      Cited here
                    </span>
                  ) : null}
                  {!isDeleted ? (
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
                  ) : null}
                </div>
                <p
                  className={cn(
                    "text-[14px] leading-relaxed",
                    isDeleted
                      ? "text-red-700 line-through"
                      : cu.isQuote
                        ? "italic text-text-secondary"
                        : "text-foreground",
                  )}
                >
                  {cu.text}
                </p>
                {isDeleted && cu.deletedNote ? (
                  <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-snug text-red-600">
                    <Unlink className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={2} />
                    <span>{cu.deletedNote}</span>
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
