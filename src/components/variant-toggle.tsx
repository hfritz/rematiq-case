"use client";

import { cn } from "@/lib/utils";
import { useAppState } from "./app-state";
import type { CitationVariant } from "@/lib/types";

const OPTIONS: { value: CitationVariant; label: string; hint: string }[] = [
  { value: "highlight", label: "A · Highlight", hint: "Highlighted text + marker" },
  { value: "chip", label: "B · Chip", hint: "Inline source chip" },
];

export function VariantToggle() {
  const { variant, setVariant } = useAppState();

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
        Citation style
      </span>
      <div className="flex rounded-lg border border-border bg-background p-0.5">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setVariant(opt.value)}
            title={opt.hint}
            className={cn(
              "rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors",
              variant === opt.value
                ? "bg-brand-tint text-brand-text"
                : "text-text-secondary hover:bg-surface",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
