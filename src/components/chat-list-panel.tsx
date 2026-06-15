"use client";

import { PanelLeftClose, Plus, Search, MessageSquare } from "lucide-react";
import { CHAT_LIST } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ChatListPanel() {
  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-border bg-background">
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="text-[15px] font-semibold text-foreground">
          Regulatory Research
        </h1>
        <button
          className="text-text-muted hover:text-foreground"
          aria-label="Collapse panel"
        >
          <PanelLeftClose className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
      </div>

      <div className="px-3">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-text-secondary transition-colors hover:bg-surface">
          <Plus className="h-[18px] w-[18px]" strokeWidth={1.75} />
          New chat
        </button>
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-text-secondary transition-colors hover:bg-surface">
          <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
          Search chats
        </button>
      </div>

      <div className="mt-4 px-5 text-xs font-medium uppercase tracking-wide text-text-muted">
        Chats
      </div>

      <div className="mt-1 flex flex-col gap-0.5 px-3">
        {CHAT_LIST.map((chat) => (
          <button
            key={chat.id}
            className={cn(
              "flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
              chat.active ? "bg-brand-tint" : "hover:bg-surface",
            )}
          >
            <MessageSquare
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                chat.active ? "text-brand" : "text-text-muted",
              )}
              strokeWidth={1.75}
            />
            <span className="min-w-0">
              <span
                className={cn(
                  "block truncate text-sm",
                  chat.active ? "font-medium text-foreground" : "text-text-secondary",
                )}
              >
                {chat.title}
              </span>
              <span className="block text-xs text-text-muted">
                {chat.timeAgo}
              </span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
