"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { CitationVariant } from "@/lib/types";

export type AppView = "research" | "documentation";

/** Target for the expanded full-document view. */
export type FullDocTarget = {
  sourceId: string;
  versionId: string;
  contentUnitId?: string;
};

type AppState = {
  variant: CitationVariant;
  setVariant: (v: CitationVariant) => void;
  view: AppView;
  setView: (v: AppView) => void;
  fullDoc: FullDocTarget | null;
  openFullDoc: (target: FullDocTarget) => void;
  closeFullDoc: () => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CitationVariant>("highlight");
  const [view, setView] = useState<AppView>("research");
  const [fullDoc, setFullDoc] = useState<FullDocTarget | null>(null);

  return (
    <Ctx.Provider
      value={{
        variant,
        setVariant,
        view,
        setView,
        fullDoc,
        openFullDoc: setFullDoc,
        closeFullDoc: () => setFullDoc(null),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
