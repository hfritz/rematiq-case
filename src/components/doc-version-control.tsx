"use client";

import {
  History,
  Check,
  RotateCcw,
  ChevronDown,
  Dot,
  CircleDot,
  CheckCircle2,
  Send,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { GeneratedDocVersion } from "@/lib/types";

export type VersionState = {
  versions: GeneratedDocVersion[];
  viewingId: string;
  currentId: string;
  view: (id: string) => void;
  restore: (id: string) => void;
  /** Draft until the user publishes. */
  published: boolean;
  publish: () => void;
};

/** Draft / Published indicator shown in the document header. */
export function DocStatusBadge({ state }: { state: VersionState }) {
  return state.published ? (
    <span className="flex items-center gap-1 rounded-md border border-success/30 bg-success-bg px-1.5 py-0.5 text-[11px] font-semibold text-success">
      <CheckCircle2 className="h-3 w-3" strokeWidth={2.25} />
      Published
    </span>
  ) : (
    <span className="flex items-center gap-1 rounded-md border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-700">
      <CircleDot className="h-3 w-3" strokeWidth={2.25} />
      Draft
    </span>
  );
}

/**
 * Publish action. Only shown when the document is a draft and the current
 * version is in view (restoring shows the restore banner instead).
 */
export function PublishButton({ state }: { state: VersionState }) {
  const onCurrent = state.viewingId === state.currentId;
  if (state.published || !onCurrent) return null;
  return (
    <button
      onClick={state.publish}
      className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-brand-hover"
    >
      <Send className="h-3.5 w-3.5" strokeWidth={2} />
      Publish
    </button>
  );
}

/** The version indicator + history menu shown in the document header. */
export function VersionMenu({ state }: { state: VersionState }) {
  const { versions, viewingId, currentId, view, restore } = state;
  const viewing = versions.find((v) => v.id === viewingId)!;
  const isOld = viewingId !== currentId;
  // Newest first.
  const ordered = [...versions].reverse();

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold transition-colors",
          isOld
            ? "border-amber-300 bg-amber-50 text-amber-700"
            : "border-border bg-background text-brand-text hover:bg-surface",
        )}
      >
        {viewing.label}
        {isOld ? (
          <span className="font-normal">· older</span>
        ) : (
          <span className="font-normal text-success">· current</span>
        )}
        <ChevronDown className="h-3 w-3" strokeWidth={2} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        className="w-[300px] rounded-[10px] border-border p-0 shadow-[0_4px_12px_rgba(30,34,48,0.10)]"
      >
        <div className="flex items-center gap-1.5 border-b border-border px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-text-muted">
          <History className="h-3.5 w-3.5" strokeWidth={1.75} />
          Document version history
        </div>
        <div className="max-h-[320px] overflow-y-auto py-1">
          {ordered.map((v) => {
            const isViewing = v.id === viewingId;
            const isCurrent = v.id === currentId;
            return (
              <button
                key={v.id}
                onClick={() => view(v.id)}
                className={cn(
                  "flex w-full items-start gap-2.5 px-3.5 py-2 text-left transition-colors",
                  isViewing ? "bg-brand-tint/50" : "hover:bg-surface",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-9 shrink-0 items-center justify-center rounded text-[11px] font-semibold",
                    isCurrent
                      ? "bg-brand text-white"
                      : "bg-surface text-text-secondary",
                  )}
                >
                  {v.label}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-[12px] font-medium text-foreground">
                    {v.date}
                    {isCurrent ? (
                      <span className="inline-flex items-center text-[10px] font-normal text-success">
                        <Dot className="h-3 w-3" /> current
                      </span>
                    ) : null}
                  </span>
                  <span className="block text-[11px] leading-snug text-text-muted">
                    {v.changeNote}
                  </span>
                  {!isCurrent ? (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        restore(v.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          restore(v.id);
                        }
                      }}
                      className="mt-1 inline-flex items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-[11px] font-medium text-brand-text transition-colors hover:bg-brand-tint"
                    >
                      <RotateCcw className="h-3 w-3" strokeWidth={2} />
                      Restore this version
                    </span>
                  ) : null}
                </span>
                {isViewing ? (
                  <Check className="mt-1 h-3.5 w-3.5 text-brand" strokeWidth={2.5} />
                ) : null}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/** Banner shown when previewing a version that isn't the current one. */
export function RestoreBanner({ state }: { state: VersionState }) {
  const { versions, viewingId, currentId, view, restore } = state;
  if (viewingId === currentId) return null;
  const viewing = versions.find((v) => v.id === viewingId)!;

  return (
    <div className="flex items-center justify-between gap-3 border-b border-amber-200 bg-amber-50 px-4 py-2 text-[12px] text-amber-800">
      <span>
        You&apos;re viewing{" "}
        <span className="font-semibold">{viewing.label}</span> ({viewing.date}) — an
        older version.
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <button
          onClick={() => restore(viewingId)}
          className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[11px] font-medium text-white transition-colors hover:bg-brand-hover"
        >
          <RotateCcw className="h-3 w-3" strokeWidth={2} />
          Restore this version
        </button>
        <button
          onClick={() => view(currentId)}
          className="rounded-md px-2 py-1 text-[11px] font-medium text-amber-800 transition-colors hover:bg-amber-100"
        >
          Back to current
        </button>
      </span>
    </div>
  );
}
