"use client";

import {
  Copy,
  Download,
  Pencil,
  X,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
} from "lucide-react";
import { GENERATED_DOC } from "@/lib/mock-data";
import { RichContent } from "./rich-content";
import { VariantToggle } from "./variant-toggle";

const TOOLBAR_GROUPS: { icon: typeof Bold; active?: boolean }[][] = [
  [{ icon: Undo2 }, { icon: Redo2 }],
  [{ icon: Heading1 }, { icon: Heading2, active: true }, { icon: Heading3 }],
  [{ icon: Bold }, { icon: Italic }, { icon: Strikethrough }, { icon: Code }],
  [{ icon: List }, { icon: ListOrdered }, { icon: Quote }, { icon: Minus }],
];

export function DocumentPanel() {
  return (
    <section className="flex h-full w-[540px] shrink-0 flex-col border-l border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate rounded-md bg-surface px-2 py-1 text-[13px] font-medium text-foreground">
            {GENERATED_DOC.title.slice(0, 22)}…
          </span>
        </div>
        <div className="flex items-center gap-0.5 text-text-muted">
          {[Copy, Download, Pencil, X].map((Icon, i) => (
            <button
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-surface hover:text-foreground"
            >
              <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-border px-3 py-2">
        {TOOLBAR_GROUPS.map((group, gi) => (
          <div key={gi} className="flex items-center gap-0.5">
            {gi > 0 ? <span className="mx-1 h-5 w-px bg-border" /> : null}
            {group.map(({ icon: Icon, active }, ii) => (
              <button
                key={ii}
                className={`flex h-7 w-7 items-center justify-center rounded-md ${
                  active
                    ? "bg-brand-tint text-brand"
                    : "text-text-secondary hover:bg-surface hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Demo control: A/B citation style */}
      <div className="flex items-center justify-between border-b border-border bg-bg-subtle px-4 py-2">
        <VariantToggle />
      </div>

      {/* Document body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <RichContent blocks={GENERATED_DOC.blocks} variant="document" />
      </div>
    </section>
  );
}
