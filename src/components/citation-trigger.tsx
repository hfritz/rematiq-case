"use client";

import type { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { resolveCitation } from "@/lib/mock-data";
import { useAppState } from "./app-state";
import { CitationCard } from "./citation-card";

export function CitationTrigger({
  citationId,
  children,
  /** Render just the numeric marker (used after block quotes). */
  markerOnly = false,
}: {
  citationId: string;
  children?: ReactNode;
  markerOnly?: boolean;
}) {
  const { variant } = useAppState();
  const resolved = resolveCitation(citationId);
  if (!resolved) return <>{children}</>;

  const { citation, source } = resolved;
  const isExternal = source.kind === "external";
  const n = citation.number;

  const marker = (
    <sup
      className={cn(
        "ml-0.5 cursor-pointer rounded px-[3px] text-[10px] font-semibold tabular-nums transition-colors",
        isExternal
          ? "bg-external-tint text-external hover:bg-external hover:text-white"
          : "bg-brand-tint text-brand hover:bg-brand hover:text-white",
      )}
    >
      {n}
    </sup>
  );

  const chip = (
    <span
      className={cn(
        "ml-1 inline-flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-0.5 align-baseline text-[11px] font-medium leading-none transition-colors",
        isExternal
          ? "bg-external-tint text-external hover:bg-external hover:text-white"
          : "bg-brand-tint text-brand-text hover:bg-brand hover:text-white",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {source.title.split(" ").slice(0, 2).join(" ")}… [{n}]
    </span>
  );

  let triggerInner: ReactNode;
  if (markerOnly) {
    triggerInner = variant === "chip" ? chip : marker;
  } else if (variant === "highlight") {
    // Variant A — highlighted claim text bound to a superscript marker.
    triggerInner = (
      <span
        className={cn(
          "cursor-pointer rounded-sm decoration-2 underline-offset-2 transition-colors",
          isExternal
            ? "bg-external-tint/60 text-foreground underline decoration-external/40 hover:bg-external-tint"
            : "bg-brand-tint/60 text-foreground underline decoration-brand/40 hover:bg-brand-tint",
        )}
      >
        {children}
        {marker}
      </span>
    );
  } else {
    // Variant B — plain claim text followed by an inline source chip.
    triggerInner = (
      <span className="text-foreground">
        {children}
        {chip}
      </span>
    );
  }

  return (
    <Popover>
      <PopoverTrigger className="inline text-left align-baseline">
        {triggerInner}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[360px] rounded-[10px] border-border p-0 shadow-[0_4px_12px_rgba(30,34,48,0.10)]"
      >
        <CitationCard citationId={citationId} />
      </PopoverContent>
    </Popover>
  );
}
