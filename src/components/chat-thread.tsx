"use client";

import { ChevronDown, ArrowUp, Copy } from "lucide-react";
import { CHAT_THREAD } from "@/lib/mock-data";
import { RichContent } from "./rich-content";

export function ChatThread() {
  return (
    <section className="flex h-full min-w-0 flex-1 flex-col bg-bg-subtle">
      <div className="relative flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[720px] flex-col gap-7 px-6 py-8">
          {CHAT_THREAD.map((msg) =>
            msg.role === "user" ? (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-user-bubble px-4 py-2.5 text-[15px] leading-relaxed text-foreground">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="group flex flex-col gap-1.5">
                <RichContent blocks={msg.blocks} variant="chat" />
                <button className="flex w-fit items-center gap-1 text-text-muted opacity-0 transition-opacity group-hover:opacity-100">
                  <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>
            ),
          )}
        </div>

        <button
          className="absolute bottom-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-text-muted shadow-sm"
          aria-label="Scroll to latest"
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      {/* Composer */}
      <div className="px-6 pb-6">
        <div className="mx-auto max-w-[720px]">
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-background px-4 py-3 shadow-sm">
            <span className="flex-1 py-1.5 text-[15px] text-text-muted">
              Ask the research agent…
            </span>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white transition-colors hover:bg-brand-hover"
              aria-label="Send"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
