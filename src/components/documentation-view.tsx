"use client";

import {
  Search,
  SlidersHorizontal,
  Download,
  Upload,
  Plug,
  Check,
  Trash2,
} from "lucide-react";
import { DOC_LIST_ROWS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function DocumentationView() {
  return (
    <section className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto bg-background">
      <div className="mx-auto w-full max-w-[1100px] px-8 py-7">
        <h1 className="text-[22px] font-semibold text-foreground">Documentation</h1>

        {/* Toolbar */}
        <div className="mt-5 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
            <Search className="h-4 w-4 text-text-muted" strokeWidth={1.75} />
            <span className="text-sm text-text-muted">Type to search…</span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface">
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface">
            <Plug className="h-4 w-4" strokeWidth={1.75} />
            Import from connectors
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface">
            <Download className="h-4 w-4" strokeWidth={1.75} />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover">
            <Upload className="h-4 w-4" strokeWidth={2} />
            Upload Document
          </button>
        </div>

        {/* Table */}
        <div className="mt-5 overflow-hidden rounded-[10px] border border-border">
          {/* Head */}
          <div className="grid grid-cols-[24px_minmax(0,1fr)_110px_140px_90px_180px_40px] items-center gap-3 bg-surface px-4 py-3 text-[13px] font-medium text-text-secondary">
            <span className="h-4 w-4 rounded border border-border bg-background" />
            <span>Direct Uploads ({DOC_LIST_ROWS.length})</span>
            <span>Version</span>
            <span>Document type</span>
            <span>Status</span>
            <span>Uploaded</span>
            <span />
          </div>

          {/* Rows */}
          {DOC_LIST_ROWS.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[24px_minmax(0,1fr)_110px_140px_90px_180px_40px] items-center gap-3 border-t border-border px-4 py-3.5 text-sm transition-colors hover:bg-bg-subtle"
            >
              <span className="h-4 w-4 rounded border border-border bg-background" />
              <span className="min-w-0">
                <span
                  className={cn(
                    "block truncate",
                    row.subtitle
                      ? "font-medium text-brand-text"
                      : "text-foreground",
                  )}
                >
                  {row.title}
                </span>
                {row.subtitle ? (
                  <span className="block truncate text-text-muted">
                    {row.subtitle}
                  </span>
                ) : null}
              </span>
              <span className="text-text-muted">{row.version}</span>
              <span className="text-brand-text">{row.docType}</span>
              <span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-bg">
                  <Check className="h-3 w-3 text-success" strokeWidth={2.5} />
                </span>
              </span>
              <span className="text-[13px]">
                <span className="block text-foreground">{row.uploadedBy}</span>
                <span className="block text-text-muted">{row.uploadedAt}</span>
              </span>
              <button className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted hover:bg-surface hover:text-foreground">
                <Trash2 className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-[13px] text-text-muted">
          <span>Page 1 of 2</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              PER PAGE
              <span className="rounded-md border border-border px-2 py-1 text-foreground">
                20 ▾
              </span>
            </span>
            <div className="flex items-center gap-1">
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border">
                ‹
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white">
                1
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-secondary">
                2
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
