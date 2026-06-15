"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Download,
  Pencil,
  X,
  Maximize2,
  Minimize2,
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
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GENERATED_DOC } from "@/lib/mock-data";
import type { Block } from "@/lib/types";
import { RichContent } from "./rich-content";
import { VariantToggle } from "./variant-toggle";
import {
  VersionMenu,
  RestoreBanner,
  DocStatusBadge,
  PublishButton,
  type VersionState,
} from "./doc-version-control";

const TOOLBAR_GROUPS: { icon: LucideIcon; active?: boolean }[][] = [
  [{ icon: Undo2 }, { icon: Redo2 }],
  [{ icon: Heading1 }, { icon: Heading2, active: true }, { icon: Heading3 }],
  [{ icon: Bold }, { icon: Italic }, { icon: Strikethrough }, { icon: Code }],
  [{ icon: List }, { icon: ListOrdered }, { icon: Quote }, { icon: Minus }],
];

function IconButton({
  icon: Icon,
  onClick,
  label,
}: {
  icon: LucideIcon;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted hover:bg-surface hover:text-foreground"
    >
      <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
    </button>
  );
}

const MORE_ACTIONS: { icon: LucideIcon; label: string }[] = [
  { icon: Copy, label: "Copy" },
  { icon: Download, label: "Download" },
  { icon: Pencil, label: "Edit" },
];

/** Overflow menu for secondary document actions. */
function MoreMenu() {
  return (
    <Popover>
      <PopoverTrigger
        aria-label="More actions"
        className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted hover:bg-surface hover:text-foreground"
      >
        <MoreHorizontal className="h-[17px] w-[17px]" strokeWidth={1.75} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        className="w-44 rounded-[10px] border-border p-1 shadow-[0_4px_12px_rgba(30,34,48,0.10)]"
      >
        {MORE_ACTIONS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] text-text-secondary transition-colors hover:bg-surface hover:text-foreground"
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function FormattingToolbar() {
  return (
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
  );
}

function useDocVersions(): {
  state: VersionState;
  blocks: Block[];
} {
  const versions = GENERATED_DOC.versions;
  const initial =
    versions.find((v) => v.isCurrent)?.id ?? versions[versions.length - 1].id;
  const [currentId, setCurrentId] = useState(initial);
  const [viewingId, setViewingId] = useState(initial);
  const [published, setPublished] = useState(false);

  const blocks =
    versions.find((v) => v.id === viewingId)?.blocks ?? versions[0].blocks;

  const state: VersionState = {
    versions,
    viewingId,
    currentId,
    view: setViewingId,
    restore: (id) => {
      setCurrentId(id);
      setViewingId(id);
      // Restoring changes the document's content, so it returns to draft
      // until the user publishes again.
      setPublished(false);
    },
    published,
    publish: () => setPublished(true),
  };
  return { state, blocks };
}

export function DocumentPanel() {
  const [expanded, setExpanded] = useState(false);
  const { state, blocks } = useDocVersions();

  return (
    <>
      <section className="flex h-full w-[540px] shrink-0 flex-col border-l border-border bg-background">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate rounded-md bg-surface px-2 py-1 text-[13px] font-medium text-foreground">
              {GENERATED_DOC.title.slice(0, 22)}…
            </span>
            <VersionMenu state={state} />
            <DocStatusBadge state={state} />
          </div>
          <div className="flex items-center gap-1.5">
            <PublishButton state={state} />
            <div className="flex items-center gap-0.5">
              <MoreMenu />
              <IconButton
                icon={Maximize2}
                label="Expand to full width"
                onClick={() => setExpanded(true)}
              />
              <IconButton icon={X} label="Close" />
            </div>
          </div>
        </div>

        <FormattingToolbar />

        {/* Demo control: A/B citation style */}
        <div className="flex items-center justify-between border-b border-border bg-bg-subtle px-4 py-2">
          <VariantToggle />
        </div>

        <RestoreBanner state={state} />

        {/* Document body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <RichContent blocks={blocks} variant="document" />
        </div>
      </section>

      {expanded ? (
        <ExpandedDocument
          state={state}
          blocks={blocks}
          onCollapse={() => setExpanded(false)}
        />
      ) : null}
    </>
  );
}

function ExpandedDocument({
  state,
  blocks,
  onCollapse,
}: {
  state: VersionState;
  blocks: Block[];
  onCollapse: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCollapse();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCollapse]);

  return (
    // z-40 keeps citation popovers/dialogs (z-50, portalled) layered above this.
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-[15px] font-semibold text-foreground">
            {GENERATED_DOC.title}
          </span>
          <VersionMenu state={state} />
          <DocStatusBadge state={state} />
        </div>
        <div className="flex items-center gap-1.5">
          <PublishButton state={state} />
          <div className="flex items-center gap-0.5">
            <MoreMenu />
            <IconButton
              icon={Minimize2}
              label="Collapse to side panel"
              onClick={onCollapse}
            />
            <IconButton icon={X} label="Close" onClick={onCollapse} />
          </div>
        </div>
      </div>

      {/* Demo control: A/B citation style */}
      <div className="flex items-center justify-between border-b border-border bg-bg-subtle px-6 py-2">
        <VariantToggle />
      </div>

      <RestoreBanner state={state} />

      {/* Document body — full screen width, comfortable reading column */}
      <div className="flex-1 overflow-y-auto px-8 py-10">
        <div className="mx-auto max-w-4xl">
          <RichContent blocks={blocks} variant="document" />
        </div>
      </div>
    </div>
  );
}
