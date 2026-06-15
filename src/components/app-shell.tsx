"use client";

import { AppStateProvider, useAppState } from "./app-state";
import { IconRail } from "./icon-rail";
import { ChatListPanel } from "./chat-list-panel";
import { ChatThread } from "./chat-thread";
import { DocumentPanel } from "./document-panel";
import { DocumentationView } from "./documentation-view";
import { FullDocumentDialog } from "./full-document-dialog";
import { CreditBadge } from "./credit-badge";

function ResearchView() {
  return (
    <>
      <ChatListPanel />
      <ChatThread />
      <DocumentPanel />
    </>
  );
}

function Workspace() {
  const { view } = useAppState();
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <IconRail />
      {view === "research" ? <ResearchView /> : <DocumentationView />}
      <FullDocumentDialog />
      <CreditBadge />
    </div>
  );
}

export function AppShell() {
  return (
    <AppStateProvider>
      <Workspace />
    </AppStateProvider>
  );
}
