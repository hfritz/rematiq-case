"use client";

import {
  Search,
  FileText,
  Globe,
  Tags,
  SquarePen,
  Library,
  FolderClosed,
  Plug,
  ListChecks,
  Network,
  User,
  MessageSquare,
  HelpCircle,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppState, type AppView } from "./app-state";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RailItem = {
  icon: LucideIcon;
  label: string;
  view?: AppView;
};

const TOP_ITEMS: RailItem[] = [
  { icon: Globe, label: "Workspace" },
  { icon: SquarePen, label: "Compose" },
  { icon: FileText, label: "Documentation", view: "documentation" },
  { icon: Tags, label: "Tags" },
  { icon: Search, label: "Regulatory Research", view: "research" },
  { icon: Library, label: "Library" },
  { icon: Network, label: "Connections" },
  { icon: Plug, label: "Connectors" },
  { icon: ListChecks, label: "Tasks" },
  { icon: FolderClosed, label: "Projects" },
];

const BOTTOM_ITEMS: RailItem[] = [
  { icon: MessageSquare, label: "Feedback" },
  { icon: HelpCircle, label: "Help" },
  { icon: User, label: "Account" },
  { icon: LogOut, label: "Sign out" },
];

function RailButton({ item }: { item: RailItem }) {
  const { view, setView } = useAppState();
  const Icon = item.icon;
  const active = item.view !== undefined && item.view === view;

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={() => item.view && setView(item.view)}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
          active
            ? "bg-brand-tint text-brand"
            : "text-text-secondary hover:bg-surface hover:text-foreground",
        )}
        aria-label={item.label}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export function IconRail() {
  return (
    <nav className="flex h-full w-14 shrink-0 flex-col items-center justify-between border-r border-border bg-sidebar py-3">
      <div className="flex flex-col items-center gap-1">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white">
          R
        </div>
        {TOP_ITEMS.map((item) => (
          <RailButton key={item.label} item={item} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-1">
        {BOTTOM_ITEMS.map((item) => (
          <RailButton key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
}
