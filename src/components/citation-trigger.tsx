"use client";

import type { ReactNode } from "react";
import { Unlink } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { resolveCitation } from "@/lib/mock-data";
import { CitationCard } from "./citation-card";

type Tone = "internal" | "external" | "broken";

const CHIP_TONE: Record<Tone, string> = {
  internal: "bg-brand-tint text-brand-text hover:bg-brand hover:text-white",
  external: "bg-external-tint text-external hover:bg-external hover:text-white",
  broken: "bg-red-100 text-red-600 hover:bg-red-600 hover:text-white",
};

export function CitationTrigger({
  citationId,
  children,
  /** Render just the source chip (used after block quotes). */
  markerOnly = false,
}: {
  citationId: string;
  children?: ReactNode;
  markerOnly?: boolean;
}) {
  const resolved = resolveCitation(citationId);
  if (!resolved) return <>{children}</>;

  const { citation, source, contentUnit } = resolved;
  const isBroken = !!contentUnit?.deleted;
  const tone: Tone = isBroken
    ? "broken"
    : source.kind === "external"
      ? "external"
      : "internal";
  const n = citation.number;

  const chip = (
    <span
      className={cn(
        "ml-1 inline-flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-0.5 align-baseline text-[11px] font-medium leading-none transition-colors",
        CHIP_TONE[tone],
      )}
    >
      {isBroken ? (
        <Unlink className="h-2.5 w-2.5" strokeWidth={2.25} />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      )}
      {source.title.split(" ").slice(0, 2).join(" ")}… [{n}]
    </span>
  );

  // Plain claim text followed by an inline source chip.
  const triggerInner: ReactNode = markerOnly ? (
    chip
  ) : (
    <span className={isBroken ? "text-red-700" : "text-foreground"}>
      {children}
      {chip}
    </span>
  );

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
